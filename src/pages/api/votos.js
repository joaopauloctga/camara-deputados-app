import { fetchDataAndStore } from "@/utils/cached-io-api";

export default async function handler(req, res) {
  const { query } = req;
  const {deputado, ano, proposicao, limit} = query;

  const filterAno = ano || new Date().getFullYear();

  const data = await fetchDataAndStore(
    `https://dadosabertos.camara.leg.br/arquivos/votacoesVotos/json/votacoesVotos-${filterAno}.json`,
    `${filterAno}/votos.json`,
    24
  );
  let deputadoVotos = data.filter((voto) => voto.deputado_.id == deputado);

  let proposicoesVotadas = await fetchDataAndStore(
    `https://dadosabertos.camara.leg.br/arquivos/votacoesProposicoes/json/votacoesProposicoes-${filterAno}.json`,
    `${filterAno}/proposicao-votadas.json`,
    24
  );

  let votacaoData = await fetchDataAndStore(
    `https://dadosabertos.camara.leg.br/arquivos/votacoes/json/votacoes-${filterAno}.json`,
    `${filterAno}/votacoes.json`,
    24
  );

  const deputadoVotosProposicao = [];
  deputadoVotos.forEach((dv) => {
    // Get information about the proposicao voted.
    const proposicaoVotada = proposicoesVotadas.find(pv => pv.idVotacao === dv.idVotacao);

    // Get information about the entire votacao.
    const votacao = votacaoData.find(vot => vot.id === dv.idVotacao);
    if (!votacao) {
      return;
    }

    deputadoVotosProposicao.push({
      proposicao: proposicaoVotada.proposicao_,
      voto: dv.voto,
      timestamp: new Date(dv.dataHoraVoto).getTime(),
      data: dv.dataHoraVoto,
      votacao: {
        id: votacao.id,
        sim: votacao.votosSim,
        nao: votacao.votosNao,
        outros: votacao.votosOutros,
        descricaoResult: votacao.descricao,
        aprovacao: votacao.votosSim > votacao.votosNao,
        descricao: votacao.descricao,
      }
    });
  });

  const allData = deputadoVotosProposicao.reduce((acc, item) => {
    const index = acc.findIndex(p => p.proposicao.id == item.proposicao.id);
    if (index === -1) {
      acc.push(item)
      return acc;
    }
    
    if (acc[index].timestamp < item.timestamp) {
      acc.splice(index, 1);
      acc.push(item)
    }
    return acc;
  }, []);

  const dataLimited = allData.slice(0, limit || allData.length);

  res.json({
    size: dataLimited.length,
    data: dataLimited,
  });
}