"use client";

import React from "react";
import Image from "next/image";

interface MarketItem {
  id: number;
  name: string;
  symbol: string;
  price: string;
  change: string;
  icon: string;
}

const marketData: MarketItem[] = [
  {
    id: 1,
    name: "Bitcoin",
    symbol: "BTC",
    price: "$ 245,450",
    change: "+3.20",
    icon: "/bitcoin.png", // 👈 put your Bitcoin logo here
  },
  {
    id: 2,
    name: "Bitcoin",
    symbol: "BTC",
    price: "$ 245,450",
    change: "+3.20",
    icon: "/bitcoin.png",
  },
  {
    id: 3,
    name: "Bitcoin",
    symbol: "BTC",
    price: "$ 245,450",
    change: "+3.20",
    icon: "/bitcoin.png",
  },
];

const Market: React.FC = () => {
  return (
    <div className="bg-white rounded-lg shadow-md border border-gray-300 overflow-hidden">
      {/* Header */}
      <div className="flex items-center gap-2 px-4 py-2 border-b border-gray-200">
        <Image src="/market-icon.png" alt="Market" width={18} height={18} />
        <h2 className="font-medium text-gray-700">Market</h2>
      </div>

      {/* Body */}
      <div className="divide-y divide-gray-200">
        {marketData.map((item) => (
          <div
            key={item.id}
            className="flex flex-col sm:flex-row sm:items-center sm:justify-between px-4 py-3"
          >
            {/* Left Section */}
            <div className="flex items-center gap-2">
              <Image src={item.icon} alt={item.name} width={28} height={28} />
              <div>
                <p className="text-sm font-medium">{item.name}</p>
                <p className="text-xs text-gray-500">{item.symbol}</p>
              </div>
            </div>

            {/* Price Section */}
            <div className="flex items-center justify-between sm:gap-12 mt-2 sm:mt-0 w-full sm:w-auto">
              <div className="text-right">
                <p className="text-sm font-semibold">{item.price}</p>
                <p className="text-xs text-green-600">{item.change}</p>
              </div>

              {/* Duplicate Section like in your screenshot */}
              <div className="flex items-center gap-2 sm:ml-8">
                <Image src={item.icon} alt={item.name} width={28} height={28} />
                <div>
                  <p className="text-sm font-medium">{item.name}</p>
                  <p className="text-xs text-gray-500">{item.symbol}</p>
                </div>
              </div>

              <div className="text-right ml-auto">
                <p className="text-sm font-semibold">{item.price}</p>
                <p className="text-xs text-green-600">{item.change}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Market;
