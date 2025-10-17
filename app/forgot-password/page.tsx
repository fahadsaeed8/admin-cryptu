import { ArrowLeftCircle } from "lucide-react";
import Link from "next/link";
import React from "react";

const ForgotPasswordPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-[url('/cryptologin.jpg')] bg-cover bg-no-repeat flex items-center justify-center z-10">
      {/* Overlay */}
      <div className="bg-black/30 h-screen w-screen absolute z-20"></div>

      {/* Main Card */}
      <div className="bg-[#1e157d] rounded-lg shadow-lg w-[466px] h-[480px] z-30 relative">
        {/* Top Section */}
        <div className="bg-[#3d2bfb] text-white h-[140px] flex flex-col items-center justify-center text-center py-8 relative rounded-t-lg px-6">
          <h1 className="text-[28px] font-[600]">Recover Account</h1>
          
        </div>

        {/* Curved Divider */}
        <div className="w-full border-l-[230px] border-[#3d2bfb] border-l-transparent border-r-[230px] border-r-transparent border-t-[50px]"></div>

        {/* Form Section */}
        <form className="px-6 py-8">
          <div className="mb-8">
            <label className="block font-semibold text-[#a5a1cb] mb-1" htmlFor="email">
              Email <span className="text-red-500">*</span>
            </label>
            <input
              type="email"
              id="email"
              className="w-full h-[50px] px-3 py-2 rounded-md border border-[rgba(255,255,255,0.3)] focus:border-[1px] focus:border-[#3d2bfb] transition-all duration-500 focus:drop-shadow-2xl focus:drop-shadow-[#3d2bfb] ease-in-out bg-transparent text-white outline-none focus:outline-none"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-[#3d2bfb] cursor-pointer h-[50px] hover:bg-[#3a39d6] text-white py-2 px-4 rounded transition-colors"
          >
            Submit
          </button>

          <div className="mt-6 text-center flex items-center justify-center">
            <Link
              href="/login"
              className="text-sm text-white hover:underline flex items-center gap-x-[1px] transition"
            >
              <ArrowLeftCircle className=" w-3"/>
              Back to Login
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ForgotPasswordPage;
