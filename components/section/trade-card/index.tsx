"use client";

import { useState } from "react";
import { ArrowUp, ArrowDown, Bitcoin } from "lucide-react";

const TradeCard: React.FC = () => {
  const [balance, setBalance] = useState(25430.5);
  const [amount, setAmount] = useState<number>(69999);
  const [currency, setCurrency] = useState("INR");
  const [direction, setDirection] = useState<"UP" | "DOWN" | null>(null);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);

  const options = [
    { label: "20%", time: "60 seconds" },
    { label: "40%", time: "120 seconds" },
    { label: "60%", time: "180 seconds" },
    { label: "20%", time: "60 seconds" },
  ];

  const handleTrade = () => {
    if (!direction || !selectedOption) {
      alert("Please select trade direction and percentage.");
      return;
    }

    alert(
      `Placing trade:
       Amount: ${amount} ${currency}
       Direction: ${direction}
       Option: ${selectedOption}`
    );
  };

  return (
    <div className="max-w-[409px] w-full bg-[#d9d9d9] shadow-lg rounded-lg p-4 flex flex-col gap-4 ">
      {/* Balance */}
      <div className="flex justify-between text-gray-600">
        <span className=" text-base font-medium">Available Balance :</span>
        <span className="font-medium text-[24px] leading-none text-gray-600">
          ${balance.toLocaleString()}
        </span>
      </div>
      <div className="-my-3">
        <span className=" font-medium text-base text-[#555555]">
          Investment Amount
        </span>
      </div>

      {/* Investment */}
      <div className="flex md:flex-row flex-col items-center gap-2 w-full h-full">
        <div className="flex items-center justify-between rounded-lg px-2 gap-2 w-[167px] h-[52px] bg-white">
          <input
            type="number"
            value={amount}
            readOnly
            onChange={(e) => setAmount(Number(e.target.value))}
            className=" w-1/2 text-left  py-2 outline-none"
          />
          <span className="font-medium">{currency}</span>
        </div>

        {/* Up / Down buttons */}
        <div className="flex gap-2">
          <button
            onClick={() => setDirection("UP")}
            className={`flex-1 flex items-center justify-center cursor-pointer gap-1 w-[100px] h-[52px] rounded-md font-medium text-xl text-white ${
              direction === "UP"
                ? "bg-green-600"
                : "bg-[#2d7645] hover:bg-green-600"
            }`}
          >
            <ArrowUp size={20} /> UP
          </button>
          <button
            onClick={() => setDirection("DOWN")}
            className={`flex-1 flex items-center justify-center cursor-pointer gap-1 w-[100px] h-[52px] text-xl font-medium rounded-md text-white ${
              direction === "DOWN"
                ? "bg-red-600"
                : "bg-[#ea1212] hover:bg-red-600"
            }`}
          >
            <ArrowDown size={20} /> DOWN
          </button>
        </div>
      </div>

      {/* Options */}
      <div className="grid grid-cols-1 md:grid-cols-2 justify-items-center w-full gap-x-10 gap-y-2">
        {options.map((opt, idx) => (
          <button
            key={idx}
            onClick={() => setSelectedOption(`${opt.label} - ${opt.time}`)}
            className={`border-3 rounded-[10px] px-3 py-2 cursor-pointer text-center text-[#555555] w-[167px] h-[71px] ${
              selectedOption === `${opt.label} - ${opt.time}`
                ? "bg-[#acd3ab]"
                : "hover:bg-gray-100"
            }`}
          >
            <div className=" text-xl font-medium">{opt.label}</div>
            <div className=" text-base font-medium">{opt.time}</div>
          </button>
        ))}
      </div>

      {/* Asset Info */}
      <div className="flex justify-between items-center border-3 rounded-[10px] border-[#555555] px-3 py-2">
        <div className="flex items-center gap-2">
          <span className="flex items-center gap-x-1 text-base font-medium text-[#555555]">
            {" "}
            <img
              src="/bitcoin.png"
              className=" w-[30px] h-[30px] rounded-full object-cover border border-[#666666]"
              alt=""
            />
            Bitcoin (BTC)
          </span>
        </div>
        <span className="font-medium text-2xl text-[#555555]">
          ${balance.toLocaleString()}
        </span>
      </div>

      {/* Place Trade */}
      <button
        onClick={handleTrade}
        className="w-full bg-white cursor-pointer border-[1px] border-[#666666] text-[#555555] text-2xl  font-medium py-2 "
      >
        Place Trade
      </button>
    </div>
  );
};

export default TradeCard;
