"use client";
import DashboardLayout from "@/app/page";
import React from "react";

const Page = () => {
  return (
    <DashboardLayout>
      <div className="bg-white p-2 md:p-4 min-h-screen">
        <div className="w-full">
          <h1 className="md:text-2xl font-semibold border-b border-gray-300 mb-6">
            Second Contract Parameter Setting
          </h1>

          <form className="grid grid-cols-1 w-[80%] gap-4 ">
            {/* ✅ Changed layout: label & input side by side */}
            <div className="grid grid-cols-1 md:grid-cols-2 items-start gap-3 ">
              <label className="font-medium whitespace-nowrap">
                Transaction
              </label>
              <input
                type="text"
                placeholder="0.00"
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring focus:ring-blue-300"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 items-start gap-3">
              <label className="font-medium whitespace-nowrap">Fees</label>
              <div>
                <input
                  type="text"
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring focus:ring-blue-300"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 items-start gap-3">
              <label className="font-medium whitespace-nowrap">
                Contract time
              </label>
              <div>
                <input
                  type="text"
                  placeholder="60,600,1800,3200,86400"
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring focus:ring-blue-300"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 items-start gap-3">
              <label className="font-medium whitespace-nowrap">
                Percentage of contract profit and loss
              </label>
              <div>
                <input
                  type="text"
                  placeholder="10,20,30,40,50"
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring focus:ring-blue-300"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 items-start gap-3">
              <label className="font-medium whitespace-nowrap">
                Amount of investment
              </label>
              <div>
                <input
                  type="text"
                  placeholder="50,100,250,350,650"
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring focus:ring-blue-300"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 items-start gap-3">
              <label className="font-medium whitespace-nowrap">
                Contract opening time
              </label>
              <div>
                <input
                  type="text"
                  placeholder="00:00~24:00"
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring focus:ring-blue-300"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 items-start gap-3">
              <label className="font-medium whitespace-nowrap">
                Specify the loss ID
              </label>
              <div>
                <input
                  type="text"
                  placeholder="8888,9999,50"
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring focus:ring-blue-300"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 items-start gap-3">
              <label className="font-medium whitespace-nowrap">
                Specify Profit ID
              </label>
              <div>
                <input
                  type="text"
                  placeholder="8888,9999"
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring focus:ring-blue-300"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 items-start gap-3">
              <label className="font-medium whitespace-nowrap">
                Probability of risk control
              </label>
              <div>
                <input
                  type="text"
                  placeholder="20"
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring focus:ring-blue-300"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 items-start gap-3">
              <label className="font-medium whitespace-nowrap">
                Minimum investment
              </label>
              <div>
                <input
                  type="text"
                  placeholder="100"
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring focus:ring-blue-300"
                />
              </div>
            </div>

            {/* ✅ Buttons section with cursor-pointer */}
            <div className="flex justify-center gap-4 mt-6">
              <button
                type="submit"
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-md cursor-pointer"
              >
                Submissions
              </button>
              <button
                type="button"
                className="bg-green-500 hover:bg-green-600 text-white px-6 py-2 rounded-md cursor-pointer"
              >
                Return
              </button>
            </div>
          </form>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Page;
