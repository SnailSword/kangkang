'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _stringify = require('babel-runtime/core-js/json/stringify');

var _stringify2 = _interopRequireDefault(_stringify);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _path = require('path');

var _fsExtra = require('fs-extra');

var _fsExtra2 = _interopRequireDefault(_fsExtra);

var _getHome = require('./getHome');

var _getHome2 = _interopRequireDefault(_getHome);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var CACHE_FILE_NAME = '.cache.json'; /**
                                      * Cache class
                                      */

var Cache = function () {
    function Cache(CacheFile) {
        (0, _classCallCheck3.default)(this, Cache);

        this.CacheFile = CacheFile || CACHE_FILE_NAME;
        this.cacheFilePath = (0, _path.resolve)((0, _getHome2.default)(), this.CacheFile);
        this.data = {};
    }

    (0, _createClass3.default)(Cache, [{
        key: 'initCacheFromFile',
        value: function initCacheFromFile() {
            _fsExtra2.default.ensureFileSync(this.cacheFilePath);
            var cacheFileContent = _fsExtra2.default.readFileSync(this.cacheFilePath, 'utf-8');
            if (cacheFileContent.length) {
                try {
                    this.data = JSON.parse(cacheFileContent);
                } catch (e) {
                    // todo 让用户选一下是否重建
                    console.log('缓存数据损坏，重建缓存文件');
                    this.clearCache();
                }
            }
        }
    }, {
        key: 'write2File',
        value: function write2File() {
            _fsExtra2.default.writeFileSync(this.cacheFilePath, (0, _stringify2.default)(this.data));
        }
    }, {
        key: 'clearCache',
        value: function clearCache() {
            Cache.clean();
        }
    }, {
        key: 'setData',
        value: function setData(packageName) {
            var arr = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];

            this.data[packageName] = arr;
        }
    }, {
        key: 'getData',
        value: function getData(packageName) {
            if (!this.has(packageName)) {
                return false;
            }
            return this.data[packageName];
        }
    }, {
        key: 'has',
        value: function has(packageName) {
            var result = !!this.data[packageName];
            return result;
        }
    }, {
        key: 'isLeaf',
        value: function isLeaf(packageName) {
            return this.getData(packageName).length === 0;
        }
    }], [{
        key: 'clean',
        value: function clean() {
            console.log('[cache clean]: start');
            _fsExtra2.default.writeFileSync((0, _path.resolve)((0, _getHome2.default)(), CACHE_FILE_NAME), '{}');
            console.log('[cache clean]: done');
        }
    }]);
    return Cache;
}();

exports.default = Cache;