'use strict';

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _commander = require('commander');

var _commander2 = _interopRequireDefault(_commander);

var _main = require('./commands/main');

var _main2 = _interopRequireDefault(_main);

var _Cache = require('./utils/Cache');

var _Cache2 = _interopRequireDefault(_Cache);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_commander2.default.usage('<packageName>').arguments('<packageName>').action(function () {
    var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(packageName) {
        return _regenerator2.default.wrap(function _callee$(_context) {
            while (1) {
                switch (_context.prev = _context.next) {
                    case 0:
                        _context.next = 2;
                        return (0, _main2.default)(packageName);

                    case 2:
                    case 'end':
                        return _context.stop();
                }
            }
        }, _callee, undefined);
    }));

    return function (_x) {
        return _ref.apply(this, arguments);
    };
}()); /**
       * 入口文件
       */

_commander2.default.command('cache [operate]').action(function (operate) {
    switch (operate) {
        case 'clean':
            _Cache2.default.clean();
    }
});

_commander2.default.parse(process.argv);