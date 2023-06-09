import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function InfoCardTitle({title, icon}) {
  return (
    <div className="flex items-center justify-center text-white">
      <div className="t-icon mr-4">
        <FontAwesomeIcon icon={icon} />
      </div>
      <h3 className="t3">{title}</h3>
    </div>
  )
}

export default InfoCardTitle;