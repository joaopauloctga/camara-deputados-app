import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFileLines, faCalendar, faSearch } from "@fortawesome/free-solid-svg-icons";

const getDate = (datestring) => {
  const date = new Date(datestring);
  const options = { day: '2-digit', month: 'short', year: 'numeric' };
  return date.toLocaleDateString('pt-BR', options);
}

function PropositionItem({siglaTipo, id, codTipo, dataApresentacao, numero, statusProposicao, ementa}) {

  return <div className="flex flex-wrap mb-4 rounded-md py-1 border border-color-1">
    <div className="hidden lg:block lg:w-1/12 text-center border-r p-2">
      <FontAwesomeIcon style={{height: '80px'}} className="t-primary" icon={faFileLines} />
      <h4 className="text-sm">{siglaTipo}</h4>
    </div>
    <div className="w-full lg:w-11/12 flex flex-col justify-between p-2">
      <div className="w-full flex flex-col flex-wrap">
        <div className="text-sm t-primary">
          <FontAwesomeIcon icon={faCalendar} /> Data de apresentação: {getDate(dataApresentacao)}
          <span> - </span>
          <span> Nº {numero} </span>
          <span> - </span>
        </div>
        <p>{ementa}</p>
      </div>
      <p className="text-xs t-primary">Último status: {statusProposicao?.sequencia}º fase, {statusProposicao?.despacho} para o orgão {statusProposicao.siglaOrgao} {`->`} {statusProposicao.descricaoTramitacao}</p>
    </div>
  </div>
}
export default PropositionItem;