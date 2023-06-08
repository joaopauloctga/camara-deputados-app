import React, { useEffect, useState } from "react";

const DeputadosPartidosFilter = ({ onChange, searchValue }) => {
  const [partidos, setPartidos] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');


  useEffect(() => {
    const fetchPartidos = async () => {
      try {
        const response = await fetch('http://localhost:3000/api/partidos');
        const data = await response.json();
        setPartidos(data.dados);
      } catch (error) {
        console.error('Error fetching partidos:', error);
      }
    };

    fetchPartidos();
  }, []);

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value)
    const size = e.target.value.length;
    if (size > 3) {
      searchValue(e.target.value)
    }
    else if (size == 0) {
      searchValue('')
    }
  }

  return <>
      <div className="flex p-4">
        <input className="flex-auto w-2/3 form-input mr-4 rounded-md" type='text' placeholder='Pesquise pelo nome do deputado' value={searchQuery} onChange={handleSearchChange} />
        <select className="flex-auto w-1/3 form-select rounded-md" onChange={(e) => onChange(e.target.value)}>
          <option value="">Selecione deputados de um partido</option>
          {partidos.map((partido) => (
            <option key={partido.sigla} value={partido.sigla}>
              {partido.nome}
            </option>
          ))}
        </select>
      </div>
  </>
};

export default DeputadosPartidosFilter;