import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleChevronRight, faCircleChevronLeft } from "@fortawesome/free-solid-svg-icons";

function CamaraAPIPagination({nextLink, previousLink, handle}) {
  return <div className="flex flex-wrap justify-center items-center">
    {previousLink && 
      <button onClick={() => handle(previousLink)} className="btn-1 mr-1">
        <FontAwesomeIcon icon={faCircleChevronLeft} /> Anterior</button>}
    {nextLink && 
      <button onClick={() => handle(nextLink)} className="btn-1">
        Próximo <FontAwesomeIcon icon={faCircleChevronRight} /></button>}
  </div>
}

export default CamaraAPIPagination;