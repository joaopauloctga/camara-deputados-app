import React from 'react';
import { formatDate } from '@/utils/common';
import PartidoLideres from './partido-lideres';
import PartidoImage from './partido-image';

const PartidoDetails = async ({id, sigla, nome}) => {
  const {dados: partidoDetails} = await (await fetch(`https://dadosabertos.camara.leg.br/api/v2/partidos/${id}`)).json();

  return <div className='grid grid-cols-2 justify-items-center items-center'>
      <div className='p-4'>
        <PartidoImage src={`/logos/partidos/${partidoDetails.sigla.toLowerCase()}.png`} />
        <ul className='text-sm'>
          <li className='text-base font-semibold'>{partidoDetails.sigla}</li>
          <li className='font-medium'>{partidoDetails.nome}</li>
          <li>{partidoDetails.status.situacao} - {formatDate(partidoDetails.status.data)}</li>
          <li>Membros - {partidoDetails.status.totalMembros}</li>
          <li>Posses - {partidoDetails.status.totalPosse}</li>
        </ul>
      </div>
      <PartidoLideres id={id} />
  </div>
}

export default PartidoDetails;