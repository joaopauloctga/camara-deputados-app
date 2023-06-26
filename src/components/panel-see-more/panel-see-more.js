import React, { use, useState } from "react";
import style from './panel-see-more.module.scss'

function PanelSeeMore({children, maxHeight=500, full = false, theme = 'default'}) {
  const [showAll, setShowAll] = useState(false)
  const height = maxHeight / 2;
  return <div style={{maxHeight: `${maxHeight}px`}} className={`${style.panelSeeMore} ${showAll ? style.showAll : ''}`}>
    <div  style={{maxHeight: `${showAll ? maxHeight + 30 : maxHeight}px`}} className={`${showAll ? style.showAll : ''}`}>
      {children}
    </div>
    {!showAll && <>
        <div style={{height: `${height}px`}} className={`${style.shadowContainer} ${full ? style.full : ''}  ${style[theme]}`}></div>
        <button onClick={() => setShowAll(true)}>Ver mais</button>
      </>
    }
  </div>
}

export default PanelSeeMore;