import React, { use, useState } from "react";
import style from './panel-see-more.module.scss'

function PanelSeeMore({children, maxHeight=500, overflowEnabledDefault = false}) {
  const [overflowEnabled, setOverflowEnabled] = useState(overflowEnabledDefault);
  return <div className={style.panelSeeMore} style={{maxHeight: `${maxHeight}px`}}>
    <div style={{top: `${maxHeight}px`}} className={style.shadowContainer}></div>
    <button>Ver mais</button>
    <div>
      {children}
    </div>
  </div>
}

export default PanelSeeMore;