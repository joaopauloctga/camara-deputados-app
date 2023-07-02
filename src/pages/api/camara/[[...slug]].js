const redis = require('redis');
const querystring = require('querystring');
import config from '../../../utils/config';

const cacheServer = require('../../../infra/cache');

async function getSubData() {
  let item, subData = null;
  for (let i=0; i<dados.length; i++) {
    item = dados[i];
    let uri = item.deputado_ !== undefined
      ? item.deputado_.uri
      : item.uri;
    subData = await fetchProxy(uri, {proxy: config?.subReqProxy !== undefined})
    data[i] = {
      ...item,
      ...subData.dados
    }
  }
}

async function getData(url) {
  const cacheKey = buildCacheKeyName(url);
  let path = url.slice(`/api/camara/`).join('/');

  const cachedResponse = await cacheServer.getCache(cacheKey);
  if (cachedResponse && !path.includes('?')) {
    return JSON.parse(cachedResponse)
  }
  const resp = await callCamaraAPI(`${config.CAMARA_DEPUTADOS_ENDPOINT}${path}`);
  cacheServer.setCache(cacheKey, resp);
  return resp;
}

export default async function handler(req, res) {
  const {query, headers} = req;
  const { slug } = query;
  const data = await getData(slug);
  res.json(data);
}

const callCamaraAPI = async (url) => {
  const resp = await fetch(url);
  const data = await resp.json();
  return data;
}

const buildCacheKeyName = (url) => {
  return url.join('-')
}
