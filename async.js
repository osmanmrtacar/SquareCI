const execCommands = require("./utils");

async function Serial(array, containerId) {
  for (const element of array) {
    await execCommands(containerId, element);
  }
}

async function Parallel(array, containerId) {
  await Promise.all(
    array.map(element => {
      return execCommands(containerId, element);
    })
  );
}

exports.Serial = Serial;
exports.Parallel = Parallel;
