import React, { useEffect, useState } from "react";
import useCamaraTemas from "@/hooks/useCamaraTemas";
import useCamaraPropStatusCode from "@/hooks/useCamaraPropStatusCode";
import TagFilter from "@/components/filters/tag-filter";
import useCamaraAPI from "@/hooks/useCamaraAPI";
import LoadingAPI from "@/components/loading";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFileLines, faCalendar } from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";

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
  const temas = useCamaraTemas();
  const codStatus = useCamaraPropStatusCode();
  const [temasChecked, setTemasChecked] = useState([]);
  const [statusCodeChecked, setStatusCodeChecked] = useState([]);
  const [url, setUrl] = useState(`proposicoes?ordenarPor=ano&ordem=desc&idDeputadoAutor=${deputadoId}`)

  const { isLoading, result } = useCamaraAPI({
    url: url,
    subRequest: true,
    config: {
      subReqProxy: true
    }
  });

  useEffect(() => {
    const codTemas = temasChecked.length > 0
      ? `&codTema=${temasChecked.join(',')}` : '';
    const siglaTipo = statusCodeChecked.length > 0
      ? `&siglaTipo=${statusCodeChecked.join(',')}` : '';
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
        : <>
            {(result.length == 0 && (temasChecked.length > 0 || statusCodeChecked.length > 0)) && <h3>Nenhum resultado encontrado</h3>}
            {result.length  > 0 && result.map(item => <Link key={item.id} href={`/proposicoes/${item.id}`}>
              <ProposicaoData {...item} />
            </Link>)}
          </>}
    </div>
  </div>
}

export default DeputadoProposicoesList