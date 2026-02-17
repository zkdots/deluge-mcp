import path from "node:path";
import { pathToFileURL } from "node:url";
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { z } from "zod";
import { KnowledgeStore } from "./knowledge/store.js";
import { getBeginnerCheatsheet } from "./resources/cheatsheet.js";
import { getRulesResource } from "./resources/rules.js";
import { explainDeluge } from "./tools/explainer.js";
import { fixDeluge } from "./tools/fixer.js";
import { validateDeluge } from "./tools/validator.js";

export async function createServer(): Promise<McpServer> {
  const serverStartMs = Date.now();
  const store = new KnowledgeStore();
  await store.load();
  const snippetCount = store.all().length;

  const server = new McpServer({
    name: "deluge-mcp",
    version: "0.1.0",
  });

  server.registerTool(
    "deluge_validate",
    {
      title: "Validate Deluge",
      description: "Validate Deluge syntax and common runtime-risk patterns.",
      inputSchema: {
        code: z.string().min(1),
        strict: z.boolean().optional(),
      },
    },
    async ({ code, strict }) => {
      const result = validateDeluge(code, strict ?? true);
      return {
        structuredContent: result,
        content: [
          {
            type: "text",
            text: JSON.stringify(result, null, 2),
          },
        ],
      };
    }
  );

  server.registerTool(
    "deluge_fix",
    {
      title: "Fix Deluge",
      description: "Apply safe, minimal Deluge syntax fixes.",
      inputSchema: {
        code: z.string().min(1),
        style: z.enum(["minimal-change", "readable"]).optional(),
      },
    },
    async ({ code, style }) => {
      const fixed = fixDeluge(code, style ?? "minimal-change");
      return {
        structuredContent: {
          fixed_code: fixed.fixedCode,
          changes: fixed.changes,
        },
        content: [
          {
            type: "text",
            text: fixed.fixedCode,
          },
        ],
      };
    }
  );

  server.registerTool(
    "deluge_explain",
    {
      title: "Explain Deluge",
      description: "Explain Deluge snippet in beginner-friendly language.",
      inputSchema: {
        code: z.string().min(1),
        level: z.enum(["beginner", "intermediate"]).optional(),
      },
    },
    async ({ code }) => {
      const validation = validateDeluge(code, true);
      const explanation = explainDeluge(code, validation);
      const references = store.findRelatedByCode(code, 2).map((s) => ({ title: s.title, source: s.sourceUrl }));
      return {
        structuredContent: {
          summary: explanation.summary,
          line_by_line: explanation.lineByLine,
          key_rules: explanation.keyRules,
          references,
        },
        content: [
          {
            type: "text",
            text: `${explanation.summary}\n\n${explanation.keyRules.map((r) => `- ${r}`).join("\n")}`,
          },
        ],
      };
    }
  );

  server.registerTool(
    "deluge_examples",
    {
      title: "Deluge Examples",
      description: "Return high-confidence Deluge examples by topic.",
      inputSchema: {
        topic: z.string().min(1),
        difficulty: z.enum(["beginner", "intermediate"]).optional(),
      },
    },
    async ({ topic }) => {
      const examples = store.findByTopic(topic, 5).map((s) => ({
        title: s.title,
        code: s.code,
        notes: s.explanation,
        source: s.sourceUrl,
      }));

      return {
        structuredContent: { examples },
        content: [
          {
            type: "text",
            text:
              examples.length === 0
                ? "No high-confidence examples found for this topic."
                : JSON.stringify(examples, null, 2),
          },
        ],
      };
    }
  );

  server.registerTool(
    "deluge_health",
    {
      title: "Deluge MCP Health",
      description: "Report runtime health, uptime, and knowledge base availability.",
      inputSchema: {
        verbose: z.boolean().optional(),
      },
    },
    async ({ verbose }) => {
      const uptimeMs = Date.now() - serverStartMs;
      const warnings: string[] = [];

      if (snippetCount === 0) {
        warnings.push("Knowledge base has zero snippets. Run ingest to populate data/processed/snippets.json.");
      }

      const payload: Record<string, unknown> = {
        status: warnings.length === 0 ? "ok" : "degraded",
        server: {
          name: "deluge-mcp",
          version: "0.1.0",
        },
        timestamp: new Date().toISOString(),
        uptime_ms: uptimeMs,
        knowledge: {
          snippet_count: snippetCount,
          loaded: snippetCount > 0,
          source_file: "data/processed/snippets.json",
        },
        warnings,
      };

      if (verbose) {
        payload.tools = ["deluge_health", "deluge_validate", "deluge_fix", "deluge_explain", "deluge_examples"];
        payload.resources = ["deluge://rules/v1", "deluge://cheatsheet/beginner"];
      }

      return {
        structuredContent: payload,
        content: [
          {
            type: "text",
            text: JSON.stringify(payload, null, 2),
          },
        ],
      };
    }
  );

  server.registerResource(
    "deluge-rules",
    "deluge://rules/v1",
    {
      title: "Deluge Rules v1",
      description: "Validation rules used by deluge-mcp.",
      mimeType: "application/json",
    },
    async () => {
      const body = JSON.stringify(getRulesResource(), null, 2);
      return {
        contents: [
          {
            uri: "deluge://rules/v1",
            mimeType: "application/json",
            text: body,
          },
        ],
      };
    }
  );

  server.registerResource(
    "deluge-cheatsheet",
    "deluge://cheatsheet/beginner",
    {
      title: "Deluge Beginner Cheatsheet",
      description: "Short Deluge syntax cheatsheet for non-programmers.",
      mimeType: "text/plain",
    },
    async () => {
      return {
        contents: [
          {
            uri: "deluge://cheatsheet/beginner",
            mimeType: "text/plain",
            text: getBeginnerCheatsheet(),
          },
        ],
      };
    }
  );

  return server;
}

async function main(): Promise<void> {
  const server = await createServer();
  const transport = new StdioServerTransport();
  await server.connect(transport);
  process.stdin.resume();
  // Keep process alive for stdio clients; handle graceful shutdown on signals.
  const keepAlive = setInterval(() => {}, 1 << 30);
  const shutdown = async () => {
    clearInterval(keepAlive);
    await transport.close();
    process.exit(0);
  };
  process.once("SIGTERM", () => {
    void shutdown();
  });
  process.once("SIGINT", () => {
    void shutdown();
  });
}

function isDirectRun(): boolean {
  const entry = process.argv[1];
  if (!entry) {
    return false;
  }
  const entryUrl = pathToFileURL(path.resolve(entry)).href;
  return import.meta.url === entryUrl;
}

if (isDirectRun()) {
  main().catch((error: unknown) => {
    const message = error instanceof Error ? (error.stack ?? error.message) : String(error);
    process.stderr.write(`${message}\n`);
    process.exit(1);
  });
}
