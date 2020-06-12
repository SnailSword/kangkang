'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.printTree = exports.printLine = undefined;

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var printLine = exports.printLine = function printLine(packageName, depth, record) {
    var packageNameText = packageName[0] === '"' ? packageName.slice(1, -1) : packageName;
    var baseText = '|' + '  '.repeat(depth) + '|--' + packageNameText;
    if (record[packageName]) {
        record[packageName]++;
        console.log(baseText + ' *');
    } else {
        record[packageName] = 1;
        console.log(baseText);
    }
}; /**
    * print methods
    * @return {string} 目录 Path
    */
var printTree = exports.printTree = function printTree(packageName, depth, cache) {
    var record = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};

    var cur = packageName;
    printLine(packageName, depth, record);
    if (!cache.isLeaf(cur)) {
        _lodash2.default.each(cache.getData(cur), function (p) {
            return printTree(p, depth + 1, cache, record);
        });
    }
};