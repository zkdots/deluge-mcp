import { execFileSync } from "node:child_process";

const args = process.argv.slice(2);

const options = {
  type: "patch",
  preid: "rc",
  remote: "origin",
  skipVerify: false,
  noPush: false,
  dryRun: false,
  allowDirty: false,
};

function usage() {
  process.stdout.write(
    [
      "Release helper",
      "",
      "Usage:",
      "  node scripts/release.mjs [flags]",
      "",
      "Flags:",
      "  --type <patch|minor|major|prerelease>   Release type (default: patch)",
      "  --preid <alpha|beta|rc|...>             Prerelease identifier (default: rc)",
      "  --remote <name>                         Git remote to push (default: origin)",
      "  --skip-verify                           Skip `npm run verify` before release",
      "  --no-push                               Do not push commit/tag",
      "  --allow-dirty                           Allow running with uncommitted changes",
      "  --dry-run                               Print planned commands only",
      "  --help                                  Show this help",
      "",
      "Examples:",
      "  npm run release:patch",
      "  npm run release -- --type prerelease --preid beta",
      "  npm run release -- --type minor --no-push",
    ].join("\n")
  );
}

for (let i = 0; i < args.length; i += 1) {
  const arg = args[i];
  if (arg === "--help") {
    usage();
    process.exit(0);
  }
  if (arg === "--skip-verify") {
    options.skipVerify = true;
    continue;
  }
  if (arg === "--no-push") {
    options.noPush = true;
    continue;
  }
  if (arg === "--dry-run") {
    options.dryRun = true;
    continue;
  }
  if (arg === "--allow-dirty") {
    options.allowDirty = true;
    continue;
  }
  if (arg === "--type") {
    options.type = args[i + 1] ?? "";
    i += 1;
    continue;
  }
  if (arg === "--preid") {
    options.preid = args[i + 1] ?? "";
    i += 1;
    continue;
  }
  if (arg === "--remote") {
    options.remote = args[i + 1] ?? "";
    i += 1;
    continue;
  }
  process.stderr.write(`Unknown flag: ${arg}\n`);
  usage();
  process.exit(1);
}

const validTypes = new Set(["patch", "minor", "major", "prerelease"]);
if (!validTypes.has(options.type)) {
  process.stderr.write(`Invalid --type value: ${options.type}\n`);
  process.exit(1);
}

if (!options.remote.trim()) {
  process.stderr.write("--remote cannot be empty\n");
  process.exit(1);
}

function run(cmd, cmdArgs, { capture = false } = {}) {
  const printable = `${cmd} ${cmdArgs.join(" ")}`.trim();
  if (options.dryRun) {
    process.stdout.write(`[dry-run] ${printable}\n`);
    return "";
  }

  if (capture) {
    return execFileSync(cmd, cmdArgs, { encoding: "utf8" }).trim();
  }

  execFileSync(cmd, cmdArgs, { stdio: "inherit" });
  return "";
}

const branch = run("git", ["rev-parse", "--abbrev-ref", "HEAD"], { capture: true });
if (!branch || branch === "HEAD") {
  process.stderr.write("Cannot determine current branch (detached HEAD?)\n");
  process.exit(1);
}

if (!options.allowDirty) {
  const dirty = run("git", ["status", "--porcelain"], { capture: true });
  if (dirty) {
    process.stderr.write("Working tree is dirty. Commit/stash first or use --allow-dirty.\n");
    process.exit(1);
  }
}

process.stdout.write(`Releasing from branch: ${branch}\n`);

if (!options.skipVerify) {
  run("npm", ["run", "verify"]);
}

const versionArgs = ["version", options.type, "-m", "release: %s"];
if (options.type === "prerelease") {
  versionArgs.push("--preid", options.preid);
}
run("npm", versionArgs);

if (!options.noPush) {
  run("git", ["push", options.remote, branch]);
  run("git", ["push", options.remote, "--tags"]);
}

process.stdout.write("Release flow completed.\n");
