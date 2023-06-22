import React, { useState, useEffect } from 'react';
import DeputadoDetails from '@/components/deputado/DeputadoDetails';
import useCamaraAPI, { fetchAPI } from '@/hooks/useCamaraAPI';
import useSWR from 'swr'

const fetcher = async (url) => {
  return await (await fetch(url)).json()
}

const baseAPI = 'https://dadosabertos.camara.leg.br/api/v2';

const DeputadoFilterListPage = ({onChange, handleSearchName, partidosPreChecked, legislauraPreSelected}) => {
  const [name, setName] = useState('');
  const [legSelected, setLegSelected] = useState(legislauraPreSelected);
  const [partidosChecked, setPartidoChecked] = useState(partidosPreChecked)
  const partidos = useSWR(`${baseAPI}/partidos`, fetcher);
  const legislaturas = useSWR(`${baseAPI}/legislaturas`, fetcher);

  const handlePartidosCheck = (event) => {
    const { value, checked } = event.target;
    if (checked) {
      setPartidoChecked((prevCheckedItems) => [...prevCheckedItems, value]);
    } else {
      setPartidoChecked((prevCheckedItems) =>
        prevCheckedItems.filter((item) => item !== value)
      );
    }
  }

  useEffect(() => {
    const filter = {};
    if (partidosChecked.length > 0) {
      filter.siglaPartido = partidosChecked.join(',');
    }
    if (legSelected !== legislauraPreSelected) {
      filter.idLegislatura = legSelected;
      filter.itens = 12
    }
    if (Object.keys(filter).length == 0) {
      filter.itens = 12;
    }
    onChange(filter);
  }, [legSelected, partidosChecked])

  return <>
    {!legislaturas.isLoading && (<div className='mb-4 border rounded-md border-colo-1 p-2 mr-4'>
        <h4><label htmlFor='select-legislatura'>Legislatura</label></h4>
        <select id='select-legislatura' className='form-select' onChange={(e) => setLegSelected(e.target.value)}>
          {legislaturas.data.dados.map(leg => <option key={leg.id} value={leg.id}>{leg.dataInicio.slice(0,4)} - {leg.dataFim.slice(0,4)}</option>)}
        </select>
      </div>
    )}
    <div className='mb-4 border rounded-md border-colo-1 p-2 mr-4'>
      <input onChange={handleSearchName} className='form-text w-full' type='text' placeholder='Pesquise pelo nome' />
    </div>
    {!partidos.isLoading && (
      <div className='flex flex-wrap flex-col mb-4 border rounded-md border-colo-1 p-2 mr-4'>
        <label>Filter por partidos</label>
        {partidos.data.dados.map(p => {
          return <div key={`partido-filter-${p.sigla}`}>
            <input 
              className='form-check' 
              id={p.sigla}
              value={p.sigla}
              checked={partidosChecked.includes(p.sigla)} 
              onChange={handlePartidosCheck} 
              type='checkbox' 
            /> <label htmlFor={p.sigla}>{p.sigla}</label>
          </div>
        })}
      </div>
    )}
  </>
}

const DeputadosList = () => {
  const [items, setItems] = useState([]);
  const [url, updateUrl] = useState({});
  const [loadMore, setLoadMore] = useState(undefined)
  const [allDeputados, setAllDeputados] = useState([]);

  const { isLoading, result, nextPage, handleRequest } = useCamaraAPI({
    url: 'deputados?itens=12',
    config: {
      loadMore: true
    }
  });

  const handleSearchByName = async (e) => {
    const {value} = e.currentTarget;
    if (value.length < 5) {

      if (value === "") {
        setItems(result);
        setLoadMore(nextPage)
      }
      return;
    }
    if (allDeputados.length === 0) {
      const req = await fetchAPI(`${baseAPI}/deputados?idLegislatura=${url.idLegislatura || 57}`)
      setAllDeputados(req.data)
    }
    setItems(allDeputados.filter(({nome, siglaPartido}) => url.siglaPartido.split(',').includes(siglaPartido) && nome.toLowerCase().includes(value.toLowerCase())))
    setLoadMore(undefined);
  }

  useEffect(() => {
    const params = new URLSearchParams();
    for (const key in url) {
      if (url.hasOwnProperty(key)) {
        params.append(key, url[key]);
      }
    }
    if (params.size > 0) {
      fetchAPI(`${baseAPI}/deputados?${params.toString()}`)
        .then(({data, nextPageLink}) => {
          setItems(data)
          setLoadMore(nextPageLink)
        })
    }
  }, [url]);

  useEffect(() => {
    if (!isLoading) {
      setItems(result)
      if (nextPage !== undefined) {
        setLoadMore(nextPage)
      }
    }
  }, [isLoading]);

  return <div className='flex'>
    <div className='w-1/6'>
      <DeputadoFilterListPage handleSearchName={handleSearchByName} partidosPreChecked={[]} legislauraPreSelected={57} onChange={updateUrl} />
    </div>
    <div className='w-5/6'>
      <div className='flex flex-wrap flex-col'>
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
        {loadMore !== undefined && (
          <div className='flex-none self-center'>
            <button className='flex-none px-4 py-2 text-sm rounded-md shadow-sm bg-black text-white' onClick={() => handleRequest(nextPage)} disabled={isLoading}>
              {isLoading ? 'Aguarde...' : 'Carregar mais deputados'}
            </button>
          </div>
        )}
      </div>
    </div>
  </div>
};

export default DeputadosList;