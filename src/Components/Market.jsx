import { color } from 'chart.js/helpers';
import React, { useContext, useEffect, useState } from 'react';
import ApexCharts from 'react-apexcharts';
import { ThemeContext } from '../App';

const Market = ({wallets}) => {

    const { theme } = useContext(ThemeContext);
    const [ btcs, setBtcs ] = useState([])

    useEffect(() => {
        wallets.map((wallet) => { 
            if (wallet.name == theme) {
                setBtcs(wallet.purchased)
            }
        })
        
    }, [theme])
    
    
    

    const chartOptions = {
        chart: {
            type: 'line',
        },
        xaxis: {
            categories: btcs.map((btc) => btc.date),
        },
        stroke: {
            curve: 'smooth',
        },
        dataLabels: {
            enabled: true,
            style: {
                colors: ['#000000'],
                fontSize: '10px',
                fontFamily: 'Arial, sans-serif',
                fontWeight: 'bold',
            },
        },
        tooltip: {
            shared: true,
            intersect: false,
        },
    };

    const chartSeries = [{
        name: 'Sales',
        data: btcs.map((btc) => btc.quantity),
    }];

    return (
        <div>
            <ApexCharts 
                options={chartOptions} 
                series={chartSeries} 
                type="line" 
                height={175} 
            />
        </div>
    );
}

export default Market;
