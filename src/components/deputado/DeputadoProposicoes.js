import React, { useState, useEffect } from 'react';
import InfoCarList from '../apresentations/info-card-list';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleChevronLeft, faCircleChevronRight } from '@fortawesome/free-solid-svg-icons';

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
  const [proposicoes, setProposicoes] = useState([]);
  const [nextPage, setNextPage] = useState('');
  const [previousPage, setPreviousPage] = useState('');

  const fetchProposicoes = async (url) => {
    try {
      const response = await fetch(url);
      const data = await response.json();
      setProposicoes(data.dados);

      const links = data.links;
      const nextPageLink = links.find((link) => link.rel === 'next');
      const previousPageLink = links.find((link) => link.rel === 'previous');
      setNextPage(nextPageLink?.href || '');
      setPreviousPage(previousPageLink?.href || '');
    } catch (error) {
      console.error('Error fetching proposicoes:', error);
    }
  };

  useEffect(() => {
    if (deputadoId == undefined) {
      return;
    }
    const codTemas = Array.from({ length: 53 }, (_, index) => 34 + index)
    const apiUrl = `https://dadosabertos.camara.leg.br/api/v2/proposicoes?idDeputadoAutor=${deputadoId}&itens=5&codTema=${codTemas.join(',')}`;
    fetchProposicoes(apiUrl);
  }, [deputadoId]);

  const handleNextPage = () => {
    if (nextPage) {
      fetchProposicoes(nextPage);
    }
  };

  const handlePreviousPage = () => {
    if (previousPage) {
      fetchProposicoes(previousPage);
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
      </div>
    </div>
  );
};

export default DeputadoProposicoes;
