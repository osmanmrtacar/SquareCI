const util = require("util");
var exec = util.promisify(require("child_process").exec);

const execCommands = async (containerId, element) => {
  try {
    await exec(`docker exec -d ${containerId} ${element.run}`);
    console.log(`\t  ${element.name} ...done`);
  } catch (error) {
    console.error(`\t  ${element.name} ...not done`);
    throw new Error("SS")
  }
};

module.exports = execCommands;
