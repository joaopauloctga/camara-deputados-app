export const getCache = (key) => {
  if (!process.env?.APPLICATION_CACHE_ENABLED) {
    return null;
  }
  return cache().getCache(key)
}

export const setCache = (key, data) => {
  if (!process.env?.APPLICATION_CACHE_ENABLED) {
    return null;
  }
  return cache().setCache(key, data)
}

const cache = () => {
  const instance = cacheServerList[process.env.APPLICATION_CACHE_SERVICE];
  return instance();
}

const cacheServerList = {
  'redis': () => {
    const {getCache, setCache} = require('./redis')
    return {getCache, setCache}
  },
};