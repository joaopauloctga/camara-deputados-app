import React from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend, Title } from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import { Doughnut } from 'react-chartjs-2';
import chroma from 'chroma-js';

ChartJS.register(ArcElement, Tooltip, Legend, Title, ChartDataLabels);

function CamaraDoughnut({height, width, labels, values, title, legendPosition = 'right'}) {
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
    tooltips: {
      enabled: false
    },
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: legendPosition
      },
      title: {
        display: true,
        text: title,
      },
      datalabels: {
        formatter: (value, ctx) => {
          let datasets = ctx.chart.data.datasets;
          if (datasets.indexOf(ctx.dataset) === datasets.length - 1) {
            let sum = datasets[0].data.reduce((a, b) => a + b, 0);
            let percentage = Math.round((value / sum) * 100).toFixed(2) + '%';
            return percentage;
          } else {
            return percentage;
          }
        }
      }
    }
  }

  return (
    <div style={{height: height, width: width}}>
      <Doughnut data={data} options={options} />
    </div>
  );
}

export default CamaraDoughnut;
