import React, { use, useEffect, useState } from "react";
import InfoCardTitle from "@/components/apresentations/info-card-title";
import InfoCarList from "@/components/apresentations/info-card-list";
import { faSitemap, faFlag} from "@fortawesome/free-solid-svg-icons";
import useCamaraAPI from "@/hooks/useCamaraAPI";
import LoadingAPI from "@/components/loading/index"
import PanelSeeMore from "../panel-see-more/panel-see-more";

function DeputadoFrentes({id}) {
  const [search, updateSearch] = useState('');
  const [frentes, setFrentes] = useState([]);
  const {isLoading, result} = useCamaraAPI({
    url: `deputados/${id}/frentes`
  })

  useEffect(() => {
    let data = result;
    data = data.filter(frente => search == '' || frente.titulo.includes(search))
    setFrentes(data)
  }, [isLoading,, search]);

  if (isLoading) {
    return <LoadingAPI />
  }

  return <>
    <div className="flex flex-column flex-wrap justify-center">
      {search}
      <input className="flex-auto w-full lg:w-2/3 form-input mx-8 rounded-md" onChange={(e) => updateSearch(e.currentTarget.value)} placeholder="Pequisar por frente" />
      <div className="rounded-lg bg-white grid grid-gap-4 grid-cols-1 lg:grid-cols-2">
        {frentes.map(frente => {
          return <div key={`frente-id-${frente.id}`} className="p-2">
            <InfoCarList 
              text={frente.titulo} />
          </div>
        })}
      </div>
    </div>    
  </>
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
  
  return <div className="rounded-lg bg-white grid grid-gap-4 grid-cols-1 lg:grid-cols-2 auto-rows-auto">
    {orgaos.map((orgao, index) => {
      return <div key={`orgao-${index}-${orgao.idOrgao}`} className="p-2">
        <InfoCarList 
          text={orgao.nomeOrgao}
          smTitle={`${orgao.titulo}`}
          subText={`${orgao.titulo}`} />
      </div>
    })}
  </div>
}

function DeputadoActivity({id}) {
  return <div className="flex flex-wrap">
    <div className="w-full lg:w-1/2">
      <InfoCardTitle active={true} title={'Orgãos Atuantes'} icon={faSitemap} />
      <DeputadoOrgaos id={id} />
    </div>
    <div className="w-full lg:w-1/2">
      <InfoCardTitle active={true} title={'Frentes'} icon={faFlag} />
      <PanelSeeMore maxHeight={300}>
        <DeputadoFrentes id={id} />
      </PanelSeeMore>
    </div>
  </div>
}

export default DeputadoActivity;