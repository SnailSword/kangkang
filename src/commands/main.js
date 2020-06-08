import _ from 'lodash';
import {exec} from 'child_process'

import Cache from '../utils/Cache';
import {printTree} from '../utils/print';

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

const main = async packageName => {
    return generateData(packageName).then(cache => {
        console.log('[data fetch]: done');
        console.log('=========');
        console.log(`${packageName}'s dependencies:`);
        printTree(packageName, 0, cache, {});
        cache.write2File();
    });
}

export default main;