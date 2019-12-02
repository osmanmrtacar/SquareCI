#!/usr/bin/env node
var Args = process.argv.splice(2);
const util = require("util");
var exec = util.promisify(require("child_process").exec);
const readFromFile = require("./readFromFile");
const run = require("./async");

const parse = require("./argsParser");
var parsed = parse(Args);
var configFile = parsed[0].value;
var config = readFromFile(configFile);
var beforeSteps = true;

(async function (){
  try {
    console.log("Running Up Container");
    const { stdout: containerId } = await exec("docker run -d " + config.image);
    console.log("Running before stage");
    await run.Serial(config.before, containerId);
    beforeSteps = false;
    console.log("Running steps");
    config.runInParallel
      ? await run.Parallel(config.steps, containerId)
      : await run.Serial(config.steps, containerId);
    console.log("Running after stage");
    await run.Serial(config.after, containerId);
  } catch (error) {
    if (config.exitOnFailure || beforeSteps) {
      process.exit(1);
    } else {
    }
  }
})()
