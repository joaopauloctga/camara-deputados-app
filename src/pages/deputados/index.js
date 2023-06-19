import React, { useState, useEffect } from 'react';
import DeputadoDetails from '@/components/deputado/DeputadoDetails';
import useCamaraAPI from '@/hooks/useCamaraAPI';

const DeputadosList = () => {
  const [items, setItems] = useState([]);
  const { isLoading, result, nextPage, handleRequest } = useCamaraAPI({
    url: 'deputados?itens=12',
    config: {
      loadMore: true
    }
  });

  useEffect(() => {
    if (!isLoading) {
      setItems(result)
    }
  }, [isLoading]);

  return (
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
      {nextPage && (
        <div className='flex-none self-center'>
          <button className='flex-none px-4 py-2 text-sm rounded-md shadow-sm bg-black text-white' onClick={() => handleRequest(nextPage)} disabled={isLoading}>
            {isLoading ? 'Aguarde...' : 'Carregar mais deputados'}
          </button>
        </div>
      )}
    </div>
  );
};

export default DeputadosList;