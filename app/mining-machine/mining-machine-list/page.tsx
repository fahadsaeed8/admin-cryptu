"use client";
import React from "react";
import Image from "next/image";
import DashboardLayout from "@/app/page";

interface MiningMachine {
  id: string | number;
  type: string;
  purchaseType: "Buy" | "Gift";
  title: string;
  image: string;
  output: string;
  price: string;
  limit: string;
  cycle: string;
  state: string;
  addTime: string;
}

const MiningMachineList: React.FC = () => {
  const data: MiningMachine[] = [
    {
      id: 26,
      type: "Sole proprietorship",
      purchaseType: "Buy",
      title: "Invite friend miner",
      image: "/machine.png",
      output:
        "Output type: Daily output per unit of output value: 2.000000 USDT",
      price: "2.000000 USDT",
      limit: "1 unit",
      cycle: "100 days",
      state: "normal",
      addTime: "2022-06-03 22:52:44",
    },
    {
      id: 25,
      type: "Sole proprietorship",
      purchaseType: "Buy",
      title: "ETH mining machine",
      image: "/machine.png",
      output:
        "Output type: Daily output per unit of output value: 200.000000 USDT",
      price: "200.000000 USDT",
      limit: "1 unit",
      cycle: "180 days",
      state: "normal",
      addTime: "2022-06-03 22:53:14",
    },
    {
      id: "twenty two",
      type: "Sole proprietorship",
      purchaseType: "Buy",
      title: "ETH mining machine 3rd",
      image: "/machine.png",
      output: "Output type: Daily output by output value: 32.200000 USDT",
      price: "2000.000000 USDT",
      limit: "1 unit",
      cycle: "180 days",
      state: "normal",
      addTime: "2022-06-03 22:53:20",
    },
    {
      id: "twenty one",
      type: "Sole proprietorship",
      purchaseType: "Buy",
      title: "ETH mining machine 2nd",
      image: "/machine.png",
      output: "Output type: Daily output by output value: 13.800000 USDT",
      price: "1000.000000 USDT",
      limit: "1 unit",
      cycle: "180 days",
      state: "normal",
      addTime: "2022-06-03 22:53:46",
    },
    {
      id: 20,
      type: "Sole proprietorship",
      purchaseType: "Buy",
      title: "ETH mining machine 1st",
      image: "/machine.png",
      output:
        "Output type: Daily output per unit of output value: 6.100000 USDT",
      price: "500.000000 USDT",
      limit: "1 unit",
      cycle: "180 days",
      state: "normal",
      addTime: "2022-06-03 22:54:03",
    },
    {
      id: 19,
      type: "Sole proprietorship",
      purchaseType: "Gift",
      title: "Free mining machine",
      image: "/machine.png",
      output: "Output type: Daily output per coin: 2.000000 USDT",
      price: "0.000000 USDT",
      limit: "1 unit",
      cycle: "14 days",
      state: "normal",
      addTime: "2022-11-10 03:32:37",
    },
  ];

  return (
    <DashboardLayout>
      <div className="min-h-screen">
        <div className="bg-white shadow-md rounded-lg p-6">
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
            <h1 className="text-lg font-semibold text-gray-700 mb-3 md:mb-0">
              Mining Machine Management &gt;&gt;{" "}
              <span className="text-blue-600">Mining Machine List</span>
            </h1>

            {/* Action buttons */}
            <div className="flex flex-wrap gap-2">
              <button className="bg-green-500 hover:bg-green-600 text-white px-4 py-1 rounded text-sm">
                New
              </button>
              <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-1 rounded text-sm">
                Enable
              </button>
              <button className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-1 rounded text-sm">
                Disable
              </button>
              <button className="bg-red-500 hover:bg-red-600 text-white px-4 py-1 rounded text-sm">
                Delete
              </button>
            </div>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="min-w-[1500px] text-sm border-collapse table-auto">
              <thead>
                <tr className="text-left">
                  {[
                    "ID",
                    "type",
                    "Purchase type",
                    "Mining Machine Title",
                    "Mining machine images",
                    "Mining machine output",
                    "Purchase unit price",
                    "Purchase limit",
                    "cycle",
                    "state",
                    "Add time",
                    "operate",
                  ].map((header) => (
                    <th
                      key={header}
                      className="p-2 border border-gray-300 font-medium text-gray-600 whitespace-nowrap "
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
                    <td className="p-2 border border-gray-300">
                      <input type="checkbox" className="accent-orange-500" />
                    </td>
                    <td className="p-2 border border-gray-300">{item.id}</td>
                    <td className="p-2 border border-gray-300">{item.type}</td>
                    <td
                      className={`p-2 border border-gray-300 font-semibold ${
                        item.purchaseType === "Buy"
                          ? "text-green-600"
                          : "text-red-500"
                      }`}
                    >
                      {item.purchaseType}
                    </td>
                    <td className="p-2 border border-gray-300">{item.title}</td>
                    <td className="p-2 border border-gray-300">
                      <div className="flex items-center justify-center">
                        <Image
                          src={item.image}
                          alt="Machine"
                          width={35}
                          height={35}
                          className="object-contain"
                        />
                      </div>
                    </td>
                    <td className="p-2 border border-gray-300">
                      {item.output}
                    </td>
                    <td className="p-2 border border-gray-300 whitespace-nowrap">
                      {item.price}
                    </td>
                    <td className="p-2 border border-gray-300">{item.limit}</td>
                    <td className="p-2 border border-gray-300">{item.cycle}</td>
                    <td className="p-2 border border-gray-300">{item.state}</td>
                    <td className="p-2 border border-gray-300">
                      {item.addTime}
                    </td>
                    <td className="p-3 border border-gray-300 flex justify-center">
                      <button className="px-2 py-1 text-xs bg-white border border-gray-300 rounded hover:bg-orange-100 transition">
                        edit
                      </button>
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

export default MiningMachineList;
