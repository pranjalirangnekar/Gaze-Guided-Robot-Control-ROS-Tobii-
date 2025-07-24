import React, { useRef, useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';

// Register Chart.js components
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const RealTimeChart = ({ data }) => {
    const chartRef = useRef(null);

    const chartData = {
        labels: data.map((_, index) => index), // Index as time
        datasets: [
            {
                label: 'X Position',
                data: data.map((point) => point.x),
                borderColor: 'rgba(75,192,192,1)',
                backgroundColor: 'rgba(75,192,192,0.2)',
                fill: true,
                tension: 0.4,
            },
            {
                label: 'Y Position',
                data: data.map((point) => point.y),
                borderColor: 'rgba(255,99,132,1)',
                backgroundColor: 'rgba(255,99,132,0.2)',
                fill: true,
                tension: 0.4,
            },
        ],
    };

    const options = {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
            x: { title: { display: true, text: 'Time' } },
            y: { title: { display: true, text: 'Position' } },
        },
    };

    return (
        <div style={{ height: '400px', margin: '20px 0' }}>
            <Line ref={chartRef} data={chartData} options={options} />
        </div>
    );
};

export default RealTimeChart;
