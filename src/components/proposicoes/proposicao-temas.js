import React from "react";
import Tags from "@/components/tags/tags";
import useCamaraAPI from "@/hooks/useCamaraAPI";
import LoadingAPI from "../loading";

function ProposicaoTemas({id}) {
  const {
    isLoading, result
  } = useCamaraAPI({
    url: `proposicoes/${id}/temas`,
  })
  if (isLoading) {
    return <LoadingAPI />
  }
  return <Tags emptyText={'Nenhum tema definido'} tags={result} keyValue="codTema" label="tema" />
}

export default ProposicaoTemas;