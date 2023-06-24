import { useEffect, useState } from 'react';
import config from '../utils/config';

function getPaginationLinks (links) {
  if (!links) {
    return {
      nextPageLink: undefined,
      previousPageLink: undefined,
      lastPageLink: undefined,
      firstPageLink: undefined
    }
  }
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

export const fetchAPI = async (url, subRequest) => {
  const urlResult = await fetch(url);
  let {dados, links} = await urlResult.json();
  const data = dados;
  
  if (subRequest != undefined) {
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

  return {
    ...getPaginationLinks(links),
    data: data
  }
}

const extractTotalItemsFromLink = (link) => {
  const params = new URLSearchParams(link)
  const pagina = params.get('pagina');
  const itens = params.get('itens');
  if (pagina == null || itens == null) {
    return null;
  }
  return parseInt(pagina) * parseInt(params.get('itens'));
}

const fetchProxy = async (url, config)  => {
  const resp = await fetch(
    config !== undefined && config.proxy ? buildInternalAPI(url) : url
  );
  return await resp.json();
}

export const buildInternalAPI = (url) => {
  return url.replace(config.CAMARA_DEPUTADOS_ENDPOINT, config.PROXY_API_ENDPOINT)
}

function useCamaraAPI({url, subRequest, config}) {
  const [result, setResult] = useState([]);
  const [isLoading, updateLoadingStatus] = useState(true);
  const [nextPage, setNextPage] = useState(null);
  const [previousPage, setPreviousPage] = useState(null);
  const [lastPage, setLastPage] = useState(null);
  const [firstPage, setFirstPage] = useState(null);
  const [totalItems, setTotalItems] = useState(null);
  const [error, setError] = useState(null);

  const fetchData = async (url) => {
    updateLoadingStatus(true);
    let {dados, links} = await fetchProxy(url, {
      proxy: config?.proxy !== undefined
    });
    let data = dados;
    
    if (subRequest !== undefined) {
      let item, subData = null;
      for (let i=0; i<dados.length; i++) {
        item = dados[i];
        subData = await fetchProxy(item.uri, {proxy: config?.subReqProxy !== undefined})
        data[i] = {
          ...item,
          ...subData.dados
        }
      }
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
    setTotalItems(extractTotalItemsFromLink(lastPageLink?.href || null));
    updateLoadingStatus(false)

    setResult((prevItems) => {
      if (config?.loadMore) {
        return [...prevItems, ...data]
      }
      return data;
    })
    updateLoadingStatus(false);
  }

  useEffect(() => {
    fetchData(`https://dadosabertos.camara.leg.br/api/v2/${url}`);
  }, [url]);

  const handleRequest = (url) => {
    fetchData(url)
  }

  return { isLoading, result, nextPage, previousPage, lastPage, firstPage, totalItems, error, handleRequest }
}

export default useCamaraAPI;