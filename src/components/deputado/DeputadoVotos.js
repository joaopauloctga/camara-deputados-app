import React, { useEffect, useState } from "react";
import LoadingAPI from "../loading";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faThumbsUp, faThumbsDown, faCircleCheck, faBan } from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";

function Votacao({voto, ementa, status, votacaoId, proposicaoId, data}) {
  const icon = voto == 'Sim' ? faThumbsUp : faThumbsDown;
  const iconProp = status ? faCircleCheck : faBan
  return <div>
    <h3 className="t4">Voto:  <FontAwesomeIcon className={`${voto == 'Sim' ? 'success' : 'danger'}`} icon={icon} /> {voto}</h3>
    <h3 className="t4">Status: <FontAwesomeIcon className={`${status ? 'success' : 'danger'}`} icon={iconProp} /> {status ? 'Aprovada' : 'Reprovada'}</h3>
    <h4 style={{fontSize: '12px'}}>{data}</h4>
    <p className="my-4">{ementa ?? 'Ementa não encontrada'}</p>
    <Link className="btn-2 mr-3" href={`/votacao/${votacaoId}`}>Ver votação</Link>
    <Link className="btn-2 mr-3"  href={`/votacao/${votacaoId}`}>Ver proposição</Link>
  </div>
}

function DeputadoVotos({ id }) {
  const [votos, setVotos] = useState([]);

  useEffect(() => {
    if (id == undefined) {
      return;
    }

    fetch('http://localhost:3000/api/votos?deputado=' + id)
      .then(resp => resp.json())
      .then((dados) => {
        setVotos(dados);
      })
  }, [id]);

  if (votos.length ==0) {
    return <LoadingAPI />
  }
  return <>
    <div className="flex flex-wrap">
      {votos.map((v, index) => <div className="w-full lg:w-1/2 p-4" key={`voto-id-${index}`}>
          <Votacao 
            votacaoId={v.idVotacao} 
            proposicaoId={v.ultimaApresentacaoProposicao.uriProposicaoCitada} 
            voto={v.voto} 
            status={v.aprovacao} 
            ementa={v.descricao}
            data={v.dataHoraVoto}
          />
        </div>
      )}
    </div>
  </>
}

export default DeputadoVotos;