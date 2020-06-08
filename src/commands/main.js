import _ from 'lodash';
import {exec} from 'child_process'

import Cache from '../utils/Cache';

const cache = new Cache('CacheFile');


cache.initCacheFromFile();
const getPackageName = (version, name) => {
    if (!version) {
        return name;
    }
    return `"${name}@${version}"`;
}

const getCommond = packageName => `npm v -json ${packageName} dependencies`;

export const generateData = packageName => {
    if (cache.has(packageName)) {
        return Promise.resolve(cache);
    }
    return new Promise((resolve, reject) => {
        const end = () => resolve(cache);
        const cmdStr = getCommond(packageName);
        console.log(cmdStr);
        exec(cmdStr, (err, stdout, stderr) => {
            if (err) {
                // todo format error
                console.log(err);
                return end();
            }
            else {
                // todo catch
                try {
                    if (!stdout) {
                        cache.setData(packageName, []);
                        // console.log('no dep', packageName);
                        return end();
                    }
                    let resultObj = JSON.parse(stdout);
                    if (_.isArray(resultObj)) {
                        // todo 如果已经有符合要求的版本，直接使用
                        resultObj = _.last(resultObj);
                    }
                    // console.log('resultObj', resultObj);
                    const children = _.map(resultObj, getPackageName);
                    // console.log('children', children);
                    cache.setData(packageName, children);
                    const childrenExec = _.map(children, p => generateData(p));
                    Promise.all(childrenExec).then(() => {
                        end();
                    });
                }
                catch(e) {
                    console.log('unexpect stdout', stdout);
                    return end();
                }
            }
        })
    });
}

const printLine = (packageName, depth, record) => {
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

const printTree = (packageName, depth, cache, record = {}) => {
    let cur = packageName;
    printLine(packageName, depth, record);
    if (!cache.isLeaf(cur)) {
        _.each(cache.getData(cur), p => printTree(p, depth + 1, cache, record));
    }
}



const main = packageName => {
    generateData(packageName).then(cache => {
        console.log('[data fetch]: done');
        console.log(`${packageName}'s dependencies:`);
        // console.log('data', data);
        printTree(packageName, 0, cache, {});
        cache.write2File();
    });
}

main('react');