import React, { useState } from 'react';

const ProposicoesList = () => {
  const [proposicoesList, setProposicoesList] = useState([]);
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterContent, setFilterContent] = useState('');

  // Dummy data for demonstration
  const defaultProposicoesList = [
    {
      id: 1,
      ementa: 'Ementa da Proposição 1',
      status: 'Em andamento',
      autor: 'Autor 1',
      date: '2023-06-01',
      tipo: 'PL',
      text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    },
    {
      id: 2,
      ementa: 'Ementa da Proposição 2',
      status: 'Aprovada',
      autor: 'Autor 2',
      date: '2023-05-29',
      tipo: 'PLP',
      text: 'Praesent semper, lorem vel aliquet fermentum, lectus risus.',
    },
    // Add more items here
  ];

  useState(() => {
    setProposicoesList(defaultProposicoesList);
  }, []);

  const handleFilterStatusChange = (event) => {
    setFilterStatus(event.target.value);
  };

  const handleFilterContentChange = (event) => {
    setFilterContent(event.target.value);
  };

  const filteredProposicoesList = proposicoesList.filter((proposicao) => {
    if (filterStatus !== 'all' && proposicao.status !== filterStatus) {
      return false;
    }

    if (
      filterContent.trim() !== '' &&
      !proposicao.text.toLowerCase().includes(filterContent.toLowerCase())
    ) {
      return false;
    }

    return true;
  });

  return (
    <div className="container mx-auto">
      <div className="flex justify-end mb-4">
        <select
          className="border rounded px-2 py-1 mr-2"
          value={filterStatus}
          onChange={handleFilterStatusChange}
        >
          <option value="all">All</option>
          <option value="Em andamento">Em andamento</option>
          <option value="Aprovada">Aprovada</option>
          <option value="Arquivada">Arquivada</option>
          <option value="Em votação">Em votação</option>
        </select>
        <input
          type="text"
          className="border rounded px-2 py-1"
          placeholder="Filter by content"
          value={filterContent}
          onChange={handleFilterContentChange}
        />
      </div>
      <div className="flex flex-wrap -mx-4">
        {filteredProposicoesList.map((proposicao) => (
          <div key={proposicao.id} className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/4 px-4 mb-4">
            <div className="bg-white shadow-md rounded-lg p-4">
              <p className="font-bold mb-2">ID: {proposicao.id}</p>
              <p className="mb-2">Ementa: {proposicao.ementa}</p>
              <p className="mb-2">Status: {proposicao.status}</p>
              <p className="mb-2">Autor: {proposicao.autor}</p>
              <p className="mb-2">Date: {proposicao.date}</p>
              <p className="mb-2">Tipo: {proposicao.tipo}</p>
              <p className="mb-2">Text: {proposicao.text}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProposicoesList;