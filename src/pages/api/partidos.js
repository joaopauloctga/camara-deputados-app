const baseUri = `https://dadosabertos.camara.leg.br/api/v2`;
const cacheServer = require('../../infra/cache');

export default async function handler(req, res) {
  const { query } = req;
  const idLegislatura = query.idLegislatura || 57;
  const cacheKey = `partidos-${idLegislatura}`;
  const cachedData = await cacheServer.getCache(cacheKey);
  if (cachedData) {
    res.json(JSON.parse(cachedData));
    return;
  }

  const resp = await fetch(`${baseUri}/partidos?idLegislatura=${idLegislatura}&itens=50`);
  const {dados} = await resp.json();

  const allData = [];
  for (let i=0; i<dados.length; i++) {
    const partido = dados[i];
    let details = await (await fetch(partido.uri)).json();
    details = details.dados;

    const lideres = await (await fetch(`${baseUri}/partidos/${partido.id}/lideres`)).json();

    const parlamentares = await (await fetch(`${baseUri}/partidos/${partido.id}/membros`)).json();

    allData.push({
      ...partido,
      ...details,
      lideres: lideres.dados,
      parlamentares: parlamentares.dados,
    });
  }
  cacheServer.setCache(cacheKey, allData)
  res.json(allData);
}