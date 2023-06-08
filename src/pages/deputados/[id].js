import React from "react";
import Panel from "@/components/panel/panel";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBookOpen, faSitemap, faFlag, faBuilding } from "@fortawesome/free-solid-svg-icons";


const person = {
  name: 'Joao Paulo Constino',
  birthdate: '18/05/1992',
  email: 'joaopauloctga@gmail.com',
  address: 'Rua pedro vieira da silva',
  partido: 'PT',
  profilePhotoUrl: '123',
};

function InfoCard({ title, value, color }) {
  return (
    <div className="flex flex-col items-center">
      <div className="mb-4">
        <p className="font-bold">{title}</p>
      </div>
      <div className={`w-8 h-8 rounded-full ml-2 ${color} t-circle`}>
        <p className="text-white flex items-center justify-center h-full t2">{value}</p>
      </div>
    </div>
  );
}

function PropositionItem({date, sigla, text}) {
  return (
    <>
      <div className="flex items-center justify-items-center mb-4">
        <div className="w-1/12 text-center">
          <h6>{sigla}</h6>
          <p>{date}</p>
        </div>
        <div className="border-2 border-color-primary m-2" style={{height: '80px'}}></div>
        <div className="w-11/12">
          <p className="">{text}</p>
        </div>
      </div>
    </>
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
            <InfoCard title={'Projetos de sua autoria'} value='20' color={'bg-blue-500'} />
            <InfoCard title={'Aprovadas'} value='6' color={'bg-blue-500'} />
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
          <div className="flex items-center justify-center text-white">
            <div className="t-icon mr-4">
              <FontAwesomeIcon icon={faSitemap} />
            </div>
            <h3 className="t3">Orgãos Atuantes</h3>
          </div>
        </div>
        <div className="w-1/3">
        <div className="flex items-center justify-center text-white">
            <div className="t-icon mr-4">
              <FontAwesomeIcon icon={faBuilding} />
            </div>
            <h3 className="t3">Ocupações</h3>
          </div>
        </div>
        <div className="w-1/3">
        <div className="flex items-center justify-center text-white">
            <div className="t-icon mr-4">
              <FontAwesomeIcon icon={faFlag} />
            </div>
            <h3 className="t3">Frentes</h3>
          </div>
        </div>
      </div>
      <div className="rounded-lg bg-white m-6 grid grid-gap-4 grid-cols-2 grid-rows-2">
        {[1,2,3,4].map(() => {
          return <div className="p-4">
            <div className="border-l-4 border-color-primary p-2">
              <p className="underline decoration-solid text-xs">CCJC</p>
              <p>Comissão de Constituição e Justiça e de Cidadania </p>
              <p className="underline decoration-solid text-xs">15 Abril 2023 - Suplente</p>
            </div>
          </div>
        })}
      </div>
    </Panel>
  </>
}

export default DeputadoPage;