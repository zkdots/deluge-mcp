import test from "node:test";
import assert from "node:assert/strict";
import { validateDeluge } from "../src/tools/validator.js";

test("validator catches unmatched delimiters", () => {
  const result = validateDeluge('if (a == b {\ninfo "x";\n}', true);
  assert.equal(result.valid, false);
  assert.ok(result.errors.some((e) => e.ruleId === "syntax.unmatched_delimiter" || e.ruleId === "syntax.unclosed_delimiter"));
});

test("validator catches literal index out-of-bounds", () => {
  const code = `
listVar = {"Creator", "CRM"};
value = listVar.get(2);
`;
  const result = validateDeluge(code, true);
  assert.ok(result.errors.some((e) => e.ruleId === "runtime.index_out_of_bounds"));
});
