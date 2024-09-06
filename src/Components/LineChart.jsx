import axios from 'axios';
import React, { useEffect, useState } from 'react';
import ApexCharts from 'react-apexcharts';
import '../chart.css'; // Подключите CSS файл для стилей

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
            width: 3, // Толщина линии
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
                opacity: 0.5 // Прозрачность вертикальных линий сетки
            },
        },
        fill: {
            type: 'gradient',
            gradient: {
                shade: 'light',
                shadeIntensity: 0.3,
                inverseColors: false,
                opacityFrom: 0.7,
                opacityTo: 0.5,
                stops: [0, 100],
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
        plotOptions: {
            line: {
                colors: ['#00f'], // Цвет линии
                opacity: 0.8, // Прозрачность линии
            }
        },
    };

    const chartSeries = [{
        name: 'Amount',
        data: wallets.map(wallet => wallet.amount), 
    }];

    return (
        <div className="chart-container" style={{ width: '100%', height: '230px' }}>
            <ApexCharts options={chartOptions} series={chartSeries} type="line" height="230" />
        </div>
    );
};

export default LineChart;
