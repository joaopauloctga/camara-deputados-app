import React, { useState, useEffect } from 'react';
import DeputadoDetails from '@/components/deputado/DeputadoDetails';
import useCamaraAPI from '@/hooks/useCamaraAPI';
import useSWR from 'swr'
import LoadingAPI from '@/components/loading';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAnglesDown } from '@fortawesome/free-solid-svg-icons';

const fetcher = async (url) => {
  return await (await fetch(url)).json()
}

const baseAPI = 'https://dadosabertos.camara.leg.br/api/v2';

const DeputadoFilterListPage = ({onChange, partidosPreChecked, legDefault}) => {
  const [name, setName] = useState('');
  const [legSelected, setLegSelected] = useState(legDefault);
  const [partidosChecked, setPartidoChecked] = useState(partidosPreChecked)
  const partidos = useSWR(`${baseAPI}/partidos?idLegislatura=${legDefault}&itens=100`, fetcher);
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

  const handleLegChange = (e) => {
    setLegSelected(e.target.value)
    setPartidoChecked([]);
    setName('');
  }

  useEffect(() => {
    onChange({
      legislatura: legSelected,
      partidos: partidosChecked,
      queryName: name,
    });
  }, [legSelected, partidosChecked, name]);

  return <>
    {!legislaturas.isLoading && (<div className='mb-4 border rounded-md border-colo-1 p-2 mr-4'>
        <h4><label htmlFor='select-legislatura'>Legislatura</label></h4>
        <select defaultValue={legDefault} id='select-legislatura' className='form-select w-full' onChange={handleLegChange}>
          {legislaturas.data.dados.map(leg => <option key={leg.id} value={leg.id}>{leg.dataInicio.slice(0,4)} - {leg.dataFim.slice(0,4)}</option>)}
        </select>
      </div>
    )}
    <div className='mb-4 border rounded-md border-colo-1 p-2 mr-4'>
      <input onChange={(e) => setName(e.target.value)} value={name} className='form-text w-full' type='text' placeholder='Pesquise pelo nome' />
    </div>
    {partidos.isLoading && <h3>Carregando filtro por partidos</h3>}
    {!partidos.isLoading && (
      <div className='flex flex-wrap flex-col mb-4 border rounded-md border-colo-1 p-2 mr-4'>
        {partidos.isLoading && <h3>Carregando partidos</h3>}
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
            /> <label className='cursor-pointer text-xs' htmlFor={p.sigla}>{p.sigla}</label>
          </div>
        })}
      </div>
    )}
  </>
}

const DeputadosList = () => {
  const [currentLegislatura, updateLegislatura] = useState(57);
  const [items, setItems] = useState([]);
  const [url, setUrl] = useState(`deputados?idLegislatura=${currentLegislatura}`);
  const [limit, setLimit] = useState(12);

  const { isLoading, result } = useCamaraAPI({
    url: url,
  });

  const filterParams = ({partidos, queryName}) => {
    return result.filter((item) => {
      const testName = queryName === "" || item.nome.toLowerCase().includes(queryName.toLowerCase());
      const testPartidos = partidos.includes(item.siglaPartido) || partidos.length === 0;
      return testName && testPartidos;
    });
  }

  const handleFilter = ({partidos, legislatura, queryName}) => {
    // Clear itens to avoid display old itens while the setItems is updated on useEffect.
    setItems([]);
    if (legislatura !== currentLegislatura) {
      updateLegislatura(legislatura);
      setLimit(12)
      setUrl(`deputados?idLegislatura=${legislatura}`);
      return;
    }
    setItems(filterParams({partidos, queryName}));
  }

  useEffect(() => {
    if (!isLoading) {
      setItems(result)
    }
  }, [isLoading]);

  return <div className='flex'>
    <div className='w-1/6'>
      <DeputadoFilterListPage partidosPreChecked={[]} legDefault={currentLegislatura} onChange={handleFilter} />
    </div>
    <div className='w-5/6'>
      <div className='flex flex-wrap flex-col'>
        <div className="flex flex-wrap mx-4">
          {isLoading && <LoadingAPI />}
          {!isLoading && items.length === 0 && <h3>Nenhum deputado encontrado, verique o filtro!</h3>}
          {!isLoading && items.slice(0, limit).map((item) => (
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
      </div>
      <div className='text-center'>
        {limit < result.length && items.length > 12 && <button className='btn-1' onClick={() => setLimit(limit + 12)}>Exibir mais <FontAwesomeIcon icon={faAnglesDown} /></button>}
      </div>
    </div>
  </div>
};

export default DeputadosList;