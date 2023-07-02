import React, { useEffect, useRef, useState } from "react";
import style from './panel-see-more.module.scss'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAnglesDown } from "@fortawesome/free-solid-svg-icons";

function PanelSeeMore({children, maxHeight=500, full = false, theme = 'white', finished}) {
  const [showAll, setShowAll] = useState(false)
  const height = maxHeight / 2;
  const childrenRef = useRef(null)

  // @todo see how to do this without timeout.
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (childrenRef.current) {
        const {offsetHeight} = childrenRef.current;
        if (offsetHeight < maxHeight) {
          setShowAll(true)
        }
      }
    }, 100);

    return () => {
      clearTimeout(timeoutId);
    };
  }, []);
  
  return <div style={{maxHeight: `${maxHeight}px`}} className={`${style.panelSeeMore} ${showAll ? style.showAll : ''}`}>
    <div style={{maxHeight: `${showAll ? maxHeight + 30 : maxHeight}px`}} className={`${showAll ? style.showAll : ''}`}>
      <div ref={childrenRef}>{children}</div>
    </div>
    {!showAll && <>
        <div style={{height: `${height}px`}} className={`${style.shadowContainer} ${full ? style.full : ''}  ${style[theme]}`}></div>
        <button onClick={() => setShowAll(true)}>Exibir mais <FontAwesomeIcon icon={faAnglesDown} /></button>
      </>
    }
  </div>
}

export default PanelSeeMore;