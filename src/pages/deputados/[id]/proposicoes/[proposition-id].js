import React from "react";
import { useRouter } from "next/router";

function DeputadoProposicoesList() {
  const { query } = useRouter();
  return <h1>1 deputado {query.id} - proposition id{query['proposition-id']} </h1>
}

export default DeputadoProposicoesList