import React, { useEffect, useState } from "react";
import InfoCardTitle from "@/components/apresentations/info-card-title";
import InfoCarList from "@/components/apresentations/info-card-list";
import { faSitemap, faFlag, faBuilding} from "@fortawesome/free-solid-svg-icons";
import useCamaraAPI from "@/hooks/useCamaraAPI";
import LoadingAPI from "@/components/loading/index"

function DeputadoFrentes({id}) {
  const {isLoading, result} = useCamaraAPI({
    url: `https://dadosabertos.camara.leg.br/api/v2/deputados/${id}/frentes`
  })
  if (isLoading) {
    return <LoadingAPI />
  }
  return <div className="rounded-lg bg-white m-6 grid grid-gap-4 grid-cols-2 grid-rows-2">
    {result.map(frente => {
      return <div className="p-4">
        <InfoCarList 
          text={frente.titulo} />
      </div>
    })}
  </div>
}

function DeputadoOrgaos({id}) {
  if (id == undefined) {
    return <LoadingAPI />
  }
  const [orgaos, setOrgaos] = useState([]);

  useEffect(() => {
    fetch(`https://dadosabertos.camara.leg.br/api/v2/deputados/${id}/orgaos`)
      .then(resp => resp.json())
      .then(({dados}) => setOrgaos(dados));
  }, [])

  if (orgaos.length == 0) {
    return <LoadingAPI />
  }
  
  return <div className="rounded-lg bg-white m-6 grid grid-gap-4 grid-cols-2 grid-rows-2">
    {orgaos.map((orgao) => {
      return <div className="p-4">
        <InfoCarList 
          text={orgao.nomeOrgao}
          smTitle={`${orgao.titulo}`}
          subText={`${orgao.titulo}`} />
      </div>
    })}
  </div>
}

function DeputadoOcupacoes({id}) {
  const [ocupacoes, setOcupacoes] = useState([]);
  
  useEffect(() => {
    fetch(`https://dadosabertos.camara.leg.br/api/v2/deputados/${id}/ocupacoes`)
      .then(resp => resp.json())
      .then(({dados}) => setOcupacoes(dados.filter(o => o.titulo != null)));
  }, [id]);

  if (ocupacoes.length == 0) {
    return <div className="text-center m-8"><h3 className="bg-white p-4 rounded-md t3">Deputado não Ocupações registradas</h3></div>
  }

  return <div className="rounded-lg bg-white m-6 grid grid-gap-4 grid-cols-2 grid-rows-2">
    {ocupacoes.map((ocupacao) => {
      return <div className="p-4">
        <InfoCarList 
          text={ocupacao.titulo}
          smTitle={`${ocupacao.entidade} - ${ocupacao.entidadeUF}`}
          subText={`${ocupacao.anoInicio}`} />
      </div>
    })}
  </div>
}

function DeputadoActivity({id}) {
  const [activityDisplayId, setActivityDisplayId] = useState(1);
  return <>
    <div className="flex flex-wrap justify-center items-center p-2">
      <div className="w-1/3">
        <InfoCardTitle active={activityDisplayId == 1} onClick={() => setActivityDisplayId(1)} title={'Orgãos Atuantes'} icon={faSitemap} />
      </div>
      <div className="w-1/3">
        <InfoCardTitle active={activityDisplayId == 2}  onClick={() => setActivityDisplayId(2)} title={'Ocupações'} icon={faBuilding} />
      </div>
      <div className="w-1/3">
        <InfoCardTitle active={activityDisplayId == 3}  onClick={() => setActivityDisplayId(3)} title={'Frentes'} icon={faFlag} />
      </div>
    </div>

    {activityDisplayId == 1 && <DeputadoOrgaos id={id} />}

    {activityDisplayId == 2 && <DeputadoOcupacoes id={id} />}

    {activityDisplayId == 3 && <DeputadoFrentes id={id} />}
  </>
}

export default DeputadoActivity;