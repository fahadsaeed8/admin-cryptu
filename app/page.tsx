"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { ChevronDown, ChevronRight } from "lucide-react";

const tabs = [
  { name: "Front Page", path: "/dashboard" },
  { name: "System Settings", path: "/system-settings" },
  { name: "User Management", path: "/user-management" },
  { name: "Financial Records", path: "/financial-records" },
  { name: "Trading Center", path: "/trading-center" },
  { name: "Mining Machine Management", path: "/mining-machine" },
  { name: "Content Management", path: "/content-management" },
];

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const [activeTab, setActiveTab] = useState(pathname);
  const [accordionOpen, setAccordionOpen] = useState(true);

  // Detect active tab based on current route
  useEffect(() => {
    const currentTab = tabs.find((tab) => pathname.startsWith(tab.path));
    if (currentTab) {
      setActiveTab(currentTab.path);
    }
  }, [pathname]);

  const sidebarItems = sidebarConfig[activeTab] || sidebarConfig["/dashboard"];
  const activeTabData = tabs.find((tab) => tab.path === activeTab);

  // Accordion title
  const accordionTitle =
    activeTab === "/dashboard"
      ? "Quick Operation"
      : activeTabData?.name || "Menu";

  // ✅ Auto redirect to first sidebar item if main tab route is opened directly
  useEffect(() => {
    if (sidebarConfig[pathname]?.length) {
      const firstSubItem = sidebarConfig[pathname][0];
      router.replace(firstSubItem.path);
    }
  }, [pathname, router]);

  return (
    <div className="flex h-screen bg-gray-100 w-full max-w-[2160px] mx-auto">
      {/* Sidebar */}
      <aside className="w-64 bg-[#1f1f2e] text-white flex flex-col">
        {/* Logo */}
        <div className="py-2 font-bold text-xl flex items-center justify-center gap-2 border-b border-gray-700">
          <img src="/alogn.png" className="w-7" alt="Logo" />
        </div>

        {/* Accordion Header */}
        <div
          className="flex items-center justify-between px-4 py-3 text-sm font-semibold uppercase tracking-wide cursor-pointer select-none border-b border-gray-700 hover:bg-gray-800 transition-all"
          onClick={() => setAccordionOpen(!accordionOpen)}
        >
          <span>{accordionTitle}</span>
          {accordionOpen ? (
            <ChevronDown className="w-4 h-4" />
          ) : (
            <ChevronRight className="w-4 h-4" />
          )}
        </div>

        {/* Sidebar Items */}
        {accordionOpen && (
          <nav className="flex-1 px-4 space-y-2 mt-2 transition-all duration-300 ease-in-out">
            {sidebarItems?.map((item) => (
              <Link
                key={item.label}
                href={item.path}
                className={`block px-3 py-2 rounded-md text-sm hover:bg-gray-700 transition-all ${
                  pathname === item.path ? "bg-gray-700" : ""
                }`}
              >
                {item.label}
              </Link>
            ))}
          </nav>
        )}
      </aside>

      {/* Main Area */}
      <main className="flex-1 flex flex-col">
        {/* Top Navbar */}
        <header className="flex flex-wrap bg-white border-b text-sm font-medium text-gray-600">
          {tabs.map((tab) => {
            const firstSubItem = sidebarConfig[tab.path]?.[0];
            return (
              <button
                key={tab.path}
                onClick={() => {
                  if (firstSubItem) {
                    router.push(firstSubItem.path); // ✅ open first sidebar item
                    setActiveTab(tab.path);
                    setAccordionOpen(true);
                  }
                }}
                className={`px-4 py-3 border-b-2 cursor-pointer transition-all ${
                  pathname.startsWith(tab.path)
                    ? "border-blue-500 text-blue-600 font-semibold"
                    : "border-transparent hover:border-gray-300"
                }`}
              >
                {tab.name}
              </button>
            );
          })}
        </header>

        {/* Page Content */}
        <div className="flex-1 max-w-[1110px] overflow-y-auto p-6 ">
          {children}
        </div>
      </main>
    </div>
  );
}

// ✅ Sidebar configurations — only sub-items have pages
const sidebarConfig: Record<string, { label: string; path: string }[]> = {
  "/dashboard": [{ label: "Backend Homepage", path: "/dashboard" }],

  "/system-settings": [
    {
      label: "Website Information",
      path: "/system-settings/website-information",
    },
    { label: "System Configuration", path: "/system-settings/config" },
    {
      label: "Currency Allocation",
      path: "/system-settings/currency-allocation",
    },
    {
      label: "Market Allocation",
      path: "/system-settings/market-allocation",
    },
  ],

  "/user-management": [
    {
      label: "Membership Management",
      path: "/user-management/membership-management",
    },
    { label: "Agent Management", path: "/user-management/agent-management" },
    {
      label: "Administrative Management",
      path: "/user-management/administrative-management",
    },
    {
      label: "Login Log",
      path: "/user-management/login-log",
    },
    {
      label: "User's Wallet",
      path: "/user-management/user-wallet",
    },
    {
      label: "User Assets",
      path: "/user-management/user-assets",
    },
    {
      label: "Cash Flow",
      path: "/user-management/cash-flow",
    },
    {
      label: "Notification Management",
      path: "/user-management/notification",
    },
    {
      label: "Online Customer Service",
      path: "/user-management/online-customer-service",
    },
  ],

  "/financial-records": [
    { label: "Transactions", path: "/financial-records/financial-details" },
    { label: "Deposit History", path: "/financial-records/deposit-history" },
    { label: "Withdraw Records", path: "/financial-records/withdraw-record" },
  ],

  "/trading-center": [
    { label: "Contract Order", path: "/trading-center/contract-order" },
    { label: "Contract Settings", path: "/trading-center/contract-settings" },
    { label: "Closing Records", path: "/trading-center/closing-records" },
  ],

  "/mining-machine": [
    { label: "Machines", path: "/mining-machine/machines" },
    { label: "Performance", path: "/mining-machine/performance" },
  ],

  "/content-management": [
    { label: "Posts", path: "/content-management/posts" },
    { label: "Media Library", path: "/content-management/media" },
  ],
};
