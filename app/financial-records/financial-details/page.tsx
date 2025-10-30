"use client";

import DashboardLayout from "@/app/page";

interface FinancialRecord {
  id: number;
  username: string;
  tradingCurrency: string;
  numberOfOperations: number;
  operationType: string;
  afterOperation: number;
  operatingInstructions: string;
  operationTime: string;
  state: string;
}

export default function FinancialDetailsPage() {
  const records: FinancialRecord[] = [
    {
      id: 270,
      username: "ranashahbaz043@gmail.com",
      tradingCurrency: "USDT",
      numberOfOperations: 28.0,
      operationType: "Purchase Contract",
      afterOperation: 14.0,
      operatingInstructions: "BuyBTC/USDT Quick Trade",
      operationTime: "2025-10-28 23:07:19",
      state: "normal",
    },
    {
      id: 269,
      username: "ranashahbaz043@gmail.com",
      tradingCurrency: "USDT",
      numberOfOperations: 42.0,
      operationType: "Sale Contract",
      afterOperation: 84.0,
      operatingInstructions: "Trade sale",
      operationTime: "2025-10-28 22:11:56",
      state: "normal",
    },
    {
      id: 268,
      username: "ranashahbaz043@gmail.com",
      tradingCurrency: "USDT",
      numberOfOperations: 1.0,
      operationType: "Purchase Contract",
      afterOperation: 0.0,
      operatingInstructions: "BuySOL/USDT Quick Trade",
      operationTime: "2025-10-28 17:38:51",
      state: "normal",
    },
    {
      id: 267,
      username: "ranashahbaz043@gmail.com",
      tradingCurrency: "USDT",
      numberOfOperations: 28.0,
      operationType: "Purchase Contract",
      afterOperation: 1.0,
      operatingInstructions: "BuyBTC/USDT Quick Trade",
      operationTime: "2025-10-27 22:11:49",
      state: "normal",
    },
    {
      id: 266,
      username: "ranashahbaz043@gmail.com",
      tradingCurrency: "USDT",
      numberOfOperations: 20.0,
      operationType: "Purchase Contract",
      afterOperation: 29.0,
      operatingInstructions: "BuyETH/USDT Quick Trade",
      operationTime: "2025-10-27 11:41:04",
      state: "normal",
    },
    {
      id: 265,
      username: "rzubair5@gmail.com",
      tradingCurrency: "USDT",
      numberOfOperations: 9.8,
      operationType: "Sale Contract",
      afterOperation: 19.6,
      operatingInstructions: "Trade sale",
      operationTime: "2025-10-27 04:01:48",
      state: "normal",
    },
    {
      id: 264,
      username: "rzubair5@gmail.com",
      tradingCurrency: "USDT",
      numberOfOperations: 7.0,
      operationType: "Purchase Contract",
      afterOperation: 0.0,
      operatingInstructions: "BuyBTC/USDT Quick Trade",
      operationTime: "2025-10-27 03:08:24",
      state: "normal",
    },
    {
      id: 263,
      username: "rzubair5@gmail.com",
      tradingCurrency: "USDT",
      numberOfOperations: 7.0,
      operationType: "Sale Contract",
      afterOperation: 14.0,
      operatingInstructions: "Trade sale",
      operationTime: "2025-10-27 02:41:55",
      state: "normal",
    },
    {
      id: 262,
      username: "ranashahbaz043@gmail.com",
      tradingCurrency: "USDT",
      numberOfOperations: 28.0,
      operationType: "Sale Contract",
      afterOperation: 77.0,
      operatingInstructions: "Trade sale",
      operationTime: "2025-10-27 02:25:35",
      state: "normal",
    },
    {
      id: 261,
      username: "rzubair5@gmail.com",
      tradingCurrency: "USDT",
      numberOfOperations: 5.0,
      operationType: "Purchase Contract",
      afterOperation: 0.0,
      operatingInstructions: "BuyBTC/USDT Quick Trade",
      operationTime: "2025-10-27 01:48:28",
      state: "normal",
    },
  ];

  return (
    <DashboardLayout>
      <div className="">
        <h1 className="text-xl font-semibold mb-4">Financial Details</h1>

        {/* Search Section */}
        <div className="flex items-center space-x-2 mb-4">
          <select className="border border-gray-300 rounded px-3 py-1 focus:ring-2 focus:ring-blue-400 outline-none">
            <option value="username">username</option>
          </select>
          <input
            type="text"
            placeholder="Please enter your query"
            className="border border-gray-300 rounded px-3 py-1 w-64 focus:ring-2 focus:ring-blue-400 outline-none"
          />
        </div>

        {/* Table */}
        <div className="overflow-x-auto border rounded-lg shadow-sm">
          <table className="min-w-full text-sm text-left border-collapse">
            <thead className="bg-gray-100 text-gray-700 border-b">
              <tr>
                <th className="p-2 border text-center w-10">
                  <input type="checkbox" />
                </th>
                <th className="p-2 border">ID</th>
                <th className="p-2 border">username</th>
                <th className="p-2 border">Trading currency</th>
                <th className="p-2 border text-center">Number of operations</th>
                <th className="p-2 border">Operation type</th>
                <th className="p-2 border text-center">After the operation</th>
                <th className="p-2 border">Operating Instructions</th>
                <th className="p-2 border">Operation time</th>
                <th className="p-2 border text-center">state</th>
              </tr>
            </thead>
            <tbody>
              {records.map((r) => (
                <tr key={r.id} className="hover:bg-gray-50">
                  <td className="p-2 border text-center">
                    <input type="checkbox" />
                  </td>
                  <td className="p-2 border">{r.id}</td>
                  <td className="p-2 border">{r.username}</td>
                  <td className="p-2 border">{r.tradingCurrency}</td>
                  <td className="p-2 border text-center">
                    {r.numberOfOperations.toFixed(4)}
                  </td>
                  <td className="p-2 border">{r.operationType}</td>
                  <td className="p-2 border text-center">
                    {r.afterOperation.toFixed(4)}
                  </td>
                  <td className="p-2 border">{r.operatingInstructions}</td>
                  <td className="p-2 border">{r.operationTime}</td>
                  <td className="p-2 border text-center text-green-600">
                    {r.state}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </DashboardLayout>
  );
}
