export function getBeginnerCheatsheet(): string {
  return [
    "Deluge Beginner Cheatsheet",
    "",
    "1) Variables",
    "count = 1;",
    "name = \"Zoho\";",
    "",
    "2) Map and List",
    "m = {\"Product\":\"Creator\"};",
    "v = m.get(\"Product\");",
    "listVar = {\"A\",\"B\"};",
    "first = listVar.get(0);",
    "",
    "3) Conditions",
    "if(count > 0)",
    "{",
    "    info \"Positive\";",
    "}",
    "",
    "4) Common safety",
    "- map keys are case-sensitive",
    "- out-of-range list indexes can fail at runtime",
    "- keep braces and parentheses balanced"
  ].join("\n");
}
