import React from "react";
import style from './panel.module.scss'

function Panel({children, right, title, icon}) {
  let direction = 'text-left';
  let bgColor = 'bg-color-1';
  let radiusTitle = 'rounded-tr-lg';
  let tColor = 'text-primary';
  let justifyTitle = 'justify-start';
  if (right !== undefined) {
    direction = 'text-right';
    bgColor = 'bg-color-2'
    radiusTitle = 'rounded-tl-lg';
    tColor = 'text-secondary';
    justifyTitle = 'justify-end';
  }
  return <>
    <div className="flex flex-wrap">
      <div className={` w-full`}>
        <div className={`flex ${justifyTitle}`}>
          <h3 className={`${direction} ${bgColor} ${tColor} rounded-t-lg t3 p-4`}> {icon} {title}</h3>
        </div>
      </div>
      <div className={`w-full ${bgColor} ${radiusTitle} rounded-b-lg `}>
        {children}
      </div>
    </div>
  </>
}

export default Panel;