import React, { useState, useEffect } from 'react';
import InfoCarList from '../apresentations/info-card-list';
import Link from 'next/link';
import useCamaraAPI from '@/hooks/useCamaraAPI';

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
  const {isLoading, result, handleRequest } = useCamaraAPI({
    url
  });

  useEffect(() => {
    if (!isLoading) {
      setProposicoes(result);
    }
  }, [isLoading]);

  return (
    <div>
      <ul>
        {proposicoes.map((p) => (
          <PropositionItem key={p.id} sigla={p.siglaTipo} text={p.ementa} date={p.ano} />
        ))}
      </ul>
      <div className='text-center'>
        <Link href={`/deputados/${deputadoId}/proposicoes`}>Ver todos</Link>
      </div>
    </div>
  );
};

export default DeputadoProposicoes;
