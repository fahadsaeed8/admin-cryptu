import DashboardLayout from "@/components/dashboardLayout";
import TradeLog from "@/components/section/TradeLog";
import React from "react";

const page = () => {
  return (
    <DashboardLayout>
      <TradeLog />
    </DashboardLayout>
  );
};

export default page;
