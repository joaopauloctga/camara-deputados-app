const redis = require('redis');
const querystring = require('querystring');
import config from '../../../utils/config'

export default async function handler(req, res) {
  const {query, url} = req;
  const { slug } = query;
  const params = {};

  Object
    .keys(query)
    .filter(paramName => paramName !== 'slug')
    .forEach((paramName) => {
      params[paramName] = query[paramName];
    });

  const cacheServer = require('../../../infra/cache');
  const cacheKey = buildCacheKeyName(slug);

  let path = url.slice(`/api/camara/`.length);
  const cachedResponse = await cacheServer.getCache(cacheKey);
  if (cachedResponse && !path.includes('?')) {
    res.json(JSON.parse(cachedResponse))
  }
  else {
    const resp = await callCamaraAPI(`${config.CAMARA_DEPUTADOS_ENDPOINT}${path}`);
    res.json(resp);
    cacheServer.setCache(cacheKey, resp);
  }
}

const callCamaraAPI = async (url) => {
  const resp = await fetch(url);
  const data = await resp.json();
  return data;
}

const buildCacheKeyName = (url) => {
  return url.join('-')
}
