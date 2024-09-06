import React, { useState } from "react";

const Exchange = () => {
  const [amount, setAmount] = useState("");
  const [convertedAmount, setConvertedAmount] = useState(null);

  const handleAmountChange = (event) => {
    const value = event.target.value;
    setAmount(value);

    const exchangeRate = 12500;
    setConvertedAmount(value / exchangeRate);
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        padding: "20px",
      }}
      className="mx-[100px] my-[150px]"
    >
      <div className="nav w-[400px] h-[220px] rounded-[8px]">
        <h1 className="text-white flex m-4">UZS</h1>
        <div style={{ flex: 1, marginRight: "10px", marginTop: "50px" }}>
          <h2 className="text-white">Введите сумму</h2>
          <input
            className="rounded-[8px] !px-[4px]"
            type="number"
            value={amount}
            onChange={handleAmountChange}
            placeholder="Введите сумму"
          />
        </div>
      </div>

      <div className="nav w-[400px] h-[220px] rounded-[8px]">
        <h1 className="text-white flex m-4">UZS</h1>

        <div style={{ flex: 1, marginLeft: "10px" }} className="">
          <h2 className="text-white">Результат</h2>
          <p className="text-[#000] bg-white w-[200px] ml-[22%]">Вы ввели: {amount} сум</p>
          <p className="text-white">
            Долларах:{" "}
            {convertedAmount !== null ? convertedAmount.toFixed(2) : "-"}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Exchange;
