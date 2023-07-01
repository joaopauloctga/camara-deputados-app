import React from "react";

function InfoCardTime({time, title, description, active, onClick}) {
  return <div onClick={onClick} className={`${active ? 'bg-4-inverse rounded-sm border border-color-1' : 'bg-4'} p-2 rounded-sm ${onClick !== undefined ? 'cursor-pointer' : ''}`}>
    <h4 className="t3 mb-1 w-full">{time} <span>{title}</span></h4>
    <p className="text-xs">{description}</p>
  </div>
}

export default InfoCardTime