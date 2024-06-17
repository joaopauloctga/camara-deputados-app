"use client";
import LoadingAPI from "../loading";
import ProfilePhoto from "../deputado/ProfilePhoto";
import useCamaraAPI from "@/hooks/useCamaraAPI";
import { formatDate } from "@/utils/common";

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
        return <li key={`lider-cod-${lider.codTitulo}-${lider.id}`}>
          <div className='flex flex-wrap flex-column justify-center items-center p-4'>
            <div className='w-full'>
              <ProfilePhoto foto={lider.urlFoto} nome={lider.nome} size='sm' />
            </div>
            <div className='w-full text-center'>
              <h4 className='text-center text-sm'>Líder desde {formatDate(lider.dataInicio)}</h4>
              <h4 className='text-center font-medium'>{lider.nome}</h4>
            </div>
          </div>
        </li>
      })}
    </ul>
  </div>
}

export default PartidoLideres;