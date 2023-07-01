import { useState } from 'react';
import Events from './Events';

const events = [
  {
      "id": 67937,
      "uri": "https://dadosabertos.camara.leg.br/api/v2/eventos/67937",
      "dataHoraInicio": "2023-06-15T13:30",
      "dataHoraFim": null,
      "situacao": "Convocada",
      "descricaoTipo": "Audiência Pública",
      "descricao": "Importância da Receita Federal para o desenvolvimento do Brasil\r\n (Requerimento nº 6, de 2023, da deputada Erika Kokay, subscrito pela deputada Carol Dartora)\r\n\r\nPALESTRANTES:\r\n\r\nROBINSON SAKIYAMA BARREIRINHAS \r\nSecretário especial da Receita Federal do Brasil\r\n(Presença confirmada)\r\n\r\nGEORGE ALEX LIMA DE SOUZA \r\nPresidente da Delegacia Sindical de Brasília do Sindicato Nacional dos Auditores-Fiscais da Receita Federal do Brasil (DS Brasília - Sindifisco Nacional)\r\n(Presença confirmada)\r\n\r\nMAURO SILVA \r\nPresidente da Associação Nacional dos Auditores Fiscais da Receita Federal do Brasil (Unafisco Nacional)\r\n(Presença confirmada)\r\n\r\nTHALES FREITAS ALVES\r\nPresidente do Sindicato Nacional dos Analistas-Tributários da Receita Federal do Brasil (Sindireceita)\r\n(Presença confirmada)\r\n\r\nVILSON ANTONIO ROMERO\r\nPresidente da Associação Nacional dos Auditores Fiscais da Receita Federal do Brasil (Anfip)\r\n(Presença confirmada)\r\n\r\nTIAGO BARBOSA DE PAIVA ALMEIDA\r\n1º vice-presidente do Sindicato Nacional dos Auditores-Fiscais da Receita Federal do Brasil (Sindifisco Nacional), representando o presidente da entidade, Isac Falcão\r\n(Presença confirmada)\r\n\r\nFERNANDO HADDAD \r\nMinistro da Fazenda\r\n(Não comparecerá)",
      "localExterno": null,
      "orgaos": [
          {
              "id": 539388,
              "uri": "https://dadosabertos.camara.leg.br/api/v2/orgaos/539388",
              "sigla": "CASP",
              "nome": "Comissão de Administração e Serviço Público",
              "apelido": "Administração e Serviço Público",
              "codTipoOrgao": 2,
              "tipoOrgao": "Comissão Permanente",
              "nomePublicacao": "Comissão de Administração e Serviço Público",
              "nomeResumido": "Serviço Público"
          }
      ],
      "localCamara": {
          "nome": "Anexo II, Plenário 08",
          "predio": null,
          "sala": null,
          "andar": null
      },
      "urlRegistro": null
  },
  {
      "id": 68316,
      "uri": "https://dadosabertos.camara.leg.br/api/v2/eventos/68316",
      "dataHoraInicio": "2023-06-15T09:00",
      "dataHoraFim": null,
      "situacao": "Em Andamento",
      "descricaoTipo": "Audiência Pública",
      "descricao": "Impactos da Reforma Tributária na Educação\r\n REQ nº 110/2023, de autoria da Deputada Socorro Neri (PP-AC), subscrito pelos Deputados Capitão Alberto Neto e Abilio Brunini, e REQ nº 111/2023, de autoria do Deputado Capitão Alberto Neto (PL-AM), subscrito pelos Deputados Capitão Alberto Neto e Abilio Brunini.\r\n\r\nConvidados:\r\n\r\nADALTON ROCHA DE MATOS - presença confirmada\r\nSubsecretário de Planejamento e Orçamento do Ministério da Educação - SPO/MEC \r\n\r\nMANOEL PROCÓPIO JÚNIOR - presença confirmada\r\nDiretor da Secretaria Extraordinária da Reforma Tributária\r\n\r\nJULIANO GRIEBELER - presença confirmada\r\nVice-Presidente da Associação Nacional das Universidades Particulares\r\n\r\nJOSÉ ÂNGELO XAVIER DE OLIVEIRA - presença confirmada\r\nPresidente da Associação Brasileira de Livros e Conteúdos Educacionais - Abrelivros\r\n\r\nLUIZ GUSTAVO BICHARA -  presença confirmada\r\nConsultor Jurídico da  Associação Brasileira da Educação Básica Privada - Abreduc\r\n\r\nRODRIGO CAPELATO - presença confirmada\r\nDiretor do Sindicato das Entidades Mantenedoras de Estabelecimentos de Ensino Superior no Estado de São Paulo - Semesp\r\n\r\nEMERSON CASALI - presença confirmada\r\nConsultor Institucional do Fórum das Entidades Representativas do Ensino Superior Particular\r\n\r\nDANTE CID -  presença confirmada\r\nPresidente do Sindicato Nacional de Editores de Livros - Snel",
      "localExterno": null,
      "orgaos": [
          {
              "id": 2009,
              "uri": "https://dadosabertos.camara.leg.br/api/v2/orgaos/2009",
              "sigla": "CE",
              "nome": "Comissão de Educação",
              "apelido": "Educação",
              "codTipoOrgao": 2,
              "tipoOrgao": "Comissão Permanente",
              "nomePublicacao": "Comissão de Educação",
              "nomeResumido": "Educação"
          }
      ],
      "localCamara": {
          "nome": "Anexo II, Plenário 10",
          "predio": null,
          "sala": null,
          "andar": null
      },
      "urlRegistro": "https://www.youtube.com/watch?v=MggVfXhBZwA"
  },
  {
      "id": 68365,
      "uri": "https://dadosabertos.camara.leg.br/api/v2/eventos/68365",
      "dataHoraInicio": "2023-06-15T14:00",
      "dataHoraFim": null,
      "situacao": "Convocada",
      "descricaoTipo": "Audiência Pública",
      "descricao": "Combate ao Trabalho Infantil\r\n REUNIÃO DE AUDIÊNCIA PÚBLICA\r\n(Requerimento nº 33/2023, do Deputado Túlio Gadêlha)          \r\n\r\nTEMA\r\n\r\n\"Requer a realização de audiência pública na Comissão Trabalho para debater o combate ao trabalho infantil no Brasil \"\r\n\r\nCONVIDADOS\r\n\r\n\r\nROSEMARIE DIEDRICHS PIMPÃO\r\nDesembargadora do Tribunal Regional do Trabalho da 9ª Região (PR), Gestora Nacional para a Região Sul do Programa de Combate ao Trabalho Infantil e de Estímulo à Aprendizagem\r\n\r\nANA MARIA VILLA REAL\r\nProcuradora do Ministério Público do Trabalho - MPT.\r\n\r\nDENISE NATALINA BRAMBILLA GONZÁLEZ\r\nAuditora do Ministério do Trabalho.\r\n\r\nKATERINA VOLCOV\r\nFórum Nacional de Prevenção e Erradicação do Trabalho Infantil-FNPETI\r\n\r\nANTÔNIO CARLOS DE MELLO ROSA\r\nFórum de Prevenção e Erradicação do Trabalho Infantil e Proteção ao Trabalhador Adolescente do Distrito Federal.\r\n\r\nPATRÍCIA LIMA\r\nPresidente do Instituto Trabalho Decente - ITD\r\n\r\nCLÁUDIO AUGUSTO VIEIRA DA SILVA\r\nSecretário Nacional dos Direitos da Criança e do Adolescente - MDH\r\n\r\nMARINALVA CARDOSO DANTAS\r\nRepresentante do Sindicato Nacional dos Auditores Fiscais do Trabalho - SINAIT\r\n\r\nVALTER SOUZA PUGLIESI\r\nVice-Presidente da Anamatra\r\n\r\nEDJANE RODRIGUES\r\nSecretária de Políticas Sociais da CONTAG",
      "localExterno": null,
      "orgaos": [
          {
              "id": 2015,
              "uri": "https://dadosabertos.camara.leg.br/api/v2/orgaos/2015",
              "sigla": "CTRAB",
              "nome": "Comissão de Trabalho",
              "apelido": "Trabalho",
              "codTipoOrgao": 2,
              "tipoOrgao": "Comissão Permanente",
              "nomePublicacao": "Comissão de Trabalho",
              "nomeResumido": "Trabalho"
          }
      ],
      "localCamara": {
          "nome": "Anexo II, Plenário 12",
          "predio": null,
          "sala": null,
          "andar": null
      },
      "urlRegistro": null
  },
  {
      "id": 68379,
      "uri": "https://dadosabertos.camara.leg.br/api/v2/eventos/68379",
      "dataHoraInicio": "2023-06-15T10:00",
      "dataHoraFim": null,
      "situacao": "Convocada",
      "descricaoTipo": "Audiência Pública",
      "descricao": "debate sobre a criação do Sistema Único de Mobilidade e da tarifa zero no transporte público\r\n LÚCIO  GREGORI | Ex-Secretário de Obras da Prefeitura de São Paulo; (participação confirmada)\r\nCLEOMAR MANHAS | Instituto de Estudos Socioeconômicos- Inesc; (participação confirmada)\r\nCELSO HADDAD | Presidente da Empresa Pública de Transporte da Prefeitura de Maricá/RJ; (participação confirmada)\r\nNEIVA LOPES | Secretária de Comunicação e Mobilização do Sindmetrô-DF; (Participação confirmada)\r\nMILLENA NASCIMENTO |  Movimento Passe Livre; (participação confirmada)\r\nDENIS EDUARDO ANDIA | Secretário Nacional de MobilidadeMinistério das Cidades.\r\n\r\n\r\n\r\nRequerimento nº 92/2023 - das Deputadas Luiza Erundina e Luizianne Lins",
      "localExterno": null,
      "orgaos": [
          {
              "id": 2007,
              "uri": "https://dadosabertos.camara.leg.br/api/v2/orgaos/2007",
              "sigla": "CDHMIR",
              "nome": "Comissão de Direitos Humanos, Minorias e Igualdade Racial",
              "apelido": "Direitos Humanos, Minorias e Igualdade Racial",
              "codTipoOrgao": 2,
              "tipoOrgao": "Comissão Permanente",
              "nomePublicacao": "Comissão de Direitos Humanos, Minorias e Igualdade Racial",
              "nomeResumido": "Direitos Humanos"
          },
          {
              "id": 5438,
              "uri": "https://dadosabertos.camara.leg.br/api/v2/orgaos/5438",
              "sigla": "CLP",
              "nome": "Comissão de Legislação Participativa",
              "apelido": "Legislação Participativa",
              "codTipoOrgao": 2,
              "tipoOrgao": "Comissão Permanente",
              "nomePublicacao": "Comissão de Legislação Participativa",
              "nomeResumido": "Legislação Participativa"
          }
      ],
      "localCamara": {
          "nome": "Anexo II, Plenário 09",
          "predio": null,
          "sala": null,
          "andar": null
      },
      "urlRegistro": null
  },
  {
      "id": 68415,
      "uri": "https://dadosabertos.camara.leg.br/api/v2/eventos/68415",
      "dataHoraInicio": "2023-06-15T10:00",
      "dataHoraFim": null,
      "situacao": "Cancelada",
      "descricaoTipo": "Seminário",
      "descricao": "Ponte Binacional Guajará-Mirim/RO - Guayarámerín/Bolívia\r\n (REQ 55/2023 CVT, do deputado Maurício Carvalho)\r\n\r\nConvidados:\r\n\r\n. ALLAN MAGALHÃES MACHADO - Diretor de Obras Públicas da Secretaria Nacional de Transporte Rodoviário - SNTR, representando o Ministério dos Transportes; (Confirmado).\r\n\r\n. MARCOS ROCHA - Governador do Estado de Rondônia;\r\n\r\n. MARCELO CRUZ - Presidente da Assembleia Legislativa do Estado de Rondônia;\r\n\r\n. RAISSA PAES - Prefeita de Guajará - Mirim - RO;\r\n\r\n. MARCÉLIO BRASILEIRO - Prefeito de Nova Mamoré - RO;\r\n\r\n. HILDON CHAVES - Prefeito de Porto Velho - RO;\r\n\r\n. ANGEL FREDDY MAIMURA REINA - Alcaide de Guayaramerin;\r\n\r\n. JERGES JUSTINIANO TALAVERA - Embaixador da Bolívia no Brasil;\r\n\r\n. JOÃO VANDERLEI DE MELO - Presidente da Câmara de Vereadores da Guajará-Mirim - RO;\r\n\r\n. ANDRÉ LUIZ BAIER - Presidente da Câmara de Vereadores de Nova Mamoré - RO; (Confirmado)\r\n\r\n. MÁRCIO PACELE - Presidente da Câmara de Vereadores de Porto Velho - RO;\r\n\r\n. ALEJANDRO UNZUETA - Governador do Departamento de Beni;\r\n\r\n. ROGELIO MAYTA - Ministro das Relações Exteriores da Bolívia;\r\n\r\n. EDGAR MONTAÑO - Ministro das Obras Públicas, Serviços e Habitação da Bolívia.",
      "localExterno": "Assembleia Legislativa do Estado de Rondônia",
      "orgaos": [
          {
              "id": 2016,
              "uri": "https://dadosabertos.camara.leg.br/api/v2/orgaos/2016",
              "sigla": "CVT",
              "nome": "Comissão de Viação e Transportes",
              "apelido": "Viação e Transportes",
              "codTipoOrgao": 2,
              "tipoOrgao": "Comissão Permanente",
              "nomePublicacao": "Comissão de Viação e Transportes",
              "nomeResumido": "Viação e Transportes"
          }
      ],
      "localCamara": {
          "nome": null,
          "predio": null,
          "sala": null,
          "andar": null
      },
      "urlRegistro": null
  },
  {
      "id": 68431,
      "uri": "https://dadosabertos.camara.leg.br/api/v2/eventos/68431",
      "dataHoraInicio": "2023-06-15T11:00",
      "dataHoraFim": null,
      "situacao": "Convocada",
      "descricaoTipo": "Audiência Pública",
      "descricao": "Diretrizes para a modernização do futebol no Brasil\r\n Audiência Pública para discutir diretrizes para a modernização do futebol no Brasil, em atenção ao Requerimento nº 45/2023, de autoria do deputado Bandeira de Mello.\r\n\r\nConvidados confirmados:\r\nSr. Alcino Reis Rocha, secretário Geral da Confederação Brasileira de Futebol - CBF (presencial);\r\nSr. Lucio Flavio Vale da Silva, chefe de gabinete da Secretaria Nacional de Futebol  Defesa dos Direitos do Torcedor do Ministério do Esporte (presencial);\r\nSr. Emanuel Medeiros, CEO da Sport Integrity Global Aliance -  SIGA (presencial); \r\n\r\nAguardando confirmação:\r\nSra. Daniela Castro, representante da Pacto pelo Esporte;\r\nSr. Rubem Cesar, representante da Academia Pérolas Negras.",
      "localExterno": null,
      "orgaos": [
          {
              "id": 539425,
              "uri": "https://dadosabertos.camara.leg.br/api/v2/orgaos/539425",
              "sigla": "SUBMOFUT",
              "nome": "Subcomissão Especial da Modernização do Futebol",
              "apelido": "CESPO - Subcomissão Especial da Modernização do Futebol",
              "codTipoOrgao": 25,
              "tipoOrgao": "Subcomissão",
              "nomePublicacao": "Subcomissão Especial da Modernização do Futebol (CESPO/SUBMOFUT)",
              "nomeResumido": "Futebol"
          }
      ],
      "localCamara": {
          "nome": "Anexo II, Plenário 04",
          "predio": null,
          "sala": null,
          "andar": null
      },
      "urlRegistro": null
  },
  {
      "id": 68432,
      "uri": "https://dadosabertos.camara.leg.br/api/v2/eventos/68432",
      "dataHoraInicio": "2023-06-15T14:00",
      "dataHoraFim": null,
      "situacao": "Convocada",
      "descricaoTipo": "Audiência Pública",
      "descricao": "Proposta de ratificação da Convenção 190 da Organização Internacional do Trabalho (OIT) - tratado que reconhece o direito de todas as pessoas a um mundo de trabalho livre de violência e assédio\r\n Participantes convidados (as):\r\n\r\nDENISE MOTA DAU\r\n\nSecretária Nacional de Enfrentamento à Violência contra as Mulheres do Ministério das Mulheres (Confirmada)\r\n\r\nLUCIANA MARIA DE MELO \r\nRepresentante da Internacional de Serviços Públicos - ISP (Confirmada)\r\n\r\nCHRISTOPH HEUSER\r\nRepresentante da Fundação Friedrich Ebert no Brasil (Confirmado)\r\n\r\nVINICIUS PINHEIRO\r\nRepresentante da Organização Internacional do Trabalho - OIT (Confirmado)\r\n\r\nLUCIANA VELOSO BARUKI\r\nAuditora Fiscal do Trabalho, representante do Ministério do Trabalho e Emprego (Confirmada)\r\n\r\nSÔNIA MARIA ZERINO\r\nRepresentante do Fórum de Mulheres das Centrais Sindicais (Confirmada)\r\n\r\nMELÍCIA ALVES DE CARVALHO MESEL\r\nCoordenadora Nacional da Coordenadoria de Promoção da Igualdade de Oportunidades e Eliminação da Discriminação no Trabalho (Coordigualdade) - Ministério Público do Trabalho (Confirmada)\r\n\r\nROSÂNGELA SILVA RASSY\r\nDiretora do Sindicato Nacional dos Auditores Fiscais do Trabalho - SINAIT (Confirmada)\r\n\r\n\r\nRequerimento 23/2023-Cmulher, da deputada Juliana Cardoso",
      "localExterno": null,
      "orgaos": [
          {
              "id": 537870,
              "uri": "https://dadosabertos.camara.leg.br/api/v2/orgaos/537870",
              "sigla": "CMULHER",
              "nome": "Comissão de Defesa dos Direitos da Mulher",
              "apelido": "Defesa dos Direitos da Mulher",
              "codTipoOrgao": 2,
              "tipoOrgao": "Comissão Permanente",
              "nomePublicacao": "Comissão de Defesa dos Direitos da Mulher",
              "nomeResumido": "Mulher"
          }
      ],
      "localCamara": {
          "nome": "Anexo II, Plenário 14",
          "predio": null,
          "sala": null,
          "andar": null
      },
      "urlRegistro": null
  },
  {
      "id": 68451,
      "uri": "https://dadosabertos.camara.leg.br/api/v2/eventos/68451",
      "dataHoraInicio": "2023-06-15T10:00",
      "dataHoraFim": null,
      "situacao": "Convocada",
      "descricaoTipo": "Audiência Pública",
      "descricao": "A participação do Brasil na 10º Conferência das Partes (COP10), da Convenção-Quadro para Controle do Tabaco (CQCT)\r\n Convidados:\r\n\r\n1) Ministério da Saúde - MS (não participará)\r\n\r\n2) MATHEUS MACHADO DE CARVALHO, chefe da divisão de saúde global do Ministério das Relações Exteriores - MRE (confimada participação online);\r\n\r\n3) CLECIVALDO SOUSA RIBEIRO, coordenador-geral de produção vegetal do Ministério da Agricultura e Pecuária - MAPA (confirmada participação online); \r\n\r\n4) MANOEL JOSÉ DINIZ MENDONÇA, Coordenador de Fomento à Assistência Técnica e Extensão Rural, do Ministério do Desenvolvimento Agrário e Agricultura Familiar - MDA (confirmado);\r\n\r\n5) BENÍCIO ALBANO WERNER, presidente da Associação dos Fumicultores do Brasil - AFUBRA (confirmado);\r\n\r\n6) CARLOS JOEL DA SILVA, presidente da Federação dos Trabalhadores na Agricultura no Rio Grande do Sul - FETAG-RS (confirmada participação online);\r\n\r\n7) GIUSEPPE LOBO, diretor-executivo da Associação Brasileira da Indústria do Fumo - ABIFUMO (confirmado);\r\n\r\n8) IRO SCHÜNKE, presidente do Sindicato Interestadual da Indústria do Tabaco - SINDITABACO (confirmado).\r\n\r\n\r\n\r\n(REQ 46/2023 CAPADR, do deputado Alceu Moreira)",
      "localExterno": null,
      "orgaos": [
          {
              "id": 2001,
              "uri": "https://dadosabertos.camara.leg.br/api/v2/orgaos/2001",
              "sigla": "CAPADR",
              "nome": "Comissão de Agricultura, Pecuária, Abastecimento e Desenvolvimento Rural",
              "apelido": "Agricultura, Pecuária, Abastecimento e Desenvolvimento Rural",
              "codTipoOrgao": 2,
              "tipoOrgao": "Comissão Permanente",
              "nomePublicacao": "Comissão de Agricultura, Pecuária, Abastecimento e Desenvolvimento Rural",
              "nomeResumido": "Agropecuária"
          }
      ],
      "localCamara": {
          "nome": "Anexo II, Plenário 06",
          "predio": null,
          "sala": null,
          "andar": null
      },
      "urlRegistro": null
  },
  {
      "id": 68480,
      "uri": "https://dadosabertos.camara.leg.br/api/v2/eventos/68480",
      "dataHoraInicio": "2023-06-15T10:00",
      "dataHoraFim": null,
      "situacao": "Cancelada",
      "descricaoTipo": "Reunião Deliberativa",
      "descricao": "Discussão e votação de propostas legislativas",
      "localExterno": null,
      "orgaos": [
          {
              "id": 2003,
              "uri": "https://dadosabertos.camara.leg.br/api/v2/orgaos/2003",
              "sigla": "CCJC",
              "nome": "Comissão de Constituição e Justiça e de Cidadania",
              "apelido": "Constituição e Justiça e de Cidadania",
              "codTipoOrgao": 2,
              "tipoOrgao": "Comissão Permanente",
              "nomePublicacao": "Comissão de Constituição e Justiça e de Cidadania",
              "nomeResumido": "Constituição e Justiça"
          }
      ],
      "localCamara": {
          "nome": "Anexo II, Plenário 01",
          "predio": null,
          "sala": null,
          "andar": null
      },
      "urlRegistro": null
  },
  {
      "id": 68489,
      "uri": "https://dadosabertos.camara.leg.br/api/v2/eventos/68489",
      "dataHoraInicio": "2023-06-15T15:00",
      "dataHoraFim": null,
      "situacao": "Convocada",
      "descricaoTipo": "Audiência Pública",
      "descricao": "A radioterapia e radiocirurgia no Brasil\r\n Audiência Pública\r\n\r\nTema: A radioterapia e radiocirurgia no Brasil\r\n\r\nConvidados:\r\n\r\nFERNANDO HENRIQUE MAIA, Coordenador-Geral da política nacional de prevenção de controle do câncer do Ministério da Saúde;\r\n\r\nRAQUEL DOMINGUES DA SILVA, Chefe do serviço de radioterapia do Instituto Nacional de Câncer - INCA;\r\n\r\nMARCUS SIMÕES CASTILHO, Presidente da Sociedade Brasileira de Radioterapia - SBRT;\r\n\r\nLUMENA FURTADO, Diretora de atenção à saúde da Empresa Brasileira de Serviços Hospitalares - EBSERH.\r\n\r\n(Requerimento nº 13/2023, do Dep. Weliton Prado)",
      "localExterno": null,
      "orgaos": [
          {
              "id": 539411,
              "uri": "https://dadosabertos.camara.leg.br/api/v2/orgaos/539411",
              "sigla": "CECANCER",
              "nome": "Comissão Especial destinada a acompanhar as ações de combate ao câncer no Brasil",
              "apelido": "Combate ao Câncer no Brasil",
              "codTipoOrgao": 3,
              "tipoOrgao": "Comissão Especial",
              "nomePublicacao": "Comissão Especial sobre o Combate ao Câncer no Brasil",
              "nomeResumido": "Câncer"
          }
      ],
      "localCamara": {
          "nome": "Anexo II, Plenário 09",
          "predio": null,
          "sala": null,
          "andar": null
      },
      "urlRegistro": null
  },
  {
      "id": 68492,
      "uri": "https://dadosabertos.camara.leg.br/api/v2/eventos/68492",
      "dataHoraInicio": "2023-06-15T09:00",
      "dataHoraFim": null,
      "situacao": "Em Andamento",
      "descricaoTipo": "Visita Técnica",
      "descricao": "Visita ao Comando de Operações de Cerrado - COC - Goiânia-GO\r\n Requerimento nº 113/2023, da Deputada Silvia Waiãpi (PL-AP), subscrito pelos Deputados Delegado Paulo Bilynskyj (PS-SP) e Ismael Alexandrino ( PSD-GO).\r\n\r\nCRONOGRAMA DA VISITA:\r\n\r\n9h00 - Apresentação do Comando de Operações de Cerrado -O Centro Integrado de Comando e Controle engloba Batalhão Ambiental, Batalhão Rural e o Comando de Operações de Divisas (COD).\n\r\n\r\n12h00 - almoço\n\n\r\n\r\n13h30 - Visita ao Comando de Missões Especiais - composto por : \r\n-Batalhão Especializado de Policiamento em Eventos - BEPE\n;\r\n-Batalhão de Choque - BPMChoque;\n\r\n-Batalhão de Operações Especiais - BOPE\n;\r\n- Batalhão de Polícia Militar Rural - BPMRural\n;\r\n-Companhia de Policiamento com Cães - CPCães\n\r\n-Companhia de Policiamento de Choque - CPChoque\n\r\n-Grupo de Radiopatrulha Aérea - GRAer;\n\r\n-Regimento de Polícia Montada - RPMont.\r\n\n\r\n\n18h00 - retorno à Brasília\r\n\r\nDEPUTADOS CONFIRMADOS:\r\n\r\nIsmael Alexandrino (PSD-GO)\r\nCapitão Alden (PL-BA)\r\nDelegada Adriana Accorsi (PT-GO)\r\n\nSilvia Waiãpi (PL-AP)\r\nSargento Gonçalves (PL-RN)",
      "localExterno": "Comando de Operações de Cerrado - COC - Goiânia-GO",
      "orgaos": [
          {
              "id": 5503,
              "uri": "https://dadosabertos.camara.leg.br/api/v2/orgaos/5503",
              "sigla": "CSPCCO",
              "nome": "Comissão de Segurança Pública e Combate ao Crime Organizado",
              "apelido": "Segurança Pública e Combate ao Crime Organizado",
              "codTipoOrgao": 2,
              "tipoOrgao": "Comissão Permanente",
              "nomePublicacao": "Comissão de Segurança Pública e Combate ao Crime Organizado",
              "nomeResumido": "Segurança Pública"
          }
      ],
      "localCamara": {
          "nome": null,
          "predio": null,
          "sala": null,
          "andar": null
      },
      "urlRegistro": null
  },
  {
      "id": 68494,
      "uri": "https://dadosabertos.camara.leg.br/api/v2/eventos/68494",
      "dataHoraInicio": "2023-06-15T08:00",
      "dataHoraFim": null,
      "situacao": "Em Andamento",
      "descricaoTipo": "Debate",
      "descricao": "Fórum Nacional de Saúde Ocular\r\n (REQ 28/2023 CSAUDE, do deputado Dr. Zacharias Calil)\r\n\r\nCONVIDADOS:\r\n\r\nCRISTIANO CAIXETA UMBELINO\r\nPresidente do Conselho Brasileiro de Oftalmologia - CBO\r\n\r\nMARCOS PEREIRA ÁVILA\r\nConselho Brasileiro de Oftalmologia - CBOMembro do CDG\r\n\r\nFREDERICO PENA\r\nConselho Brasileiro de Oftalmologia - CBOTesoureiro\r\n\r\nWILMA LELIS\r\nConselho Brasileiro de Oftalmologia - CBOSecretária",
      "localExterno": null,
      "orgaos": [
          {
              "id": 2014,
              "uri": "https://dadosabertos.camara.leg.br/api/v2/orgaos/2014",
              "sigla": "CSAUDE",
              "nome": "Comissão de Saúde",
              "apelido": "Saúde",
              "codTipoOrgao": 2,
              "tipoOrgao": "Comissão Permanente",
              "nomePublicacao": "Comissão de Saúde",
              "nomeResumido": "Saúde"
          }
      ],
      "localCamara": {
          "nome": "Anexo II, Plenário 07",
          "predio": null,
          "sala": null,
          "andar": null
      },
      "urlRegistro": "https://www.youtube.com/watch?v=t50eas-Yvkg"
  },
  {
      "id": 68496,
      "uri": "https://dadosabertos.camara.leg.br/api/v2/eventos/68496",
      "dataHoraInicio": "2023-06-15T15:00",
      "dataHoraFim": null,
      "situacao": "Convocada",
      "descricaoTipo": "Audiência Pública",
      "descricao": "Eficiência energética no Brasil\r\n (REQ 29/2023 CMADS, do deputado Bandeira de Mello, subscrito pelo deputado Nilto Tatto)\r\n\r\nConvidados:\r\n\r\nANA AMÉLIA CAMPOS TONI (presença confirmada)\r\nSecretária Nacional de Mudança do Clima do MMA;\r\n\r\nLEONARDO PICCIANI (presença confirmada)\r\nSecretário Nacional de Saneamento Ambiental do Ministério das Cidades;\r\n\r\nRODOLFO HENRIQUE DE SABOIA (presença confirmada - remota)\r\nDiretor-Geral da Agência Nacional de Petróleo, Gás Natural e Biocombustíveis (ANP); \r\n\r\nGUILHERME OLIVEIRA ARANTES (presença confirmada - remota)\r\nGerente do Departamento de Energia Elétrica do BNDES; \r\n\r\nVIVIANA CANHÃO BERNARDES G COELHO (presença confirmada - remota)\r\nGerente Executiva de Mudança Climática e Descarbonização da Petrobras\r\n\r\nMARIA IZABEL MAGALHÃES GOMES RAMOS (presença confirmada - remota)\r\nGerente de Mercados de Carbono da Petrobras\r\n\r\nFERNANDO PERRONE (presença confirmada)\r\nDiretor-geral do Instituto Nacional de Eficiência Energética (INEE);\r\n\r\nVICTOR HUGO IOCCA (presença confirmada - remota)\r\nDiretor de Energia do ABRACE Energia;\r\n\r\nJULIANO BUENO DE ARAÚJO\r\nDiretor do Instituto Internacional Arayara.",
      "localExterno": null,
      "orgaos": [
          {
              "id": 6174,
              "uri": "https://dadosabertos.camara.leg.br/api/v2/orgaos/6174",
              "sigla": "CMADS",
              "nome": "Comissão de Meio Ambiente e Desenvolvimento Sustentável",
              "apelido": "Meio Ambiente e Desenvolvimento Sustentável",
              "codTipoOrgao": 2,
              "tipoOrgao": "Comissão Permanente",
              "nomePublicacao": "Comissão de Meio Ambiente e Desenvolvimento Sustentável",
              "nomeResumido": "Meio Ambiente"
          }
      ],
      "localCamara": {
          "nome": "Anexo II, Plenário 06",
          "predio": null,
          "sala": null,
          "andar": null
      },
      "urlRegistro": null
  },
  {
      "id": 68546,
      "uri": "https://dadosabertos.camara.leg.br/api/v2/eventos/68546",
      "dataHoraInicio": "2023-06-15T08:00",
      "dataHoraFim": null,
      "situacao": "Convocada",
      "descricaoTipo": "Debate",
      "descricao": "ADAPTAÇÃO ÀS MUDANÇAS CLIMÁTICAS: OPORTUNIDADES PARA O BRASIL NO PÓS CONFERÊNCIA DE ÁGUA DA ONU",
      "localExterno": null,
      "orgaos": [
          {
              "id": 100950,
              "uri": "https://dadosabertos.camara.leg.br/api/v2/orgaos/100950",
              "sigla": "EVENTOS",
              "nome": "Eventos",
              "apelido": "Outros Eventos",
              "codTipoOrgao": 12000,
              "tipoOrgao": "Órgão da Câmara dos Deputados",
              "nomePublicacao": "Câmara dos Deputados - Outros Evento",
              "nomeResumido": null
          }
      ],
      "localCamara": {
          "nome": "Auditório Freitas Nobre",
          "predio": null,
          "sala": null,
          "andar": null
      },
      "urlRegistro": "https://www.youtube.com/watch?v=pnHscAGGe1U"
  }
]

export default {
  component: Events,
};

const FullEventsRender = () => {
  const [dateStart, setDateStart] = useState(new Date())
  return <>
    <Events events={events.slice(0,3)} dateEvent={dateStart} callbackDateChange={setDateStart} />
  </>
}

export const FullEvents = {
  render: () => <FullEventsRender />
}