import useCamaraAPI from "./useCamaraAPI";

function useCamaraPropStatusCode() {
  const { isLoading, result } = useCamaraAPI({
    url: '/referencias/proposicoes/codSituacao'
  });

  return { isLoading, result }
}

export default useCamaraPropStatusCode;