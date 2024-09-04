import React, { useContext, useEffect, useState } from 'react';
import { DownOutlined } from '@ant-design/icons';
import { Button, Dropdown, Space } from 'antd';
import { ThemeContext } from '../App';

const Handle = ({ wallets }) => {
  const [menuItems, setMenuItems] = useState([]);
  const [value, setValue] = useState('');

  const { setTheme } = useContext(ThemeContext);

  useEffect(() => {
    if (wallets && wallets.length > 0) {

      const items = wallets.map(wallet => ({
        label: wallet.name,
        key: wallet.name, 
      }));
      setMenuItems(items);


      if (items.length > 0) {
        setValue(items[0].label);
      }
    }
  }, [wallets]);

  useEffect(() => {
    setTheme(value)
  }, [value])

  const handleMenuClick = (e) => {
    setValue(e.key);
  };

  const menuProps = {
    items: menuItems,
    onClick: handleMenuClick,
  };

  return (
    <Space wrap>
      <Dropdown menu={menuProps}>
        <Button>
          <Space className='text-[#2259a4]'>
            {value.slice(0, 3)}
            <DownOutlined />
          </Space>
        </Button>
      </Dropdown>
    </Space>
  );
};

export default Handle;
