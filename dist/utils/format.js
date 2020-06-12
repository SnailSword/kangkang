"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
/**
 * 格式相关处理
 */

var getPackageName = exports.getPackageName = function getPackageName(version, name) {
    if (!version) {
        return name;
    }
    return "\"" + name + "@" + version + "\"";
};

var getCommond = exports.getCommond = function getCommond(packageName) {
    return "npm v -json " + packageName + " dependencies";
};