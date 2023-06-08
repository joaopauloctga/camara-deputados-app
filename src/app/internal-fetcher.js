const CAMARA_ENDPOINT = 'https://dadosabertos.camara.leg.br/api/v2';

const camaraFetcher = (uri, config) => {
  if (isURLToCamaraEndpoint(uri)) {
    uri = uri.replace(CAMARA_ENDPOINT, '')
  }
  return fetch(`${process.env.NEXT_PUBLIC_API_DOMAIN}${uri}`, config)
    .then((resp) => resp.json())
}

const isURLToCamaraEndpoint = (url) => {
  return url.indexOf(CAMARA_ENDPOINT) >= 0
}

export default camaraFetcher;
