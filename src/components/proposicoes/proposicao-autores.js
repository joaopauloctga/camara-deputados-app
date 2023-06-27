import React, { useEffect, useState } from "react";
import useCamaraAPI from "@/hooks/useCamaraAPI";
import CamaraDoughnut from '@/components/charts/camara-doughnut';
import LoadingAPI from "@/components/loading";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faVenus, faMars } from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";
import ProfilePhoto from "@/components/deputado/ProfilePhoto";
import PanelSeeMore from "../panel-see-more/panel-see-more";

function ProposicaoAutores({id}) {
  console.log('prop', id)
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
        return filterSexo.includes(autor.sexo) || (filterPartidos.length > 0 && filterPartidos.includes(autor.siglaPartido))
      }))
    }
  }, [isLoading, filterPartidos, filterSexo])

  if (isLoading) {
    return <LoadingAPI />
  }

  let autoresSummary = result.reduce((grupo, autor) => {
    console.log(autor)
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
    <div className="w-full lg:w-1/2">
      <PanelSeeMore maxHeight={500}>
        <ul className="flex flex-wrap">
          {autores.sort((a, b) => a.ordemAssinatura - b.ordemAssinatura).map(autor => {
            return <Link href={`/deputados/${autor.id}`} key={autor.id} className="w-1/2 lg:w-1/3">
              <ProfilePhoto foto={autor.ultimoStatus.urlFoto} alt={autor.nome} size="sm" />
              <h3>{autor.nome} - {autor.ultimoStatus.siglaPartido}</h3>
            </Link>
          })}
        </ul>
      </PanelSeeMore>
    </div>
  </div>
}

export default ProposicaoAutores;