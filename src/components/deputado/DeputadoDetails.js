import React from "react";
import Image from "next/image";

const DeputadoDetails = ({ nome, siglaPartido, siglaUf, email, urlFoto }) => {
  return (
    <div className="w-full md:w-1/2 lg:w-1/4 p-4">
      <div className="bg-white rounded-lg shadow-lg">
        <Image src={urlFoto} alt={nome} className="w-full object-cover rounded-t-lg" width={100} height={100} />
        <div className="p-4">
          <h2 className="text-xl font-bold mb-2">{nome} - {siglaPartido}</h2>
          <p className="text-gray-600">Sigla UF: {siglaUf}</p>
          <p className="text-gray-600">Email: {email}</p>
        </div>
      </div>
    </div>
  );
};

export default DeputadoDetails;