/**
 * 显示依赖树的核心逻辑
 */

import _ from 'lodash';
import {exec} from 'child_process'

import Cache from '../utils/Cache';
import {printTree, trackBackPrint} from '../utils/print';
import {getCommond, getPackageName} from '../utils/format';

const cache = new Cache();


cache.initCacheFromFile();

export const generateData = packageName => {
    if (cache.has(packageName)) {
        return Promise.resolve(cache);
    }
    return new Promise((resolve, reject) => {
        const end = () => resolve(cache);
        const cmdStr = getCommond(packageName);
        console.log(`fatching ${packageName}'s dependencies...`);
        exec(cmdStr, (err, stdout, stderr) => {
            if (err) {
                // todo format error
                console.log(err);
                return end();
            }
            else {
                try {
                    if (!stdout) {
                        cache.setData(packageName, []);
                        return end();
                    }
                    let resultObj = JSON.parse(stdout);
                    if (_.isArray(resultObj)) {
                        // todo 如果已经有符合要求的版本，直接使用
                        resultObj = _.last(resultObj);
                    }
                    const children = _.map(resultObj, getPackageName);
                    cache.setData(packageName, children);
                    const childrenExec = _.map(children, p => generateData(p));
                    return Promise.all(childrenExec).then(() => {
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

export const generateDataAndWrite2Cache = packageName => {
    console.log(`[data fetch]: start`);
    return generateData(packageName).then(cache => {
        console.log('[data fetch]: done');
        cache.write2File();
        return cache;
    });
}

const main = async packageName => {
    return generateDataAndWrite2Cache(packageName).then(cache => {
        console.log('\n=======================================');
        console.log(`\n${packageName}'s dependencies:\n`);
        printTree(packageName, 0, cache, {});
        console.log('=======================================\n');
    });
}

export const printPath = async (rootPackageName, targetPackageName) => {
    return generateDataAndWrite2Cache(rootPackageName)
        .then(cache => {
            console.log('\n=======================================');
            console.log(`dependency paths from ${rootPackageName} to ${targetPackageName}:\n`);
            trackBackPrint([rootPackageName], targetPackageName, cache);
            console.log('=======================================\n');
        });
}

export default main;

