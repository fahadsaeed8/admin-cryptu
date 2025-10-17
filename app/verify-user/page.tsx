"use client";

import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
// import DashboardLayout from "src/components/layout/dashboard-layout";
// import { resendOTPAPI } from "src/services/auth";

// Validation Schema
const EmailSchema = Yup.object({
  email: Yup.string().email("Invalid email").required("Email is required"),
});

export default function VerifyUserPage() {
  const router = useRouter();

  // Step 1: Send OTP
  // const resendOTPMutation = useMutation({
  //   mutationFn: (data: any) => resendOTPAPI(data),
  //   onSuccess: (res) => {
  //     toast.success(res?.message || "OTP sent successfully");
  //     router.push("/otp-verification"); // ✅ redirect after OTP send
  //   },
  //   onError: (err: any) => {
  //     toast.error(err?.response?.data?.message || "Failed to send OTP");
  //   },
  // });

  return (
    // <DashboardLayout>
      <div className="min-h-screen flex items-center justify-center bg-white px-4">
        <div className="max-w-md w-full space-y-6 border p-6 shadow rounded-lg">
          <h1 className="text-2xl font-bold text-center text-black">
            Verify User
          </h1>

          <Formik
            initialValues={{ email: "" }}
            validationSchema={EmailSchema}
            onSubmit={(values) => {
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
              <button
                type="submit"
                className="w-full h-[42px] flex items-center justify-center bg-gray-800 hover:bg-gray-700 text-white text-xl font-extrabold rounded-lg cursor-pointer shadow-md transition-all"
                // disabled={resendOTPMutation.isPending}
              >
               Next
              </button>
            </Form>
          </Formik>
        </div>
      </div>
    // </DashboardLayout>
  );
}
