import DeputadosListingPage from "./deputados-list";
import { getCamaraData } from "@/utils/api";

export const getProps = async () => {
  const deputados = await getCamaraData(`deputados`);
  const partidos = await getCamaraData(`partidos`);
  const legislaturas = await getCamaraData(`legislaturas`);
  
  return {
    deputados,
    partidos,
    legislaturas
  }
}

const DeputadosList = async () => {
  const props = await getProps();
  return <DeputadosListingPage {...props} />
};

export default DeputadosList;