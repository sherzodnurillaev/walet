import React from "react";

const Card = ({wallet}) => {
    return (
        <div className="nano min-w-[250px] h-[140px] bg-white rounded-[8px]">
            <h1 className="flex text-white ml-1 mt-4 text-[14px]">{wallet.name}</h1>
            <div className="flex items-center gap-4">
                <img className="ml-1" src="https://s2.coinmarketcap.com/static/img/coins/64x64/6.png" alt="" />
                <div className="">
                    <h1 className="text-white text-[14px]">{wallet.amount} {wallet.name.slice(0, 3).toUpperCase()}</h1>
                    <span className="text-[#616A8B] text-[12px]">$ {wallet.value}</span>
                </div>
                <img src="/arrow.png" alt="" />
            </div>
        </div>

    )
    
}

export default Card
