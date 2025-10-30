"use client";

import DashboardLayout from "@/app/page";
import { useState } from "react";

interface ContractOrder {
  id: number;
  account: string;
  pair: string;
  direction: "Buy" | "Sell";
  contractTime: string;
  status: "Open" | "Closed";
  quota: number;
  buildPrice: number;
  closePrice: number;
  buildTime: string;
  profitLoss: number;
  balanceAfter: number;
}

export default function ContractOrdersPage() {
  const [orders, setOrders] = useState<ContractOrder[]>([
    {
      id: 1,
      account: "trader01@gmail.com",
      pair: "BTC/USDT",
      direction: "Buy",
      contractTime: "2025-10-30 10:15:00",
      status: "Open",
      quota: 500,
      buildPrice: 68000,
      closePrice: 0,
      buildTime: "2025-10-30 10:16:20",
      profitLoss: 0,
      balanceAfter: 10500,
    },
    {
      id: 2,
      account: "investor02@gmail.com",
      pair: "ETH/USDT",
      direction: "Sell",
      contractTime: "2025-10-29 14:32:00",
      status: "Closed",
      quota: 200,
      buildPrice: 3800,
      closePrice: 3700,
      buildTime: "2025-10-29 14:33:00",
      profitLoss: 200,
      balanceAfter: 5200,
    },
  ]);

  const [search, setSearch] = useState("");

  // 🔍 Filter results
  const filteredOrders = orders.filter((order) =>
    order.account.toLowerCase().includes(search.toLowerCase())
  );

  // 🔁 Reset button handler
  const handleReset = () => {
    setSearch("");
    alert("Filters reset successfully!");
  };

  // 🗑️ Delete single order
  const handleDelete = (id: number) => {
    setOrders((prev) => prev.filter((o) => o.id !== id));
    alert(`Order #${id} removed.`);
  };

  // 📄 Details
  const handleDetails = (id: number) => {
    const order = orders.find((o) => o.id === id);
    if (order) {
      alert(
        `Order #${order.id}\n\nAccount: ${order.account}\nPair: ${order.pair}\nDirection: ${order.direction}\nStatus: ${order.status}\nProfit/Loss: ${order.profitLoss}`
      );
    }
  };

  return (
    <DashboardLayout>
      <div className="">
        {/* Header */}
        <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
          <h1 className="text-lg font-semibold text-gray-800">
            List of contract orders
          </h1>
          <div className="flex flex-wrap gap-2">
            <span className="text-red-600 text-sm font-medium">
              If the user ID is specified profit or loss, it is not affected by
              single control
            </span>
          </div>
        </div>

        {/* Search Bar */}
        <div className="flex flex-wrap gap-2 items-center bg-white shadow p-4 rounded-md mb-6">
          <select className="border rounded-md px-3 py-2 text-sm">
            <option>User Account</option>
            <option>Transaction Pair</option>
            <option>Status</option>
          </select>

          <input
            type="text"
            placeholder="Please enter your query"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="flex-1 min-w-[200px] border rounded-md px-3 py-2 text-sm"
          />
          <button
            onClick={handleReset}
            className="bg-yellow-400 hover:bg-yellow-500 text-white px-4 py-2 rounded-md text-sm font-medium"
          >
            Initialization of search
          </button>
        </div>

        {/* Table */}
        <div className="overflow-x-auto bg-white shadow rounded-md">
          <table className="min-w-[1500px] text-sm text-left">
            <thead className="bg-gray-100 text-gray-700">
              <tr>
                <th className="p-3 font-medium">
                  <input type="checkbox" className="accent-blue-600" />
                </th>
                <th className="p-3 font-medium">ID</th>
                <th className="p-3 font-medium">Member’s Account</th>
                <th className="p-3 font-medium">Transaction pair</th>
                <th className="p-3 font-medium">Direction/Contract Time</th>
                <th className="p-3 font-medium">Status</th>
                <th className="p-3 font-medium">Quota of delegation</th>
                <th className="p-3 font-medium">Building unit price</th>
                <th className="p-3 font-medium">Closing unit price</th>
                <th className="p-3 font-medium">Building time</th>
                <th className="p-3 font-medium">Amount of profit or loss</th>
                <th className="p-3 font-medium">After purchase balance</th>
                <th className="p-3 font-medium">Single-control operation</th>
                <th className="p-3 font-medium">Details</th>
              </tr>
            </thead>

            <tbody>
              {filteredOrders.length === 0 ? (
                <tr>
                  <td
                    colSpan={14}
                    className="text-center py-10 text-gray-500 italic"
                  >
                    No data yet
                  </td>
                </tr>
              ) : (
                filteredOrders.map((order) => (
                  <tr key={order.id} className="border-t hover:bg-gray-50">
                    <td className="p-3">
                      <input type="checkbox" className="accent-blue-600" />
                    </td>
                    <td className="p-3">{order.id}</td>
                    <td className="p-3">{order.account}</td>
                    <td className="p-3">{order.pair}</td>
                    <td className="p-3">
                      <span
                        className={`font-medium ${
                          order.direction === "Buy"
                            ? "text-green-600"
                            : "text-red-600"
                        }`}
                      >
                        {order.direction}
                      </span>
                      <div className="text-xs text-gray-500">
                        {order.contractTime}
                      </div>
                    </td>
                    <td className="p-3">
                      <span
                        className={`px-2 py-1 rounded text-xs font-medium ${
                          order.status === "Open"
                            ? "bg-blue-100 text-blue-700"
                            : "bg-green-100 text-green-700"
                        }`}
                      >
                        {order.status}
                      </span>
                    </td>
                    <td className="p-3">{order.quota}</td>
                    <td className="p-3">{order.buildPrice}</td>
                    <td className="p-3">
                      {order.closePrice === 0 ? "-" : order.closePrice}
                    </td>
                    <td className="p-3">{order.buildTime}</td>
                    <td
                      className={`p-3 font-semibold ${
                        order.profitLoss >= 0
                          ? "text-green-600"
                          : "text-red-600"
                      }`}
                    >
                      {order.profitLoss.toFixed(2)}
                    </td>
                    <td className="p-3">{order.balanceAfter}</td>
                    <td className="p-3">
                      <button
                        onClick={() => handleDelete(order.id)}
                        className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-md text-xs"
                      >
                        Delete
                      </button>
                    </td>
                    <td className="p-3">
                      <button
                        onClick={() => handleDetails(order.id)}
                        className="bg-gray-200 hover:bg-gray-300 text-gray-800 px-3 py-1 rounded-md text-xs"
                      >
                        View
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>

          {/* Footer */}
          <div className="p-3 text-gray-600 text-sm border-t">
            {filteredOrders.length} record
            {filteredOrders.length !== 1 ? "s" : ""}, page 1/1
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
