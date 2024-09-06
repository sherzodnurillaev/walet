import React, { useContext, useEffect, useState } from 'react';
import { ThemeContext } from '../../App';
import { Select, Space } from 'antd';

const Handle = ({ wallets }) => {
  const [menuItems, setMenuItems] = useState([]);
  const [value, setValue] = useState('');

  const { setTheme } = useContext(ThemeContext);

  useEffect(() => {
    if (wallets && wallets.length > 0) {
      const items = wallets.map(wallet => ({
        label: wallet.name,
        value: wallet.name,
      }));
      setMenuItems(items);

      if (items.length > 0) {
        setValue(items[0].value);
      }
    }
  }, [wallets]);

  useEffect(() => {
    setTheme(value);
  }, [value, setTheme]);

  const handleChange = (newValue) => {
    setValue(newValue);
  };

  return (
    <Space wrap>
      <Select
        value={value}
        style={{ width: 100, height: 22 }}
        onChange={handleChange}
        options={menuItems}
      />
    </Space>
  );
};

export default Handle;
