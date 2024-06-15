import React from "react";
import Image from "next/image";
import Link from "next/link";

const DeputadoDetails = ({ id, nome, siglaPartido, siglaUf, email, urlFoto }) => {
  return (  
    <div className="bg-white rounded-lg shadow-lg flex p-4">
      <Link href={`/deputados/${id}`}>
        <Image priority={false} src={urlFoto} alt={nome} className="w-full object-cover rounded-t-lg" width={100} height={100} />
      </Link>
      <div className="p-4 w-full">
        <h2 className="text-xl font-bold mb-1">
          <Link href={`/deputados/${id}`}>
            {nome}
          </Link>
        </h2>
        <p className="text-sm text-gray-600">{siglaPartido} - {siglaUf}</p>
      </div>
    </div>
  );
};

export default DeputadoDetails;