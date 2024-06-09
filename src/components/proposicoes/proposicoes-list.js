import React, { useEffect, useState } from "react";
import useCamaraTemas from "@/hooks/useCamaraTemas";
import useCamaraPropStatusCode from "@/hooks/useCamaraPropStatusCode";
import TagFilter from "@/components/filters/tag-filter";
import useCamaraAPI from "@/hooks/useCamaraAPI";
import LoadingAPI from "@/components/loading";
import PropositionItem from "./proposition-item";
import Link from "next/link";
import useCamaraProposicaoSiglaTipo from "@/hooks/useCamaraProposicoesSiglaTipo";
import CamaraAPIPagination from "@/components/pagination/camara-api-pagination";

export const getServerSideProps = async ({query}) => {
  const { id } = query;
  return {
    props: {
      deputadoId: id,
    }
  }
}

function ProposicoesList({deputadoId}) {
  const itens = 5;
  let initialFetchUrl = `proposicoes?ordenarPor=ano&itens=${itens}&ordem=desc`;
  if (deputadoId !== undefined) {
    initialFetchUrl += `&idDeputadoAutor=${deputadoId}`;
  }

  const temas = useCamaraTemas();
  const codStatus = useCamaraPropStatusCode();
  const codProposicoes = useCamaraProposicaoSiglaTipo({onlyMain: true});

  const [temasChecked, setTemasChecked] = useState([]);
  const [statusCodeChecked, setStatusCodeChecked] = useState([]);
  const [siglaTiposChecked, setSiglaTiposChecked] = useState([]);
  const [keywordsFilter, setKeywordFilter] = useState('');
  const [url, setUrl] = useState(initialFetchUrl)
  const [isFiltering, setFiltering] = useState(false);
  
  const { isLoading, result, nextPage, previousPage, handleRequest } = useCamaraAPI({
    url: url,
    subRequest: true,
  });

  const handleSearch = (e) => {
    const { value } = e.target;
    // Only update the value after user confirm pressing enter.
    // Or the input value is clear.
    if (e.keyCode === 13 || (keywordsFilter.length > 0 && value.length ===0)) {
      setKeywordFilter(value);
    }
  }

  useEffect(() => {
    if (!temasChecked.length && !statusCodeChecked.length && !siglaTiposChecked.length && keywordsFilter === "") {
      if (isFiltering) {
        setUrl(initialFetchUrl);
      }
      setFiltering(false);
      return;
    }

    setFiltering(true);
    const codTemas = temasChecked.length > 0
      ? `&codTema=${temasChecked.join(',')}` : '';

    const codTramitacao = statusCodeChecked.length > 0
      ? `&codSituacao=${statusCodeChecked.join(',')}` : '';

    const siglaTipo = siglaTiposChecked.length > 0
    ? `&siglaTipo=${siglaTiposChecked.join(',')}` : '';

    const keywords = keywordsFilter !== ""
      ? `&keywords=${keywordsFilter}`
      : '';
    
    const deputadoFilter = deputadoId !== undefined
      ? `&idDeputadoAutor=${deputadoId}`
      : '';

    setUrl(`proposicoes?ordenarPor=ano&ordem=desc&itens=${itens}${deputadoFilter}${codTemas}${codTramitacao}${siglaTipo}${keywords}`);
  }, [temasChecked, statusCodeChecked, siglaTiposChecked, keywordsFilter, deputadoId, isFiltering, initialFetchUrl]);

  return <div className="flex flex-wrap">
    <div className="hidden lg:block w-1/6">
      {codProposicoes.isLoading
        ? <h1>Carregando</h1>
        : <TagFilter
            filterCategory="Principais Tipos"
            tagOptions={codProposicoes.result.map(cod => {return {value: cod.sigla, label: cod.nome}})}
            onChange={setSiglaTiposChecked}
            tagsSelected={siglaTiposChecked}
            disabled={isLoading}
            />
      }
      {temas.isLoading 
        ? <h1>Carregando</h1> 
        : <TagFilter 
            filterCategory={'Filtrar por tema'}
            tagOptions={temas.result.map(tema => {return {value: tema.cod, label: tema.nome}})}
            onChange={setTemasChecked}
            tagsSelected={temasChecked}
            disabled={isLoading}
          /> 
      }
      {codStatus.isLoading 
        ? <h1>Carregando</h1> 
        : <TagFilter 
            filterCategory={'Filtrar por status'}
            tagOptions={codStatus.result.map(status => {return {value: status.cod, label: status.nome}})}
            onChange={setStatusCodeChecked}
            tagsSelected={statusCodeChecked}
            disabled={isLoading}
          /> 
      }
    </div>
    <div className="w-full lg:w-5/6">
      <div className="w-full">
        <input disabled={isLoading} type="text" onKeyUp={handleSearch} placeholder="Digite a(s) palavra(s) chaves e aperte enter" className="form-input w-full rounded-md mb-4" />
      </div>
      {isLoading
        ? <LoadingAPI />
        : <>
            {result.length === 0 && <div className="flex flex-col justify-center items-center">
              Nenhum resultado encontrado para o filtro aplicado.
            </div>}
            {(result.length == 0 && (temasChecked.length > 0 || statusCodeChecked.length > 0)) && <h3>Nenhum resultado encontrado</h3>}
            {result.length  > 0 && result.map(item => {
              const deputadosPage = deputadoId !== undefined ? `/deputados/${deputadoId}` : '';
              return <Link key={item.id} href={`${deputadosPage}/proposicoes/${item.id}`}>
                <PropositionItem {...item} />
              </Link>
            }
            )}
            <CamaraAPIPagination nextLink={nextPage} previousLink={previousPage} handle={handleRequest}/>
          </>}
    </div>
  </div>
}

export default ProposicoesList