/**
 * 显示依赖树的核心逻辑
 */

import _ from 'lodash';
import {exec} from 'child_process'

import Cache from '../utils/Cache';
import {printTree} from '../utils/print';
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

const main = async packageName => {
    console.log(`[data fetch]: start`);
    return generateData(packageName).then(cache => {
        console.log('[data fetch]: done');
        console.log('\n=======================================');
        console.log(`${packageName}'s dependencies:\n`);
        printTree(packageName, 0, cache, {});
        // console.log('\n');
        console.log('=======================================\n');
        // todo 算完缓存不调用main也应该能写到缓存文件
        cache.write2File();
    });
}

export default main;