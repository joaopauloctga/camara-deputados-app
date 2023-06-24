import React from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import chroma from 'chroma-js';

ChartJS.register(ArcElement, Tooltip, Legend);

function CamaraDoughnut({height, width, labels, values}) {
  const colors = chroma.scale('Set3').colors(labels.length);
  const data = {
    labels: labels,
    datasets: [
      {
        data: values,
        backgroundColor: colors,
        borderColor: colors,
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'right'
      },
      title: {
        display: true,
        text: 'Gasto por categoria',
      },
    }
  }

  return (
    <div style={{height: `${height}px`, width: width}}>
      <Doughnut data={data} options={options} />
    </div>
  );
}

export default CamaraDoughnut;
