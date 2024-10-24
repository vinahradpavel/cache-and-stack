// eslint-disable-next-line import/no-extraneous-dependencies
const NodeCache = require('node-cache');

class Cache {
  constructor() {
    this.cache = new NodeCache({ stdTTL: 30, checkperiod: 30 });
  }

  set(key, value) {
    return this.cache.set(key, value);
  }

  get(key) {
    const value = this.cache.get(key);
    if (!value) {
      return null;
    }
    return value;
  }

  delete(key) {
    return this.cache.del(key);
  }
}

module.exports = Cache;
