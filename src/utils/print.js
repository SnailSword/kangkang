/**
 * print methods
 * @return {string} 目录 Path
 */
import _ from 'lodash';

export const printLine = (packageName, depth, record) => {
    let packageNameText = packageName[0] === '"'
        ? packageName.slice(1, -1)
        : packageName;
    let baseText = `|${'  '.repeat(depth)}|--${packageNameText}`;
    if (record[packageName]) {
        record[packageName]++;
        console.log(baseText + ' *');
    }
    else {
        record[packageName] = 1;
        console.log(baseText);
    }
}

export const printTree = (packageName, depth, cache, record = {}) => {
    let cur = packageName;
    printLine(packageName, depth, record);
    if (!cache.isLeaf(cur)) {
        _.each(cache.getData(cur), p => printTree(p, depth + 1, cache, record));
    }
}