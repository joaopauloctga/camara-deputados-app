import React from "react";

import { faSackDollar, faSitemap } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function  mapOrgaoIcon(sigla) {
  const map = {
    'CFT': faSackDollar,
  };
  return map[sigla] == undefined ? faSitemap : map[sigla]
}

function Orgao({sigla, apelido, nome, nomeResumido, tipoOrgao, active}) {
  return <div className="inline-block">
    <div className={`flex p-4 flex-wrap rounded-sm items-center p-1 ${active ? 'bg-4-inverse border border-color-1' : 'bg-4'}`}>
      <div className="text-center mr-2">
        <FontAwesomeIcon style={{fontSize:'100px'}} icon={mapOrgaoIcon(sigla)} />
      </div>
      <div className="">
        <p className="t4">{apelido}</p>
        <p className="t3">{sigla} - {nomeResumido}</p>
        <p className="t5">{tipoOrgao}</p>
      </div>
    </div>
  </div>
}

export default Orgao;