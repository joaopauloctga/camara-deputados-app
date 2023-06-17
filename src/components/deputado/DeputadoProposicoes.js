import React, { useState, useEffect } from 'react';
import InfoCarList from '../apresentations/info-card-list';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleChevronLeft, faCircleChevronRight } from '@fortawesome/free-solid-svg-icons';
import Link from 'next/link';
import useCamaraAPI from '@/hooks/useCamaraAPI';
import LoadingAPI from '../loading';

function PropositionItem({date, sigla, text}) {
  return (
    <div className="flex items-center mb-4">
      <div className="w-1/12 text-center">
        <h6>{sigla}</h6>
        <p>{date}</p>
      </div>
      <div className="w-11/12"><InfoCarList text={text} /></div>
    </div>
  )
}

const DeputadoProposicoes = ({ deputadoId }) => {
  const codTemas = Array.from({ length: 53 }, (_, index) => 34 + index);
  const url = `proposicoes?ordenarPor=ano&ordem=desc&idDeputadoAutor=${deputadoId}&itens=5&codTema=${codTemas.join(',')}`;
  const [proposicoes, setProposicoes] = useState([]);
  const {
    isLoading, result, nextPage, previousPage, lastPage, firstPage, handleRequest
  } = useCamaraAPI({
    url
  });

  useEffect(() => {
    if (!isLoading) {
      setProposicoes(result);
    }
  }, [isLoading]);

  const handleNextPage = () => {
    if (nextPage) {
      handleRequest(nextPage)
    }
  };

  const handlePreviousPage = () => {
    if (previousPage) {
      handleRequest(previousPage);
    }
  };

  return (
    <div>
      <ul>
        {proposicoes.map((p) => (
          <PropositionItem key={p.id} sigla={p.siglaTipo} text={p.ementa} date={p.ano} />
        ))}
      </ul>
      <div className='text-center'>
        {previousPage && <button className='bg-4 rounded-md py-1 px-3 uppercase mr-4' onClick={handlePreviousPage}><FontAwesomeIcon icon={faCircleChevronLeft} /> Anterior</button>}
        {nextPage && <button className='bg-4 rounded-md py-1 px-3 uppercase' onClick={handleNextPage}>Próximo <FontAwesomeIcon icon={faCircleChevronRight} /></button>}
        {/* <Link href={`/deputados/${deputadoId}/proposicoes`}>Ver todos</Link> */}
      </div>
    </div>
  );
};

export default DeputadoProposicoes;
