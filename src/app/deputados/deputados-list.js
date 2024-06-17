"use client";
import React, { useState, useEffect, Suspense } from 'react';
import DeputadoDetails from '@/components/deputado/DeputadoDetails';
import DeputadoFilterListPage from '@/components/deputado/DeputadosFilter';import LoadingAPI from '@/components/loading';

const DeputadosListingPage = ({deputados, partidos, legislaturas}) => {
  const [deputadosFiltered, updateDeputados] = useState(deputados);

  const onFilterChange = ({name, partido}) => {
    const newList = [...deputados].filter((dep) => {
      const testPartido = (partido == -1 || partido === dep.siglaPartido);
      const testNome = (name === '' || dep.nome.toLowerCase().includes((name.toLowerCase())));
      return testNome && testPartido;
    });
    updateDeputados(newList);
  }

  return <div className='flex flex-wrap'>
    <div className='w-full'>
      <DeputadoFilterListPage 
        partidos={partidos}
        legislaturas={legislaturas}
        onFilterChange={onFilterChange} />
    </div>
    <div className='w-full'>
      <div className='grid grid-cols-1 gap-4 grid-rows-1 md:grid-cols-2 lg:grid-cols-4'>
        {deputadosFiltered.length === 0 && <h3 className='col-span-4 t3 text-center py-8'>Nenhum deputado encontrado, verique o filtro!</h3>}
        {deputadosFiltered.map((item) => (
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
    </div>
  </div>
}

export default DeputadosListingPage;