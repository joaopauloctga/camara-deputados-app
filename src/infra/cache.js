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
  try {
    const instance = cacheServerList[process.env.APPLICATION_CACHE_SERVICE];
    return instance();
  }
  catch (e) {
    console.log(`Failed to connect with cache server: ${e}`)
    return null;
  }
}

const cacheServerList = {
  'redis': () => {
    const {getCache, setCache} = require('./redis')
    return {getCache, setCache}
  },
};