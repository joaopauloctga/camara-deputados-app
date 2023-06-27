import React, { useEffect, useState } from "react";
import useCamaraTemas from "@/hooks/useCamaraTemas";
import useCamaraPropStatusCode from "@/hooks/useCamaraPropStatusCode";
import TagFilter from "@/components/filters/tag-filter";
import useCamaraAPI from "@/hooks/useCamaraAPI";
import LoadingAPI from "@/components/loading";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFileLines, faCalendar, faSearch } from "@fortawesome/free-solid-svg-icons";
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

const getDate = (datestring) => {
  const date = new Date(datestring);
  const options = { day: '2-digit', month: 'short', year: 'numeric' };
  return date.toLocaleDateString('pt-BR', options);
}

function ProposicaoData({siglaTipo, id, codTipo, dataApresentacao, numero, statusProposicao, ementa}) {

  return <div className="flex flex-wrap mb-4 rounded-md py-1 border border-color-1">
    <div className="w-1/12 text-center border-r p-2">
      <FontAwesomeIcon style={{height: '80px'}} className="t-primary" icon={faFileLines} />
      <h4 className="text-sm">{siglaTipo}</h4>
    </div>
    <div className="w-11/12 flex flex-col justify-between p-2">
      <div className="w-full flex flex-col flex-wrap">
        <div className="text-sm t-primary">
          <FontAwesomeIcon icon={faCalendar} /> Data de apresentação: {getDate(dataApresentacao)}
          <span> - </span>
          <span> Nº {numero} </span>
          <span> - </span>
        </div>
        <p>{ementa}</p>      
      </div>
      <p className="text-xs t-primary">Último status: {statusProposicao.sequencia}º fase, {statusProposicao.despacho} para o orgão {statusProposicao.siglaOrgao} {`->`} {statusProposicao.descricaoTramitacao}</p>
    </div>
  </div>
}

function DeputadoProposicoesList({deputadoId}) {
  const itens = 5;
  const temas = useCamaraTemas();
  const codStatus = useCamaraPropStatusCode();
  const codProposicoes = useCamaraProposicaoSiglaTipo()
  const [temasChecked, setTemasChecked] = useState([]);
  const [statusCodeChecked, setStatusCodeChecked] = useState([]);
  const [siglaTiposChecked, setSiglaTiposChecked] = useState([]);
  const [keywordsFilter, setKeywordFilter] = useState('');
  const [url, setUrl] = useState(`proposicoes?ordenarPor=ano&itens=${itens}&ordem=desc&idDeputadoAutor=${deputadoId}`)

  const { isLoading, result, nextPage, previousPage, handleRequest } = useCamaraAPI({
    url: url,
    subRequest: true,
    config: {
      subReqProxy: true,
    }
  });

  const handleSearch = (e) => {
    if (e.keyCode !== 13) {
      setKeywordFilter(e.target.value)
      return
    }
    setKeywordFilter(e.target.value)
  }

  useEffect(() => {
    if (!temasChecked.length && !statusCodeChecked.length && !siglaTiposChecked.length && keywordsFilter === "") {
      return;
    }

    const codTemas = temasChecked.length > 0
      ? `&codTema=${temasChecked.join(',')}` : '';

    const codTramitacao = statusCodeChecked.length > 0
      ? `&codSituacao=${statusCodeChecked.join(',')}` : '';

    const siglaTipo = siglaTiposChecked.length > 0
    ? `&siglaTipo=${siglaTiposChecked.join(',')}` : '';

    const keywords = keywordsFilter !== ""
      ? `&keywords=${keywordsFilter}`
      : '';
    
    setUrl(`proposicoes?ordenarPor=ano&ordem=desc&itens=${itens}&idDeputadoAutor=${deputadoId}${codTemas}${codTramitacao}${siglaTipo}${keywords}`);
  }, [temasChecked, statusCodeChecked, siglaTiposChecked, keywordsFilter]);

  return <div className="flex flex-wrap">
    <div className="w-1/6">
      {codProposicoes.isLoading
        ? <h1>Carregando</h1>
        : <TagFilter
            filterCategory="Tipo"
            tagOptions={codProposicoes.result.map(cod => {return {value: cod.sigla, label: cod.nome}})}
            onChange={setSiglaTiposChecked}
            tagsSelected={siglaTiposChecked}
            />
      }
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
      <div className="w-full">
        <input type="text" onKeyDown={handleSearch} placeholder="Digite a(s) palavra(s) chaves e aperte enter" className="form-input w-full rounded-md mb-4" />
      </div>
      {isLoading
        ? <LoadingAPI />
        : <>
            {result.length === 0 && <div className="flex flex-col justify-center items-center">
              Nenhum resultado encontrado para o filtro aplicado.
            </div>}
            {(result.length == 0 && (temasChecked.length > 0 || statusCodeChecked.length > 0)) && <h3>Nenhum resultado encontrado</h3>}
            {result.length  > 0 && result.map(item => 
              <Link key={item.id} href={`/deputados/${deputadoId}/proposicoes/${item.id}`}>
                <ProposicaoData {...item} />
              </Link>)}
            <CamaraAPIPagination nextLink={nextPage} previousLink={previousPage} handle={handleRequest}/>
          </>}
    </div>
  </div>
}

export default DeputadoProposicoesList