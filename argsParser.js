#!/usr/bin/env node

var options = [
  {
    name: "Config",
    long: "--config",
    short: "-c",
    value: ".squareci.yaml"
  },
  {
    name: "Path",
    long: "--path",
    short: "-p",
    value: process.cwd()
  }
];

function parse(myArgs) {
  myArgs.forEach((element, index) => {
    var option = iterateOptions(element);
    if (option) {
      option.value = myArgs[index + 1] || option.value;
    } else {
      if (/-{1,2}/.test(element)) {
        console.log("unknown argument");
        process.exit(1);
      }
    }
  });
  return options;
}
function iterateOptions(arg) {
  for (var i = 0, len = options.length; i < len; ++i) {
    if (options[i].long == arg || options[i].short == arg) {
      return options[i];
    }
  }
}

exports = module.exports = parse;
