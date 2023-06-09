import React from "react";

function InfoCardTime({time, title, description, active}) {
  return <div className={`${active ? 'bg-4-inverse' : 'bg-4'} p-2 rounded-md`}>
    <h4 className="t3 mb-1 w-full">{time} <span>{title}</span></h4>
    <p className="text-xs">{description}</p>
  </div>
}

export default InfoCardTime