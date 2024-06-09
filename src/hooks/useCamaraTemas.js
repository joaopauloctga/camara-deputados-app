import useCamaraAPI from "./useCamaraAPI";

function useCamaraTemas() {
  const { isLoading, result } = useCamaraAPI({
    url: 'referencias/proposicoes/codTema',
  });
  return { isLoading, result }
}

export default useCamaraTemas;