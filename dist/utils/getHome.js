'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = getHome;

var _os = require('os');

var _os2 = _interopRequireDefault(_os);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _fsExtra = require('fs-extra');

var _fsExtra2 = _interopRequireDefault(_fsExtra);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function getHome() {
  var dir = _path2.default.resolve(process.env[_os2.default.platform() === 'win32' ? 'APPDATA' : 'HOME'], '.npm-shovel');
  _fsExtra2.default.ensureDirSync(dir);

  return dir;
} /**
   * 获取项目根目录
   * @return {string} 目录 Path
   */