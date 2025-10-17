import BitcoinChart from "../BitcoinCart";

export default function TradeLog() {
  return (
    <div className=" bg-white rounded-xl pb-10 ">
      <div className="relative w-full max-h-[273px] h-full rounded-lg overflow-hidden">
        {/* Background Image */}
        <img
          src="/dashboardimg.jpg"
          alt="Dashboard"
          className="w-full h-full object-cover"
        />

        {/* Centered Text */}
        <div className="absolute inset-0 flex flex-col items-center justify-center text-white">
          <img src="/dashboardimg.png" alt="" />
        </div>
      </div>
      <section className="border border-[#8E8E93] border-t-0 rounded-xl m-5 ">
        <div className="flex items-center border border-x-0 border-[#8E8E93] rounded-[12px] h-[52px] px-5 gap-2">
          <img src="/market.png" alt="" />
          <h1 className=" text-[24px] text-[#555555] font-medium ">Market</h1>
        </div>
        <div className="mx-6">
          {Array(6)
            .fill(null)
            .map((_, i) =>
              i % 2 === 0 ? (
                <div
                  key={i}
                  className={`grid grid-cols-1 sm:grid-cols-2 ${
                    i < 4 ? "border-b border-gray-400" : ""
                  }`}
                >
                  {[i, i + 1].map((j) =>
                    j < 6 ? (
                      <div
                        key={j}
                        className="flex items-center gap-2 w-full xl:w-[487px] py-2"
                      >
                        <img
                          src="/bitcoin.png"
                          className="w-[50px] h-[50px] hidden md:block rounded-full object-cover"
                          alt=""
                        />
                        <div className="flex justify-between w-full">
                          <div className="flex flex-col">
                            <h1 className="text-[#555555] text-[20px] leading-none font-medium">
                              Bitcoin
                            </h1>
                            <h1 className="text-[#555555] mt-1 text-[16px] leading-none font-medium">
                              BTC
                            </h1>
                          </div>
                          <div className="flex flex-col items-end mr-4">
                            <h1 className="text-[#555555] text-[20px] leading-none font-medium">
                              $ 245,450
                            </h1>
                            <h1 className="text-[#555555] text-[16px] leading-none font-medium">
                              +3.20
                            </h1>
                          </div>
                        </div>
                      </div>
                    ) : null
                  )}
                </div>
              ) : null
            )}
        </div>
      </section>
      {/* <section>
        <div className=" bg-[#404040] p-5 mb-5 rounded-xl mx-5 ">
          <div className="flex items-center justify-between mb-5">
            <div>
              <h1 className=" text-[24px] font-medium leading-none text-white">
                Bitcoin Price Chart
              </h1>
            </div>
          </div>
          <img src="/candles.png" alt="" className=" h-auto" />
          <div className="flex flex-wrap sm:flex-nowrap items-center justify-end gap-1">
            <button className=" w-[33px] h-[33px] cursor-pointer flex items-center justify-center rounded-xl text-[#555555] bg-[#f6f075]">
              1D
            </button>
            <button className="w-[33px] h-[33px] cursor-pointer flex items-center justify-center rounded-xl text-[#555555]  bg-[#d9d9d9]">
              1W
            </button>
            <button className="w-[33px] h-[33px] cursor-pointer flex items-center justify-center rounded-xl text-[#555555] bg-[#d9d9d9]">
              1M
            </button>
            <button className="w-[33px] h-[33px] cursor-pointer flex items-center justify-center rounded-xl text-[#555555] bg-[#d9d9d9]">
              1Y
            </button>
          </div>
        </div>
      </section> */}
      <BitcoinChart />
    </div>
  );
}
