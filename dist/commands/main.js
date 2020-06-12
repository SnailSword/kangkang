'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.generateData = undefined;

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _promise = require('babel-runtime/core-js/promise');

var _promise2 = _interopRequireDefault(_promise);

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _child_process = require('child_process');

var _Cache = require('../utils/Cache');

var _Cache2 = _interopRequireDefault(_Cache);

var _print = require('../utils/print');

var _format = require('../utils/format');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var cache = new _Cache2.default(); /**
                                    * 显示依赖树的核心逻辑
                                    */

cache.initCacheFromFile();

var generateData = exports.generateData = function generateData(packageName) {
    if (cache.has(packageName)) {
        return _promise2.default.resolve(cache);
    }
    return new _promise2.default(function (resolve, reject) {
        var end = function end() {
            return resolve(cache);
        };
        var cmdStr = (0, _format.getCommond)(packageName);
        console.log('fatching ' + packageName + '\'s dependencies...');
        (0, _child_process.exec)(cmdStr, function (err, stdout, stderr) {
            if (err) {
                // todo format error
                console.log(err);
                return end();
            } else {
                try {
                    if (!stdout) {
                        cache.setData(packageName, []);
                        return end();
                    }
                    var resultObj = JSON.parse(stdout);
                    if (_lodash2.default.isArray(resultObj)) {
                        // todo 如果已经有符合要求的版本，直接使用
                        resultObj = _lodash2.default.last(resultObj);
                    }
                    var children = _lodash2.default.map(resultObj, _format.getPackageName);
                    cache.setData(packageName, children);
                    var childrenExec = _lodash2.default.map(children, function (p) {
                        return generateData(p);
                    });
                    return _promise2.default.all(childrenExec).then(function () {
                        end();
                    });
                } catch (e) {
                    console.log('unexpect stdout', stdout);
                    return end();
                }
            }
        });
    });
};

var main = function () {
    var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(packageName) {
        return _regenerator2.default.wrap(function _callee$(_context) {
            while (1) {
                switch (_context.prev = _context.next) {
                    case 0:
                        console.log('[data fetch]: start');
                        return _context.abrupt('return', generateData(packageName).then(function (cache) {
                            console.log('[data fetch]: done');
                            console.log('\n=======================================');
                            console.log(packageName + '\'s dependencies:\n');
                            (0, _print.printTree)(packageName, 0, cache, {});
                            // console.log('\n');
                            console.log('=======================================\n');
                            // todo 算完缓存不调用main也应该能写到缓存文件
                            cache.write2File();
                        }));

                    case 2:
                    case 'end':
                        return _context.stop();
                }
            }
        }, _callee, undefined);
    }));

    return function main(_x) {
        return _ref.apply(this, arguments);
    };
}();

exports.default = main;