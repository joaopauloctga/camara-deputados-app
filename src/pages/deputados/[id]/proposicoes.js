import React, { use, useEffect, useState } from "react";
import useCamaraTemas from "@/hooks/useCamaraTemas";
import useCamaraPropStatusCode from "@/hooks/useCamaraPropStatusCode";
import TagFilter from "@/components/filters/tag-filter";
import useCamaraAPI from "@/hooks/useCamaraAPI";
import LoadingAPI from "@/components/loading";

export const getServerSideProps = async ({query}) => {
  const { id } = query;
  return {
    props: {
      deputadoId: id,
    }
  }
}

function DeputadoProposicoesList({deputadoId}) {
  const temas = useCamaraTemas();
  const codStatus = useCamaraPropStatusCode();
  const [temasChecked, setTemasChecked] = useState([]);
  const [statusCodeChecked, setStatusCodeChecked] = useState([]);
  const [url, setUrl] = useState(`proposicoes?ordenarPor=ano&ordem=desc&idDeputadoAutor=${deputadoId}`)

  const { isLoading, result } = useCamaraAPI({
    url: url,
  });

  useEffect(() => {
    const codTemas = temasChecked.length > 0
      ? `&codTema=${temasChecked.join(',')}` : '';
    const siglaTipo = statusCodeChecked.length > 0
      ? `&siglaTipo=${statusCodeChecked.join(',')}` : ''
    setUrl(`proposicoes?ordenarPor=ano&ordem=desc&idDeputadoAutor=${deputadoId}${codTemas}${siglaTipo}`);
  }, [temasChecked, statusCodeChecked]);

  return <div className="flex flex-wrap">
    <div className="w-1/6">
      {temas.isLoading 
        ? <h1>Loading temas</h1> 
        : <TagFilter 
            filterCategory={'Filtrar por tema'}
            tagOptions={temas.result.map(tema => {return {value: tema.cod, label: tema.nome}})}
            onChange={setTemasChecked}
            tagsSelected={temasChecked}
          /> 
      }
      {codStatus.isLoading 
        ? <h1>Loading status code</h1> 
        : <TagFilter 
            filterCategory={'Filtrar por status'}
            tagOptions={codStatus.result.map(status => {return {value: status.cod, label: status.nome}})}
            onChange={setStatusCodeChecked}
            tagsSelected={statusCodeChecked}
          /> 
      }
    </div>
    <div className="w-5/6">
      {isLoading
        ? <LoadingAPI />
        : <div>
            {result.map(item => <h1>{item.ementa}</h1>)}
          </div>}
    </div>
  </div>
}

export default DeputadoProposicoesList