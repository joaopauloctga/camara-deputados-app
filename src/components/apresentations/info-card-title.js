import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function InfoCardTitle({title, icon, active, onClick}) {
  return (
    <div className={`flex items-center justify-center ${active ? 't-primary' : 'text-white'}`}>
      <div className="t-icon mr-4 cursor-pointer" onClick={onClick}>
        <FontAwesomeIcon icon={icon} />
      </div>
      <h3 className="t3">{title}</h3>
    </div>
  )
}

export default InfoCardTitle;