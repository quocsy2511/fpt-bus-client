import React from "react";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS } from "chart.js/auto";
export const options = {
    plugins: {
        title: {
            display: false,
            text: 'Total Ticket Of Route',
        },
    },
    responsive: true,
    scales: {
        x: {
            stacked: true,
        },
        y: {
            stacked: true,
        },
    },
};
function BarChart({ chartData }) {
    return <Bar options={options} data={chartData} />;
}

export default BarChart;
