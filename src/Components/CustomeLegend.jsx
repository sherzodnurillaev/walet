import React from 'react';

const CustomLegend = ({ crypt }) => {
    const itemsPerRow = 2;
    
    const rows = [];
    for (let i = 0; i < crypt.length; i += itemsPerRow) {
        rows.push(crypt.slice(i, i + itemsPerRow));
    }

    return (
        <div style={{ display: 'grid', gridTemplateColumns: '1fr', marginTop: '10px' }}>
            {rows.map((row, rowIndex) => (
                <div key={rowIndex} style={{ width: '100%' }}>
                    {row.map((crypto, index) => (
                        <div key={index} style={{ display: "flex", alignItems: "center", margin: '0 20px', textAlign: 'center' }}>
                            <div className='shadow-white' style={{ backgroundColor: crypto.color, boxShadow: "0 0 5px 0 #fff", width: '10px', height: '10px', borderRadius: '50%', marginRight: '10px' }}></div>
                            <span className='text-white'>{crypto.name}</span>
                        </div>
                    ))}
                </div>
            ))}
        </div>
    );
};

export default CustomLegend;