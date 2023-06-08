const redis = require('redis');
const querystring = require('querystring');
const cacheServer = require('../../infra/cache');

const CAMARA_DEPUTADOS_ENDPOINT = 'https://dadosabertos.camara.leg.br/api/v2/';

const isEndpointAvailable = (endpoint) => {
  const availables = [
    'deputados',
    'partidos'
  ];
  return availables.indexOf(endpoint) >= 0;
}

export default async function handler(req, res) {
  const { query } = req;

  if (!isEndpointAvailable(query.endpoint)) {
    res.status(404).end();
  }
  
  const url = buildUrl(query);
  const cacheKey = buildCacheKeyName(query);

  const cachedResponse = await cacheServer.getCache(cacheKey);
  if (cachedResponse) {
    res.json(JSON.parse(cachedResponse))
  }
  else {
    const resp = await callCamaraAPI(url);
    res.json(resp);
    cacheServer.setCache(cacheKey, resp);
  }
}

const callCamaraAPI = async (url) => {
  const resp = await fetch(url);
  const data = await resp.json();
  return data;
}

const buildUrl = (query) => {
  let url = CAMARA_DEPUTADOS_ENDPOINT;
  let endpoint = query.endpoint;
  const queryParams = {...query};
  delete queryParams['endpoint']
  let params = querystring.stringify(queryParams);
  if (params != '') {
    endpoint += '?'
  }
  return url + endpoint + params;
}

const buildCacheKeyName = (query) => {
  const context = query.endpoint;
  const params = query;
  delete params['endpoint']
  const keys = querystring.stringify(query);
  return `${context}-${keys}`
}
