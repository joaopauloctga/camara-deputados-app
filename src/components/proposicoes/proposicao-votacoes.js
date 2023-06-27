import React, { useEffect, useState } from "react";
import useCamaraAPI from "@/hooks/useCamaraAPI";
import LoadingAPI from "@/components/loading";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendar, faClock, faHouse, faThumbsUp, faBan } from "@fortawesome/free-solid-svg-icons";
import 'react-vertical-timeline-component/style.min.css';
import VotacaoDetail from "@/components/proposicoes/proposicao-votacao";

function ProposicaoVotacoes({id}) {
  const [votacao, setVotacao] = useState(null);
  const {isLoading, result} = useCamaraAPI({url: `proposicoes/${id}/votacoes`, config: {proxy: true}});

  useEffect(() => {
    if (!isLoading && votacao === null) {
      setVotacao(result[0])
    }
  }, [isLoading]);

  if (isLoading) {
    return <LoadingAPI />
  }
  else if (result.length === 0) {
    return <div className="text-center w-full h-40 flex justify-center items-center">
      <span className="t3 t-primary uppercase">Proposição ainda não votada</span>
    </div>
  }

  return <div className="flex flex-wrap px-4">
    <ul className="w-full hidden lg:flex flex-wrap">
      {result.map((vot) => {
        const statusVot = 
          vot.aprovacao === 1
          ? <h5><FontAwesomeIcon className="success" icon={faThumbsUp} /> Aprovada</h5>
          : <h5><FontAwesomeIcon className="danger" icon={faBan} /> Reprovada</h5>
        const active = vot.id === votacao?.id ? "bg-4-inverse" : ''
        return <li onClick={() => setVotacao(vot)} key={`votacao-id-${vot.id}`} className={`mr-2 bg-4 text-white p-1 cursor-pointer w-1/12 rounded-sm border border-color-1 mb-2 ${active}`}>
          <h5><FontAwesomeIcon icon={faCalendar} /> {vot.data}</h5>
          <h5><FontAwesomeIcon icon={faClock} /> {vot.dataHoraRegistro.slice(11, 22)}</h5>
          <h5><FontAwesomeIcon icon={faHouse} /> {vot.siglaOrgao}</h5>
          {statusVot}
        </li>
      })}
    </ul>
    <select className="w-full lg:hidden" onChange={(e) => setVotacao(result[e.target.value])}>
      {result.map((vot, index) => 
        <option key={`votacao-id-${vot.id}`} value={index} className="p-1 cursor-pointer rounded-sm text-sm t-primary border border-color-1 mb-2">
          {vot.aprovacao === 1 ? 'Aprovada' : 'Reprovada'} - {vot.data} - {vot.dataHoraRegistro.slice(11, 22)}
        </option>
      )}
    </select>
    <div className="w-full">
      {votacao !== null && <VotacaoDetail votacao={votacao} />}
    </div>
  </div>
}

export default ProposicaoVotacoes;