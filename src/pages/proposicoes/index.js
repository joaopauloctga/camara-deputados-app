import React, { useEffect, useState } from 'react';

const MyComponent = () => {
  const [items, setItems] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [paginationLinks, setPaginationLinks] = useState({});

  const fetchData = async (page) => {
    try {
      const url = `https://dadosabertos.camara.leg.br/api/v2/deputados?itens=10${
        page > 0 ? `&pagina=${page}` : ''
      }`;
      const response = await fetch(url);
      const data = await response.json();
      setItems(data.dados);
      setPaginationLinks({
        previous: data.links.find((link) => link.rel === 'previous'),
        next: data.links.find((link) => link.rel === 'next'),
      });
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const handlePreviousPage = () => {
    if (paginationLinks.previous) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (paginationLinks.next) {
      setCurrentPage(currentPage + 1);
    }
  };

  useEffect(() => {
    fetchData(currentPage);
  }, [currentPage]);

  return (
    <div>
      <ul>
        {items.map((item) => (
          <li key={item.id}>{item.nome}</li>
        ))}
      </ul>
      <div>
        <button onClick={handlePreviousPage} disabled={!paginationLinks.previous}>
          Previous
        </button>
        <button onClick={handleNextPage} disabled={!paginationLinks.next}>
          Next
        </button>
      </div>
    </div>
  );
};

export default MyComponent;