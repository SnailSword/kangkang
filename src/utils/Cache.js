/**
 * Cache class
 */

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
                // todo 让用户选一下是否重建
                console.log('缓存数据损坏，重建缓存文件');
                this.clearCache();
            }
        }
    }

    write2File() {
        fs.writeFileSync(this.cacheFilePath, JSON.stringify(this.data));
    }

    clearCache() {
        Cache.clean();
    }

    static clean() {
        console.log('[cache clean]: start');
        fs.writeFileSync(resolve(getHome(), CACHE_FILE_NAME), '{}');
        console.log('[cache clean]: done');
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
        return result;
    }

    isLeaf(packageName) {
        return this.getData(packageName).length === 0;
    }
}