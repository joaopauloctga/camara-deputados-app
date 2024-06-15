import { useEffect, useState } from 'react';

export const useDeputadoExpenses = (deputadoId) => {
  const [expenses, setExpenses] = useState([]);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    const fetchExpenses = async () => {
      try {
        let page = 1;
        let hasNextPage = true;
        let allExpenses = [];

        while (hasNextPage) {
          const response = await fetch(
            `https://dadosabertos.camara.leg.br/api/v2/deputados/${deputadoId}/despesas?ano=${new Date().getFullYear()}&itens=1000&pagina=${page}`
          );

          if (!response.ok) {
            throw new Error('Failed to fetch expenses');
          }

          const data = await response.json();
          const { dados, links } = data;

          allExpenses = allExpenses.concat(dados);
          hasNextPage = links.some((link) => link.rel === 'next');
          page++;
        }

        setExpenses(allExpenses);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    if (deputadoId !== undefined) {
      fetchExpenses();
    }
  }, [deputadoId]);

  return { expenses, loading };
}