import React from "react";
import style from './panel.module.scss'

function Panel({children, right, title, icon}) {
  let direction = 'text-left';
  let bgColor = 'bg-3';
  let radiusTitle = 'rounded-tr-lg';
  let tColor = 't-primary';
  let justifyTitle = 'justify-start';
  if (right !== undefined) {
    direction = 'text-right';
    bgColor = 'bg-2'
    radiusTitle = 'rounded-tl-lg';
    tColor = 't-white';
    justifyTitle = 'justify-end';
  }
  return <>
    <div className="flex flex-wrap">
      <div className={`w-full`}>
        <div className={`flex ${justifyTitle}`}>
          <h3 className={`${direction} ${bgColor} ${tColor} rounded-t-lg t3 px-4 py-2`}> {icon} {title}</h3>
        </div>
      </div>
      <div className={`w-full ${bgColor} ${radiusTitle} rounded-b-lg`}>
        <div className="mt-4">
          {children}
        </div>
      </div>
    </div>
  </>
}

export default Panel;