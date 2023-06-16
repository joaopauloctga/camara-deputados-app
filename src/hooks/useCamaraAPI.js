import { useEffect, useState } from 'react';

function useCamaraAPI({url, subRequest}) {
  const [result, setResult] = useState([]);
  const [isLoading, updateLoadingStatus] = useState(true);

  useEffect(() => {

    const fetchData = async () => {
      const urlResult = await fetch(url);
      const {dados} = await urlResult.json();
      const data = dados;
      if (subRequest) {
        for (let i=0; i<3; i++) {
          const item = dados[i];
          const subData = await fetch(item.uri).then(resp => resp.json())
          console.log('second request ',item.url)
          data.push({
            ...result,
            ...subData.dados
          })
        }
      }
      
      updateLoadingStatus(false)
      setResult(data)
    }

    fetchData();
  }, [url]);

  return { isLoading, result }
}

export default useCamaraAPI;