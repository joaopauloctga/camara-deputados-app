import React, { useState, useEffect } from 'react';
import InfoCardRounded from '../apresentations/info-card-rounded';
import Link from 'next/link';
import useCamaraAPI from '@/hooks/useCamaraAPI';
import LoadingAPI from '../loading';
import GoToLink from '../goto-link';
import { formatDate } from '@/utils/common';

function PropositionItem({deputadoId, id, descricaoTipo, dataApresentacao, ementa, statusProposicao}) {
  return (
    <Link href={`/deputados/${deputadoId}/proposicoes/${id}`}>
      <div className='mb-2 bg-white p-2 rounded-lg border border-color-1'>
        <h6 className='text-md t-primary underline underline-offset-2'>{descricaoTipo} publicado em {formatDate(dataApresentacao)}</h6>
        <p className='my-2'>{ementa}</p>
        <h6 className='text-xs'>Último status: {formatDate(statusProposicao?.dataHora)} - {statusProposicao?.descricaoSituacao || 'sem descrição'}</h6>
      </div>
    </Link>
  )
}

const DeputadoProposicoes = ({ deputadoId }) => {
  // @todo update to get this temas by API.
  const codTemas = Array.from({ length: 53 }, (_, index) => 34 + index);
  const url = `proposicoes?ordenarPor=ano&ordem=desc&idDeputadoAutor=${deputadoId}&itens=4&codTema=${codTemas.join(',')}`;
  const [proposicoes, setProposicoes] = useState([]);
  const {isLoading, result, totalItems} = useCamaraAPI({
    url,
    subRequest: true,
    // config: {
    //   subReqProxy: true
    // }
  });

  return (
    <div className="flex flex-wrap px-6 py-2">
      <div className="w-full lg:w-1/6">
        <div className="flex flex-col justify-evenly h-full">
          <InfoCardRounded isLoading={isLoading} title={'Projetos de sua autoria'} value={totalItems}  color={'bg-blue-500'} />
          <InfoCardRounded isLoading={isLoading} title={'Aprovadas'} value='6' color={'bg-blue-500'} />
        </div>
      </div>
      <div className="w-full lg:w-5/6">
        <ul>
          {result.map((p) => (
            <li className='mb-4' key={p.id}><PropositionItem deputadoId={deputadoId} key={p.id} {...p} /></li>
          ))}
        </ul>
      </div>
      <div className='text-center w-full p-2'>
        <GoToLink label={'Ver proposições do deputado'} link={`/deputados/${deputadoId}/proposicoes`} />
      </div>
    </div>
  );
};

export default DeputadoProposicoes;
