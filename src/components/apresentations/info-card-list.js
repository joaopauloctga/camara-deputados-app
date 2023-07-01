import React from "react";

function InfoCarList({smTitle, text, subText}) {
  return (
    <div className="border-l-4 border-color-1 p-2">
      <p className="underline decoration-solid text-xs">{smTitle}</p>
      <p>{text}</p>
      <p className="underline decoration-solid text-xs">{subText}</p>
    </div>
  );
}

export default InfoCarList;