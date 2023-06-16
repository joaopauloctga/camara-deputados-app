import React from "react";
import style from './panel.module.scss'

function Panel({children, right, title, icon, id}) {
  let direction = 'text-left';
  let bgColor = 'bg-3';
  let radiusTitle = 'rounded-tr-lg';
  let tColor = 't-primary';
  let justifyTitle = 'justify-start';
  let border = '';
  if (right !== undefined) {
    direction = 'text-right';
    bgColor = 'bg-white'
    radiusTitle = 'rounded-tl-lg';
    tColor = 't-primary';
    justifyTitle = 'justify-end';
    border = 'border border-color-1'
  }
  return <>
    <div className="flex flex-wrap" id={id}>
      <div className={`w-full`}>
        <div className={`flex ${justifyTitle}`}>
          <h3 style={{borderBottom: 0}} className={`${direction} ${bgColor} ${tColor} ${border} rounded-t-lg t3 px-4 py-2`}> {icon} {title}</h3>
        </div>
      </div>
      <div className={`w-full ${bgColor} ${radiusTitle} ${border} rounded-b-lg`}>
        <div className="mt-4">
          {children}
        </div>
      </div>
    </div>
  </>
}

export default Panel;