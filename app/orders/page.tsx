import DashboardLayout from "@/components/dashboardLayout";
import Image from "next/image";

export default function TradeLog() {
  return (
    <DashboardLayout>
      <div className=" no-scrollbar flex flex-col rounded-xl items-center bg-white">
        {/* Header Banner */}
        <div className="w-full relative">
          <Image
            src="/trade-banner.svg"
            alt="Trade Log Banner"
            width={1920}
            height={400}
            className="w-full h-[211px] rounded-xl object-cover"
          />
          <h1 className="absolute inset-0 flex items-center justify-center text-white text-5xl font-bold drop-shadow-lg">
            Trade Log
          </h1>
        </div>

        <div className="w-full max-w-6xl p-2 md:p-4">
          {/* Running Order Section */}
          <div className="mb-6">
            <h2 className=" bg-[#d9d9d9] w-fit rounded-[12px] text-[20px] px-2 py-1 font-semibold mb-[7px]">
              Running Order
            </h2>
            <div className="overflow-x-auto overflow-y-hidden no-scrollbar">
              <table className="w-full text-[#555555] min-w-[900px]">
                <thead className="">
                  <tr className="bg-[#393518] text-white h-[65px] border-b-8">
                    <th className="px-2 py-2 ">S.N</th>
                    <th className="px-2 py-2 ">Crypto Currency</th>
                    <th className="px-2 py-2 ">Amount</th>
                    <th className="px-2 py-2 ">Direction</th>
                    <th className="px-2 py-2 ">Result</th>
                    <th className="px-2 py-2 ">Status</th>
                    <th className="px-2 py-2 ">Date</th>
                  </tr>
                </thead>
                <tbody>
                  {Array(5)
                    .fill(null)
                    .map((_, idx) => (
                      <tr
                        key={idx}
                        className="bg-[#d9d9d9] text-center h-[47px]"
                      >
                        <td className="border-b-2 border-white px-2 py-2">
                          {idx + 1}
                        </td>
                        <td className="border-b-2 border-white px-2 py-2">
                          Crypto Currency
                        </td>
                        <td className="border-b-2 border-white px-2 py-2">
                          Amount
                        </td>
                        <td className="border-b-2 border-white px-2 py-2">
                          Direction
                        </td>
                        <td className="border-b-2 border-white px-2 py-2">
                          Result
                        </td>
                        <td className="border-b-2 border-white px-2 py-2">
                          Status
                        </td>
                        <td className="border-b-2 border-white px-2 py-2">
                          Date
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Closed Order Section */}
          <div className=" mb-10">
            <h2 className="bg-[#d9d9d9] w-fit rounded-[12px] text-[20px] px-2 py-1 font-semibold mb-[7px]">
              Closed Order
            </h2>
            <div className="overflow-x-auto">
              <table className="w-full text-[#555555] min-w-[900px]">
                <thead>
                  <tr className="bg-[#393518] text-white h-[65px] border-b-8">
                    <th className="px-2 py-2">S.N</th>
                    <th className="px-2 py-2">Crypto Currency</th>
                    <th className="px-2 py-2">Amount</th>
                    <th className="px-2 py-2">Direction</th>
                    <th className="px-2 py-2">Leverage</th>
                    <th className="px-2 py-2">Result</th>
                    <th className="px-2 py-2">Profit/Loss</th>
                    <th className="px-2 py-2">Status</th>
                    <th className="px-2 py-2">Date</th>
                  </tr>
                </thead>
                <tbody>
                  {Array(5)
                    .fill(null)
                    .map((_, idx) => (
                      <tr
                        key={idx}
                        className="bg-[#d9d9d9] text-center h-[47px]"
                      >
                        <td className="border-b-2 border-white px-2 py-2">
                          {idx + 1}
                        </td>
                        <td className="border-b-2 border-white px-2 py-2">
                          Crypto Currency
                        </td>
                        <td className="border-b-2 border-white px-2 py-2">
                          Amount
                        </td>
                        <td className="border-b-2 border-white px-2 py-2">
                          Direction
                        </td>
                        <td className="border-b-2 border-white px-2 py-2">
                          Leverage
                        </td>
                        <td className="border-b-2 border-white px-2 py-2">
                          Result
                        </td>
                        <td className="border-b-2 border-white px-2 py-2">
                          Profit/Loss
                        </td>
                        <td className="border-b-2 border-white px-2 py-2">
                          Status
                        </td>
                        <td className="border-b-2 border-white px-2 py-2">
                          Date
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
