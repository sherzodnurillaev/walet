import React, { useContext, useEffect, useState } from 'react';
import { DownOutlined } from '@ant-design/icons';
import { Button, Dropdown, message, Space } from 'antd';
import axios from 'axios';
import { Widget } from '../App';

const url = "http://localhost:8080/";
const widget = "widget";

const Drop = ({ onSelect }) => {
  const [crypts, setCrypts] = useState([]);
  const { setWidget } = useContext(Widget);

  useEffect(() => {
    axios(`${url}${widget}`)
      .then(res => {
        setCrypts(res.data);
      })
      .catch(err => {
        console.error('Error fetching data:', err);
      });
  }, []);

  const handleButtonClick = (e) => {
    message.info('Click on left button.');
    console.log('click left button', e);
  };

  const handleMenuClick = (e) => {
    const selectedCrypto = crypts.find(crypto => crypto.name === e.key);
    if (selectedCrypto) {
      setWidget({ name: selectedCrypto.name, price: selectedCrypto.price });
      onSelect(selectedCrypto.name);
      message.info(`Selected: ${selectedCrypto.name} at $${selectedCrypto.price}`);
    //   console.log(selectedCrypto);
    }
  };

  const menuItems = crypts.map(crypto => ({
    label: (
      <Space>
        {crypto.name}
      </Space>
    ),
    key: crypto.name,
  }));

  const menuProps = {
    items: menuItems,
    onClick: handleMenuClick,
  };

  return (
    <Space wrap>
      <Dropdown.Button menu={menuProps} onClick={handleButtonClick}>
        Dropdown 
      </Dropdown.Button>
    </Space>
  );
};

export default Drop;
