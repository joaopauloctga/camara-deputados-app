import React from "react";
import LoadingAPI from "../loading";

function InfoCardRounded({ title, value, color, isLoading }) {
  return (
    <div className="flex flex-col items-center">
      <div className="mb-4">
        <p className="font-sm">{title}</p>
      </div>
      <div className={`w-8 h-8 rounded-full ml-2 ${color} t-circle`}>
        <div className="text-white flex items-center justify-center h-full t2">
          {isLoading ? <LoadingAPI /> : value}
        </div>
      </div>
    </div>
  );
}

export default InfoCardRounded;