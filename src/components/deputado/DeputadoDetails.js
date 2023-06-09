import React from "react";
import Image from "next/image";
import Link from "next/link";

const DeputadoDetails = ({ id, nome, siglaPartido, siglaUf, email, urlFoto }) => {
  return (
    <div className="w-full md:w-1/2 lg:w-1/4 p-4">
      <div className="bg-white rounded-lg shadow-lg">
        <Image priority={false} src={urlFoto} alt={nome} className="w-full object-cover rounded-t-lg" width={100} height={100} />
        <div className="p-4">
          <Link href={`/deputados/${id}`}><h2 className="text-xl font-bold mb-2">{nome} - {siglaPartido}</h2></Link>
          <p className="text-sm text-gray-600">Sigla UF: {siglaUf}</p>
        </div>
      </div>
    </div>
  );
};

export default DeputadoDetails;