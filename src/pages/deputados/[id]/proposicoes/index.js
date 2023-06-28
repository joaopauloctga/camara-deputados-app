import React, { useEffect, useState } from "react";
import ProposicoesList from "@/components/proposicoes/proposicoes-list";

export const getServerSideProps = async ({query}) => {
  const { id } = query;
  return {
    props: {
      deputadoId: id,
    }
  }
}

function DeputadoProposicoesList({deputadoId}) {
  return <ProposicoesList deputadoId={deputadoId} />
}

export default DeputadoProposicoesList