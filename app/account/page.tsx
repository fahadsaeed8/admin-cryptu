import DashboardLayout from "@/components/dashboardLayout";
import React from "react";
import { FaUser } from "react-icons/fa";

const Account = () => {
  interface ProfileField {
    label: string;
    value: string;
  }

  const profileData: ProfileField[] = [
    { label: "Name", value: "John Doe" },
    { label: "Email", value: "test@gmail.com" },
    { label: "Username", value: "@johndoe" },
    { label: "Balance", value: "INR 345" },
    { label: "Credit Score", value: "2345" },
    { label: "Level", value: "Premium" },
  ];
  return (
    <DashboardLayout>
      <div className=" bg-white h-screen rounded-xl">
        <div className=" p-6">
          <h2 className="mb-6 text-[32px] font-medium text-[#555555]">
            User Profile
          </h2>

          <div className="space-y-4">
            {profileData.map((item, idx) => (
              <div key={idx} className="flex items-center space-x-3">
                <FaUser className="w-[21px] h-[21px]" />
                <div>
                  <p className=" text-[14px] font-medium text-[#555555]">
                    {item.label}
                  </p>
                  <p className=" text-xl font-medium text-[#555555]">
                    {item.value}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Account;
