import React, { useState } from 'react';

const PartidosList = () => {
  const [partidosList, setPartidosList] = useState([]);

  // Dummy data for demonstration
  const defaultPartidosList = [
    {
        "id": 36898,
        "sigla": "AVANTE",
        "nome": "Avante",
        "uri": "https://dadosabertos.camara.leg.br/api/v2/partidos/36898"
    },
    {
        "id": 37905,
        "sigla": "CIDADANIA",
        "nome": "Cidadania",
        "uri": "https://dadosabertos.camara.leg.br/api/v2/partidos/37905"
    },
    {
        "id": 36899,
        "sigla": "MDB",
        "nome": "Movimento Democrático Brasileiro",
        "uri": "https://dadosabertos.camara.leg.br/api/v2/partidos/36899"
    },
    {
        "id": 37901,
        "sigla": "NOVO",
        "nome": "Partido Novo",
        "uri": "https://dadosabertos.camara.leg.br/api/v2/partidos/37901"
    },
    {
        "id": 37907,
        "sigla": "PATRIOTA",
        "nome": "Patriota",
        "uri": "https://dadosabertos.camara.leg.br/api/v2/partidos/37907"
    },
    {
        "id": 36779,
        "sigla": "PCdoB",
        "nome": "Partido Comunista do Brasil",
        "uri": "https://dadosabertos.camara.leg.br/api/v2/partidos/36779"
    },
    {
        "id": 36786,
        "sigla": "PDT",
        "nome": "Partido Democrático Trabalhista",
        "uri": "https://dadosabertos.camara.leg.br/api/v2/partidos/36786"
    },
    {
        "id": 37906,
        "sigla": "PL",
        "nome": "Partido Liberal",
        "uri": "https://dadosabertos.camara.leg.br/api/v2/partidos/37906"
    },
    {
        "id": 36896,
        "sigla": "PODE",
        "nome": "Podemos",
        "uri": "https://dadosabertos.camara.leg.br/api/v2/partidos/36896"
    },
    {
        "id": 37903,
        "sigla": "PP",
        "nome": "Progressistas",
        "uri": "https://dadosabertos.camara.leg.br/api/v2/partidos/37903"
    }
];

  useState(() => {
    setPartidosList(defaultPartidosList);
  }, []);

  return (
    <div className="container mx-auto">
      <div className="flex flex-wrap -mx-4">
        {partidosList.map((partido) => (
          <div key={partido.id} className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/4 px-4 mb-4">
            <div className="bg-white shadow-md rounded-lg p-4">
              <img src={partido.uri} alt={partido.nome} className="w-full h-32 object-cover mb-4" />
              <div className="text-sm">
                <p className="font-bold">{partido.id}</p>
                <p>{partido.nome}</p>
                <p className="text-gray-600">{partido.sigla}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PartidosList;