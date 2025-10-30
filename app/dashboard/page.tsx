"use client";

import React from "react";
import {
  User,
  LayoutGrid,
  ArrowLeftRight,
  Server,
  Gift,
  Download,
  Upload,
  CheckSquare,
} from "lucide-react";
import DashboardLayout from "../page";

const DashboardPage = () => {
  const stats = [
    {
      id: 1,
      icon: <User className="text-green-500 w-8 h-8" />,
      title: "Total number of registered users",
      value: "8",
      unit: "(people)",
    },
    {
      id: 2,
      icon: <LayoutGrid className="text-red-500 w-8 h-8" />,
      title: "Open positions in second-hand contracts",
      value: "0",
      unit: "(number of contracts)",
    },
    {
      id: 3,
      icon: <ArrowLeftRight className="text-yellow-500 w-8 h-8" />,
      title: "Coin-to-coin trading quota",
      value: "1000.0000",
      unit: "(USDT)",
    },
    {
      id: 4,
      icon: <Server className="text-blue-500 w-8 h-8" />,
      title: "Total number of active mining machines across the network",
      value: "16",
      unit: "(units)",
    },
    {
      id: 5,
      icon: <Gift className="text-green-500 w-8 h-8" />,
      title: "Number of subscription records",
      value: "0",
      unit: "(entries)",
    },
    {
      id: 6,
      icon: <Download className="text-red-500 w-8 h-8" />,
      title: "Today's Deposits / Total Deposits",
      value: "0.00 | 0.00",
      unit: "(USDT)",
    },
    {
      id: 7,
      icon: <Upload className="text-yellow-500 w-8 h-8" />,
      title: "Total withdrawals/cash withdrawals today",
      value: "0.00 | 1.00",
      unit: "(USDT)",
    },
    {
      id: 8,
      icon: <CheckSquare className="text-blue-500 w-8 h-8" />,
      title: "Today's visitor count",
      value: "1",
      unit: "(people)",
    },
  ];

  return (
    <DashboardLayout>
      <div className="min-h-screen">
        {/* Grid Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          {stats.map((item) => (
            <div
              key={item.id}
              className="flex items-center gap-4 bg-white p-5 rounded-2xl shadow-sm hover:shadow-md transition-all"
            >
              <div>{item.icon}</div>
              <div>
                <p className="text-xl font-bold text-gray-800">{item.value}</p>
                <p className="text-sm text-gray-500">
                  {item.title}{" "}
                  <span className="text-gray-400">{item.unit}</span>
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {/* User Registration Chart */}
          <div className="bg-white p-5 rounded-2xl shadow-sm">
            <h2 className="text-center text-gray-800 font-semibold mb-2">
              User registration report (30 days)
            </h2>
            <div className="h-48 flex items-end gap-4 justify-center">
              <div className="w-8 bg-blue-300 h-6 rounded-md"></div>
              <div className="w-8 bg-blue-500 h-24 rounded-md"></div>
            </div>
            <div className="flex justify-between text-xs text-gray-400 mt-2 px-6">
              <span>2025-10-19</span>
              <span>2025-10-20</span>
            </div>
          </div>

          {/* Deposit/Withdrawal Statistics */}
          <div className="bg-white p-5 rounded-2xl shadow-sm">
            <h2 className="text-center text-gray-800 font-semibold mb-2">
              Deposit/Withdrawal Statistics (30 days)
            </h2>
            <div className="h-48 flex items-center justify-center text-gray-400 text-sm">
              No data available
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default DashboardPage;
