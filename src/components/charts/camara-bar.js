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

function CamaraBar({height, width}) {

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Gasto Mensal',
      },
    },
  }

  const labels = ['January', 'February', 'March', 'April', 'May'];

  const data = {
    labels,
    datasets: [
      {
        label: 'Gasto Mensal',
        data: labels.map(() => Math.random() * 1000),
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
