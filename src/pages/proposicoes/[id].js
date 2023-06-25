import React, { useEffect, useState } from "react";
import useCamaraAPI, { fetchAPI } from "@/hooks/useCamaraAPI";
import LoadingAPI from "@/components/loading";
import Panel from "@/components/panel/panel";
import ProfilePhoto from "@/components/deputado/ProfilePhoto";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMars, faVenus, faPeopleGroup, faClockRotateLeft, faHandshake, faCheckToSlot, faCalendar, faClock, faHouse, faThumbsUp, faBan, faHands, faB } from "@fortawesome/free-solid-svg-icons";
import CamaraDoughnut from "@/components/charts/camara-doughnut";
import { VerticalTimeline, VerticalTimelineElement } from "react-vertical-timeline-component";
import 'react-vertical-timeline-component/style.min.css';
import style from './proposicoes.module.scss'
import InfoCarList from "@/components/apresentations/info-card-list";
import { reduceToObject } from "@/utils/common";

export const getServerSideProps = async ({query}) => {
  const resp = await fetch(`http://localhost:3000/api/camara/proposicoes/${query.id}`);
  const {dados, links} = await resp.json();
  const proposicao = dados;
  return {
    props:{
      ...proposicao
    }
  }
}

function ProposicaoTemas({id}) {
  const {
    isLoading, result
  } = useCamaraAPI({
    url: `proposicoes/${id}/temas`,
    config: {
      proxy: true,
    }
  })
  if (isLoading) {
    return <LoadingAPI />
  }
  return <ul className="flex flex-wrap">
    {result.map(tema => <li className="rounded-md bg-4 px-2 mr-1 text-sm" key={`proposition-tema-${tema.codTema}`}>{tema.tema}</li>)}
  </ul>
}

function ProposicaoAutores({id}) {
  const [autores, setAutores] = useState([]);
  const [filterSexo, setFilterSexo] = useState(['F', 'M']);
  const [filterPartidos, setFilterPartidos] = useState([]);

  const {
    isLoading, result
  } = useCamaraAPI({
    url: `proposicoes/${id}/autores`,
    subRequest: true,
    config: {
      proxy: true,
      subReqProxy: true
    }
  });

  useEffect(() => {
    if (!isLoading) {
      setAutores(result.filter((autor) => {
        console.log()
        return filterSexo.includes(autor.sexo) || (filterPartidos.length > 0 && filterPartidos.includes(autor.siglaPartido))
      }))
    }
  }, [isLoading, filterPartidos, filterSexo])

  if (isLoading) {
    return <LoadingAPI />
  }

  let autoresSummary = result.reduce((grupo, autor) => {
    if (grupo[autor.ultimoStatus.siglaPartido] == undefined) {
      grupo[autor.ultimoStatus.siglaPartido] = 0;
    }
    grupo[autor.ultimoStatus.siglaPartido]++
    return grupo
  }, {});

  if (filterPartidos.length === 0) {
    setFilterPartidos(Object.keys(autoresSummary));
  }  

  // Order object by quantity of autor by partido.
  const array = Object.entries(autoresSummary);
  array.sort((a, b) => b[1] - a[1]);
  autoresSummary = Object.fromEntries(array);

  return <div className="flex flex-wrap">
    <div className="w-full lg:w-1/2 flex flex-col lg:flex-row flex-wrap p-4 mb-1">
      <h3 onClick={() => setFilterSexo(['F'])} className="t2 t-primary w-1/2"><FontAwesomeIcon icon={faVenus} /> Mulheres {result.filter(({sexo}) => sexo === 'F').length}</h3>
      <h3 onClick={() => setFilterSexo(['M'])} className="t2 t-primary w-1/2"><FontAwesomeIcon icon={faMars} /> Homens {result.filter(({sexo}) => sexo === 'M').length}</h3>
      <CamaraDoughnut labels={Object.keys(autoresSummary)} values={Object.values(autoresSummary)} height={400} width={`80%`} />
    </div>
    <ul className="w-full lg:w-1/2 flex flex-wrap" style={{maxHeight: '500px', overflow: 'auto'}}>
      {autores.sort((a, b) => a.ordemAssinatura - b.ordemAssinatura).map(autor => {
        return <Link href={`/deputados/${autor.id}`} key={autor.id} className="w-1/2 lg:w-1/3">
          <ProfilePhoto foto={autor.ultimoStatus.urlFoto} alt={autor.nome} size="sm" />
          <h3>{autor.nome} - {autor.ultimoStatus.siglaPartido}</h3>
        </Link>
      })}
    </ul>
  </div>
}

function ProposicaoRelationship({id}) {
  const {
    isLoading, result
  } = useCamaraAPI({
    url: `proposicoes/${id}/relacionadas`
  });

  if (isLoading) {
    return <LoadingAPI />
  }
  else if (result.length === 0) {
    return <div className="text-center w-full h-40 flex justify-center items-center">
      <span className="t3 t-primary uppercase">Nenhum proposição relacionada</span>
    </div>
  }

  return <div className="flex flex-col lg:flex-row flex-wrap p-4">
    {result.map((p) => {
      return <div key={`proposition-rel-${p.id}`} className="w-full lg:w-1/2 mb-2">
        <Link href={`/proposicoes/${p.id}`}><InfoCarList text={p.ementa} smTitle={`${p.siglaTipo} - ${p.numero}`} /></Link>
      </div>
    })}
  </div>
}

function ProposicaoTramitacoes({id}) {
  const [showAll, setShowAll] = useState(false);
  const {
    isLoading, result
  } = useCamaraAPI({
    url: `proposicoes/${id}/tramitacoes`,
    config: {
      proxy: true
    }
  });

  if (isLoading) {
    return <LoadingAPI />
  }

  return <div className="flex flex-col">
    <div>
      <VerticalTimeline className={`${style.tramitacoes} ${showAll ? style.full : ''}`} animate={false}>
        {result.reverse().map((t,index) => {
          return <VerticalTimelineElement date={t.dataHora} key={`tramitacao-id-${index}`}>
            <h3 className="vertical-timeline-element-title t5">{t.descricaoTramitacao}</h3>
            <h4 className="vertical-timeline-element-subtitle text-sm t-black">{t.descricaoSituacao}</h4>
            <p style={{fontSize: '14px'}}>{t.despacho}</p>
          </VerticalTimelineElement>
        })}
      </VerticalTimeline>
      <div className={`${style.limit} ${showAll ? 'hidden' : ''}`}>
        <button onClick={() => setShowAll(true)}>Ver todas tramitações</button>
      </div>
    </div>    
  </div>
}

function VotacaoDetail({votacao, id}) {
  const [isLoading, setIsLoading] = useState(true);
  const [detail, setDetail] = useState(null);
  useEffect(() => {
    fetchAPI(votacao?.uri ?? `votacao/${id}`)
      .then(({data}) => {
        setIsLoading(false)
        setDetail(data);
      });
  }, [votacao, id]);

  if (isLoading) {
    return <LoadingAPI />
  }

  return <div className="lg:px-4">
    <h3 className="t4 t-primary">Resumo</h3>
    <p className="p-2 bg-white rounded-sm border border-color-1">{detail.descricao}</p>
    <h3 className="t6 t-primary">Último status: {detail.siglaOrgao} - {detail.ultimaApresentacaoProposicao.dataHoraRegistro}</h3>
    <p className="p-2 bg-white rounded-sm border border-color-1">
      {detail.descUltimaAberturaVotacao} {detail.ultimaApresentacaoProposicao.descricao}
    </p>
    <hr className="m-2" />
    {detail.siglaOrgao === 'CCJC' && <ProposicaoVotos votacao={votacao} />}
  </div>
  
}

function ProposicaoVotos({votacao, id}) {
  const [votesYes, setVotesYes] = useState([]);
  const [votesNo, setVotesNo] = useState([]);

  const {isLoading, result} = useCamaraAPI({
    url: `votacoes/${votacao?.id ?? id}/votos`,
    subRequest: true,
    config: {
      subReqProxy: true
    }
  });

  useEffect(() => {
    if (!isLoading) {
      const yes = [];
      const no = [];
      let porPartido = {};
      result.forEach((vot) => {
        // console.log(vot)
        if (vot.tipoVoto === "Sim") {
          yes.push({...vot, ...vot.deputado_})
        }
        else {
          no.push({...vot, ...vot.deputado_})
        }
      })
      setVotesNo(no)
      setVotesYes(yes)
    }
  }, [isLoading]);

  if (isLoading) {
    return <LoadingAPI />
  }

  return <div className="flex flex-col">
    <div className="w-full flex flex-wrap">
      <div className="w-full lg:w-1/2">
        {votesYes.length > 0 && 
          <CamaraDoughnut 
            title="A favor por partido"
            width={'80%'} 
            height={'400px'} 
            labels={Object.keys(reduceToObject(votesYes, 'siglaPartido'))} 
            values={Object.values(reduceToObject(votesYes, 'siglaPartido'))} 
            />
        }
      </div>
      <div className="w-full lg:w-1/2">
        {votesNo.length > 0 &&
          <CamaraDoughnut 
            title="Votos contra por partido"
            width={'80%'} 
            height={'400px'} 
            labels={Object.keys(reduceToObject(votesNo, 'siglaPartido'))} 
            values={Object.values(reduceToObject(votesNo, 'siglaPartido'))} 
            />
        }
      </div>
    </div>
    <div className="w-full  p-2">
      <h3 className="t4 t-primary text-center mb-2"><FontAwesomeIcon className="success" icon={faThumbsUp} /> Votaram a favor {!isLoading && `(${votesYes.length})`}</h3>
      <ul className="flex overflow-x-auto">
        {votesYes.map(d => <li key={d.id} className="mr-2 w-full">
          <ProfilePhoto name={d.nome} size="xs" foto={d.urlFoto} /></li>)}
      </ul>
    </div>
    <div className="w-full  p-2">
      <h3 className="t4 t-primary text-center mb-2"><FontAwesomeIcon className="danger" icon={faBan} /> Votaram contra {!isLoading && `(${votesNo.length})`}</h3>
      <ul className="flex overflow-x-auto">
        {votesNo.map(d => <li key={d.id} className="mr-2 w-full">
          <ProfilePhoto name={d.nome}  size="xs" foto={d.urlFoto} /></li>)}
      </ul>
    </div>
    <div className="flex flex-wrap">
      <div className="w-full lg:w-1/3">
        <CamaraDoughnut 
          title="Proporção sexo"
          width={'80%'} 
          height={'200px'} 
          labels={Object.keys(reduceToObject(result, 'sexo'))} 
          values={Object.values(reduceToObject(result, 'sexo'))} 
          />
      </div>
      <div className="w-full lg:w-1/3">
        {votesNo.length > 0 &&
          <CamaraDoughnut 
            title="Proporção sexo"
            width={'80%'} 
            height={'200px'} 
            labels={Object.keys(reduceToObject(result, 'sexo'))} 
            values={Object.values(reduceToObject(result, 'sexo'))} 
            />
        }
      </div>
      <div className="w-full lg:w-1/3">
        {votesNo.length > 0 &&
          <CamaraDoughnut 
            title="Proporção sexo"
            width={'80%'} 
            height={'200px'} 
            labels={Object.keys(reduceToObject(result, 'sexo'))} 
            values={Object.values(reduceToObject(result, 'sexo'))} 
            />
        }
      </div>
    </div>
  </div>
}

function ProposicaoVotacoes({id}) {
  const [votacao, setVotacao] = useState(null);
  const [votacaoInfo, setVotacaoInfo] = useState(null);
  const [votacaoCache, setVotacaoCache] = useState([]);
  const {isLoading, result} = useCamaraAPI({url: `proposicoes/${id}/votacoes`, config: {proxy: false}});

  useEffect(() => {
    if (!isLoading && votacao === null) {
      setVotacao(result[0])
    }
  }, [isLoading]);

  if (isLoading || votacao == null) {
    return <LoadingAPI />
  }

  return <div className="flex flex-wrap pl-2">
    <ul className="w-1/6 hidden lg:block">
      {result.map((vot) => {
        const statusVot = 
          vot.aprovacao === 1
          ? <h5><FontAwesomeIcon className="success" icon={faThumbsUp} /> Aprovada</h5>
          : <h5><FontAwesomeIcon className="danger" icon={faBan} /> Reprovada</h5>
        return <li onClick={() => setVotacao(vot)} key={`votacao-id-${vot.id}`} className="p-1 cursor-pointer rounded-sm text-sm t-primary border border-color-1 mb-2">
          <h5><FontAwesomeIcon icon={faCalendar} /> {vot.data}</h5>
          <h5><FontAwesomeIcon icon={faClock} /> {vot.dataHoraRegistro.slice(11, 22)}</h5>
          <h5><FontAwesomeIcon icon={faHouse} /> {vot.siglaOrgao}</h5>
          {statusVot}
        </li>
      })}
    </ul>
    <select className="w-full lg:hidden" onChange={(e) => setVotacao(result[e.target.value])}>
      {result.map((vot, index) => 
        <option key={`votacao-id-${vot.id}`} value={index} className="p-1 cursor-pointer rounded-sm text-sm t-primary border border-color-1 mb-2">
          {vot.aprovacao === 1 ? 'Aprovada' : 'Reprovada'} - {vot.data} - {vot.dataHoraRegistro.slice(11, 22)}
        </option>
      )}
    </select>
    <div className="w-full lg:w-5/6">
      <VotacaoDetail votacao={votacao} />
    </div>
  </div>
}

function ProposicaoPage(p) {
  return <>
    <div className="flex flex-wrap mb-4 p-2">
      <div className="w-full lg:w-2/5 flex flex-col border p-4 mb-4">
        <span className="t5 t-primary border-b py-1">{p.siglaTipo} - {p.descricaoTipo}</span>
        <span className="t5 t-primary border-b py-1">Apresentada em - {p.dataApresentacao}</span>
        <span className="t5 t-primary border-b py-1">Últ. Atualização - {p.statusProposicao.dataHora}</span>
        <span className="t5 t-primary border-b py-1">Tramitação: {p.statusProposicao.descricaoTramitacao}</span>
        <span className="t5 t-primary border-b py-1">Situação - {p.statusProposicao.descricaoSituacao}</span>
        <span className="t5 t-primary border-b py-1">Número - {p.numero}</span>
        <span className="t5 t-primary border-b py-1">Ano - {p.ano}</span>
        <h3 className="t5 t-primary border-b py-1">Palavras chaves</h3>
        <p className="text-sm">{p.keywords}</p>
      </div>
      <div className="w-full lg:w-3/5 px-4 flex flex-col justify-between mb-4">
        <div>
          <h3 className="t3 t-primary">Ementa do texto</h3>
          <p>{p.ementa}</p>
          <hr className="my-2" />
          <h4 className="t4 t-primary">Texto detalhado</h4>
          <p>{p.ementaDetalhada || 'Não informada!'}</p>
        </div>
        <div>
          <h3 className="t5 t-primary">Temas</h3>
          <ProposicaoTemas id={p.id} />
        </div>
      </div>
    </div>
    <Panel title="Autores" icon={<FontAwesomeIcon icon={faPeopleGroup} />}>
      <ProposicaoAutores id={p.id} />
    </Panel>
    <div className="mb-4"></div>
    <Panel right title="Tramitação" icon={<FontAwesomeIcon icon={faClockRotateLeft} />}>
      <ProposicaoTramitacoes id={p.id} />
    </Panel>
    <div className="mb-4"></div>
    <Panel title="Votações" icon={<FontAwesomeIcon icon={faCheckToSlot} />}>
      <ProposicaoVotacoes id={p.id} />
    </Panel>
    <div className="mb-4"></div>
    <Panel right title="Proposições Relacionadas" icon={<FontAwesomeIcon icon={faHandshake} />}>
      <ProposicaoRelationship id={p.id} />
    </Panel>
  </>
}

export default ProposicaoPage