import axios from 'axios';
import React, { useEffect, useState } from 'react';
import ApexCharts from 'react-apexcharts';

const url = "http://localhost:8080/users";

const LineChart = () => {
    const [wallets, setWallets] = useState([]);

    const id = localStorage.getItem("userId");

    useEffect(() => {
        axios(`${url}/${id}`)
        .then(res => {
            setWallets(res.data.wallets || []);
        })
        .catch(err => {
            console.error('Error fetching user data:', err);
        });
    }, [id]);

    const chartOptions = {
        chart: {
            type: 'line',
        },
        xaxis: {
            categories: wallets.map(wallet => wallet.value),
            tickPlacement: 'on',
            labels: {
                show: true, 
            }
        },
        yaxis: {
            title: {
                text: '',
                style: {
                    color: '#000',
                }
            },
            labels: {
                show: true,
            }
        },
        stroke: {
            curve: 'smooth', 
        },
        grid: {
            show: true,

            strokeDashArray: 0,
            position: 'back', 
            row: {
                colors: undefined, 
                opacity: 0.5 // Прозрачность строк сетки
            },
            column: {
                // colors: '#f4f4f4', // Цвет вертикальных линий сетки
                opacity: 0.5 // Прозрачность вертикальных линий сетки
            },
        },
        dataLabels: {
            enabled: false,
        },
        tooltip: {
            y: {
                formatter: function (val) {
                    return `${val}`;
                }
            }
        },
    };

    const chartSeries = [{
        name: 'Amount',
        data: wallets.map(wallet => wallet.amount), 
    }];

    return (
        <div style={{ width: '100%', height: '400px' }}>
            <ApexCharts options={chartOptions} series={chartSeries} type="line" height="230" />
        </div>
    );
};

export default LineChart;
