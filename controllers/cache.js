const NodeCache = require('node-cache');

module.exports = class Cache {
    
    constructor(ttlSeconds) {
        this.cache = new NodeCache({ stdTTL: ttlSeconds, checkperiod: ttlSeconds * 0.2, useClones: false });
    }
    
    async get(key, storeFunction) {
        const value = await this.cache.get(key);
        if (value) {
            return value;
        }
        const result = await storeFunction();
        this.cache.set(key, result);
        return result;
    }            
    
    del(keys) {
        this.cache.del(keys);
    }

    flush() {
        this.cache.flushAll();
    }
}