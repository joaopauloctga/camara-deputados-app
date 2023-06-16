import React from "react";
import style from './loading.module.scss';

function LoadingAPI() {
  return (
    <div className={style.loading}>
      <div className={style.spinner}></div>
    </div>
  );
};

export default LoadingAPI;
