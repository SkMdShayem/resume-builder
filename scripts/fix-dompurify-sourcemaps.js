const fs = require("fs");
const path = require("path");

const targets = [
  "node_modules/dompurify/dist/purify.es.mjs",
  "node_modules/dompurify/dist/purify.cjs.js",
  "node_modules/dompurify/dist/purify.js",
  "node_modules/dompurify/dist/purify.min.js",
];

let changedCount = 0;

for (const relativeTarget of targets) {
  const filePath = path.resolve(process.cwd(), relativeTarget);
  if (!fs.existsSync(filePath)) {
    continue;
  }

  const original = fs.readFileSync(filePath, "utf8");
  const updated = original.replace(/\r?\n?\/\/# sourceMappingURL=.*$/m, "");

  if (updated !== original) {
    fs.writeFileSync(filePath, updated, "utf8");
    changedCount += 1;
  }
}

if (changedCount > 0) {
  console.log(`[dompurify-fix] Updated ${changedCount} file(s).`);
}
