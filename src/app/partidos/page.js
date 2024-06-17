import LoadingAPI from '@/components/loading';
import React from 'react';
import Link from 'next/link';
import PartidoDetails from '@/components/partidos/partido-details';

const PartidosListPage = async () => {

  const {dados: partidos} = await (await fetch('https://dadosabertos.camara.leg.br/api/v2/partidos')).json();

  return (
    <div className="grid lg:grid-cols-2 gap-3">
      {partidos.map(p => {
        return <Link key={p.id} href={`partidos/${p.sigla.toLowerCase()}`}>
          <div className='border rounded'><PartidoDetails {...p} /></div>
        </Link>
      })}
    </div>
  );
};

export default PartidosListPage;