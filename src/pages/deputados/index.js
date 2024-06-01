import React, { useState, useEffect } from 'react';
import DeputadoDetails from '@/components/deputado/DeputadoDetails';
import useCamaraAPI from '@/hooks/useCamaraAPI';
import LoadingAPI from '@/components/loading';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAnglesDown } from '@fortawesome/free-solid-svg-icons';

const DeputadoFilterListPage = ({onChange, partidosSelecionados, legDefault}) => {
  const [name, setName] = useState('');
  const [legSelected, setLegSelected] = useState(legDefault);
  const [partido, setPartido] = useState(partidosSelecionados);
  const { isLoading: isLegLoading, result: legislaturas } = useCamaraAPI({
    url: `legislaturas`
  });

  const { isLoading: isPartidosLoading, result: partidos } = useCamaraAPI({
    url: `partidos?idLegislatura=${legDefault}&itens=100`,
  });

  const handlePartidosCheck = (event) => {
    const { value } = event.target;
    setPartido([value]);
  }

  const handleLegChange = (e) => {
    setLegSelected(e.target.value)
    setPartido([]);
    setName('');
  }

  useEffect(() => {
    onChange({
      legislatura: legSelected,
      partidos: partido,
      queryName: name,
    });
  }, [legSelected, partido, name]);

  return <div className='flex gap-4'>
    <div className='w-1/2 lg:w-1/5 mb-4 border rounded-md border-colo-1 p-2'>
      <h4><label htmlFor='select-legislatura'>Legislatura</label></h4>
      {isLegLoading ? <p className='text-sm'>Carregando...</p> : (
        <select defaultValue={legDefault} id='select-legislatura' className='form-select w-full' onChange={handleLegChange}>
        {legislaturas.map(leg => <option key={leg.id} value={leg.id}>{leg.dataInicio.slice(0,4)} - {leg.dataFim.slice(0,4)}</option>)}
      </select>
      )}
    </div>

    <div className='w-1/2 lg:w-3/5 mb-4 border rounded-md border-colo-1 p-2'>
      <label>Pesquise pelo nome do deputado</label>
      <input onChange={(e) => setName(e.target.value)} value={name} className='form-text w-full' type='text' placeholder='Fulano' />
    </div>

    <div className='w-1/2 lg:w-1/5 flex flex-wrap flex-col mb-4 border rounded-md border-colo-1 p-2'>
      {isPartidosLoading ? <h3>Carregando partidos</h3> : (
        <>
          <label>Filter por partidos</label>
          <select onChange={handlePartidosCheck}>
            {partidos.map(opt => <option key={opt.sigla} value={opt.sigla}>{opt.sigla}</option>)}
          </select>
          {/* {partidos.map(p => {
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
        })} */}
        </>
      )}
    </div>
  </div>
}

const DeputadosList = () => {
  const [currentLegislatura, updateLegislatura] = useState(57);
  const [deputadosFiltered, setDeputadosFiltered] = useState([]);
  const [url, setUrl] = useState(`deputados?idLegislatura=${currentLegislatura}`);
  const [limit, setLimit] = useState(12);

  const { isLoading, result: deputados } = useCamaraAPI({
    url: url,
  });

  const filterParams = ({partidos, queryName}) => {
    return deputados.filter((item) => {
      const testName = queryName === "" || item.nome.toLowerCase().includes(queryName.toLowerCase());
      const testPartidos = partidos.includes(item.siglaPartido) || partidos.length === 0;
      return testName && testPartidos;
    });
  }

  const handleFilter = ({partidos, legislatura, queryName}) => {
    // Clear itens to avoid display old itens while the setDeputadosFiltered is updated on useEffect.
    setDeputadosFiltered([]);
    if (legislatura !== currentLegislatura) {
      updateLegislatura(legislatura);
      setLimit(12)
      setUrl(`deputados?idLegislatura=${legislatura}`);
      return;
    }
    setDeputadosFiltered(filterParams({partidos, queryName}));
  }

  useEffect(() => {
    if (!isLoading) {
      setDeputadosFiltered(deputados)
    }
  }, [isLoading]);

  return <div className='flex flex-wrap'>
    {isLoading ? <LoadingAPI /> : (
      <>
        <div className='w-full'>
          <DeputadoFilterListPage partidosSelecionados={[]} legDefault={currentLegislatura} onChange={handleFilter} />
        </div>
        <div className='w-full'>
          <div className='grid grid-cols-1 gap-4 grid-rows-1 md:grid-cols-2 lg:grid-cols-4'>
            {deputadosFiltered.length === 0 && <h3>Nenhum deputado encontrado, verique o filtro!</h3>}
            {deputadosFiltered.slice(0, limit).map((item) => (
              <DeputadoDetails
                id={item.id}
                key={item.id}
                nome={item.nome}
                siglaPartido={item.siglaPartido}
                siglaUf={item.siglaUf}
                email={item.email}
                urlFoto={item.urlFoto} />
            ))}
          </div>
          <div className='text-center mt-4'>
            {limit < deputados.length && deputadosFiltered.length > 12 && <button className='btn-1' onClick={() => setLimit(limit + 12)}>Exibir mais <FontAwesomeIcon icon={faAnglesDown} /></button>}
          </div>
        </div>
      </>
    )}
  </div>
};

export default DeputadosList;