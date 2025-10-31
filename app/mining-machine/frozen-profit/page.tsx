"use client";
import React from "react";
import Image from "next/image";
import DashboardLayout from "@/app/page";

interface FreezeItem {
  id: number;
  memberAccount: string;
  frozenAmount: string;
  frozenCurrency: string;
  state: string;
  freezeTime: string;
  unfreezingTime: string;
  freezeInstructions: string;
}

const RevenueList: React.FC = () => {
  // Empty data state
  const data: FreezeItem[] = [];

  return (
    <DashboardLayout>
      <div className="min-h-screen">
        <div>
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
            <h1 className="text-lg font-semibold text-gray-700 mb-3 md:mb-0">
              Mining Machine Management &gt;&gt;{" "}
              <span className="text-blue-600">Revenue List</span>
            </h1>

            {/* Search bar */}
            <div className="flex items-center border rounded-md px-2 py-1 w-60">
              <input
                type="text"
                placeholder="Enter user account"
                className="flex-1 outline-none text-sm text-gray-600"
              />
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4 text-gray-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-4.35-4.35m0 0A7.5 7.5 0 1116.65 16.65z"
                />
              </svg>
            </div>
          </div>

          {/* Table */}
          <div className="overflow-x-auto bg-white">
            <table className="min-w-full text-sm border-collapse table-auto">
              <thead>
                <tr className="text-left">
                  {[
                    "ID",
                    "Member account",
                    "Frozen amount",
                    "Frozen Currency",
                    "state",
                    "Freeze time",
                    "Unfreezing time",
                    "Freeze Instructions",
                  ].map((header) => (
                    <th
                      key={header}
                      className="p-2 border border-gray-300 font-semibold whitespace-nowrap"
                    >
                      {header}
                    </th>
                  ))}
                </tr>
              </thead>

              <tbody>
                {data.length === 0 ? (
                  <tr>
                    <td
                      colSpan={9}
                      className="text-center py-10 text-gray-400 italic border border-gray-300 bg-white"
                    >
                      <div className="flex flex-col items-center justify-center">
                        <Image
                          src="/no-data-icon.png"
                          alt="No data"
                          width={24}
                          height={24}
                          className="opacity-70 mb-2"
                        />
                        No data available.
                      </div>
                    </td>
                  </tr>
                ) : (
                  data.map((item, index) => (
                    <tr
                      key={item.id}
                      className={`${
                        index % 2 === 0 ? "bg-gray-100" : "bg-white"
                      } hover:bg-orange-50 transition-colors`}
                    >
                      <td className="p-2 border border-gray-300 text-center">
                        <input type="checkbox" className="accent-blue-600" />
                      </td>
                      <td className="p-2 border border-gray-300">{item.id}</td>
                      <td className="p-2 border border-gray-300">
                        {item.memberAccount}
                      </td>
                      <td className="p-2 border border-gray-300">
                        {item.frozenAmount}
                      </td>
                      <td className="p-2 border border-gray-300">
                        {item.frozenCurrency}
                      </td>
                      <td className="p-2 border border-gray-300">
                        {item.state}
                      </td>
                      <td className="p-2 border border-gray-300">
                        {item.freezeTime}
                      </td>
                      <td className="p-2 border border-gray-300">
                        {item.unfreezingTime}
                      </td>
                      <td className="p-2 border border-gray-300">
                        {item.freezeInstructions}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default RevenueList;
