import React, { useContext, useEffect, useState } from 'react';
import ApexCharts from 'react-apexcharts';
import { ThemeContext } from '../App';

const Diagram = ({ wallets }) => {
  const { theme } = useContext(ThemeContext);
  const [btcs, setBtcs] = useState([]);

  console.log(wallets);
  

  useEffect(() => {
    const selectedWallet = wallets.find(wallet => wallet.name === theme);
    if (selectedWallet) {
      setBtcs(selectedWallet.purchased);
    }
  }, [theme, wallets]);

  const chartOptions = {
    chart: {
      type: 'line',
      animations: {
        enabled: true,
        easing: 'linear',
        speed: 10000, 
      }
    },
    xaxis: {
      categories: btcs.map(btc => btc.date),
    },
    stroke: {
      curve: 'smooth',
      width: 3, 
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
    markers: {
      size: 6,
      strokeColor: '#00f',
      strokeWidth: 2,
      hover: {
        size: 8,
      },
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
    plotOptions: {
      line: {
        colors: ['#00f'], 
        opacity: 0.8, 
      }
    },
  };

  const chartSeries = [{
    name: 'Sales',
    data: btcs.map(btc => btc.quantity),
  }];

  console.log(btcs);
  

  return (
    <div>
      <ApexCharts
        options={chartOptions}
        series={chartSeries}
        type="line"
        height={400}
      />
    </div>
  );
};

export default Diagram;
