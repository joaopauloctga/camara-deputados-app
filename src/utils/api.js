export const getCamaraData = async (path) => {
  const basePath = 'https://dadosabertos.camara.leg.br/api/v2';
  const resp = await fetch(`${basePath}/${path}`);
  const data = await resp.json();
  return data.dados;
}