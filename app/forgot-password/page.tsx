"use client";

import { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";
// import DashboardLayout from "src/components/layout/dashboard-layout";
// import { forgotPasswordAPI, resendOTPAPI } from "src/services/auth";
import { Eye, EyeOff } from "lucide-react";
// import { usePublicRoute } from "src/services/hooks/usePublicRoutes";

// Validation Schemas
const EmailSchema = Yup.object({
  email: Yup.string().email("Invalid email").required("Email is required"),
});

const OTPSchema = Yup.object({
  otp: Yup.string().required("OTP is required"),
});

const PasswordSchema = Yup.object({
  new_password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("New Password is required"),
  confirm_password: Yup.string()
    .oneOf([Yup.ref("new_password")], "Passwords must match")
    .required("Confirm Password is required"),
});

export default function ForgotPasswordPage() {
  // usePublicRoute();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    email: "",
    otp: "",
    new_password: "",
    confirm_password: "",
  });

  // Step 1: Send Email to resend OTP
  // const resendOTPMutation = useMutation({
  //   mutationFn: (data: any) => resendOTPAPI(data),
  //   onSuccess: (res) => {
  //     toast.success(res?.message || "OTP sent successfully");
  //     setStep(2);
  //   },
  //   onError: (err: any) => {
  //     toast.error(err?.response?.data?.message || "Failed to send OTP");
  //   },
  // });

  // Step 3: Submit Final Reset Password
  // const finalMutation = useMutation({
  //   mutationFn: (data: any) => forgotPasswordAPI(data),
  //   onSuccess: (res) => {
  //     toast.success(res?.message || "Password reset successfully");
  //     window.location.href = "/login";
  //   },
  //   onError: (err: any) => {
  //     toast.error(err?.response?.data?.message || "Something went wrong");
  //   },
  // });

  return (
    // <DashboardLayout>
      <div className="min-h-screen flex items-center justify-center bg-white px-4">
        <div className="max-w-md w-full space-y-6 border p-6 shadow rounded-lg">
          <h1 className="text-2xl font-bold text-center text-black">
            Forgot Password
          </h1>

          {/* Step 1: Email */}
          {step === 1 && (
            <Formik
              initialValues={{ email: formData.email }}
              validationSchema={EmailSchema}
              onSubmit={(values) => {
                setFormData((prev) => ({ ...prev, ...values }));
                // resendOTPMutation.mutate({ email: values.email });
              }}
            >
              <Form className="space-y-4">
                <div>
                  <Field
                    type="email"
                    name="email"
                    placeholder="Enter your email"
                    className="w-full h-[47px] border border-gray-400 bg-white px-4 py-2 rounded-md outline-none focus:ring-2 focus:ring-gray-300"
                  />
                  <ErrorMessage
                    name="email"
                    component="div"
                    className="text-red-500 text-sm"
                  />
                </div>
                <div className="">
                <button
                  type="submit"
                  className="w-full h-[42px] flex items-center justify-center bg-gray-800 hover:bg-gray-700 text-white text-xl font-extrabold rounded-lg cursor-pointer shadow-md transition-all"
                  // disabled={resendOTPMutation.isPending}
                >
                  {/* {resendOTPMutation.isPending ? "Sending OTP..." : "Next"} */}
                  Next
                </button>
                </div>
              </Form>
            </Formik>
          )}

          {/* Step 2: OTP Input (No API here) */}
          {step === 2 && (
            <Formik
              initialValues={{ otp: "" }}
              validationSchema={OTPSchema}
              onSubmit={(values) => {
                const allData = { ...formData, ...values };
                setFormData(allData);
                setStep(3);
              }}
            >
              <Form className="space-y-4">
                <div>
                  <Field
                    type="text"
                    name="otp"
                    placeholder="Enter OTP"
                    className="border border-orange-400 text-black px-3 py-2 w-full rounded"
                  />
                  <ErrorMessage
                    name="otp"
                    component="div"
                    className="text-red-500 text-sm"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full bg-yellow-500 cursor-pointer hover:bg-yellow-600 text-black font-bold py-2 rounded"
                >
                  Verify OTP
                </button>
              </Form>
            </Formik>
          )}

          {/* Step 3: New Password */}
          {step === 3 && (
            <Formik
              initialValues={{
                new_password: "",
                confirm_password: "",
              }}
              validationSchema={PasswordSchema}
              onSubmit={(values) => {
                const finalData = { ...formData, ...values };
                // finalMutation.mutate(finalData);
              }}
            >
              <Form className="space-y-4">
                <div>
                  <div className="relative">
                    <Field
                      type={showPassword ? "text" : "password"}
                      name="new_password"
                      placeholder="New Password"
                      className="border border-orange-400 text-black px-3 py-2 w-full rounded"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword((prev) => !prev)}
                      className="absolute cursor-pointer inset-y-0 right-3 flex items-center text-gray-500 hover:text-gray-700"
                    >
                      {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                  </div>
                  <ErrorMessage
                    name="new_password"
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
                      className="border border-orange-400 text-black px-3 py-2 w-full rounded"
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
                    </button>
                  </div>
                  <ErrorMessage
                    name="confirm_password"
                    component="div"
                    className="text-red-500 text-sm"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full bg-yellow-500 cursor-pointer hover:bg-yellow-600 text-black font-bold py-2 rounded"
                  // disabled={finalMutation.isPending}
                >
                  {/* {finalMutation.isPending ? "Submitting..." : "Reset Password"} */}
                  Reset Password
                </button>
              </Form>
            </Formik>
          )}
        </div>
      </div>
    // </DashboardLayout>
  );
}
