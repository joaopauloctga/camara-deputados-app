import React, { useState, useEffect } from 'react';
import Image from 'next/image';

const DeputadoDetails = ({ nome, siglaPartido, siglaUf, email, urlFoto }) => {
  return (
    <div className="w-full md:w-1/2 lg:w-1/4 p-4">
      <div className="bg-white rounded-lg shadow-lg">
        <Image src={urlFoto} alt={nome} className="w-full h-40 object-cover rounded-t-lg" width={100} height={100} />
        <div className="p-4">
          <h2 className="text-xl font-bold mb-2">{nome} - {siglaPartido}</h2>
          <p className="text-gray-600">Sigla UF: {siglaUf}</p>
          <p className="text-gray-600">Email: {email}</p>
        </div>
      </div>
    </div>
  );
};

const DeputadosPartidosFilter = ({ onChange, searchValue }) => {
  const [partidos, setPartidos] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');


  useEffect(() => {
    const fetchPartidos = async () => {
      try {
        const response = await fetch('https://dadosabertos.camara.leg.br/api/v2/partidos');
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
    <input type='text' placeholder='Pesquise pelo nome do deputado' value={searchQuery} onChange={handleSearchChange} />
    <select onChange={(e) => onChange(e.target.value)}>
      <option value="">All Partidos</option>
      {partidos.map((partido) => (
        <option key={partido.sigla} value={partido.sigla}>
          {partido.nome}
        </option>
      ))}
    </select>
  </>
};

const DeputadosList = () => {
  const [items, setItems] = useState([]);
  const [nextLink, setNextLink] = useState('');
  const [loading, setLoading] = useState(false);
  const [partidoFilter, setPartidoFilter] = useState('');
  const [nomeSearch, setNomeSearch] = useState('');

  const fetchData = async () => {
    try {
      setLoading(true);
      let url = 'http://localhost:3000/api/deputados';
      if (nomeSearch == '') {
        if (partidoFilter) {
          url += `?siglaPartido=${partidoFilter}`;
        } else {
          url += '?itens=12';
        }
      }
    
      const response = await fetch(url);
      const data = await response.json();

      console.log(data)
      
      setItems(data.filter((d) => {
        return nomeSearch == '' || d.nome.toLowerCase().includes(nomeSearch.toLocaleLowerCase())
      }));
      setNextLink(data.links.find((link) => link.rel === 'next')?.href);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching data:', error);
      setLoading(false);
    }
  };

  const loadMoreData = async () => {
    try {
      setLoading(true);
      const response = await fetch(nextLink);
      const data = await response.json();
      setItems((prevItems) => [...prevItems, ...data.dados]);
      setNextLink(data.links.find((link) => link.rel === 'next')?.href);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching more data:', error);
      setLoading(false);
    }
  };

  const handlePartidoFilterChange = (value) => {
    setPartidoFilter(value);
  };

  const searchValue = (value) => {
    setNomeSearch(value)
  }

  useEffect(() => {
    fetchData();
  }, [partidoFilter, nomeSearch]);

  return (
    <div>
      <DeputadosPartidosFilter onChange={handlePartidoFilterChange} searchValue={searchValue} />
      <div className="flex flex-wrap -mx-4">
      {items.map((item) => (
        <DeputadoDetails
          key={item.id}
          nome={item.nome}
          siglaPartido={item.siglaPartido}
          siglaUf={item.siglaUf}
          email={item.email}
          urlFoto={item.urlFoto}
        />
      ))}
    </div>
      {nextLink && (
        <button onClick={loadMoreData} disabled={loading}>
          {loading ? 'Loading...' : 'Load More'}
        </button>
      )}
    </div>
  );
};

export default DeputadosList;