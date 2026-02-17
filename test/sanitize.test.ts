import test from "node:test";
import assert from "node:assert/strict";
import { parseContext7Markdown } from "../src/ingestion/parser.js";
import { sanitizeSectionsStrict } from "../src/ingestion/sanitize.js";

test("strict sanitizer keeps only allowlisted zoho deluge snippets", () => {
  const md = `
### Deluge get() Function Example

Source: https://www.zoho.com/deluge/help/functions/map/get

\`\`\`Deluge
mapVar = {"Product" : "Creator"};
info mapVar.get("Product");
\`\`\`

### Not allowed domain

Source: https://example.com/deluge/help/functions/map/get

\`\`\`Deluge
info "x";
\`\`\`
`;

  const sections = parseContext7Markdown(md);
  const { snippets, summary } = sanitizeSectionsStrict(sections);

  assert.equal(snippets.length, 1);
  assert.equal(summary.rejected.sourceNotAllowed, 1);
  assert.equal(snippets[0].functionName, "get");
});
