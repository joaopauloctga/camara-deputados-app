import React, { useState, useEffect } from 'react';
import DeputadoDetails from '@/components/deputado/DeputadoDetails';
import DeputadosPartidosFilter from '@/components/deputado/DeputadosPartidosFilter';
import camaraFetcher from '@/app/internal-fetcher';

const DeputadosList = () => {
  const [items, setItems] = useState([]);
  const [nextLink, setNextLink] = useState('');
  const [loading, setLoading] = useState(false);
  const [partidoFilter, setPartidoFilter] = useState('');
  const [nomeSearch, setNomeSearch] = useState('');

  const fetchData = async () => {
    try {
      setLoading(true);
      let params = '/deputados'
      if (nomeSearch == '') {
        if (partidoFilter) {
          params += `?siglaPartido=${partidoFilter}`;
        } else {
          params += '?itens=12';
        }
      }
    
      const data = await camaraFetcher(params);
      setItems(data.dados.filter((d) => {
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
      const data = await camaraFetcher(nextLink);
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
    <div className='flex flex-wrap flex-col'>
      <DeputadosPartidosFilter onChange={handlePartidoFilterChange} searchValue={searchValue} />
      <div className="flex flex-wrap -mx-4">
        {items.map((item) => (
          <DeputadoDetails
            id={item.id}
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
        <div className='flex-none self-center'>
          <button className='flex-none px-4 py-2 text-sm rounded-md shadow-sm bg-black text-white' onClick={loadMoreData} disabled={loading}>
            {loading ? 'Aguarde...' : 'Carregar mais deputados'}
          </button>
        </div>
      )}
    </div>
  );
};

export default DeputadosList;