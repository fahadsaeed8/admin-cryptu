"use client";
import React from "react";
import Image from "next/image";
import DashboardLayout from "@/app/page";

interface ExpiredMachine {
  id: number;
  memberAccount: string;
  type: string;
  name: string;
  picture: string;
  purchaseTime: string;
  endTime: string;
  status: string;
  profitTimes: string;
  currency: string;
}

const ExpiredMiningMachines: React.FC = () => {
  // No data (empty state)
  const data: ExpiredMachine[] = [];

  return (
    <DashboardLayout>
      <div className=" bg-white p-2 md:p-4">
        <div className="">
          {/* Header */}
          <div className="">
            <h1 className="text-lg font-semibold text-gray-900 mb-3 border-b border-gray-300">
              Expired Mining Machines
            </h1>
          </div>

          {/* Table */}
          <div className="overflow-x-auto bg-white">
            <table className="min-w-[1200px] text-sm border-collapse table-auto">
              <thead>
                <tr className="text-left">
                  {[
                    " ",
                    "ID",
                    "Member account",
                    "type",
                    "name",
                    "picture",
                    "Purchase time",
                    "End time",
                    "Mining machine status",
                    "Number of times of profit",
                    "Production currency",
                  ].map((header) => (
                    <th
                      key={header}
                      className="p-2 border border-gray-300  font-semibold whitespace-nowrap "
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
                      colSpan={11}
                      className="text-center py-10 text-gray-400 italic border border-gray-300 "
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
                        {item.type}
                      </td>
                      <td className="p-2 border border-gray-300">
                        {item.name}
                      </td>
                      <td className="p-2 border border-gray-300 text-center">
                        <Image
                          src={item.picture}
                          alt="Machine"
                          width={35}
                          height={35}
                          className="inline-block object-contain"
                        />
                      </td>
                      <td className="p-2 border border-gray-300">
                        {item.purchaseTime}
                      </td>
                      <td className="p-2 border border-gray-300">
                        {item.endTime}
                      </td>
                      <td
                        className={`p-2 border border-gray-300 font-medium ${
                          item.status === "normal"
                            ? "text-green-600"
                            : "text-red-500"
                        }`}
                      >
                        {item.status}
                      </td>
                      <td className="p-2 border border-gray-300">
                        {item.profitTimes}
                      </td>
                      <td className="p-2 border border-gray-300">
                        {item.currency}
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

export default ExpiredMiningMachines;
