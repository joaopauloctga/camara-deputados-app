import DeputadoDetailsPageClient from "./deputado-client";
import { getCamaraData } from "@/utils/api";

const listInfo = [
  'discursos',
  'despesas',
  'eventos',
  'frentes',
  'historico',
  'mandatosExternos',
  'ocupacoes',
  'orgaos',
  'profissoes',
];

const DeputadoDetailsPage = async ({params}) => {
  const { deputadoId } = params;

  const allData = {};
  allData['info'] = await getCamaraData(`deputados/${deputadoId}`);
  for (let i=0; i<listInfo.length; i++) {
    const infoKey = listInfo[i];
    const data = await getCamaraData(`deputados/${deputadoId}/${infoKey}`);
    allData[infoKey] = data;
  }
  return <DeputadoDetailsPageClient {...allData} />
}

export default DeputadoDetailsPage;