import React, { useState, useEffect } from 'react';
import InfoCardRounded from '../apresentations/info-card-rounded';
import Link from 'next/link';
import useCamaraAPI from '@/hooks/useCamaraAPI';
import LoadingAPI from '../loading';
import GoToLink from '../goto-link';

function PropositionItem({deputadoId, id, descricaoTipo, dataApresentacao, ementa, statusProposicao}) {
  return (
    <Link href={`/deputados/${deputadoId}/proposicoes/${id}`}>
      <h6 className='text-md t-primary'>{descricaoTipo} publicado em {dataApresentacao}</h6>
      <p className='bg-white p-2 rounded-sm border border-color-1'>{ementa}</p>
      <h6 className='text-sm'>Último status: {statusProposicao.dataHora} - {statusProposicao.descricaoSituacao || 'sem descrição'}</h6>
    </Link>
  )
}

const DeputadoProposicoes = ({ deputadoId }) => {
  // @todo update to get this temas by API.
  const codTemas = Array.from({ length: 53 }, (_, index) => 34 + index);
  const url = `proposicoes?ordenarPor=ano&ordem=desc&idDeputadoAutor=${deputadoId}&itens=5&codTema=${codTemas.join(',')}`;
  const [proposicoes, setProposicoes] = useState([]);
  const {isLoading, result, totalItems} = useCamaraAPI({
    url,
    subRequest: true,
    config: {
      subReqProxy: true
    }
  });

  useEffect(() => {
    if (!isLoading) {
      setProposicoes(result);
    }
  }, [isLoading]);

  return (
    <div className="flex flex-wrap px-6 py-2">
      <div className="w-full lg:w-1/6">
        <div className="flex flex-col justify-evenly h-full">
          <InfoCardRounded isLoading={isLoading} title={'Projetos de sua autoria'} value={totalItems}  color={'bg-blue-500'} />
          <InfoCardRounded isLoading={isLoading} title={'Aprovadas'} value='6' color={'bg-blue-500'} />
        </div>
      </div>
      <div className="w-full lg:w-5/6">
        {isLoading ? <LoadingAPI /> : <>
          <ul>
            {proposicoes.map((p) => (
              <li className='mb-4' key={p.id}><PropositionItem deputadoId={deputadoId} key={p.id} {...p} /></li>
            ))}
          </ul>
          
        </>}
      </div>
      <div className='text-center w-full p-2'>
        <GoToLink label={'Ver proposições do deputado'} link={`/deputados/${deputadoId}/proposicoes`} />
      </div>
    </div>
  );
};

export default DeputadoProposicoes;
