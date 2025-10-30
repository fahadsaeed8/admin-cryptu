"use client";
import DashboardLayout from "@/app/page";
import React from "react";

const Page = () => {
  return (
    <DashboardLayout>
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-full max-w-3xl bg-white shadow-lg rounded-lg p-6 md:p-10">
          <h1 className="text-2xl font-semibold text-center mb-6">
            Second Contract Parameter Setting
          </h1>

          <form className="grid grid-cols-1 gap-4">
            {/* Transaction */}
            <div>
              <label className="block font-medium mb-1">Transaction</label>
              <input
                type="text"
                placeholder="0.00"
                className="w-full border rounded-md px-3 py-2 focus:ring focus:ring-blue-300"
              />
            </div>

            {/* Fees */}
            <div>
              <label className="block font-medium mb-1">Fees</label>
              <p className="text-xs text-gray-500 mb-1">
                Note: transaction fees, such as: 10%; written as 10;
              </p>
              <input
                type="text"
                className="w-full border rounded-md px-3 py-2 focus:ring focus:ring-blue-300"
              />
            </div>

            {/* Contract time */}
            <div>
              <label className="block font-medium mb-1">Contract time</label>
              <p className="text-xs text-gray-500 mb-1">
                Note: If the time is: 30 seconds, 60 seconds, 120 seconds, 300
                seconds, then use the letter comma to separate the time, such
                as: input: 30, 60, 120, 300. If there is no such rule, it is
                left empty. Must be four.
              </p>
              <input
                type="text"
                placeholder="60,600,1800,3200,86400"
                className="w-full border rounded-md px-3 py-2 focus:ring focus:ring-blue-300"
              />
            </div>

            {/* Percentage of profit and loss */}
            <div>
              <label className="block font-medium mb-1">
                Percentage of contract profit and loss
              </label>
              <p className="text-xs text-gray-500 mb-1">
                Note: If the proportions are: 75%, 77%, 80%, 85%, please use the
                letter comma to separate the proportions, such as input: 75, 77,
                80, 85. Must be four and not empty.
              </p>
              <input
                type="text"
                placeholder="10,20,30,40,50"
                className="w-full border rounded-md px-3 py-2 focus:ring focus:ring-blue-300"
              />
            </div>

            {/* Amount of investment */}
            <div>
              <label className="block font-medium mb-1">
                Amount of investment
              </label>
              <p className="text-xs text-gray-500 mb-1">
                Note: If the quota is: 10USDT, 50USDT, 100USDT, 1000USDT, please
                use the letter comma to separate the proportions, such as input:
                10, 50, 100, 1000.
              </p>
              <input
                type="text"
                placeholder="50,100,250,350,650"
                className="w-full border rounded-md px-3 py-2 focus:ring focus:ring-blue-300"
              />
            </div>

            {/* Contract opening time */}
            <div>
              <label className="block font-medium mb-1">
                Contract opening time
              </label>
              <p className="text-xs text-gray-500 mb-1">
                Fill in the format: 00:00~24:00
              </p>
              <input
                type="text"
                placeholder="00:00~24:00"
                className="w-full border rounded-md px-3 py-2 focus:ring focus:ring-blue-300"
              />
            </div>

            {/* Loss ID */}
            <div>
              <label className="block font-medium mb-1">
                Specify the loss ID
              </label>
              <p className="text-xs text-gray-500 mb-1">
                Description: Set up a member ID here (e.g. 8888), and after
                multiple users use this ID symbol to separate (e.g. 8888|9999)
                set all orders will lose money in the member; please exercise
                caution. If you stop the function, leave it blank or fill in 0
                and submit it.
              </p>
              <input
                type="text"
                placeholder="8888,9999,50"
                className="w-full border rounded-md px-3 py-2 focus:ring focus:ring-blue-300"
              />
            </div>

            {/* Profit ID */}
            <div>
              <label className="block font-medium mb-1">
                Specify Profit ID
              </label>
              <p className="text-xs text-gray-500 mb-1">
                Description: Set up a member ID here (e.g. 8888), and after
                multiple users use this ID symbol to separate (e.g. 8888|9999)
                set all orders will lose money in the member, please exercise
                caution. If you stop the function, leave it blank or fill in 0
                and submit it.
              </p>
              <input
                type="text"
                placeholder="8888,9999"
                className="w-full border rounded-md px-3 py-2 focus:ring focus:ring-blue-300"
              />
            </div>

            {/* Probability of risk control */}
            <div>
              <label className="block font-medium mb-1">
                Probability of risk control
              </label>
              <p className="text-xs text-gray-500 mb-1">
                Indicate the proportion of total profit, fill in 20 indicates
                20% of the order profit, for example, at the same time
                settlement of 10 singles, of which only 2 single profits
              </p>
              <input
                type="text"
                placeholder="20"
                className="w-full border rounded-md px-3 py-2 focus:ring focus:ring-blue-300"
              />
            </div>

            {/* Minimum investment */}
            <div>
              <label className="block font-medium mb-1">
                Minimum investment
              </label>
              <p className="text-xs text-gray-500 mb-1">
                Minimum investment amount per unit
              </p>
              <input
                type="text"
                placeholder="100"
                className="w-full border rounded-md px-3 py-2 focus:ring focus:ring-blue-300"
              />
            </div>

            {/* Buttons */}
            <div className="flex justify-center gap-4 mt-6">
              <button
                type="submit"
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-md"
              >
                Submissions
              </button>
              <button
                type="button"
                className="bg-green-500 hover:bg-green-600 text-white px-6 py-2 rounded-md"
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
