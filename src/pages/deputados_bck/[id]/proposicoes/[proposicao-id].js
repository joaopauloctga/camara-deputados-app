import React from "react";
import ProposicaoPage from "@/pages/proposicoes/[id]";

export const getServerSideProps = async (context) => {
  const {query} = context;
  const resp = await fetch(`http://localhost:3000/api/camara/proposicoes/${query['proposicao-id']}`);
  const {dados, links} = await resp.json();
  return {
    props: {
      ...dados
    }
  }
}

function DeputadoProposicao(p) {
  return <ProposicaoPage {...p} />
}

export default DeputadoProposicao;