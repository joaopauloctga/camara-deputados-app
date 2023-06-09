import React from "react";
import Panel from "@/components/panel/panel";
import InfoCardRounded from "@/components/apresentations/info-card-rounded";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBookOpen, faSitemap, faFlag, faBuilding, faChartPie, faCalendar } from "@fortawesome/free-solid-svg-icons";
import InfoCardTitle from "@/components/apresentations/info-card-title";
import InfoCarList from "@/components/apresentations/info-card-list";
import CamaraPie from "@/components/charts/camara-pie";
import CamaraBar from "@/components/charts/camara-bar";
import PaginationDate from "@/components/pagination-date";
import InfoCardTime from "@/components/apresentations/info-card-time";


const person = {
  name: 'Joao Paulo Constino',
  birthdate: '18/05/1992',
  email: 'joaopauloctga@gmail.com',
  address: 'Rua pedro vieira da silva',
  partido: 'PT',
  profilePhotoUrl: '123',
};

function PropositionItem({date, sigla, text}) {
  return (
    <div className="flex items-center mb-4">
      <div className="w-1/12 text-center">
        <h6>{sigla}</h6>
        <p>{date}</p>
      </div>
      <div className="w-11/12"><InfoCarList text={text} /></div>
    </div>
  )
}

function DeputadoPage({id}) {
  const { name, birthdate, email, address, partido, profilePhotoUrl } = person;

  const propositions = [
    {
      "date": "2022",
      "sigla": "ABC",
      "text": "Suprima-se do texto da Proposta de Emenda à Constituição nº 6, de 2019, os dispositivos ou expressões que alteram os requisitos de tempo de contribuição e/ou de idade mínima, as regras de transição e disposições transitórias, para a aposentadoria dos professores.."
    },
    {
      "date": "2020",
      "sigla": "XYZ",
      "text": "Suprima-se do texto da Proposta de Emenda à Constituição nº 6, de 2019, os dispositivos ou expressões que alteram os requisitos de tempo de contribuição e/ou de idade mínima, as regras de transição e disposições transitórias, para a aposentadoria dos professores."
    },
    {
      "date": "2019",
      "sigla": "DEF",
      "text": "Suprima-se do texto da Proposta de Emenda à Constituição nº 6, de 2019, os dispositivos ou expressões que alteram os requisitos de tempo de contribuição e/ou de idade mínima, as regras de transição e disposições transitórias, para a aposentadoria dos professores.Etiam ultricies nisi vel augue. Curabitur ullamcorper ultricies nisi."
    },
    {
      "date": "2021",
      "sigla": "GHI",
      "text": "Suspendisse feugiat sem sed velit. Integer malesuada commodo nulla."
    },
    {
      "date": "2018",
      "sigla": "JKL",
      "text": "Vestibulum facilisis, purus nec pulvinar iaculis, ligula mi congue nunc."
    }
  ];

  return <>
    <div className="flex">
      <div className="w-1/2">
        <img
            className="h-48 w-full object-cover"
            src={profilePhotoUrl}
            alt={`${name}'s profile`}
          />
      </div>
      <div className="w-1/2">
        <div className="uppercase tracking-wide text-sm text-indigo-500 font-semibold">
          {name}
        </div>
        <p className="text-gray-500 text-sm">{`Birthdate: ${birthdate}`}</p>
        <p className="text-gray-500 text-sm">{`Email: ${email}`}</p>
        <p className="text-gray-500 text-sm">{`Address: ${address}`}</p>
        <p className="text-gray-500 text-sm">{`Partido: ${partido}`}</p>
      </div>
    </div>

    
    <Panel title={'Proposições'} icon={<FontAwesomeIcon icon={faBookOpen} />}>
      <div className="flex">
        <div className="w-1/5">
          <div className="flex flex-col justify-evenly h-full">
            <InfoCardRounded title={'Projetos de sua autoria'} value='20' color={'bg-blue-500'} />
            <InfoCardRounded title={'Aprovadas'} value='6' color={'bg-blue-500'} />
          </div>
        </div>
        <div className="w-4/5">
          <div className="flex flex-col rounded-sm border-1 border-solid p-2">
            {propositions.map(p => <PropositionItem sigla={p.sigla} text={p.text} date={p.date} />)}
          </div>
        </div>
      </div>
    </Panel>

    <div className="m-8"></div>

    <Panel right title={'Atividade Parlamentar'} icon={<FontAwesomeIcon icon={faBookOpen} />}>
      <div className="flex flex-wrap justify-center items-center p-2">
        <div className="w-1/3">
          <InfoCardTitle title={'Orgãos Atuantes'} icon={faSitemap} />
        </div>
        <div className="w-1/3">
          <InfoCardTitle title={'Ocupações'} icon={faBuilding} />
        </div>
        <div className="w-1/3">
          <InfoCardTitle title={'Frentes'} icon={faFlag} />
        </div>
      </div>
      <div className="rounded-lg bg-white m-6 grid grid-gap-4 grid-cols-2 grid-rows-2">
        {[1,2,3,4].map(() => {
          return <div className="p-4">
            <InfoCarList 
              text="Comissão de Constituição e Justiça e de Cidadania"
              smTitle='CCJC'
              subText='15 Abril 2023 - Suplente' />
          </div>
        })}
      </div>
    </Panel>

    <div className="m-8"></div>

    <Panel title={'Despesas Parlamentares'} icon={<FontAwesomeIcon icon={faChartPie} />}>
      <div className="flex flex-wrap items-center justify-center">
        <div className="w-1/2 p-4">
          <CamaraPie height={400} width={600} />
        </div>
        <div className="w-1/2 p-4">
          <CamaraBar height={400} width={600} />
        </div>
      </div>
    </Panel>

    <div className="m-8"></div>

    <Panel right title={'Eventos'} icon={<FontAwesomeIcon icon={faCalendar} />}>
      <div className="flex">
        <div className="w-1/12 p-4">
          <PaginationDate startDate={new Date()} numDates={2} />
        </div>
        <div className="w-10/12 p-4">
          <div className="grid grid-cols-3 gap-3">
            <InfoCardTime time="8:00" title="Sessão Deliberativa" description="Plenário da Câmara dos Deputados"/>
            <InfoCardTime active time="8:00" title="Sessão Deliberativa" description="Plenário da Câmara dos Deputados"/>
            <InfoCardTime time="8:00" title="Sessão Deliberativa" description="Plenário da Câmara dos Deputados"/>
          </div>
          <p className="p-4 mt-4 bg-white rounded-md">
            In publishing and graphic design, Lorem ipsum is a placeholder text commonly used to demonstrate the visual form of a document or a typeface without relying on meaningful content. Lorem ipsum may be used as a placeholder before final copy is available.
            In publishing and graphic design, Lorem ipsum is a placeholder text commonly used to demonstrate the visual form of a document or a typeface without relying on meaningful content. Lorem ipsum may be used as a placeholder before final copy is available.

            In publishing and graphic design, Lorem ipsum is a placeholder text commonly used to demonstrate the visual form of a document or a typeface without relying on meaningful content. Lorem ipsum may be used as a placeholder before final copy is available.
          </p>
        </div>
        <div className="w-1/12 p-4">Resources</div>
      </div>
    </Panel>
  </>
}

export default DeputadoPage;