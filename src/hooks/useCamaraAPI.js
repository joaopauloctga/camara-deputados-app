import { useEffect, useState } from 'react';

function getPaginationLinks (links) {
  let nextPageLink = links.find((link) => link.rel === 'next');
  let previousPageLink = links.find((link) => link.rel === 'previous');
  let lastPageLink = links.find((link) => link.rel === 'last');
  let firstPageLink = links.find((link) => link.rel === 'first');

  return {
    nextPageLink,
    previousPageLink,
    lastPageLink,
    firstPageLink
  }
}

function useCamaraAPI({url, subRequest}) {
  const [result, setResult] = useState([]);
  const [isLoading, updateLoadingStatus] = useState(true);
  const [nextPage, setNextPage] = useState(null);
  const [previousPage, setPreviousPage] = useState(null);
  const [lastPage, setLastPage] = useState(null);
  const [firstPage, setFirstPage] = useState(null);

  const fetchData = async (url) => {
    updateLoadingStatus(true);
    const urlResult = await fetch(url);
    let {dados, links} = await urlResult.json();
    const data = dados;
    
    if (subRequest) {
      let item, subData = null;
      for (let i=0; i<3; i++) {
        item = dados[i];
        subData = await fetch(item.uri).then(resp => resp.json())
        data.push({
          ...result,
          ...subData.dados
        })
      }
      links = subData?.links
    }
    
    const {
      nextPageLink,
      previousPageLink,
      lastPageLink,
      firstPageLink
    } = getPaginationLinks(links);

    setFirstPage(firstPageLink?.href || null);
    setLastPage(lastPageLink?.href || null);
    setNextPage(nextPageLink?.href || null);
    setPreviousPage(previousPageLink?.href || null);
    updateLoadingStatus(false)
    setResult(data)
    updateLoadingStatus(false);
  }

  useEffect(() => {
    fetchData(`https://dadosabertos.camara.leg.br/api/v2/${url}`);
  }, [url]);

  const handleRequest = (url) => {
    fetchData(url)
  }

  return { isLoading, result, nextPage, previousPage, lastPage, firstPage, handleRequest }
}

export default useCamaraAPI;