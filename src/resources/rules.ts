export function getRulesResource(): Record<string, unknown> {
  return {
    version: "v1",
    name: "Deluge Syntax Rules (Beginner Safe)",
    policy: {
      execution: "disabled",
      sourceAllowlist: "www.zoho.com/deluge/help/**",
      lowConfidenceSuppressed: true,
    },
    rules: [
      { id: "syntax.unmatched_delimiter", description: "All opening delimiters must be closed." },
      { id: "syntax.unclosed_string", description: "Double-quoted strings must be closed." },
      { id: "runtime.index_out_of_bounds", description: "List index access should stay within known bounds." },
      { id: "style.semicolon", description: "Semicolons are recommended for consistent snippets." },
    ],
  };
}
