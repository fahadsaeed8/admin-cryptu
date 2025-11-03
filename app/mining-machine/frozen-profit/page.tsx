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
      <div className=" bg-white p-2 md:p-4">
        <div>
          {/* Header */}
          <div className="">
            <h1 className="text-lg font-semibold text-gray-900 mb-4 border-b border-gray-300">
              Frozen Profit
            </h1>
          </div>

          {/* Table */}
          <div className="overflow-x-auto bg-white">
            <table className="min-w-full text-sm border-collapse table-auto">
              <thead>
                <tr className="text-left">
                  {[
                    " ",
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
