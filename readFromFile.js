const fs = require("fs");
const reader = require("js-yaml");

function readYaml(path) {
  try {
    if (/([a-zA-Z0-9\s_\\.\-\(\):])+(.json|.yaml)$/.test(path)) {
      let fileContents = fs.readFileSync(path, "utf8");
      let data = reader.safeLoad(fileContents);
      return data;
    } else throw new Error("only yaml, json files are supported");
  } catch (e) {
    console.error(e);
    process.exit(1);
  }
}

module.exports = readYaml;
