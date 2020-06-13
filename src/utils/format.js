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

export const getPurePackageName = packageName => {
    if (packageName[0] === '"') {
        return packageName.match(/^"(.+)@/)[1];
    }
    return packageName;
}

export const isSamePackage = (p1, p2) => {
    return getPurePackageName(p1) === getPurePackageName(p2);
}
