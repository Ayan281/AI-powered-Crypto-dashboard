import React from "react";
import { Line } from "react-chartjs-2";
import { Chart as ChartJS } from "chart.js/auto"; 

function LineChart({ chartData, options }) {
 
  const defaultOptions = {
    responsive: true,
    plugins: {
      legend: {
        display: true,
        position: "top",
      },
      tooltip: {
        mode: "index",
        intersect: false,
      },
    },
    interaction: {
      mode: "index",
      intersect: false,
    },
    elements: {
      line: {
        tension: 0.4, 
        borderWidth: 2, 
      },
      point: {
        radius: 0,       
        hoverRadius: 6,  
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: "Date",
          font: { size: 14, weight: "bold" },
        },
        ticks: {
          maxRotation: 0,
          autoSkip: true,
          maxTicksLimit: 10,
        },
      },
      crypto1: {
        type: "linear",
        position: "left",
        title: {
          display: true,
          text: "Price (USD)",
          font: { size: 14, weight: "bold" },
        },
        ticks: {
          callback: (value) => "$" + value.toLocaleString(),
        },
      },
      crypto2: {
        type: "linear",
        position: "right",
        title: {
          display: true,
          text: "Market Cap",
          font: { size: 14, weight: "bold" },
        },
        ticks: {
          callback: (value) => "$" + (value / 1_000_000).toFixed(1) + "M",
        },
        grid: {
          drawOnChartArea: false,
        },
      },
    },
  };

  return <Line data={chartData} options={options || defaultOptions} />;
}

export default LineChart;
