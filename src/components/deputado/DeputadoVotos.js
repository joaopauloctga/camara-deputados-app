import React, { useEffect, useState } from "react";
import LoadingAPI from "../loading";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faThumbsUp, faThumbsDown, faCircleCheck, faBan } from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";
import GoToLink from "../goto-link";

function Votacao({voto, ementa, status, votacaoId, proposicaoId, data, descricao}) {
  const icon = voto == 'Sim' ? faThumbsUp : faThumbsDown;
  const iconProp = status ? faCircleCheck : faBan
  return <div>
    <h3 className="t4">Voto:  <FontAwesomeIcon className={`${voto == 'Sim' ? 'success' : 'danger'}`} icon={icon} /> {voto}</h3>
    <p className="my-2 t-primary"><strong>Ementa:</strong> {ementa ?? 'não encontrada'}</p>
    <h3 className="t4">Status: <FontAwesomeIcon className={`${status ? 'success' : 'danger'}`} icon={iconProp} /> {status ? 'Aprovada' : 'Reprovada'}</h3>
    <p className="text-sm">{descricao}</p>
    <h4 style={{fontSize: '12px'}}>Data: {data}</h4>
    <Link className="btn-2 mr-3" href={`/votacao/${votacaoId}`}>Ver votação</Link>
    <Link className="btn-2 mr-3"  href={`/proposicoes/${proposicaoId}`}>Ver proposição</Link>
  </div>
}

function DeputadoVotos({ id }) {
  const [votos, setVotos] = useState([]);

  useEffect(() => {
    if (id == undefined) {
      return;
    }

    fetch(`http://localhost:3000/api/votos?deputado=${id}&limit=4`)
      .then(resp => resp.json())
      .then((dados) => {
        setVotos(dados.data);
      });

  }, [id]);

  if (votos.length ==0) {
    return <LoadingAPI />
  }
  return <>
    <div className="flex flex-wrap py-4">
      {votos.map((v, index) => <div className="w-full lg:w-1/2 p-4" key={`voto-id-${index}`}>
          <Votacao 
            votacaoId={v.votacao.id} 
            proposicaoId={v.proposicao.id} 
            voto={v.voto} 
            status={v.votacao.aprovacao} 
            ementa={v.proposicao.ementa}
            descricao={v.votacao.descricao}
            data={v.data}
          />
        </div>
      )}
      <div className="w-full text-center">
        <GoToLink label={'Ver todos os votos'} link={`/deputados/${id}/votos`} />
      </div>
    </div>
  </>
}

export default DeputadoVotos;