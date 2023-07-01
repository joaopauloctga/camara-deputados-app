import Image from 'next/image';
import React, { useState } from 'react';

const PartidosList = () => {
  const [partidosList, setPartidosList] = useState([]);

  const fetchPartidos = () => {
    fetch('http://localhost:3000/api/partidos')
      .then((resp) => resp.json())
      .then(({dados}) => setPartidosList(dados))
  }

  useState(() => {
    fetchPartidos();
  }, []);

  return (
    <div className="flex flex-wrap -mx-4">
      {partidosList.map((partido) => (
        <div key={partido.id} className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/4 px-4 mb-4">
          <div className="bg-white shadow-md rounded-lg p-4">
            <div className="text-sm">
              <p className="font-bold">{partido.id}</p>
              <p>{partido.nome}</p>
              <p className="text-gray-600">{partido.sigla}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default PartidosList;