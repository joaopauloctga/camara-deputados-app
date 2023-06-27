import React, { useEffect, useState } from "react";
import { fetchAPI } from "@/hooks/useCamaraAPI";
import LoadingAPI from "@/components/loading";
import 'react-vertical-timeline-component/style.min.css';
import ProposicaoVotos from "@/components/proposicoes/proposicao-votos";

function VotacaoDetail({votacao, id}) {
  const [isLoading, setIsLoading] = useState(true);
  const [detail, setDetail] = useState(null);
  useEffect(() => {
    fetchAPI(votacao?.uri !== undefined ? votacao?.uri : `votacao/${id}`)
      .then(({data}) => {
        setIsLoading(false)
        setDetail(data);
      });
  }, [votacao, id]);

  if (isLoading) {
    return <LoadingAPI />
  }

  return <div className="py-2">
    <h3 className="t4 t-primary">Resumo</h3>
    <p className="p-2 bg-white rounded-sm border border-color-1 mb-2">{detail.descricao}</p>
    <h3 className="t6 t-primary">Último status: {detail.siglaOrgao} - {detail.ultimaApresentacaoProposicao.dataHoraRegistro}</h3>
    <p className="p-2 bg-white rounded-sm border border-color-1">
      {detail.descUltimaAberturaVotacao} {detail.ultimaApresentacaoProposicao.descricao}
    </p>
    <hr className="m-4" />
    {detail.siglaOrgao === 'CCJC' && <ProposicaoVotos votacao={votacao} />}
  </div>
}

export default VotacaoDetail