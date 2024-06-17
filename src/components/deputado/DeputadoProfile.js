import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendar, faGraduationCap, faPeopleGroup, faEnvelope, faUser } from "@fortawesome/free-solid-svg-icons";
import Image from "next/image";
import { formatDate } from "@/utils/common";

function DeputadoProfile({deputado}) {

  return <div className="flex flex-column">
    <div className="w-full flex flex-wrap p-2 mb-2 border rounded-md shadow-sm shadow-indigo-500/40">
      <Image src={deputado.urlFoto} className="mr-8" width={200} height={100} alt={`Deputado ${deputado.nome} foto de perfil`} />
      <div className="flex flex-col justify-around h-60">
        <div className="mb-4 t-primary">
          <h3 className="t1">{deputado.nomeEleitoral}</h3>
        </div>
        <p className="t5 mb-4 border-b"><FontAwesomeIcon icon={faUser} /> {deputado.nomeCivil}</p>
        <p className="t6 mb-4 border-b"><FontAwesomeIcon icon={faCalendar} /> {formatDate(deputado.dataNascimento)} -  {deputado.municipioNascimento} - {deputado.ufNascimento}</p>
        <p className="t6 mb-4 border-b"><FontAwesomeIcon icon={faGraduationCap} /> {deputado.escolaridade}</p>
        <p className="t6 mb-4 border-b"><FontAwesomeIcon icon={faPeopleGroup} /> {deputado.siglaPartido}</p>
        <p className="t6 mb-4 border-b"><FontAwesomeIcon icon={faEnvelope} />  {deputado.email}</p>
      </div>
    </div>
  </div>
}

export default DeputadoProfile;