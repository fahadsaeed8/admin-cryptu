"use client";

import DashboardLayout from "@/app/page";
import { useState } from "react";

interface Deposit {
  id: number;
  username: string;
  currency: string;
  network: string;
  rechargeTime: string;
  processingTime: string;
  rechargeAmount: string;
  actualAmount: string;
  transferVoucher: string;
  state: string;
}

export default function DepositListPage() {
  const [deposits] = useState<Deposit[]>([]);
  const [search, setSearch] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  return (
    <DashboardLayout>
      <div className="">
        <h1 className="text-xl font-semibold mb-4">Deposit List</h1>

        {/* Filters */}
        <div className="flex flex-wrap gap-2 items-center bg-white shadow p-4 rounded-md mb-6">
          <select className="border rounded-md px-3 py-2 text-sm">
            <option>Username</option>
            <option>User rec</option>
          </select>

          <input
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            className="border rounded-md px-3 py-2 text-sm"
          />

          <input
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            className="border rounded-md px-3 py-2 text-sm"
          />

          <input
            type="text"
            placeholder="Please enter your query"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="flex-1 min-w-[200px] border rounded-md px-3 py-2 text-sm"
          />

          <button className="bg-yellow-400 hover:bg-yellow-500 text-white font-medium px-4 py-2 rounded-md">
            Initial search
          </button>
        </div>

        {/* Table */}
        <div className="overflow-x-auto bg-white">
          <table className="min-w-[1200px] text-sm border-collapse table-auto">
            <thead>
              <tr className=" text-gray-700 text-left">
                <th className="p-2 border border-gray-300">ID</th>
                <th className="p-2 border border-gray-300">Username</th>
                <th className="p-2 border border-gray-300">
                  Recharge currency
                </th>
                <th className="p-2 border border-gray-300">Recharge Network</th>
                <th className="p-2 border border-gray-300">Recharge time</th>
                <th className="p-2 border border-gray-300">Processing time</th>
                <th className="p-2 border border-gray-300">Recharge amount</th>
                <th className="p-2 border border-gray-300">
                  Actual amount received
                </th>
                <th className="p-2 border border-gray-300">Transfer voucher</th>
                <th className="p-2 border border-gray-300 text-center">
                  State
                </th>
                <th className="p-2 border border-gray-300 text-center">
                  Operate
                </th>
              </tr>
            </thead>

            <tbody>
              {deposits.length === 0 ? (
                <tr>
                  <td
                    colSpan={11}
                    className="text-center text-gray-500 py-10 border border-gray-300"
                  >
                    No data available.
                  </td>
                </tr>
              ) : (
                deposits.map((item, index) => (
                  <tr
                    key={item.id}
                    className={`${
                      index % 2 === 0 ? "bg-gray-100" : "bg-white"
                    } hover:bg-orange-50 transition-colors`}
                  >
                    <td className="p-2 border border-gray-300">{item.id}</td>
                    <td className="p-2 border border-gray-300">
                      {item.username}
                    </td>
                    <td className="p-2 border border-gray-300">
                      {item.currency}
                    </td>
                    <td className="p-2 border border-gray-300">
                      {item.network}
                    </td>
                    <td className="p-2 border border-gray-300">
                      {item.rechargeTime}
                    </td>
                    <td className="p-2 border border-gray-300">
                      {item.processingTime}
                    </td>
                    <td className="p-2 border border-gray-300">
                      {item.rechargeAmount}
                    </td>
                    <td className="p-2 border border-gray-300">
                      {item.actualAmount}
                    </td>
                    <td className="p-2 border border-gray-300">
                      {item.transferVoucher}
                    </td>
                    <td
                      className={`p-2 border border-gray-300 text-center font-semibold ${
                        item.state === "Completed"
                          ? "text-green-600"
                          : item.state === "Pending"
                          ? "text-orange-600"
                          : "text-gray-600"
                      }`}
                    >
                      {item.state}
                    </td>
                    <td className="p-2 border border-gray-300 text-center">
                      <button className="px-2 py-1 text-xs bg-white border border-gray-300 rounded hover:bg-orange-100 transition">
                        View
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </DashboardLayout>
  );
}
