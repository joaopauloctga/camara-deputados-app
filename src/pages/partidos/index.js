import ProfilePhoto from '@/components/deputado/ProfilePhoto';
import PanelSeeMore from '@/components/panel-see-more/panel-see-more';
import Image from 'next/image';
import React, { useState } from 'react';

function PartidoDetails({id, nome, sigla, status, urlLogo, lideres, parlamentares}) {
  const sizeLiderImage = lideres.length > 2 ? 'xs' : 'sm';
  return <div className='flex flex-col lg:flex-row flex-wrap justify-center'>
    <div className='w-full lg:w-2/6'>
      <div className='flex flex-col items-center'>
        <Image alt={nome} src={`/logos/partidos/${sigla.toLowerCase()}.png`} width={400} height={300} />
        <h3 className='t3 t-primary'>{nome}</h3>
        <h3 className='t4 t-primary'>{sigla}</h3>
      </div>
    </div>
    <div className='w-full lg:w-2/6 text-center'>
      <h3 className='t3 t-primary mb-2'>Lideres do partido</h3>
      {lideres.length === 0 && <h3>Nenhum lider definido</h3>}
      <PanelSeeMore maxHeight={400}>
        <div className='flex flex-wrap justify-center items-center'>
          {lideres.map(p => <div className='w-1/2'><ProfilePhoto size={sizeLiderImage} name={p.nome} foto={p.urlFoto} /></div>)}
        </div>
      </PanelSeeMore>
    </div>
    <div className='w-full lg:w-2/6'>
      <h3 className='t3 t-primary text-center mb-2'>Membros do partido ({parlamentares.length})</h3>
      <PanelSeeMore maxHeight={400}>
        <div className='flex flex-wrap'>
          {parlamentares.map(p => <div className='w-1/3'><ProfilePhoto size='xs' name={p.nome} foto={p.urlFoto} /></div>)}
        </div>
      </PanelSeeMore>
    </div>
  </div>
}

function FiltroPartidos() {
  return <div className='mb-2 w-full border border-color-1 rounded-sm'>
    <ul className='flex flex-wrap items-center'>
      <li className='p-1 px-4 bg-4 mr-4'>Ordernar por</li>
      <li className='mr-2'>
        <input type='checkbox' className='form-check' />
        <label> Maioria</label>
      </li>
      <li className='mr-2'>
        <input type='checkbox' className='form-check' />
        <label> Minoria</label>
      </li>
    </ul>
  </div>
}

const PartidosList = () => {
  const [partidosList, setPartidosList] = useState([]);

  const fetchPartidos = () => {
    fetch('http://localhost:3000/api/partidos')
      .then((resp) => resp.json())
      .then(dados => setPartidosList(dados))
  }

  useState(() => {
    fetchPartidos();
  }, []);

  return (
    <div className="flex flex-wrap -mx-4">
      <FiltroPartidos />
      {partidosList.map((partido) => (
        <div key={partido.id} className="w-full mb-4 p-3 rounded-sm border border-color-1">
          <PartidoDetails {...partido} />
        </div>
      ))}
    </div>
  );
};

export default PartidosList;