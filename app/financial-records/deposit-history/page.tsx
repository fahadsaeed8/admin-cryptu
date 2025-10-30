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
        <div className="overflow-x-auto bg-white shadow rounded-md">
          <table className="min-w-full text-sm text-left">
            <thead className="bg-gray-100 text-gray-700">
              <tr>
                <th className="p-3 font-medium">ID</th>
                <th className="p-3 font-medium">Username</th>
                <th className="p-3 font-medium">Recharge currency</th>
                <th className="p-3 font-medium">Recharge Network</th>
                <th className="p-3 font-medium">Recharge time</th>
                <th className="p-3 font-medium">Processing time</th>
                <th className="p-3 font-medium">Recharge amount</th>
                <th className="p-3 font-medium">Actual amount received</th>
                <th className="p-3 font-medium">Transfer voucher</th>
                <th className="p-3 font-medium">State</th>
                <th className="p-3 font-medium">Operate</th>
              </tr>
            </thead>
            <tbody>
              {deposits.length === 0 ? (
                <tr>
                  <td colSpan={11} className="text-center py-10 text-gray-500">
                    No data available.
                  </td>
                </tr>
              ) : (
                deposits.map((item) => (
                  <tr key={item.id} className="border-t">
                    <td className="p-3">{item.id}</td>
                    <td className="p-3">{item.username}</td>
                    <td className="p-3">{item.currency}</td>
                    <td className="p-3">{item.network}</td>
                    <td className="p-3">{item.rechargeTime}</td>
                    <td className="p-3">{item.processingTime}</td>
                    <td className="p-3">{item.rechargeAmount}</td>
                    <td className="p-3">{item.actualAmount}</td>
                    <td className="p-3">{item.transferVoucher}</td>
                    <td className="p-3">{item.state}</td>
                    <td className="p-3 text-blue-500 cursor-pointer hover:underline">
                      View
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
