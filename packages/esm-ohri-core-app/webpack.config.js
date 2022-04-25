const CircularDependencyPlugin = require('circular-dependency-plugin');

const config = (module.exports = require('openmrs/default-webpack-config'));
console.log({ config });
// config.overrides.plugins = [
//   new CircularDependencyPlugin({
//     // exclude detection of files based on a RegExp
//     exclude: /a\.js|node_modules/,
//     // add errors to webpack instead of warnings
//     failOnError: true,
//     // allow import cycles that include an asyncronous import,
//     // e.g. via import(/* webpackMode: "weak" */ './file.js')
//     allowAsyncCycles: false,
//     // set the current working directory for displaying module paths
//     cwd: process.cwd(),
//   }),
// ];
config.scriptRuleConfig.exclude = /(node_modules[^\/@openmrs\/esm\-patient\-common\-lib])/;
module.exports = config;
