import ProfilePhoto from '@/components/deputado/ProfilePhoto';
import PanelSeeMore from '@/components/panel-see-more/panel-see-more';
import Panel from '@/components/panel/panel';
import { faHouse } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Image from 'next/image';
import React, { useState } from 'react';

function PartidoDetails({id, nome, sigla, status, urlLogo, lideres, parlamentares}) {
  return <div className='flex flex-col lg:flex-row flex-wrap p-2'>
    <div className='w-full lg:w-3/6'>
      <div className='flex flex-wrap items-center justify-center'>
        <div className='w-full text-center'>
          <Image className='mx-auto' alt={nome} src={`/logos/partidos/${sigla.toLowerCase()}.png`} width={300} height={300} />
          {/* <FontAwesomeIcon style={{fontSize: '120px'}} className='t-primary' icon={faHouse} /> */}
        </div>
      </div>
    </div>
    {/* <div className='w-full lg:w-2/6 text-center'>
      <h3 className='t3 t-primary mb-2'>Lideres do partido</h3>
      {lideres.length === 0 && <h3>Nenhum lider definido</h3>}
      <PanelSeeMore maxHeight={400}>
        <div className='flex flex-wrap justify-center items-center'>
          {lideres.map(p => <div className='w-1/2'><ProfilePhoto size={sizeLiderImage} name={p.nome} foto={p.urlFoto} /></div>)}
        </div>
      </PanelSeeMore>
    </div> */}
    <div className='w-full lg:w-3/6'>
      <h3 className='t3 t-primary text-center mb-2'>Membros do partido ({parlamentares.length})</h3>
      <PanelSeeMore maxHeight={400}>
        <div className='flex flex-wrap'>
          {parlamentares.map(p => <div className='w-1/4'><ProfilePhoto size='xs' name={p.nome} foto={p.urlFoto} /></div>)}
        </div>
      </PanelSeeMore>
    </div>
  </div>
}

function FiltroPartidos() {
  return <div className='rounded-sm border border-color-1 p-1'>
    <div>
      <h3 className='text-sm t-primary'>Order por</h3>
      <ul>
        <li className=''>
          <input type='checkbox' id='mais-deputados' className='form-check' />
          <label htmlFor='mais-deputados'>Com mais deputados</label>
        </li>
        <li className=''>
          <input type='checkbox' id='mais-deputados' className='form-check' />
          <label htmlFor='mais-deputados'>Mais Mulheres</label>
        </li>
        <li className=''>
          <input type='checkbox' id='mais-deputados' className='form-check' />
          <label htmlFor='mais-deputados'>Mais Homens</label>
        </li>
        <li className=''>
          <input type='checkbox' id='mais-deputados' className='form-check' />
          <label htmlFor='mais-deputados'>Mais Projetos de Lei</label>
        </li>
      </ul>
    </div>
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
    <div className="flex flex-wrap">
      <div className='w-full lg:w-2/12'>
        <FiltroPartidos />
      </div>
      <div className='w-full lg:w-10/12 pl-2'>
        {partidosList.map((partido) => (
          <div className='mb-4' key={partido.id}>
            <Panel right title={partido.nome}>
              <PartidoDetails {...partido} />
            </Panel>
          </div>        
        ))}
      </div>
    </div>
  );
};

export default PartidosList;