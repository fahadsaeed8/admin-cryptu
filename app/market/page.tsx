"use client";

import DashboardLayout from "@/components/dashboardLayout";
import Image from "next/image";
import React, { useState } from "react";
import { ChevronDown } from "lucide-react";
import TradeCard from "@/components/section/trade-card";
import ChartBTC from "@/components/section/ChartBTC";
import BitcoinChart from "@/components/section/BitcoinCart";

const Market = () => {
  const [language, setLanguage] = useState("EN");
  const [isOpen, setIsOpen] = useState(false);

  const rates = {
    usdToEur: 0.92,
    btc: 43250,
    eth: 2600,
  };

  const languages = ["EN", "FR", "DE", "ES", "AR"];

  return (
    <DashboardLayout>
      <div className="bg-white   rounded-xl pb-15">
        <div className="w-full relative">
          <Image
            src="/trading.jpg"
            alt="Trade Log Banner"
            width={1920}
            height={400}
            className="w-full h-[211px] rounded-xl object-cover"
          />
          <h1 className="absolute inset-0 flex items-center text-center justify-center text-white text-5xl font-bold drop-shadow-lg">
            Future Trading
          </h1>
        </div>
        <div className="flex flex-wrap items-center gap-3 py-4 text-sm mx-2">
          {/* Language Dropdown */}
          <div className="relative">
            <button
              className=" border rounded-xl gap-5 h-[40px] w-[100px] flex items-center justify-center bg-[#D9D9D9] hover:bg-gray-50"
              onClick={() => setIsOpen(!isOpen)}
            >
              {language}
              <ChevronDown size={16} />
            </button>

            {isOpen && (
              <ul className="absolute left-0 mt-2 w-24 bg-white border rounded-md shadow-md z-10">
                {languages.map((lang) => (
                  <li
                    key={lang}
                    className="px-3 py-2 hover:bg-gray-100 cursor-pointer"
                    onClick={() => {
                      setLanguage(lang);
                      setIsOpen(false);
                    }}
                  >
                    {lang}
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* Rates */}
          <div className="flex flex-wrap gap-3 text-[#555555] text-base font-semibold">
            <span>USD/EUR: {rates.usdToEur}</span>
            <span>BTC: ${rates.btc.toLocaleString()}</span>
            <span>ETH: ${rates.eth.toLocaleString()}</span>
          </div>
        </div>
        <div className="flex md:flex-row flex-col items-start gap-3 mx-2">
          <TradeCard />
          <div className=" w-full max-w-[630px] bg-[#d9d9d9] p-5 mb-5 rounded-xl">
            <ChartBTC />{" "}
          </div>

          {/* <BitcoinChart /> */}
        </div>
        <div className="overflow-x-auto overflow-y-hidden no-scrollbar mt-5 mx-5">
          <table className="w-full text-gray-700 min-w-[900px]">
            <thead className="">
              <tr className="bg-[#393518] text-white h-[65px] border-b-8">
                <th className="px-2 py-2 ">Time</th>
                <th className="px-2 py-2 ">Asset</th>
                <th className="px-2 py-2 ">Direction</th>
                <th className="px-2 py-2 ">Amount</th>
                <th className="px-2 py-2 ">Duration</th>
                <th className="px-2 py-2 ">Result</th>
              </tr>
            </thead>
            <tbody>
              {Array(3)
                .fill(null)
                .map((_, idx) => (
                  <tr key={idx} className="bg-[#d9d9d9] text-center h-[47px]">
                    <td className="border-b-2 border-white px-2 py-2">Time</td>
                    <td className="border-b-2 border-white px-2 py-2">Asset</td>
                    <td className="border-b-2 border-white px-2 py-2">
                      Direction
                    </td>
                    <td className="border-b-2 border-white px-2 py-2">
                      Amount
                    </td>
                    <td className="border-b-2 border-white px-2 py-2">
                      Duration
                    </td>
                    <td className="border-b-2 border-white px-2 py-2">
                      Result
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Market;
