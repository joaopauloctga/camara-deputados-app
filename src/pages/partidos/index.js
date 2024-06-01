import LoadingAPI from '@/components/loading';
import useCamaraAPI from '@/hooks/useCamaraAPI';
import React, { useState } from 'react';
import Image from 'next/image';
import ProfilePhoto from '@/components/deputado/ProfilePhoto';
import Link from 'next/link';
import { formatDate } from '@/utils/common';

const PartidoLideres = ({id}) => {
  const {isLoading, result} = useCamaraAPI({
    url: `partidos/${id}/lideres`
  });
  if (isLoading) {
    return <LoadingAPI />
  }
  else if (result.length === 0) {
    return <h4>Sem lider definido</h4>
  }
  return <div>
    <ul>
      {result.filter(l => l.titulo === 'Líder').map(lider => {
        return <>
          <li key={`lider-cod-${lider.codTitulo}`}>
            <div className='flex flex-wrap flex-column justify-center items-center p-4'>
              <div className='w-full'>
                <ProfilePhoto foto={lider.urlFoto} nome={lider.nome} size='xs' />
              </div>
              <div className='w-full text-center'>
                <h4 className='text-center text-sm'>Líder desde {formatDate(lider.dataInicio)}</h4>
                <h4 className='text-center font-medium'>{lider.nome}</h4>
              </div>
            </div>
          </li>
        </>
      })}
    </ul>
  </div>
}

const PartidoImage = ({src, alt, width = 350, height = 100}) => {
  const [imgDefault, setImgDefault] = useState(false)
  const onError = () => {
    setImgDefault("/logos/partidos/default.png")
  }
  return <Image onError={onError} className='self-center' src={imgDefault ? imgDefault : src} alt='logo partido' width={width} height={height} />
}

const PartidoDetails = ({id, sigla, nome}) => {
  const { isLoading: isPartidoLoading, result: partidoDetails } = useCamaraAPI({
    url: `partidos/${id}`,
  });

  return <div className='grid grid-cols-2 justify-items-center items-center'>
    {isPartidoLoading ? <LoadingAPI /> : (
      <>
        <div className='p-4'>
          <PartidoImage src={`/logos/partidos/${partidoDetails.nome.toLowerCase()}.png`} />
          <ul className='text-sm'>
            <li className='text-base font-semibold'>{partidoDetails.sigla}</li>
            <li className='font-medium'>{partidoDetails.nome}</li>
            <li>{partidoDetails.status.situacao} - {formatDate(partidoDetails.status.data)}</li>
            <li>Membros - {partidoDetails.status.totalMembros}</li>
            <li>Posses - {partidoDetails.status.totalPosse}</li>
          </ul>
        </div>
        <PartidoLideres id={id} />
      </>
    )}
  </div>
}

const PartidosList = () => {
  const { isLoading: isLoadingPartidos, result: partidos } = useCamaraAPI({
    url: 'partidos'
  });
  return (
    <div className="grid lg:grid-cols-2 gap-3">
      {isLoadingPartidos ? <LoadingAPI /> : (
        <>
          {partidos.map(p => {
            return <Link key={p.id} href={`partidos/${p.sigla.toLowerCase()}`}>
              <div className='border rounded'><PartidoDetails {...p} /></div>
            </Link>
          })}
        </>
      )}
    </div>
  );
};

export default PartidosList;