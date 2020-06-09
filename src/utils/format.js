/**
 * 格式相关处理
 */

export const getPackageName = (version, name) => {
    if (!version) {
        return name;
    }
    return `"${name}@${version}"`;
}

export const getCommond = packageName => `npm v -json ${packageName} dependencies`;
