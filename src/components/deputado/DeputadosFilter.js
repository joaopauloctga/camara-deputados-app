import React, { useState, useEffect } from 'react';
import useCamaraAPI from '@/hooks/useCamaraAPI';

const DeputadoFilterListPage = ({onFilterChange, partidos, legislaturas, legDefault}) => {
  const [name, setName] = useState('');
  const [legSelected, setLegSelected] = useState(legDefault);
  const [partido, setPartido] = useState(-1);

  useEffect(() => {
    onFilterChange({
      name, 
      legSelected,
      partido,
    });
  }, [name, legSelected, partido]);

  return <div className='flex gap-4'>
    <div className='w-1/2 lg:w-1/5 mb-4 border rounded-md border-colo-1 p-2'>
      <h4><label htmlFor='select-legislatura'>Legislatura</label></h4>
      <select defaultValue={legDefault} id='select-legislatura' className='form-select w-full' onChange={({target}) => setLegSelected(target.value)}>
        {legislaturas.map(leg => <option key={leg.id} value={leg.id}>{leg.dataInicio.slice(0,4)} - {leg.dataFim.slice(0,4)}</option>)}
      </select>
    </div>

    <div className='w-1/2 lg:w-3/5 mb-4 border rounded-md border-colo-1 p-2'>
      <label>Pesquise pelo nome do deputado</label>
      <input onChange={(e) => setName(e.target.value)} value={name} className='form-text w-full' type='text' placeholder='Fulano' />
    </div>

    <div className='w-1/2 lg:w-1/5 flex flex-wrap flex-col mb-4 border rounded-md border-colo-1 p-2'>
      <label>Filter por partidos</label>
      <select onChange={({target}) => setPartido(target.value)}>
        <option value={-1}>Todos</option>
        {partidos.map(opt => <option key={opt.sigla} value={opt.sigla}>{opt.sigla}</option>)}
      </select>
    </div>
  </div>
}

export default DeputadoFilterListPage;