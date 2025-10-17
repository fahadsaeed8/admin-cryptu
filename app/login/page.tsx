// "use client";

// import React, { useState } from "react";
// import { Formik, Form, Field, ErrorMessage } from "formik";
// import * as Yup from "yup";
// import Link from "next/link";
// import { useRouter } from "next/navigation";
// import { Eye, EyeOff } from "lucide-react";

// export default function Login() {
//   const [loginType, setLoginType] = useState<"email" | "phone">("email");
//   const router = useRouter();
//   const [showPassword, setShowPassword] = useState(false);

//   const emailLoginSchema = Yup.object().shape({
//     email: Yup.string().email("Invalid email").required("Email is required"),
//     password: Yup.string().required("Password is required"),
//   });

//   const phoneLoginSchema = Yup.object().shape({
//     mobile: Yup.string()
//       .matches(/^[0-9]{10,}$/, "Invalid mobile number")
//       .required("Mobile number is required"),
//   });

//   return (
//     <div className="w-full flex items-center justify-center bg-gray-50 h-screen">
//       <div className="flex flex-col items-center justify-center space-y-6 w-full">
//         <h2 className="text-center text-3xl font-extrabold text-gray-800">
//           Sign in / Log in
//         </h2>

//         <p className="text-center text-xl font-bold mb-1 text-gray-700">
//           New Customer?{" "}
//           <Link href={"/signup"}>
//             <span className="text-[#70aff2] font-semibold cursor-pointer hover:underline">
//               Start here
//             </span>
//           </Link>
//         </p>

//         {/* Login Type Toggle Buttons */}
//         <div className="flex space-x-4">
//           <button
//             type="button"
//             onClick={() => setLoginType("email")}
//             className={`px-4 py-2 rounded font-bold text-sm border-2 cursor-pointer transition-colors ${
//               loginType === "email"
//                 ? "bg-gray-800 text-white border-gray-800"
//                 : "bg-white text-gray-700 border-gray-400 hover:bg-gray-100"
//             }`}
//           >
//             Login with Email
//           </button>
//           <button
//             type="button"
//             onClick={() => setLoginType("phone")}
//             className={`px-4 py-2 rounded font-bold text-sm border-2 cursor-pointer transition-colors ${
//               loginType === "phone"
//                 ? "bg-gray-800 text-white border-gray-800"
//                 : "bg-white text-gray-700 border-gray-400 hover:bg-gray-100"
//             }`}
//           >
//             Login with Phone
//           </button>
//         </div>

//         <Formik
//           initialValues={{
//             email: "",
//             password: "",
//             mobile: "",
//           }}
//           validationSchema={
//             loginType === "email" ? emailLoginSchema : phoneLoginSchema
//           }
//           onSubmit={(values) => {
//             // submit handler logic
//           }}
//         >
//           {() => (
//             <Form className="space-y-4 w-full flex flex-col items-center justify-center">
//               {loginType === "email" && (
//                 <>
//                   <div className="w-full max-w-[615px]">
//                     <Field
//                       type="email"
//                       name="email"
//                       placeholder="Email"
//                       className="w-full h-[47px] border border-gray-400 bg-white px-4 py-2 rounded-md outline-none focus:ring-2 focus:ring-gray-300"
//                     />
//                     <ErrorMessage
//                       name="email"
//                       component="div"
//                       className="text-sm text-red-600"
//                     />
//                   </div>

//                   <div className="w-full max-w-[615px]">
//                     <div className="w-full relative">
//                       <Field
//                         type={showPassword ? "text" : "password"}
//                         name="password"
//                         placeholder="Password"
//                         className="w-full h-[47px] border border-gray-400 bg-white px-4 py-2 rounded-md outline-none focus:ring-2 focus:ring-gray-300"
//                       />
//                       <button
//                         type="button"
//                         onClick={() => setShowPassword((prev) => !prev)}
//                         className="absolute inset-y-0 right-3 cursor-pointer flex items-center text-gray-500 hover:text-gray-700"
//                       >
//                         {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
//                       </button>
//                     </div>
//                     <ErrorMessage
//                       name="password"
//                       component="div"
//                       className="text-sm text-red-600"
//                     />
//                   </div>

//                   <div className="space-y-2 text-center">
//                     <p className="text-gray-600 text-sm">
//                       If your account is not verified yet, please{" "}
//                       <Link
//                         href="/verify-user"
//                         className="font-semibold text-[#70aff2]"
//                       >
//                         verify your account now
//                       </Link>
//                       .
//                     </p>
//                     <Link
//                       href="/forgot-password"
//                       className="font-semibold text-gray-700 hover:text-gray-900 text-sm"
//                     >
//                       Forgot Password?
//                     </Link>
//                   </div>
//                 </>
//               )}

//               {loginType === "phone" && (
//                 <div className="w-full max-w-[615px]">
//                   <Field
//                     type="number"
//                     name="mobile"
//                     placeholder="Mobile number Sign in"
//                     className="w-full h-[47px] border border-gray-400 bg-white px-4 py-2 rounded-md outline-none focus:ring-2 focus:ring-gray-300 mt-1"
//                   />
//                   <ErrorMessage
//                     name="mobile"
//                     component="div"
//                     className="text-sm text-red-600"
//                   />

//                   <p className="text-[15px] text-center text-gray-700  w-full max-w-[615px] mt-2">
//                     Texts are automated and consent is optional, not a
//                     condition of purchase. Message and data rates may apply.{" "}
//                     <a
//                       href="/terms"
//                       className="cursor-pointer text-[#70aff2] underline"
//                     >
//                       Terms
//                     </a>{" "}
//                     .{" "}
//                     <a
//                       href="/policy"
//                       className="cursor-pointer text-[#70aff2] underline"
//                     >
//                       Privacy apply
//                     </a>
//                   </p>
//                 </div>
//               )}

//               <div className="pt-2 flex items-center justify-center w-full mb-5">
//                 <button
//                   type="submit"
//                   className="w-full max-w-[240px] h-[42px] flex items-center justify-center bg-gray-800 hover:bg-gray-700 text-white text-xl font-extrabold rounded-lg cursor-pointer shadow-md transition-all"
//                 >
//                   <Link href={"/"}>Login</Link>
//                 </button>
//               </div>
//             </Form>
//           )}
//         </Formik>
//       </div>
//     </div>
//   );
// }








import React from "react";

const LoginPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-[url('/cryptologin.jpg')] bg-cover bg-no-repeat flex items-center justify-center z-10">
      <div className="bg-black/30 h-screen w-screen absolute z-20"></div>
      <div className="bg-[#1e157d] rounded-lg shadow-lg w-[466px] h-[596px] z-30 ">
        {/* Top Section with Curve */}
        <div className="bg-[#3d2bfb] text-white h-[212px] flex flex-col items-center justify-center text-center py-8 relative rounded-t-lg px-6">
          <h1 className="text-[30px] font-[600] ">Welcome to Crypto Stock India</h1>
          <p className="mt-2 text-lg">Admin Login to Crypto Stock India Dashboard</p>
          {/* Curve border */}
        </div>
          {/* <div className=" w-full h-6 border-t-[25px] bordery-[218px] border-b-0 border-[#2e2ebb] rounded-b-full"></div> */}
          <div className="w-full border-l-[233px] border-[#3d2bfb] border-l-transparent border-r-[233px] border-r-transparent border-t-[50px] "></div>

        {/* Form Section */}
        <form className="px-6 py-8">
          <div className="mb-4">
            <label className="block text-[#a5a1cb] mb-1" htmlFor="username">
              Username <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="username"
              // placeholder="Enter your username"
              className="w-full h-[50px] px-3 py-2 rounded-md border border-[rgba(255,255,255,0.3)] focus:border-[1px] focus:border-[#3d2bfb] transition-all duration-500 drop-shadow-2xl drop-shadow-[#3d2bfb] ease-in-out bg-transparent text-white outline-none focus:outline-none"
            />
          </div>

          <div className="mb-8">
            <div className="flex justify-between items-center">
              <label className="block text-[#a5a1cb] mb-1" htmlFor="password">
                Password <span className="text-red-500">*</span>
              </label>
              <a href="#" className="text-sm text-[#a5a1cb] hover:underline">
                Forgot Password?
              </a>
            </div>
            <input
              type="password"
              id="password"
              // placeholder="Enter your password"
              className="w-full h-[50px] px-3 py-2 rounded-md border border-[rgba(255,255,255,0.3)] focus:border-[1px] focus:border-[#3d2bfb] transition-all duration-500 focus:drop-shadow-2xl focus:drop-shadow-[#3d2bfb] ease-in-out bg-transparent text-white outline-none focus:outline-none"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-[#3d2bfb] h-[50px] hover:bg-[#3a39d6] text-white  py-2 px-4 rounded transition-colors"
          >
            LOGIN
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
