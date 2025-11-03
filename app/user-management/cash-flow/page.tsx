"use client";

import DashboardLayout from "@/app/page";
import { useState, useMemo } from "react";

interface FundsRecord {
  id: number;
  email: string;
  currency: string;
  amount: string;
  amountAfterChange: string;
  operationType: string;
  time: string;
  remark: string;
}

export default function FundsChangeLogPage() {
  const [filterEmail, setFilterEmail] = useState("");
  const [filterOperationType, setFilterOperationType] = useState("");

  // Mock data
  const records: FundsRecord[] = [
    {
      id: 270,
      email: "rmashahbazz041@gmail.com",
      currency: "USDT",
      amount: "-20,0000",
      amountAfterChange: "14.0000",
      operationType: "Purchase Contract",
      time: "2025-10-28 23:07:19",
      remark: "BuyBTC/USDT Quick Trade",
    },
    {
      id: 269,
      email: "rmashahbazz041@gmail.com",
      currency: "USDT",
      amount: "+42,0000",
      amountAfterChange: "84.0000",
      operationType: "Sale Contract",
      time: "2025-10-28 22:11:56",
      remark: "Trade sale",
    },
    {
      id: 268,
      email: "rmashahbazz041@gmail.com",
      currency: "USDT",
      amount: "-1,0000",
      amountAfterChange: "0.0000",
      operationType: "Purchase Contract",
      time: "2025-10-28 17:38:51",
      remark: "BuyGCL/USDT Quick Trade",
    },
    {
      id: 267,
      email: "rmashahbazz041@gmail.com",
      currency: "USDT",
      amount: "-20,0000",
      amountAfterChange: "1.0000",
      operationType: "Purchase Contract",
      time: "2025-10-27 22:11:49",
      remark: "BuyBTC/USDT Quick Trade",
    },
    {
      id: 266,
      email: "rmashahbazz041@gmail.com",
      currency: "USDT",
      amount: "-20,0000",
      amountAfterChange: "29.0000",
      operationType: "Purchase Contract",
      time: "2025-10-27 11:41:04",
      remark: "BuyETH/USDT Quick Trade",
    },
    {
      id: 265,
      email: "rmabafs@gmail.com",
      currency: "USDT",
      amount: "+9,8000",
      amountAfterChange: "19.6000",
      operationType: "Sale Contract",
      time: "2025-10-27 04:01:48",
      remark: "Trade sale",
    },
    {
      id: 264,
      email: "rmabafs@gmail.com",
      currency: "USDT",
      amount: "-7,0000",
      amountAfterChange: "0.0000",
      operationType: "Purchase Contract",
      time: "2025-10-27 03:08:24",
      remark: "BuyBTC/USDT Quick Trade",
    },
    {
      id: 263,
      email: "rmabafs@gmail.com",
      currency: "USDT",
      amount: "+7,0000",
      amountAfterChange: "14.0000",
      operationType: "Sale Contract",
      time: "2025-10-27 02:41:55",
      remark: "Trade sale",
    },
    {
      id: 262,
      email: "rmashahbazz041@gmail.com",
      currency: "USDT",
      amount: "+28,0000",
      amountAfterChange: "77.0000",
      operationType: "Sale Contract",
      time: "2025-10-27 02:25:35",
      remark: "Trade sale",
    },
    {
      id: 261,
      email: "rmabafs@gmail.com",
      currency: "USDT",
      amount: "-5,0000",
      amountAfterChange: "0.0000",
      operationType: "Purchase Contract",
      time: "2025-10-27 01:48:28",
      remark: "BuyBTC/USDT Quick Trade",
    },
    {
      id: 260,
      email: "rmabafs@gmail.com",
      currency: "USDT",
      amount: "-20,0000",
      amountAfterChange: "5.0000",
      operationType: "Purchase Contract",
      time: "2025-10-27 01:42:49",
      remark: "BuyGCH/USDT Quick Trade",
    },
    {
      id: 259,
      email: "urmraebur78910@gmail.com",
      currency: "USDT",
      amount: "-10,0000",
      amountAfterChange: "3.4000",
      operationType: "Purchase Contract",
      time: "2025-10-27 01:36:19",
      remark: "BuyBTC/USDT Quick Trade",
    },
  ];

  // Extract unique emails and operation types for filters
  const uniqueEmails = useMemo(() => {
    return Array.from(new Set(records.map((record) => record.email)));
  }, [records]);

  const uniqueOperationTypes = useMemo(() => {
    return Array.from(new Set(records.map((record) => record.operationType)));
  }, [records]);

  // Filter records based on selected filters
  const filteredRecords = useMemo(() => {
    return records.filter((record) => {
      const emailMatch = !filterEmail || record.email === filterEmail;
      const operationMatch =
        !filterOperationType || record.operationType === filterOperationType;
      return emailMatch && operationMatch;
    });
  }, [records, filterEmail, filterOperationType]);

  // Format amount with proper styling
  const formatAmount = (amount: string) => {
    const numAmount = parseFloat(amount.replace(",", "."));
    const isNegative = amount.startsWith("-");
    const textColor = isNegative ? "text-red-600" : "text-green-600";
    const symbol = isNegative ? "-" : "+";

    return (
      <span className={`font-medium ${textColor}`}>
        {symbol}$
        {Math.abs(numAmount).toLocaleString("en-US", {
          minimumFractionDigits: 4,
          maximumFractionDigits: 4,
        })}
      </span>
    );
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const formatTime = (dateString: string) => {
    return new Date(dateString).toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <DashboardLayout>
      <div className=" bg-white p-2 md:p-4 min-h-screen">
        <div className="">
          {/* Header */}
          <div className="mb-8">
            <h1 className="md:text-3xl font-bold text-gray-900 border-b border-gray-300">
              Funds Change Log
            </h1>
          </div>

          {/* Filters */}

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Email Filter */}
            <div>
              <label
                htmlFor="email-filter"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Filter by Email
              </label>
              <select
                id="email-filter"
                value={filterEmail}
                onChange={(e) => setFilterEmail(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="">All Emails</option>
                {uniqueEmails.map((email) => (
                  <option key={email} value={email}>
                    {email}
                  </option>
                ))}
              </select>
            </div>

            {/* Operation Type Filter */}
            <div>
              <label
                htmlFor="operation-filter"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Filter by Operation Type
              </label>
              <select
                id="operation-filter"
                value={filterOperationType}
                onChange={(e) => setFilterOperationType(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="">All Operations</option>
                {uniqueOperationTypes.map((type) => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
              </select>
            </div>

            {/* Reset Filters */}
            <div className="flex items-end">
              <button
                onClick={() => {
                  setFilterEmail("");
                  setFilterOperationType("");
                }}
                className="w-full md:w-auto bg-[#f0b100] px-4 py-2 border border-gray-300 rounded-md  text-sm font-medium text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                Reset Filters
              </button>
            </div>
          </div>

          {/* Results Count */}
          <div className="my-4">
            <p className="text-sm text-gray-600">
              Showing {filteredRecords.length} of {records.length} records
            </p>
          </div>

          {/* Table */}
          <div className="bg-white ">
            {/* Desktop Table */}
            <div className="overflow-x-auto">
              <table className=" min-w-[1200px] md:min-w-full text-sm text-left border-collapse">
                <thead className=" text-gray-700 uppercase">
                  <tr>
                    <th className="p-2 border border-gray-300">ID</th>
                    <th className="p-2 border border-gray-300">
                      Member Account
                    </th>
                    <th className="p-2 border border-gray-300">Currency</th>
                    <th className="p-2 border border-gray-300">Amount</th>
                    <th className="p-2 border border-gray-300">
                      Amount After Change
                    </th>
                    <th className="p-2 border border-gray-300">
                      Operation Type
                    </th>
                    <th className="p-2 border border-gray-300">Time</th>
                    <th className="p-2 border border-gray-300">Remark</th>
                  </tr>
                </thead>

                <tbody>
                  {filteredRecords.length > 0 ? (
                    filteredRecords.map((record, index) => (
                      <tr
                        key={record.id}
                        className={`${
                          index % 2 === 0 ? "bg-gray-100" : "bg-white"
                        } hover:bg-orange-50 transition-colors`}
                      >
                        <td className="p-2 border border-gray-300 align-top text-sm">
                          {record.id}
                        </td>
                        <td className="p-2 border border-gray-300 align-top text-sm">
                          {record.email}
                        </td>
                        <td className="p-2 border border-gray-300 align-top text-sm">
                          {record.currency}
                        </td>
                        <td className="p-2 border border-gray-300 align-top text-sm">
                          {formatAmount(record.amount)}
                        </td>
                        <td className="p-2 border border-gray-300 align-top text-sm">
                          $
                          {parseFloat(
                            record.amountAfterChange.replace(",", ".")
                          ).toLocaleString("en-US", {
                            minimumFractionDigits: 4,
                            maximumFractionDigits: 4,
                          })}
                        </td>
                        <td className="p-2 border border-gray-300 align-top text-sm">
                          {record.operationType}
                        </td>
                        <td className="p-2 border border-gray-300 align-top text-sm">
                          <div>
                            <div>{formatDate(record.time)}</div>
                            <div className="text-gray-500">
                              {formatTime(record.time)}
                            </div>
                          </div>
                        </td>
                        <td className="p-2 border border-gray-300 align-top text-sm">
                          {record.remark}
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td
                        colSpan={8}
                        className="text-center text-gray-500 py-6 border border-gray-300 bg-white"
                      >
                        No records found
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            {/* Mobile Cards */}
            {/* <div className="lg:hidden">
              {filteredRecords.length > 0 ? (
                filteredRecords.map((record) => (
                  <div
                    key={record.id}
                    className="border-b border-gray-200 p-4 hover:bg-orange-50 transition-colors"
                  >
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div className="space-y-2">
                        <div>
                          <span className="font-medium text-gray-500">ID:</span>
                          <span className="ml-2 text-gray-900">
                            {record.id}
                          </span>
                        </div>
                        <div>
                          <span className="font-medium text-gray-500">
                            Account:
                          </span>
                          <div className="mt-1 text-gray-900 break-all">
                            {record.email}
                          </div>
                        </div>
                        <div>
                          <span className="font-medium text-gray-500">
                            Currency:
                          </span>
                          <span className="ml-2 text-gray-900">
                            {record.currency}
                          </span>
                        </div>
                        <div>
                          <span className="font-medium text-gray-500">
                            Amount:
                          </span>
                          <span className="ml-2">
                            {formatAmount(record.amount)}
                          </span>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <div>
                          <span className="font-medium text-gray-500">
                            After Change:
                          </span>
                          <span className="ml-2 text-gray-900">
                            $
                            {parseFloat(
                              record.amountAfterChange.replace(",", ".")
                            ).toLocaleString("en-US", {
                              minimumFractionDigits: 4,
                              maximumFractionDigits: 4,
                            })}
                          </span>
                        </div>
                        <div>
                          <span className="font-medium text-gray-500">
                            Operation:
                          </span>
                          <span className="ml-2 text-gray-900">
                            {record.operationType}
                          </span>
                        </div>
                        <div>
                          <span className="font-medium text-gray-500">
                            Time:
                          </span>
                          <div className="mt-1 text-gray-900">
                            {formatDate(record.time)} {formatTime(record.time)}
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="mt-3 pt-3 border-t border-gray-200">
                      <span className="font-medium text-gray-500">Remark:</span>
                      <div className="mt-1 text-gray-900">{record.remark}</div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center text-gray-500 py-6 bg-white">
                  No records found
                </div>
              )}
            </div> */}
          </div>

          {/* Empty State */}
          {filteredRecords.length === 0 && (
            <div className="text-center py-12">
              <div className="text-gray-400 mb-4">
                <svg
                  className="mx-auto h-12 w-12"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1}
                    d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                  />
                </svg>
              </div>
              <h3 className="text-sm font-medium text-gray-900">
                No records found
              </h3>
              <p className="mt-1 text-sm text-gray-500">
                Try adjusting your filters to see more results.
              </p>
            </div>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
}
