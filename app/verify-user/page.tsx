import Link from "next/link";
import React from "react";

const VerifyUserPage: React.FC = () => {
  return (
    <div className="min-h-screen w-full overflow-x-hidden bg-[url('/cryptologin.jpg')] bg-cover bg-no-repeat flex items-center justify-center relative z-10">
      {/* Background Overlay */}
      <div className="fixed top-0 left-0 w-full h-full bg-black/30 z-20"></div>

      {/* Verify Card */}
      <div className="bg-[#1e157d] rounded-lg shadow-lg w-full max-w-[466px] z-30 relative my-20">
        {/* Top Section with Curve */}
        <div className="bg-[#3d2bfb] text-white h-[212px] flex flex-col items-center justify-center text-center py-8 relative rounded-t-lg px-6">
          <h1 className="text-[30px] font-[600]">Verify Your Account</h1>
          <p className="mt-2 text-lg">
            Enter the verification code sent to your email
          </p>
        </div>

        {/* Curve Border */}
        <div className="w-full border-l-[233px] border-[#3d2bfb] border-l-transparent border-r-[233px] border-r-transparent border-t-[50px]"></div>

        {/* Form Section */}
        <form className="px-6 py-8">
          <div className="mb-6">
            <label
              className="block font-semibold text-[#a5a1cb] mb-1"
              htmlFor="verificationCode"
            >
              Verification Code <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="verificationCode"
              maxLength={6}
              className="w-full h-[50px] tracking-[0.3em] text-center px-3 py-2 rounded-md border border-[rgba(255,255,255,0.3)] focus:border-[1px] focus:border-[#3d2bfb] transition-all duration-500 ease-in-out bg-transparent text-white outline-none focus:outline-none text-lg"
            />
          </div>

          <button
            type="submit"
            className="w-full cursor-pointer bg-[#3d2bfb] h-[50px] hover:bg-[#3a39d6] text-white py-2 px-4 rounded transition-colors"
          >
            VERIFY ACCOUNT
          </button>
        </form>

        {/* Footer */}
        <div className="text-center pb-4">
          <h1 className="font-semibold text-[#a5a1cb]">
            Didn’t receive a code?{" "}
            <span className="text-white cursor-pointer">
              <Link href={"/resend-code"}>Resend</Link>
            </span>
          </h1>
        </div>
      </div>
    </div>
  );
};

export default VerifyUserPage;
