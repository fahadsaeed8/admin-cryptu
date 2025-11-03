"use client";
import React from "react";
import Image from "next/image";
import DashboardLayout from "@/app/page";

interface RevenueItem {
  id: number;
  memberAccount: string;
  miningMachineName: string;
  revenueAmount: string;
  earningCurrency: string;
  earningTime: string;
}

const RevenueList: React.FC = () => {
  // No data (empty state)
  const data: RevenueItem[] = [];

  return (
    <DashboardLayout>
      <div className=" bg-white p-2 md:p-4">
        <div className="">
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4 border-b border-gray-300">
            <h1 className="text-lg font-semibold text-gray-700 mb-3 md:mb-0">
              Revenue List
            </h1>
          </div>
          {/* Search bar */}
          <div className="flex items-center border border-gray-300 rounded-md px-2 py-1 w-60 my-4">
            <input
              type="text"
              placeholder="Enter user account"
              className="flex-1 outline-none text-sm text-gray-600 "
            />
          </div>

          {/* Table */}
          <div className="overflow-x-auto bg-white">
            <table className="min-w-full text-sm border-collapse table-auto">
              <thead>
                <tr className="text-left ">
                  {[
                    " ",
                    "ID",
                    "Member account",
                    "Mining machine name",
                    "Revenue Amount",
                    "Earning Currency",
                    "Earnings Time",
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
                      colSpan={7}
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
                        {item.miningMachineName}
                      </td>
                      <td className="p-2 border border-gray-300">
                        {item.revenueAmount}
                      </td>
                      <td className="p-2 border border-gray-300">
                        {item.earningCurrency}
                      </td>
                      <td className="p-2 border border-gray-300">
                        {item.earningTime}
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
