import React from "react";

function InfoCardRounded({ title, value, color }) {
  return (
    <div className="flex flex-col items-center">
      <div className="mb-4">
        <p className="font-sm">{title}</p>
      </div>
      <div className={`w-8 h-8 rounded-full ml-2 ${color} t-circle`}>
        <p className="text-white flex items-center justify-center h-full t2">{value}</p>
      </div>
    </div>
  );
}

export default InfoCardRounded;