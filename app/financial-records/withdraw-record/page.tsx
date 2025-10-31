"use client";

import DashboardLayout from "@/app/page";
import { useState } from "react";

interface Withdrawal {
  id: number;
  username: string;
  currency: string;
  network: string;
  applicationTime: string;
  reviewTime: string;
  address: string;
  amount: number;
  fee: number;
  actual: number;
  state: "Finish" | "Pending review";
}

export default function WithdrawalRecordsPage() {
  const [records, setRecords] = useState<Withdrawal[]>([
    {
      id: 15,
      username: "ransahshahbaz04@gmail.com",
      currency: "USDT",
      network: "BANK",
      applicationTime: "2025-10-20 01:43:34",
      reviewTime: "2025-10-20 01:27:54",
      address: "Janzrah - Mohammed Shahbaz Khan - ****9407",
      amount: 1.0,
      fee: 0.0,
      actual: 1.0,
      state: "Finish",
    },
    {
      id: 14,
      username: "test@gmail.com",
      currency: "USDT",
      network: "ERC20",
      applicationTime: "2025-09-09 02:28:50",
      reviewTime: "0000-00-00 00:00:00",
      address: "Stryutu6",
      amount: 500.0,
      fee: 5.0,
      actual: 495.0,
      state: "Pending review",
    },
  ]);

  const [search, setSearch] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  // Filtered list based on search input
  const filtered = records.filter((r) =>
    r.username.toLowerCase().includes(search.toLowerCase())
  );

  // Handlers for button actions
  const handleConfirm = (id: number) => {
    setRecords((prev) =>
      prev.map((r) =>
        r.id === id
          ? { ...r, state: "Finish", reviewTime: new Date().toISOString() }
          : r
      )
    );
    alert(`Withdrawal #${id} confirmed`);
  };

  const handleReject = (id: number) => {
    setRecords((prev) => prev.filter((r) => r.id !== id));
    alert(`Withdrawal #${id} rejected`);
  };

  const handleSearch = () => {
    alert(
      `Searching for "${search}" from ${startDate || "any"} to ${
        endDate || "any"
      }`
    );
  };

  return (
    <DashboardLayout>
      <div className="">
        <h1 className="text-xl font-semibold mb-4">
          Cryptocurrency withdrawal records
        </h1>

        {/* Search / Filter Section */}
        <div className="flex flex-wrap gap-2 items-center bg-white shadow p-4 rounded-md mb-6">
          <select className="border rounded-md px-3 py-2 text-sm">
            <option>Username</option>
            <option>Network</option>
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

          <button
            onClick={handleSearch}
            className="bg-yellow-400 hover:bg-yellow-500 text-white font-medium px-4 py-2 rounded-md"
          >
            Initial search
          </button>
        </div>

        {/* Table Section */}
        <div className="overflow-x-auto bg-white">
          <table className="min-w-[1500px] text-sm text-left border-collapse">
            <thead className=" text-gray-700 border-b">
              <tr>
                <th className="p-2 border text-center">ID</th>
                <th className="p-2 border">Username</th>
                <th className="p-2 border">Currency Name</th>
                <th className="p-2 border">Cash withdrawal network</th>
                <th className="p-2 border">Application time</th>
                <th className="p-2 border">Review time</th>
                <th className="p-2 border">Withdrawal address</th>
                <th className="p-2 border text-center">Withdrawal amount</th>
                <th className="p-2 border text-center">Withdrawal fee</th>
                <th className="p-2 border text-center">
                  Actual amount received
                </th>
                <th className="p-2 border text-center">State</th>
                <th className="p-2 border text-center">Operate</th>
              </tr>
            </thead>
            <tbody>
              {filtered.length === 0 ? (
                <tr>
                  <td
                    colSpan={12}
                    className="text-center py-10 text-gray-500 border"
                  >
                    No data available.
                  </td>
                </tr>
              ) : (
                filtered.map((item, index) => (
                  <tr
                    key={item.id}
                    className={`${
                      index % 2 === 0 ? "bg-gray-100" : "bg-white"
                    } hover:bg-orange-100 transition-colors`}
                  >
                    <td className="p-2 border text-center">{item.id}</td>
                    <td className="p-2 border">{item.username}</td>
                    <td className="p-2 border">{item.currency}</td>
                    <td className="p-2 border">{item.network}</td>
                    <td className="p-2 border">{item.applicationTime}</td>
                    <td className="p-2 border">{item.reviewTime}</td>
                    <td className="p-2 border">{item.address}</td>
                    <td className="p-2 border text-center">
                      {item.amount.toFixed(6)}
                    </td>
                    <td className="p-2 border text-center">
                      {item.fee.toFixed(6)}
                    </td>
                    <td className="p-2 border text-center">
                      {item.actual.toFixed(6)}
                    </td>
                    <td
                      className={`p-2 border text-center font-semibold ${
                        item.state === "Finish"
                          ? "text-green-600"
                          : "text-blue-600"
                      }`}
                    >
                      {item.state}
                    </td>
                    <td className="p-2 border text-center space-x-2">
                      {item.state === "Finish" ? (
                        <button className="bg-gray-200 text-gray-700 px-3 py-1 rounded-md text-xs">
                          Processed
                        </button>
                      ) : (
                        <>
                          <button
                            onClick={() => handleConfirm(item.id)}
                            className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded-md text-xs"
                          >
                            Withdrawal confirmed
                          </button>
                          <button
                            onClick={() => handleReject(item.id)}
                            className="bg-gray-600 hover:bg-gray-700 text-white px-3 py-1 rounded-md text-xs"
                          >
                            Withdrawal rejected
                          </button>
                        </>
                      )}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>

          {/* Footer / Pagination Info */}
          <div className="p-2 text-gray-600 text-sm border-t">
            {filtered.length} record{filtered.length !== 1 ? "s" : ""}, page 1/1
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
