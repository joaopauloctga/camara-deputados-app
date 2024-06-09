import { useEffect, useState } from "react";
import useCamaraAPI from "./useCamaraAPI";

const mainTipos = [
  136,
  137,
  139,
  140,
  141,
  143,
  295,
  294,
];

function useCamaraProposicaoSiglaTipo(props) {
  const [data, setData] = useState([]);
  const { isLoading, result } = useCamaraAPI({
    url: 'referencias/proposicoes/siglaTipo',
  });

  useEffect(() => {
    if (!isLoading) {
      let items = result;
      if (props.onlyMain) {
        items = result.filter(item => mainTipos.includes(parseInt(item.cod)));
      }
      setData(items);
    }
  }, [isLoading]);
  
  return { 
    isLoading: isLoading, 
    result: data 
  }
}
export default useCamaraProposicaoSiglaTipo;