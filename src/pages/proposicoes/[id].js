import React from "react";
import Panel from "@/components/panel/panel";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPeopleGroup, faClockRotateLeft, faHandshake, faCheckToSlot } from "@fortawesome/free-solid-svg-icons";
import ProposicaoTemas from "@/components/proposicoes/proposicao-temas";
import ProposicaoAutores from "@/components/proposicoes/proposicao-autores";
import ProposicaoRelationship from "@/components/proposicoes/proposicao-relationship";
import ProposicaoTramitacoes from "@/components/proposicoes/proposicao-tramitacoes";
import ProposicaoVotacoes from "@/components/proposicoes/proposicao-votacoes";

/**
 * Lista da proposicoes para testar
 * 
 * 2418080 - 198 autores.
 */

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