// app/user-assets/page.tsx
"use client";

import DashboardLayout from "@/app/page";
import { useState } from "react";

type Asset = {
  available: number;
  frozen: number;
  total: number;
};

type UserAsset = {
  id: number;
  username: string;
  btc: Asset;
  eth: Asset;
  usdt: Asset;
};

const initialData: UserAsset[] = [
  {
    id: 134,
    username: "test@gmail.com",
    btc: { available: 0, frozen: 0, total: 0 },
    eth: { available: 0, frozen: 0, total: 0 },
    usdt: { available: 0, frozen: 10105, total: 10105 },
  },
  {
    id: 135,
    username: "test2@gmail.com",
    btc: { available: 0, frozen: 0, total: 0 },
    eth: { available: 0, frozen: 0, total: 0 },
    usdt: { available: 0, frozen: 0, total: 0 },
  },
  {
    id: 138,
    username: "umarbhatti700@gmail.com",
    btc: { available: 0, frozen: 0, total: 0 },
    eth: { available: 0, frozen: 0, total: 0 },
    usdt: { available: 0, frozen: 3.4, total: 3.4 },
  },
  {
    id: 140,
    username: "zaraabbasi24@gmail.com",
    btc: { available: 0, frozen: 0, total: 0 },
    eth: { available: 0, frozen: 0, total: 0 },
    usdt: { available: 0, frozen: 14.4, total: 14.4 },
  },
];

export default function UserAssetsPage() {
  const [query, setQuery] = useState("");
  const [data, setData] = useState<UserAsset[]>(initialData);

  const filtered = data.filter((u) =>
    u.username.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <DashboardLayout>
      <div className="min-h-screen">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-2xl font-bold mb-4">User Asset Management</h1>

          {/* Search Bar */}
          <div className="flex items-center space-x-4 mb-6">
            <input
              type="text"
              placeholder="Search by username..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="flex-1 border rounded px-3 py-2"
            />
            <button
              onClick={() => setQuery("")}
              className="px-4 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600"
            >
              Reset
            </button>
          </div>

          {/* Table */}
          <div className="overflow-x-auto bg-white">
            <table className="w-full text-sm text-left border-collapse table-auto">
              <thead className="text-gray-800 uppercase">
                <tr className="bg-gray-100">
                  <th className="p-2 border border-gray-300">ID</th>
                  <th className="p-2 border border-gray-300">Username</th>
                  <th className="p-2 border border-gray-300">BTC</th>
                  <th className="p-2 border border-gray-300">ETH</th>
                  <th className="p-2 border border-gray-300">USDT</th>
                </tr>
              </thead>

              <tbody>
                {filtered.length > 0 ? (
                  filtered.map((user, index) => (
                    <tr
                      key={user.id}
                      className={`${
                        index % 2 === 0 ? "bg-gray-100" : "bg-white"
                      } hover:bg-orange-50 transition-colors`}
                    >
                      <td className="p-2 border border-gray-300 align-top text-sm">
                        {user.id}
                      </td>
                      <td className="p-2 border border-gray-300 align-top text-sm">
                        {user.username}
                      </td>

                      <td className="p-2 border border-gray-300 align-top text-sm">
                        <div>Available: {user.btc.available}</div>
                        <div>Frozen: {user.btc.frozen}</div>
                        <div>Total: {user.btc.total}</div>
                      </td>

                      <td className="p-2 border border-gray-300 align-top text-sm">
                        <div>Available: {user.eth.available}</div>
                        <div>Frozen: {user.eth.frozen}</div>
                        <div>Total: {user.eth.total}</div>
                      </td>

                      <td className="p-2 border border-gray-300 align-top text-sm">
                        <div>Available: {user.usdt.available}</div>
                        <div>Frozen: {user.usdt.frozen}</div>
                        <div>Total: {user.usdt.total}</div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan={5}
                      className="text-center text-gray-500 py-6 border border-gray-300 bg-white"
                    >
                      No results found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
