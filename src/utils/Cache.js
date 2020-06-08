import {resolve} from 'path'
import fs from 'fs-extra'
import getHome from './getHome'

const CACHE_FILE_NAME = '.cache.json'

export default class Cache {
    constructor(CacheFile) {
        this.CacheFile = CacheFile || CACHE_FILE_NAME;
        this.cacheFilePath = resolve(getHome(), this.CacheFile);
        this.data = {};
    }

    initCacheFromFile() {
        fs.ensureFileSync(this.cacheFilePath);
        let cacheFileContent = fs.readFileSync(this.cacheFilePath, 'utf-8');
        if (cacheFileContent.length) {
            try {
                this.data = JSON.parse(cacheFileContent);
            }
            catch(e) {
                // 让用户选一下是否重建
                console.log('缓存数据损坏，重建缓存文件');
                this.clearCache();
            }
        }


        // this.data = {
        //     react: [
        //       '"loose-envify@^1.1.0"',
        //       '"object-assign@^4.1.1"',
        //       '"prop-types@^15.6.2"'
        //     ],
        //     '"loose-envify@^1.1.0"': [ '"js-tokens@^3.0.0 || ^4.0.0"' ],
        //     '"prop-types@^15.6.2"': [
        //       '"loose-envify@^1.4.0"',
        //       '"object-assign@^4.1.1"',
        //       '"react-is@^16.8.1"'
        //     ],
        //     '"js-tokens@^3.0.0 || ^4.0.0"': [],
        //     '"object-assign@^4.1.1"': [],
        //     '"loose-envify@^1.4.0"': [ '"js-tokens@^3.0.0 || ^4.0.0"' ],
        //     '"react-is@^16.8.1"': []
        // };
    }

    write2File() {
        fs.writeFileSync(this.cacheFilePath, JSON.stringify(this.data));
    }

    clearCache() {
        fs.writeFileSync(this.cacheFilePath, '{}');
    }

    setData(packageName, arr = []) {
        this.data[packageName] = arr;
    }

    getData(packageName) {
        if (!this.has(packageName)) {
            return false;
        }
        return this.data[packageName];
    }

    has(packageName) {
        let result = !!this.data[packageName];
        // console.log('======')
        // console.log('packageName', packageName);
        // console.log('this.data', this.data);
        // console.log('result', result);
        // console.log('------')
        return result;
    }

    isLeaf(packageName) {
        return this.getData(packageName).length === 0;
    }
}