// import React from "react";

// const LoginPage: React.FC = () => {
//   return (
//     <div className="min-h-screen bg-[url('/cryptologin.jpg')] bg-cover bg-no-repeat flex items-center justify-center z-10">
//       <div className="bg-black/30 h-screen w-screen absolute z-20"></div>
//       <div className="bg-[#1e157d] rounded-lg shadow-lg w-[466px] h-[596px] z-30 ">
//         {/* Top Section with Curve */}
//         <div className="bg-[#3d2bfb] text-white h-[212px] flex flex-col items-center justify-center text-center py-8 relative rounded-t-lg px-6">
//           <h1 className="text-[30px] font-[600] ">Welcome to Crypto Stock India</h1>
//           <p className="mt-2 text-lg">Admin Login to Crypto Stock India Dashboard</p>
//           {/* Curve border */}
//         </div>
//           {/* <div className=" w-full h-6 border-t-[25px] bordery-[218px] border-b-0 border-[#2e2ebb] rounded-b-full"></div> */}
//           <div className="w-full border-l-[233px] border-[#3d2bfb] border-l-transparent border-r-[233px] border-r-transparent border-t-[50px] "></div>

//         {/* Form Section */}
//         <form className="px-6 py-8">
//           <div className="mb-4">
//             <label className="block text-[#a5a1cb] mb-1" htmlFor="username">
//               Username <span className="text-red-500">*</span>
//             </label>
//             <input
//               type="text"
//               id="username"
//               // placeholder="Enter your username"
//               className="w-full h-[50px] px-3 py-2 rounded-md border border-[rgba(255,255,255,0.3)] focus:border-[1px] focus:border-[#3d2bfb] transition-all duration-500 drop-shadow-2xl drop-shadow-[#3d2bfb] ease-in-out bg-transparent text-white outline-none focus:outline-none"
//             />
//           </div>

//           <div className="mb-8">
//             <div className="flex justify-between items-center">
//               <label className="block text-[#a5a1cb] mb-1" htmlFor="password">
//                 Password <span className="text-red-500">*</span>
//               </label>
//               <a href="#" className="text-sm text-[#a5a1cb] hover:underline">
//                 Forgot Password?
//               </a>
//             </div>
//             <input
//               type="password"
//               id="password"
//               // placeholder="Enter your password"
//               className="w-full h-[50px] px-3 py-2 rounded-md border border-[rgba(255,255,255,0.3)] focus:border-[1px] focus:border-[#3d2bfb] transition-all duration-500 focus:drop-shadow-2xl focus:drop-shadow-[#3d2bfb] ease-in-out bg-transparent text-white outline-none focus:outline-none"
//             />
//           </div>

//           <button
//             type="submit"
//             className="w-full bg-[#3d2bfb] h-[50px] hover:bg-[#3a39d6] text-white  py-2 px-4 rounded transition-colors"
//           >
//             LOGIN
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default LoginPage;
"use client";

import React, { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation"; // ✅ import router
import { FaUser, FaLock, FaShieldAlt } from "react-icons/fa";

const LoginPage: React.FC = () => {
  const router = useRouter(); // ✅ initialize router

  const [form, setForm] = useState({
    username: "",
    password: "",
    verifyCode: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    console.log("Login Submitted:", form);

    // ✅ after successful login, redirect to home page
    router.push("/");
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-black px-4">
      {/* Logo */}
      <div className="mb-6">
        <Image
          src="/alogn.png" // replace with your logo path
          alt="Logo"
          width={120}
          height={120}
          className="mx-auto"
        />
      </div>

      {/* Login Card */}
      <div className="bg-white rounded-xl shadow-md w-full max-w-sm p-8">
        <h2 className="text-center text-3xl text-gray-500 mb-6">
          Build with <span className="text-red-500">❤️</span>
          <span className="text-orange-500">🔥</span>
          <span className="text-blue-600"> Love</span>
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Username */}
          <div className="flex items-center px-3 py-2 bg-gray-100">
            <FaUser className="text-gray-400 mr-2" />
            <input
              type="text"
              name="username"
              placeholder="Username"
              value={form.username}
              onChange={handleChange}
              className="w-full outline-none bg-transparent text-gray-700 text-sm"
              required
            />
          </div>

          {/* Password */}
          <div className="flex items-center px-3 py-2 bg-gray-100">
            <FaLock className="text-gray-400 mr-2" />
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={form.password}
              onChange={handleChange}
              className="w-full outline-none bg-transparent text-gray-700 text-sm"
              required
            />
          </div>

          {/* Verify Code */}
          <div className="flex items-center px-3 py-2 bg-gray-100 justify-between">
            <div className="flex items-center w-full">
              <FaShieldAlt className="text-gray-400 mr-2" />
              <input
                type="text"
                name="verifyCode"
                placeholder="Verify Code"
                value={form.verifyCode}
                onChange={handleChange}
                className="w-full outline-none bg-transparent text-gray-700 text-sm"
                required
              />
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full cursor-pointer bg-[#2cef26] text-white font-medium py-2 rounded-full mt-4 hover:brightness-110 transition"
          >
            Login
          </button>
        </form>

        <div className="text-center pb-4">
          <h1 className="font-semibold text-[#a5a1cb]">
            New Customer?{" "}
            <span className=" text-white cursor-pointer">
              <Link href={"/signup"}> Start here </Link>
            </span>
          </h1>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
