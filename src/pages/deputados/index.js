import React, { useState } from 'react';
import Header from '@/app/header';

const DeputadosList = () => {
  const [deputados, setDeputados] = useState([
    {
        "id": 220593,
        "uri": "https://dadosabertos.camara.leg.br/api/v2/deputados/220593",
        "nome": "Abilio Brunini",
        "siglaPartido": "PL",
        "uriPartido": "https://dadosabertos.camara.leg.br/api/v2/partidos/37906",
        "siglaUf": "MT",
        "idLegislatura": 57,
        "urlFoto": "https://www.camara.leg.br/internet/deputado/bandep/220593.jpg",
        "email": "dep.abiliobrunini@camara.leg.br"
    },
    {
        "id": 204379,
        "uri": "https://dadosabertos.camara.leg.br/api/v2/deputados/204379",
        "nome": "Acácio Favacho",
        "siglaPartido": "MDB",
        "uriPartido": "https://dadosabertos.camara.leg.br/api/v2/partidos/36899",
        "siglaUf": "AP",
        "idLegislatura": 57,
        "urlFoto": "https://www.camara.leg.br/internet/deputado/bandep/204379.jpg",
        "email": "dep.acaciofavacho@camara.leg.br"
    },
    {
        "id": 220714,
        "uri": "https://dadosabertos.camara.leg.br/api/v2/deputados/220714",
        "nome": "Adail Filho",
        "siglaPartido": "REPUBLICANOS",
        "uriPartido": "https://dadosabertos.camara.leg.br/api/v2/partidos/37908",
        "siglaUf": "AM",
        "idLegislatura": 57,
        "urlFoto": "https://www.camara.leg.br/internet/deputado/bandep/220714.jpg",
        "email": "dep.adailfilho@camara.leg.br"
    },
    {
        "id": 221328,
        "uri": "https://dadosabertos.camara.leg.br/api/v2/deputados/221328",
        "nome": "Adilson Barroso",
        "siglaPartido": "PL",
        "uriPartido": "https://dadosabertos.camara.leg.br/api/v2/partidos/37906",
        "siglaUf": "SP",
        "idLegislatura": 57,
        "urlFoto": "https://www.camara.leg.br/internet/deputado/bandep/221328.jpg",
        "email": "dep.adilsonbarroso@camara.leg.br"
    },
    {
        "id": 204560,
        "uri": "https://dadosabertos.camara.leg.br/api/v2/deputados/204560",
        "nome": "Adolfo Viana",
        "siglaPartido": "PSDB",
        "uriPartido": "https://dadosabertos.camara.leg.br/api/v2/partidos/36835",
        "siglaUf": "BA",
        "idLegislatura": 57,
        "urlFoto": "https://www.camara.leg.br/internet/deputado/bandep/204560.jpg",
        "email": "dep.adolfoviana@camara.leg.br"
    },
    {
        "id": 204528,
        "uri": "https://dadosabertos.camara.leg.br/api/v2/deputados/204528",
        "nome": "Adriana Ventura",
        "siglaPartido": "NOVO",
        "uriPartido": "https://dadosabertos.camara.leg.br/api/v2/partidos/37901",
        "siglaUf": "SP",
        "idLegislatura": 57,
        "urlFoto": "https://www.camara.leg.br/internet/deputado/bandep/204528.jpg",
        "email": "dep.adrianaventura@camara.leg.br"
    },
    {
        "id": 121948,
        "uri": "https://dadosabertos.camara.leg.br/api/v2/deputados/121948",
        "nome": "Adriano do Baldy",
        "siglaPartido": "PP",
        "uriPartido": "https://dadosabertos.camara.leg.br/api/v2/partidos/37903",
        "siglaUf": "GO",
        "idLegislatura": 57,
        "urlFoto": "https://www.camara.leg.br/internet/deputado/bandep/121948.jpg",
        "email": "dep.adrianodobaldy@camara.leg.br"
    },
    {
        "id": 74646,
        "uri": "https://dadosabertos.camara.leg.br/api/v2/deputados/74646",
        "nome": "Aécio Neves",
        "siglaPartido": "PSDB",
        "uriPartido": "https://dadosabertos.camara.leg.br/api/v2/partidos/36835",
        "siglaUf": "MG",
        "idLegislatura": 57,
        "urlFoto": "https://www.camara.leg.br/internet/deputado/bandep/74646.jpg",
        "email": "dep.aecioneves@camara.leg.br"
    },
    {
        "id": 136811,
        "uri": "https://dadosabertos.camara.leg.br/api/v2/deputados/136811",
        "nome": "Afonso Hamm",
        "siglaPartido": "PP",
        "uriPartido": "https://dadosabertos.camara.leg.br/api/v2/partidos/37903",
        "siglaUf": "RS",
        "idLegislatura": 57,
        "urlFoto": "https://www.camara.leg.br/internet/deputado/bandep/136811.jpg",
        "email": "dep.afonsohamm@camara.leg.br"
    },
    {
        "id": 178835,
        "uri": "https://dadosabertos.camara.leg.br/api/v2/deputados/178835",
        "nome": "Afonso Motta",
        "siglaPartido": "PDT",
        "uriPartido": "https://dadosabertos.camara.leg.br/api/v2/partidos/36786",
        "siglaUf": "RS",
        "idLegislatura": 57,
        "urlFoto": "https://www.camara.leg.br/internet/deputado/bandep/178835.jpg",
        "email": "dep.afonsomotta@camara.leg.br"
    }
]);

  return (
    <>
      <div className="flex flex-wrap">
        {deputados.map((deputado) => (
          <div key={deputado.id} className="w-full sm:w-1/2 md:w-1/4 lg:w-1/4 xl:w-1/4 p-4">
            <p>ID: {deputado.id}</p>
            <p>Nome: {deputado.nome}</p>
            <p>Sigla do Partido: {deputado.siglaPartido}</p>
          </div>
        ))}
        </div>
      </>
  );
};

export default DeputadosList;