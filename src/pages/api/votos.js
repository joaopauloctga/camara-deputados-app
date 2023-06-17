export default async function handler(req, res) {
  const { query } = req;
  const resp = await fetch('https://dadosabertos.camara.leg.br/arquivos/votacoesVotos/json/votacoesVotos-2023.json');
  const {dados} = await resp.json();
  const deputado = dados.filter((voto) => voto.deputado_.id == query.deputado).slice(0,6);

  const allData = [];
  for (let i=0; i<deputado.length; i++) {
    const { dados: votacao } = await (await fetch(deputado[i].uriVotacao)).json();
    allData.push({
      ...deputado[i],
      ...votacao,
      ...votacao.ultimaApresentacaoProposicao,
    });
  }

  res.json(allData)
}