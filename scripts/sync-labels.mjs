import { execFileSync } from "node:child_process";
import fs from "node:fs/promises";
import path from "node:path";

function getArg(flag) {
  const args = process.argv.slice(2);
  const idx = args.indexOf(flag);
  if (idx === -1 || idx + 1 >= args.length) {
    return "";
  }
  return args[idx + 1];
}

function runCapture(cmd, args) {
  return execFileSync(cmd, args, { encoding: "utf8" }).trim();
}

function run(cmd, args) {
  execFileSync(cmd, args, { stdio: "inherit" });
}

function ensureGh() {
  try {
    runCapture("gh", ["--version"]);
  } catch {
    process.stderr.write("GitHub CLI 'gh' is required. Install from https://cli.github.com/\n");
    process.exit(1);
  }
}

function getRepo() {
  const fromArg = getArg("--repo");
  if (fromArg) {
    return fromArg;
  }
  return runCapture("gh", ["repo", "view", "--json", "nameWithOwner", "-q", ".nameWithOwner"]);
}

function parseLabels(input) {
  const parsed = JSON.parse(input);
  if (!Array.isArray(parsed)) {
    throw new Error("labels file must be a JSON array");
  }
  for (const item of parsed) {
    if (!item || typeof item !== "object") {
      throw new Error("each label must be an object");
    }
    if (typeof item.name !== "string" || !item.name.trim()) {
      throw new Error("label.name must be a non-empty string");
    }
    if (typeof item.color !== "string" || !item.color.trim()) {
      throw new Error(`label '${item.name}' is missing color`);
    }
    if (typeof item.description !== "string") {
      throw new Error(`label '${item.name}' is missing description`);
    }
  }
  return parsed;
}

async function main() {
  ensureGh();
  const repo = getRepo();
  const labelsPath = getArg("--file") || path.join(".github", "labels.json");
  const raw = await fs.readFile(labelsPath, "utf8");
  const desired = parseLabels(raw);

  const existingRaw = runCapture("gh", ["api", `repos/${repo}/labels?per_page=100`]);
  const existing = JSON.parse(existingRaw);
  const existingNames = new Set(existing.map((item) => item.name));

  process.stdout.write(`Syncing ${desired.length} labels to ${repo}\n`);

  for (const label of desired) {
    if (existingNames.has(label.name)) {
      run("gh", [
        "api",
        "--method",
        "PATCH",
        `repos/${repo}/labels/${encodeURIComponent(label.name)}`,
        "-f",
        `new_name=${label.name}`,
        "-f",
        `color=${label.color}`,
        "-f",
        `description=${label.description}`,
      ]);
      process.stdout.write(`updated: ${label.name}\n`);
      continue;
    }

    run("gh", [
      "api",
      "--method",
      "POST",
      `repos/${repo}/labels`,
      "-f",
      `name=${label.name}`,
      "-f",
      `color=${label.color}`,
      "-f",
      `description=${label.description}`,
    ]);
    process.stdout.write(`created: ${label.name}\n`);
  }
}

main().catch((error) => {
  const message = error instanceof Error ? (error.stack ?? error.message) : String(error);
  process.stderr.write(`${message}\n`);
  process.exit(1);
});
