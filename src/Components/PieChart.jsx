import React, { useEffect, useState } from 'react';
import ApexCharts from 'react-apexcharts';
import axios from 'axios';

import "../chart.css";
import CustomLegend from './CustomeLegend';


const url = "http://localhost:8080/users";

const DonutChart = () => {
    const [crypt, setCrypt] = useState([]);

    const id = localStorage.getItem("userId");

    useEffect(() => {
        axios(`${url}/${id}`)
        .then(res => {
            setCrypt(res.data.wallets.slice(0, 4) || []);
        })
        .catch(err => {
            console.error('Error fetching user data:', err);
        });
    }, [id]);

    const totalAmount = crypt.reduce((total, crypto) => total + (crypto.value || 0), 0);

    const chartOptions = {
        chart: {
            type: 'donut',
        },
        labels: crypt.map(crypto => crypto.name || 'Unknown'),
        colors: crypt.map((_, index) => [
            '#FF4560',
            '#008FFB',
            '#00E396',
            '#FEB019',
            '#FF66C3',
            '#775DD0'
        ][index % 6]), 
        legend: {
            show: false
        },
        dataLabels: {
            enabled: false, 
            formatter: function () {
                return totalAmount;
            },
            style: {
                fontSize: '18px',
                fontFamily: 'Arial, sans-serif',
                fontWeight: 'bold'
            },
            dropShadow: {
                enabled: true,
                top: 1,
                left: 1,
                blur: 1,
                opacity: 0.75
            }
        },
    };

    const chartSeries = crypt.map(crypto => crypto.amount || 0);

    return (
        <div style={{ width: '100%', height: '300px' }}>
            <ApexCharts options={chartOptions} series={chartSeries} type="donut" width="100%" />
            <CustomLegend crypt={crypt.map(crypto => ({
                name: crypto.name || 'Unknown',
                color: chartOptions.colors[crypt.indexOf(crypto)] 
            }))} />
        </div>
    );
};

export default DonutChart;
