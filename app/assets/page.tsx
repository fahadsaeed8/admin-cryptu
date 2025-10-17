import DashboardLayout from "@/components/dashboardLayout";
import Image from "next/image";
import React from "react";

const Assets = () => {
  return (
    <DashboardLayout>
      <div className=" bg-white">
        <div className="relative w-full max-h-[211px] h-full rounded-lg overflow-hidden">
          {/* Background Image */}
          <img
            src="/assets.jpg"
            alt="Dashboard"
            className="w-full h-full object-cover"
          />

          {/* Centered Text */}
          <div className="absolute inset-0 flex flex-col items-center justify-center text-white">
            <img src="/assestinside.png" alt="" />
          </div>
        </div>
        <div className="bg-[#D9D9D9] rounded-md p-4 w-full max-w-[700px] min-h-[250px] h-full mx-auto text-center shadow my-4">
          {/* Header */}
          <h2 className="text-2xl font-medium text-[#555555]">Total Assets</h2>
          <p className="text-2xl leading-none md:text-[48px] font-medium text-[#555555] mt-2">
            INR 0.00
          </p>

          {/* Buttons */}
          <div className="flex md:flex-row flex-col items-center justify-center gap-4 mt-3">
            <button className=" max-w-[195px] cursor-pointer h-[40px] w-full rounded-full border-[2px] border-[#555555] text-[#555555] text-base font-medium hover:bg-gray-100">
              Recharge
            </button>
            <button className=" max-w-[195px] cursor-pointer h-[40px] w-full rounded-full border-[2px] border-[#555555] text-[#555555] text-base font-medium hover:bg-gray-100">
              Withdraw of Currency
            </button>
          </div>

          {/* Divider */}
          <div className=" border-t border-[#8E8E93] mt-3 max-w-xl mx-auto"></div>
          <div className="pt-1 grid grid-cols-3 ">
            <div className=" border-r border-[#8E8E93]">
              <p className="text-base font-medium text-[#555555]">
                Total Balance
              </p>
              <p className="font-medium text-xl text-[#555555]">INR 0.00</p>
            </div>
            <div className=" border-r border-[#8E8E93]">
              <p className="text-base font-medium text-[#555555]">
                Frozen Balance
              </p>
              <p className="font-medium text-xl text-[#555555]">INR 0.00</p>
            </div>
            <div>
              <p className="text-base font-medium text-[#555555]">
                Available Balance
              </p>
              <p className="font-medium text-xl text-[#555555]">INR 0.00</p>
            </div>
          </div>
        </div>
        <div className="overflow-x-auto overflow-y-hidden no-scrollbar mt-5 md:mx-5 pb-10">
          <table className="w-full text-[#666666] min-w-[900px]">
            <thead className="">
              <tr className="bg-[#393518] text-white h-[65px] border-b-8">
                <th className="px-2 py-2 ">Date/Time</th>
                <th className="px-2 py-2 ">Withdraw Code</th>
                <th className="px-2 py-2 ">Amount</th>
                <th className="px-2 py-2 ">Status</th>
                <th className="px-2 py-2 ">Duration</th>
              </tr>
            </thead>
            <tbody>
              {Array(2)
                .fill(null)
                .map((_, idx) => (
                  <tr key={idx} className="bg-[#d9d9d9] text-center h-[47px]">
                    <td className="border-b-2 border-white px-2 py-2">
                      Date/Time
                    </td>
                    <td className="border-b-2 border-white px-2 py-2">
                      Withdraw Code
                    </td>
                    <td className="border-b-2 border-white px-2 py-2">
                      Amount
                    </td>
                    <td className="border-b-2 border-white px-2 py-2">
                      Status
                    </td>
                    <td className="border-b-2 border-white px-2 py-2">
                      Duration
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Assets;
