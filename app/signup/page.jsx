"use client";
import Link from "next/link";
import { useState } from "react";
import DashboardLayout from "src/components/layout/dashboard-layout";
import { Eye, EyeOff } from "lucide-react";

export default function SignUp() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  return (
   
      <div className="min-h-auto py-10 flex items-center justify-center bg-white px-4">
        <div className="max-w-xl w-full">
          <h1 className="text-3xl font-bold text-center">Create Account</h1>
          <p className="text-center text-lg mt-1">
            Already have an Account{" "}
            <Link href={"/login"}>
              <span className="text-[#f16f21] font-semibold cursor-pointer">
                Log in
              </span>
            </Link>
          </p>

          <form className="mt-6 space-y-4">
            {/* Input Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <input
                type="text"
                placeholder="First Name"
                className="border border-orange-300 px-3 py-2  w-full"
              />
              <input
                type="text"
                placeholder="Last Name"
                className="border border-orange-300 px-3 py-2  w-full"
              />
              <input
                type="email"
                placeholder="Email"
                className="border border-orange-300 px-3 py-2  w-full"
              />
              <input
                type="tel"
                placeholder="Mobile Number"
                className="border border-orange-300 px-3 py-2  w-full"
              />
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
                  className="border border-orange-300 px-3 py-2  w-full"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((prev) => !prev)}
                  className="absolute cursor-pointer inset-y-0 right-3 flex items-center text-black hover:text-gray-900"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>

              <div className="relative">
                <input
                  onClick={() => setShowConfirmPassword((prev) => !prev)}
                  placeholder="Confirm Password"
                  className="border border-orange-300 px-3 py-2  w-full"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword((prev) => !prev)}
                  className="absolute cursor-pointer inset-y-0 right-3 flex items-center text-black hover:text-gray-900"
                >
                  {showConfirmPassword ? (
                    <EyeOff size={18} />
                  ) : (
                    <Eye size={18} />
                  )}
                </button>{" "}
              </div>
            </div>

            <p className="text-sm text-black">
              Password must be at least 8 characters
            </p>

            <div className="space-y-2 text-sm text-black">
              <label className="flex items-start space-x-2">
                <input type="checkbox" className="mt-1 cursor-pointer " />
                <span>
                  Yes, please keep me updated on e
                  <span className="text-[#f16f21]">s</span>ycles news, events
                  and offers
                </span>
              </label>

              <label className="flex items-start space-x-2">
                <input type="checkbox" className="mt-1 cursor-pointer " />
                <span>
                  I read, understand, and agree with your{" "}
                  <a href="/terms" className="cursor-pointer text-blue-600">
                    Terms
                  </a>{" "}
                  .{" "}
                  <a href="/policy" className="cursor-pointer text-blue-600">
                    Privacy
                  </a>
                </span>
              </label>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-yellow-500 hover:bg-yellow-600 text-black font-bold py-2 rounded-lg cursor-pointer shadow"
            >
              Continue
            </button>
          </form>
        </div>
      </div>
   
  );
}
