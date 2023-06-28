import React, { useEffect, useState } from "react";
import useCamaraAPI from "@/hooks/useCamaraAPI";
import LoadingAPI from "@/components/loading"
import ProfilePhoto from "@/components/deputado/ProfilePhoto";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faThumbsUp, faBan } from "@fortawesome/free-solid-svg-icons";
import CamaraDoughnut from "@/components/charts/camara-doughnut";
import 'react-vertical-timeline-component/style.min.css';
import { reduceToObject } from "@/utils/common";
import PanelSeeMore from "@/components/panel-see-more/panel-see-more";

function ProposicaoVotos({votacao, id}) {
  const [votesYes, setVotesYes] = useState([]);
  const [votesNo, setVotesNo] = useState([]);

  const {isLoading, result} = useCamaraAPI({
    url: `votacoes/${votacao.id}/votos`,
    subRequest: true,
    config: {
      proxy: true,
      subReqProxy: true,
    }
  });

  const orientacoes = useCamaraAPI({
    url: `votacoes/${votacao.id}/orientacoes`,
    config: {proxy: true}
  })

  useEffect(() => {
    if (!isLoading) {
      const yes = [];
      const no = [];
      result.forEach((vot) => {
        if (vot.tipoVoto === "Sim") {
          yes.push({...vot, ...vot.deputado_})
        }
        else {
          no.push({...vot, ...vot.deputado_})
        }
      })
      setVotesNo(no)
      setVotesYes(yes)
    }
  }, [isLoading]);

  if (isLoading) {
    return <LoadingAPI />
  }

  const groupVotesBySexo = (data) => {
    const group = {
      'Homens a favor': 0,
      'Mulheres a favor': 0,
      'Homens contra': 0,
      'Mulheres contra': 0,
    };
    data.forEach((vot) => {
      let key = `${vot.sexo === 'F' ? 'Mulheres' : 'Homens'}`;
      key += ` ${vot.tipoVoto === 'Não' ? 'contra' : 'a favor'}`;
      group[key]++;
    });
    return group;
  }

  if (!isLoading && result.length === 0) {
    return <h3 className="text-center t3 t-primary my-8">Votos não computados</h3>
  }

  return <div className="flex flex-col">
    {/** display votes of the proposicao */}
    <div className="flex flex-wrap">
      <div className="w-full lg:w-1/2">
        <h3 className="t4 t-primary text-center mb-2"><FontAwesomeIcon className="success" icon={faThumbsUp} /> Votaram a favor {!isLoading && `(${votesYes.length})`}</h3>
        <PanelSeeMore maxHeight={350} theme="green">
          <ul className="flex flex-wrap">
            {votesYes.map(d => <li key={d.id} className="w-1/3">
              <ProfilePhoto name={d.nome} size="xs" foto={d.urlFoto} /></li>)}
          </ul>
        </PanelSeeMore>
      </div>
      <div className="w-full lg:w-1/2">
        {votesYes.length > 0 && 
          <CamaraDoughnut 
            title="A favor por partido"
            legendPosition="left"
            width={'80%'} 
            height={'400px'} 
            labels={Object.keys(reduceToObject(votesYes, 'siglaPartido'))} 
            values={Object.values(reduceToObject(votesYes, 'siglaPartido'))} 
            />
        }
      </div>
    </div>
    <hr className="m-4" />

    {/** display votes against the proposicao */}
    <div className="flex flex-wrap">
      <div className="w-full lg:w-1/2">
        {votesNo.length > 0 &&
          <CamaraDoughnut 
            title="Votos contra por partido"
            width={'80%'} 
            height={'400px'} 
            labels={Object.keys(reduceToObject(votesNo, 'siglaPartido'))} 
            values={Object.values(reduceToObject(votesNo, 'siglaPartido'))} 
            />
        }
      </div>
      <div className="w-full lg:w-1/2">
        <h3 className="t4 t-primary text-center mb-2"><FontAwesomeIcon className="danger" icon={faBan} /> Votaram contra {!isLoading && `(${votesNo.length})`}</h3>
        <PanelSeeMore maxHeight={350} theme="green">
          <ul className="flex flex-wrap">
            {votesNo.map(d => <li key={d.id} className="w-1/3">
              <ProfilePhoto name={d.nome}  size="xs" foto={d.urlFoto} /></li>)}
          </ul>
        </PanelSeeMore>
      </div>
    </div>
    <hr className="m-4" />

    {/** display charts of votes data */}
    <div className="flex flex-wrap p-4">
      <div className="w-full lg:w-1/3">
        <CamaraDoughnut 
          title="Proporção Sexo"
          width={'80%'} 
          height={'200px'} 
          labels={Object.keys(reduceToObject(result, 'sexo'))} 
          values={Object.values(reduceToObject(result, 'sexo'))} 
          />
      </div>
      <div className="w-full lg:w-1/3">
        {votesNo.length > 0 &&
          <CamaraDoughnut 
            title="Votos por sexo"
            width={'100%'} 
            height={'200px'} 
            labels={Object.keys(groupVotesBySexo(result))} 
            values={Object.values(groupVotesBySexo(result))} 
            />
        }
      </div>
      <div className="w-full lg:w-1/3">
        {orientacoes.isLoading
          ? <LoadingAPI />
          : <CamaraDoughnut 
              title="Orientacao dos Partidos"
              width={'80%'} 
              height={'200px'}
              labels={['A favor', 'Contra']} 
              values={Object.values(reduceToObject(orientacoes.result, 'orientacaoVoto'))} 
              />
        }
      </div>
    </div>
  </div>
}

export default ProposicaoVotos;