import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

function CamaraBar({height, width, labels, values}) {

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
        display: false
      },
      title: {
        display: true,
        text: 'Gasto Mensal',
      },
    },
  }

  const meses = [
    'Janeiro',
    'Fevereiro',
    'Março',
    'Abril',
    'Maio',
    'Junho',
    'Julho',
    'Agosto',
    'Setembro',
    'Outubro',
    'Novembro',
    'Dezembro'
  ];
  const data = {
    labels: labels.map((m) => meses[m-1]),
    datasets: [
      {
        label: 'Gasto Mensal',
        data: values,
        backgroundColor: '#5270BE',
      }
    ],
  };

  return (
    <div style={{height: `${height}px`, width: '100%'}}>
      <Bar options={options} data={data} />
    </div>
  );
}

export default CamaraBar;
