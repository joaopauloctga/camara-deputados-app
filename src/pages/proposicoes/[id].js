import React, { useEffect, useState } from "react";
import useCamaraAPI from "@/hooks/useCamaraAPI";
import LoadingAPI from "@/components/loading";
import Panel from "@/components/panel/panel";
import ProfilePhoto from "@/components/deputado/ProfilePhoto";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMars, faVenus, faPeopleGroup } from "@fortawesome/free-solid-svg-icons";
import CamaraDoughnut from "@/components/charts/camara-doughnut";

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

  if (filterPartidos.length ==0) {
    setFilterPartidos(Object.keys(autoresSummary));
  }  

  // Order object by quantity of autor by partido.
  const array = Object.entries(autoresSummary);
  array.sort((a, b) => b[1] - a[1]);
  autoresSummary = Object.fromEntries(array);

  return <div className="flex flex-wrap">
    <div className="w-1/2 flex flex-wrap p-4 mb-1">
      <h3 onClick={() => setFilterSexo(['F'])} className="t2 t-primary w-1/2"><FontAwesomeIcon icon={faVenus} /> Mulheres {result.filter(({sexo}) => sexo === 'F').length}</h3>
      <h3 onClick={() => setFilterSexo(['M'])} className="t2 t-primary w-1/2"><FontAwesomeIcon icon={faMars} /> Homens {result.filter(({sexo}) => sexo === 'M').length}</h3>
      <CamaraDoughnut labels={Object.keys(autoresSummary)} values={Object.values(autoresSummary)} height={400} width={`80%`} />
    </div>
    <ul className="w-1/2 flex flex-wrap" style={{maxHeight: '500px', overflow: 'auto'}}>
      {autores.sort((a, b) => a.ordemAssinatura - b.ordemAssinatura).map(autor => {
        return <Link href={`/deputados/${autor.id}`} key={autor.id} className="w-1/2 lg:w-1/3">
          <ProfilePhoto foto={autor.ultimoStatus.urlFoto} alt={autor.nome} size="sm" />
          <h3>{autor.nome} - {autor.ultimoStatus.siglaPartido}</h3>
        </Link>
      })}
    </ul>
  </div>
}

function ProposicaoPage(p) {
  return <>
    <div className="flex flex-wrap mb-4">
      <div className="w-2/5 flex flex-col border p-2">
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
      <div className="w-3/5 px-4 flex flex-col justify-between">
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
  </>
}

export default ProposicaoPage