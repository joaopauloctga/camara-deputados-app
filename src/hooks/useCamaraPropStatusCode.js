import useCamaraAPI from "./useCamaraAPI";

function useCamaraPropStatusCode() {
  const { isLoading, result } = useCamaraAPI({
    url: 'referencias/proposicoes/codSituacao',
    config: {
      proxy: true
    }
  });

  return { isLoading, result }
}

export default useCamaraPropStatusCode;