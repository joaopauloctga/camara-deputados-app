import React, { useEffect, useState } from "react";
import useCamaraAPI from "@/hooks/useCamaraAPI";
import CamaraDoughnut from '@/components/charts/camara-doughnut';
import LoadingAPI from "@/components/loading";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faVenus, faMars } from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";
import ProfilePhoto from "@/components/deputado/ProfilePhoto";
import PanelSeeMore from "../panel-see-more/panel-see-more";
import InfoCarList from "../apresentations/info-card-list";

function DeputadoAutor({autor}) {
  return <ProfilePhoto name={`${autor.nome} - ${autor.ultimoStatus.siglaPartido}`} foto={autor.ultimoStatus.urlFoto} alt={autor.nome} size="sm" />
}

function OrgaoAutor({orgao}) {
  return <InfoCarList smTitle={orgao.tipoOrgao} text={orgao.nome} subText={orgao.sigla} />
}

function Autor({autor}) {
  if (autor.tipo === 'Deputado') {
    return <DeputadoAutor autor={autor} />
  }
  return <OrgaoAutor orgao={autor} />
}

function ProposicaoAutores({id}) {
  const [autores, setAutores] = useState([]);
  const [filterSexo, setFilterSexo] = useState(['F', 'M']);
  const [filterPartidos, setFilterPartidos] = useState([]);

  const {
    isLoading, result
  } = useCamaraAPI({
    url: `proposicoes/${id}/autores`,
    subRequest: true
  });

  useEffect(() => {
    if (!isLoading) {
      // @todo tratar cenario de autor ser orgao
      // const filtered = result.filter((autor) => {
      //   return filterSexo.includes(autor.sexo) || (filterPartidos.length > 0 && filterPartidos.includes(autor.siglaPartido))
      // })
      // console.log(filtered)
      setAutores(result)
    }
  }, [isLoading, filterPartidos, filterSexo])

  if (isLoading) {
    return <LoadingAPI />
  }

  console.log(result)

  let autoresSummary = result.reduce((grupo, autor) => {
    const key = autor.tipo === 'Deputado'
      ? autor.ultimoStatus.siglaPartido
      : autor.sigla;

    if (grupo[key] == undefined) {
      grupo[key] = 0;
    }
    grupo[key]++
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
            return <li key={autor.id}><Autor autor={autor} /></li>
          })}
        </ul>
      </PanelSeeMore>
    </div>
  </div>
}

export default ProposicaoAutores;