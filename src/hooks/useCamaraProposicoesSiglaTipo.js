import useCamaraAPI from "./useCamaraAPI";

function useCamaraProposicaoSiglaTipo() {
  const { isLoading, result } = useCamaraAPI({
    url: 'referencias/proposicoes/siglaTipo',
    config: {
      proxy: true
    }
  });

  return { isLoading, result }
}

export default useCamaraProposicaoSiglaTipo;