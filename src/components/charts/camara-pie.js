import React from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend, Title } from 'chart.js';
import { Pie } from 'react-chartjs-2';
import chroma from 'chroma-js';

ChartJS.register(ArcElement, Tooltip, Legend);

function CamaraPie({height, width, labels, values}) {
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
    <div style={{height: `${height}px`, width: '100%'}}>
      <Pie data={data} options={options} />
    </div>
  );
}

export default CamaraPie;
