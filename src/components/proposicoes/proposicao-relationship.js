import React from "react";
import useCamaraAPI from "@/hooks/useCamaraAPI";
import LoadingAPI from "@/components/loading";
import Link from "next/link";
import InfoCarList from "@/components/apresentations/info-card-list";

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
    {result.map((p, index) => {
      return <div key={`proposition-rel-${index}`} className="w-full lg:w-1/2 mb-2">
        <Link href={`/proposicoes/${p.id}`}><InfoCarList text={p.ementa} smTitle={`${p.siglaTipo} - ${p.numero}`} /></Link>
      </div>
    })}
  </div>
}

export default ProposicaoRelationship;