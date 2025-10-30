"use client";
import DashboardLayout from "@/app/page";
import React, { useState } from "react";

interface RecordData {
  id: number;
  member: string;
  tradingPair: string;
  direction: string;
  state: string;
  entrustedAmount: number;
  entryPrice: number;
  closingPrice: number;
  entryTime: string;
  profitLoss: number;
}

const Page = () => {
  const [search, setSearch] = useState("");

  const data: RecordData[] = [
    {
      id: 287,
      member: "nanshahbaz043@gmail.com",
      tradingPair: "BTC/USDT",
      direction: "Buying",
      state: "Completed",
      entrustedAmount: 28.0,
      entryPrice: 113540.9,
      closingPrice: 112428.61,
      entryTime: "2025-10-28 23:07:19",
      profitLoss: -28.0,
    },
    {
      id: 286,
      member: "nanshahbaz043@gmail.com",
      tradingPair: "SOL/USDT",
      direction: "Buying",
      state: "Completed",
      entrustedAmount: 1.0,
      entryPrice: 201.806,
      closingPrice: 201.806,
      entryTime: "2025-10-28 17:38:51",
      profitLoss: -1.0,
    },
    {
      id: 285,
      member: "nanshahbaz043@gmail.com",
      tradingPair: "BTC/USDT",
      direction: "Buying",
      state: "Completed",
      entrustedAmount: 28.0,
      entryPrice: 114742.4,
      closingPrice: 115453.29,
      entryTime: "2025-10-27 21:41:49",
      profitLoss: 14.0,
    },
    {
      id: 284,
      member: "nanshahbaz043@gmail.com",
      tradingPair: "ETH/USDT",
      direction: "Buying",
      state: "Completed",
      entrustedAmount: 20.0,
      entryPrice: 4203.93,
      closingPrice: 4203.49,
      entryTime: "2025-10-27 11:44:04",
      profitLoss: -20.0,
    },
    {
      id: 283,
      member: "r.nazlibari@gmail.com",
      tradingPair: "BTC/USDT",
      direction: "Buying",
      state: "Completed",
      entrustedAmount: 7.0,
      entryPrice: 113546,
      closingPrice: 113566.07,
      entryTime: "2025-10-27 03:06:24",
      profitLoss: 2.8,
    },
    {
      id: 282,
      member: "r.nazlibari@gmail.com",
      tradingPair: "BTC/USDT",
      direction: "Buying",
      state: "Completed",
      entrustedAmount: 5.0,
      entryPrice: 113845,
      closingPrice: 113754.82,
      entryTime: "2025-10-27 01:48:28",
      profitLoss: -4.6,
    },
    {
      id: 281,
      member: "r.nazlibari@gmail.com",
      tradingPair: "BCH/USDT",
      direction: "Buying",
      state: "Completed",
      entrustedAmount: 10.0,
      entryPrice: 551.36,
      closingPrice: 551.03,
      entryTime: "2025-10-27 01:24:49",
      profitLoss: -20.0,
    },
    {
      id: 280,
      member: "usmanbhatti9810@gmail.com",
      tradingPair: "BTC/USDT",
      direction: "Buying",
      state: "Completed",
      entrustedAmount: 10.0,
      entryPrice: 113647.5,
      closingPrice: 113544.98,
      entryTime: "2025-10-27 01:36:19",
      profitLoss: -10.0,
    },
    {
      id: 279,
      member: "usmanbhatti9810@gmail.com",
      tradingPair: "BTC/USDT",
      direction: "Buying",
      state: "Completed",
      entrustedAmount: 20.0,
      entryPrice: 550.76,
      closingPrice: 553.99,
      entryTime: "2025-10-27 01:32:06",
      profitLoss: 8.0,
    },
    {
      id: 278,
      member: "nanshahbaz043@gmail.com",
      tradingPair: "BTC/USDT",
      direction: "Buying",
      state: "Completed",
      entrustedAmount: 5.0,
      entryPrice: 111863.3,
      closingPrice: 113156.25,
      entryTime: "2025-10-25 21:11:18",
      profitLoss: 10.0,
    },
  ];

  const filtered = data.filter((row) =>
    row.member.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <DashboardLayout>
      <div className="min-h-screen">
        <div className="bg-white rounded-lg shadow-md p-6">
          <h1 className="text-lg font-semibold mb-4">
            Contract order closing records
          </h1>

          {/* Search Input */}
          <div className="mb-4 flex items-center justify-between">
            <input
              type="text"
              placeholder="Please enter the invite..."
              className="border px-3 py-2 rounded-md w-full max-w-xs focus:ring focus:ring-blue-300"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="min-w-full border border-gray-200 text-sm text-gray-700">
              <thead className="bg-gray-100">
                <tr>
                  {[
                    "ID",
                    "Member account",
                    "Trading Pair",
                    "direction",
                    "state",
                    "Entrusted amount",
                    "Entry price per unit",
                    "Closing price",
                    "Entry time",
                    "Profit and loss amount",
                  ].map((header) => (
                    <th
                      key={header}
                      className="border px-3 py-2 text-left font-medium text-gray-600"
                    >
                      {header}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filtered.map((item) => (
                  <tr key={item.id} className="hover:bg-gray-50">
                    <td className="border px-3 py-2">{item.id}</td>
                    <td className="border px-3 py-2">{item.member}</td>
                    <td className="border px-3 py-2">{item.tradingPair}</td>
                    <td className="border px-3 py-2 text-green-600 font-medium">
                      {item.direction}
                    </td>
                    <td className="border px-3 py-2 text-green-600 font-medium">
                      {item.state}
                    </td>
                    <td className="border px-3 py-2">{item.entrustedAmount}</td>
                    <td className="border px-3 py-2">{item.entryPrice}</td>
                    <td
                      className={`border px-3 py-2 ${
                        item.closingPrice > item.entryPrice
                          ? "text-green-600"
                          : "text-red-600"
                      }`}
                    >
                      {item.closingPrice}
                    </td>
                    <td className="border px-3 py-2">{item.entryTime}</td>
                    <td
                      className={`border px-3 py-2 font-semibold ${
                        item.profitLoss >= 0 ? "text-green-600" : "text-red-600"
                      }`}
                    >
                      {item.profitLoss.toFixed(2)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {filtered.length === 0 && (
              <p className="text-center py-4 text-gray-500">
                No records found.
              </p>
            )}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Page;
