import React from "react";
import Image from "next/image";
import Link from "next/link";

const DeputadoDetails = ({ id, nome, siglaPartido, siglaUf, email, urlFoto }) => {
  return (
    <div className="bg-white rounded-lg shadow-lg">
      <Link href={`/deputados/${id}`}>
        <Image priority={false} src={urlFoto} alt={nome} className="w-full object-cover rounded-t-lg" width={100} height={100} />
        <div className="p-4">
          <h2 className="text-xl font-bold mb-1">{nome}</h2>
          <p className="text-sm text-gray-600">{siglaPartido} - {siglaUf}</p>
        </div>
      </Link>
    </div>
  );
};

export default DeputadoDetails;