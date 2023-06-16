import Orgao from "./orgao";

export default {
  component: Orgao
};

export const OrgaosStory = {
  render: () => {
    const orgaos = [
      {
        "id": 2010,
        "uri": "https://dadosabertos.camara.leg.br/api/v2/orgaos/2010",
        "sigla": "CFT",
        "nome": "Comissão de Finanças e Tributação",
        "apelido": "Finanças e Tributação",
        "codTipoOrgao": 2,
        "tipoOrgao": "Comissão Permanente",
        "nomePublicacao": "Comissão de Finanças e Tributação",
        "nomeResumido": "Finanças e Tributação"
      },
      {
        "id": 180,
        "uri": "https://dadosabertos.camara.leg.br/api/v2/orgaos/180",
        "sigla": "PLEN",
        "nome": "Plenário",
        "apelido": "Plenário",
        "codTipoOrgao": 26,
        "tipoOrgao": "Plenário Virtual",
        "nomePublicacao": "Plenário",
        "nomeResumido": "Plenário"
      },
      {
        "id": 539429,
        "uri": "https://dadosabertos.camara.leg.br/api/v2/orgaos/539429",
        "sigla": "CPIFUTE",
        "nome": "Comissão Parlamentar de Inquérito destinada a investigar esquemas de manipulação de resultados em partidas de futebol profissional no Brasil",
        "apelido": "CPI - Manipulação de Resultado em Partidas de Futebol",
        "codTipoOrgao": 4,
        "tipoOrgao": "Comissão Parlamentar de Inquérito",
        "nomePublicacao": "CPI sobre a Manipulação de Resultado em Partidas de Futebol",
        "nomeResumido": "CPI Apostas Futebol"
      },
      {
        "id": 4,
        "uri": "https://dadosabertos.camara.leg.br/api/v2/orgaos/4",
        "sigla": "MESA",
        "nome": "Mesa Diretora da Câmara dos Deputados",
        "apelido": "Mesa Diretora",
        "codTipoOrgao": 1,
        "tipoOrgao": "Comissão Diretora",
        "nomePublicacao": "Mesa Diretora",
        "nomeResumido": null
    }
    ]
    return <div className="flex flex-wrap">
      {orgaos.map(orgao => <div className="w-1/2"><Orgao {...orgao} /></div>)}
    </div>
  }
}