import React, { useEffect, useState } from "react";
import LoadingAPI from "../loading";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendar, faBuildingUser, faAt, faGraduationCap, faPeopleGroup, faChartPie, faBookOpen, faHandPointer } from "@fortawesome/free-solid-svg-icons";
import ProfilePhoto from "./ProfilePhoto";
import useCamaraAPI from "@/hooks/useCamaraAPI";

function DeputadoProfile({id}) {
  const [deputado, setDeputado] = useState(null);
  const {isLoading, result} = useCamaraAPI({
    url: `deputados/${id}`
  })

  useEffect(() => {
    if (!isLoading) {
      setDeputado({...result, ...result.ultimoStatus})
    }    
  }, [isLoading]);


  if (isLoading || deputado == null) {
    return <LoadingAPI />
  }

  return <div className="flex flex-wrap m-4">
    <div className="w-full lg:w-1/2">
      <ProfilePhoto foto={deputado.urlFoto} alt={`Deputado ${deputado.nome} foto de perfil`} />
      <ul className="flex t-primary justify-around p-1 border mt-4 border-color-1 rounded-sm">
        <li className="mr-4"><a href="#depesas"><FontAwesomeIcon icon={faChartPie} /> Despesas</a></li>
        <li className="mr-4"><a href="#atividade"><FontAwesomeIcon icon={faBookOpen} /> Atividade</a></li>
        <li className="mr-4"><a href="#curriculo"><FontAwesomeIcon icon={faGraduationCap} /> Cúrriculo</a></li>
        <li className="mr-4"><a href="#eventos"><FontAwesomeIcon icon={faCalendar} /> Eventos</a></li>
        <li className="mr-4"><a href="#votos"><FontAwesomeIcon icon={faHandPointer} /> Votos</a></li>
      </ul>
    </div>
    <div className="w-full lg:w-1/2 uppercase t-primary">
      <div className="my-1">
        <h3 className="t2">{deputado.nomeEleitoral}</h3>
        <p className="t5"> {deputado.nomeCivil}</p>
      </div>
      <div className="flex flex-col justify-around h-60">
        <p className="t4"><FontAwesomeIcon icon={faCalendar} /> {deputado.dataNascimento}</p>
        <p className="t4"><FontAwesomeIcon icon={faBuildingUser} /> {deputado.municipioNascimento} - {deputado.ufNascimento}</p>
        <p className="t4"><FontAwesomeIcon icon={faGraduationCap} /> {deputado.escolaridade}</p>
        <p className="t4"><FontAwesomeIcon icon={faPeopleGroup} /> {deputado.siglaPartido}</p>
        <p className="t4"><FontAwesomeIcon icon={faAt} />  {deputado.email}</p>
      </div>
    </div>
  </div>
}

export default DeputadoProfile;