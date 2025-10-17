"use client";

import Link from "next/link";
// import DashboardLayout from "src/components/layout/dashboard-layout";
import { useMutation } from "@tanstack/react-query";
// import { signupAPI } from "src/services/auth";
import { toast } from "react-toastify";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
// import { usePublicRoute } from "src/services/hooks/usePublicRoutes";

// ✅ Yup Validation Schema
const SignUpSchema = Yup.object().shape({
  first_name: Yup.string().required("First name is required"),
  last_name: Yup.string().required("Last name is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  mobile_number: Yup.string()
    .matches(/^\d+$/, "Mobile number must contain only digits")
    .min(10, "Mobile number must be at least 10 digits")
    .required("Mobile number is required"),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
  confirm_password: Yup.string()
    .oneOf([Yup.ref("password")], "Passwords must match")
    .required("Confirm Password is required"),
  receive_updates: Yup.boolean(),
  agreed_to_terms: Yup.boolean().oneOf([true], "You must agree to the terms"),
});

export default function SignUp() {
  // usePublicRoute();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // const mutation = useMutation({
  //   mutationFn: (data: any) => signupAPI(data),
  //   onSuccess: (res) => {
  //     toast.success(res?.message);
  //     localStorage.setItem("signupemail", res?.user?.email);
  //     window.location.href = "/otp-verification";
  //   },
  //   onError: (err: any) => {
  //     toast.error(err?.response?.data?.message);
  //   },
  // });

  return (
    
      <div className=" h-screen flex items-center justify-center bg-gray-50">
        <div className="max-w-xl w-full">
          <h1 className="text-3xl font-bold text-center">Create Account</h1>
          <p className="text-center text-lg mt-1">
            Already have an Account{" "}
            <Link href={"/login"}>
              <span className="text-[#70aff2] font-semibold cursor-pointer">
                Log in
              </span>
            </Link>
          </p>

          <Formik
            initialValues={{
              first_name: "",
              last_name: "",
              email: "",
              mobile_number: "",
              password: "",
              confirm_password: "",
              receive_updates: false,
              agreed_to_terms: false,
            }}
            validationSchema={SignUpSchema}
            onSubmit={(values) => {
              // mutation.mutate({
              //   ...values,
              //   role: "customer",
              // });
            }}
          >
            {({ isSubmitting }) => (
              <Form className="mt-6 space-y-4">
                {/* Input Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <Field
                      type="text"
                      name="first_name"
                      placeholder="First Name"
                      className="w-full h-[47px] border border-gray-400 bg-white px-4 py-2 rounded-md outline-none focus:ring-2 focus:ring-gray-300"
                    />
                    <ErrorMessage
                      name="first_name"
                      component="div"
                      className="text-red-500 text-sm"
                    />
                  </div>

                  <div>
                    <Field
                      type="text"
                      name="last_name"
                      placeholder="Last Name"
                      className="w-full h-[47px] border border-gray-400 bg-white px-4 py-2 rounded-md outline-none focus:ring-2 focus:ring-gray-300"
                    />
                    <ErrorMessage
                      name="last_name"
                      component="div"
                      className="text-red-500 text-sm"
                    />
                  </div>

                  <div>
                    <Field
                      type="email"
                      name="email"
                      placeholder="Email"
                      className="w-full h-[47px] border border-gray-400 bg-white px-4 py-2 rounded-md outline-none focus:ring-2 focus:ring-gray-300"
                    />
                    <ErrorMessage
                      name="email"
                      component="div"
                      className="text-red-500 text-sm"
                    />
                  </div>

                  <div>
                    <Field
                      type="tel"
                      name="mobile_number"
                      placeholder="Mobile Number"
                      className="w-full h-[47px] border border-gray-400 bg-white px-4 py-2 rounded-md outline-none focus:ring-2 focus:ring-gray-300"
                    />
                    <ErrorMessage
                      name="mobile_number"
                      component="div"
                      className="text-red-500 text-sm"
                    />
                  </div>

                  <div>
                    <div className="relative">
                      <Field
                        type={showPassword ? "text" : "password"}
                        name="password"
                        placeholder="Password"
                        className="w-full h-[47px] border border-gray-400 bg-white px-4 py-2 rounded-md outline-none focus:ring-2 focus:ring-gray-300"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword((prev) => !prev)}
                        className="absolute cursor-pointer inset-y-0 right-3 flex items-center text-gray-500 hover:text-gray-700"
                      >
                        {showPassword ? (
                          <EyeOff size={18} />
                        ) : (
                          <Eye size={18} />
                        )}
                      </button>
                    </div>
                    <ErrorMessage
                      name="password"
                      component="div"
                      className="text-red-500 text-sm"
                    />
                  </div>

                  <div>
                    <div className="relative">
                      <Field
                        type={showConfirmPassword ? "text" : "password"}
                        name="confirm_password"
                        placeholder="Confirm Password"
                        className="w-full h-[47px] border border-gray-400 bg-white px-4 py-2 rounded-md outline-none focus:ring-2 focus:ring-gray-300"
                      />
                      <button
                        type="button"
                        onClick={() => setShowConfirmPassword((prev) => !prev)}
                        className="absolute cursor-pointer inset-y-0 right-3 flex items-center text-gray-500 hover:text-gray-700"
                      >
                        {showConfirmPassword ? (
                          <EyeOff size={18} />
                        ) : (
                          <Eye size={18} />
                        )}
                      </button>{" "}
                    </div>
                    <ErrorMessage
                      name="confirm_password"
                      component="div"
                      className="text-red-500 text-sm"
                    />
                  </div>
                </div>

                <p className="text-sm text-black">
                  Password must be at least 6 characters
                </p>

                <div className="space-y-2 text-sm text-black">
                  <label className="flex items-start space-x-2">
                    <Field
                      type="checkbox"
                      name="receive_updates"
                      className="mt-1 cursor-pointer"
                    />
                    <span>
                      Yes, please keep me updated on crypto news, events and
                      offers
                    </span>
                  </label>

                  <label className="flex items-start space-x-2">
                    <Field
                      type="checkbox"
                      name="agreed_to_terms"
                      className="mt-1 cursor-pointer"
                    />
                    <span>
                      I read and understand your{" "}
                      <a href="#" className="text-blue-600">
                        Terms
                      </a>{" "}
                      .{" "}
                      <a href="#" className="text-blue-600">
                        Privacy
                      </a>
                    </span>
                  </label>
                  <ErrorMessage
                    name="agreed_to_terms"
                    component="div"
                    className="text-red-500 text-sm"
                  />
                </div>

                {/* Submit Button */}
                <div className="flex items-center justify-center">
                <button
                  type="submit"
                  className="w-full max-w-[240px] h-[42px] flex items-center justify-center bg-gray-800 hover:bg-gray-700 text-white text-xl font-extrabold rounded-lg cursor-pointer shadow-md transition-all"
                  // disabled={mutation.isPending || isSubmitting}
                >
                  Continue
                </button>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </div>
  
  );
}
