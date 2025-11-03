"use client";
import React from "react";
import Image from "next/image";
import DashboardLayout from "@/app/page";

interface MiningMachine {
  id: number;
  memberAccount: string;
  type: string;
  name: string;
  picture: string;
  purchaseTime: string;
  expirationTime: string;
  miningStatus: string;
  profitTimes: string;
  currency: string;
}

const MiningMachineTable: React.FC = () => {
  const data: MiningMachine[] = [
    {
      id: 40,
      memberAccount: "usmanbutt7910@gmail.com",
      type: "Sole proprietorship",
      name: "Free mining machine",
      picture: "/machine.png",
      purchaseTime: "10-20 01:49",
      expirationTime: "11-03 01:49",
      miningStatus: "normal",
      profitTimes: "0 times",
      currency: "USDT",
    },
    {
      id: 39,
      memberAccount: "zubair58@gmail.com",
      type: "Sole proprietorship",
      name: "Free mining machine",
      picture: "/machine.png",
      purchaseTime: "10-20 01:31",
      expirationTime: "11-03 01:31",
      miningStatus: "normal",
      profitTimes: "0 times",
      currency: "USDT",
    },
    {
      id: 38,
      memberAccount: "anasahbaz343@gmail.com",
      type: "Sole proprietorship",
      name: "Free mining machine",
      picture: "/machine.png",
      purchaseTime: "10-19 23:34",
      expirationTime: "11-02 23:34",
      miningStatus: "normal",
      profitTimes: "0 times",
      currency: "USDT",
    },
    {
      id: 37,
      memberAccount: "audreypiyo@gmail.com",
      type: "Sole proprietorship",
      name: "Free mining machine",
      picture: "/machine.png",
      purchaseTime: "10-19 22:40",
      expirationTime: "11-02 22:40",
      miningStatus: "normal",
      profitTimes: "0 times",
      currency: "USDT",
    },
    {
      id: 36,
      memberAccount: "ulyen@gmail.com",
      type: "Sole proprietorship",
      name: "Free mining machine",
      picture: "/machine.png",
      purchaseTime: "10-19 22:27",
      expirationTime: "11-02 22:27",
      miningStatus: "normal",
      profitTimes: "0 times",
      currency: "USDT",
    },
  ];

  return (
    <DashboardLayout>
      <div className=" bg-white p-2 md:p-4">
        <div className="">
          {/* Header */}
          <div className="">
            <h1 className="text-lg font-semibold text-gray-900 border-b border-gray-300 mb-4">
              Mining Machine in Operation
            </h1>
          </div>
          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
            {/* Buttons */}
            <div className="flex flex-wrap gap-2">
              <button className="bg-blue-500 cursor-pointer hover:bg-blue-600 text-white px-3 py-1 rounded text-sm">
                Startup benefits
              </button>
              <button className="bg-yellow-500 cursor-pointer hover:bg-yellow-600 text-white px-3 py-1 rounded text-sm">
                Prohibited from profiting
              </button>
              <button className="bg-red-500 cursor-pointer hover:bg-red-600 text-white px-3 py-1 rounded text-sm">
                Deleting mining machines
              </button>
              <input
                type="text"
                placeholder="Enter user account"
                className="border border-gray-300 px-3 py-1 rounded text-sm focus:ring-2 focus:ring-blue-400"
              />
            </div>
          </div>

          {/* Table */}
          <div className="overflow-x-auto bg-white">
            <table className="min-w-[1200px] text-sm border-collapse table-auto">
              <thead>
                <tr className="text-left">
                  {[
                    "ID",
                    "Member account",
                    "Type",
                    "Name",
                    "Picture",
                    "Purchase time",
                    "Expiration time",
                    "Mining machine status",
                    "Number of times of profit",
                    "Production currency",
                  ].map((header) => (
                    <th
                      key={header}
                      className="p-2 border border-gray-300 font-semibold whitespace-nowrap "
                    >
                      {header}
                    </th>
                  ))}
                </tr>
              </thead>

              <tbody>
                {data.map((item, index) => (
                  <tr
                    key={item.id}
                    className={`${
                      index % 2 === 0 ? "bg-gray-100" : "bg-white"
                    } hover:bg-orange-50 transition-colors`}
                  >
                    <td className="p-2 border border-gray-300">{item.id}</td>
                    <td className="p-2 border border-gray-300">
                      {item.memberAccount}
                    </td>
                    <td className="p-2 border border-gray-300">{item.type}</td>
                    <td className="p-2 border border-gray-300">{item.name}</td>
                    <td className="p-2 border border-gray-300 text-center">
                      <Image
                        src={item.picture}
                        alt="machine"
                        width={35}
                        height={35}
                        className="inline-block object-contain"
                      />
                    </td>
                    <td className="p-2 border border-gray-300">
                      {item.purchaseTime}
                    </td>
                    <td className="p-2 border border-gray-300">
                      {item.expirationTime}
                    </td>
                    <td
                      className={`p-2 border border-gray-300 font-medium ${
                        item.miningStatus === "normal"
                          ? "text-green-600"
                          : "text-red-500"
                      }`}
                    >
                      {item.miningStatus}
                    </td>
                    <td className="p-2 border border-gray-300">
                      {item.profitTimes}
                    </td>
                    <td className="p-2 border border-gray-300">
                      {item.currency}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default MiningMachineTable;
