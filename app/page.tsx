"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  ChevronDown,
  ChevronRight,
  Menu,
  X,
  Home,
  Settings,
  Users,
  FileText,
  Coins,
  Database,
  Package,
  MessageSquare,
  Globe,
  Wallet,
  LogIn,
  Bell,
  CreditCard,
  DollarSign,
  ShoppingCart,
  HardDrive,
  LogOut,
  SquarePlus,
  SquareMinus,
} from "lucide-react";

const tabs = [
  { name: "Front Page", path: "/dashboard" },
  { name: "System Settings", path: "/system-settings" },
  { name: "User Management", path: "/user-management" },
  { name: "Financial Records", path: "/financial-records" },
  { name: "Trading Center", path: "/trading-center" },
  { name: "Mining Machine Management", path: "/mining-machine" },
  { name: "Content Management", path: "/content-management" },
];

// ✅ Icon map for sidebar items
const iconMap: Record<string, React.ReactNode> = {
  "Backend Homepage": <Home className="w-4 h-4" />,
  "Website Information": <Globe className="w-4 h-4" />,
  "System Configuration": <Settings className="w-4 h-4" />,
  "Currency Allocation": <Coins className="w-4 h-4" />,
  "Market Allocation": <Database className="w-4 h-4" />,
  "Membership Management": <Users className="w-4 h-4" />,
  "Agent Management": <Users className="w-4 h-4" />,
  "Administrative Management": <Settings className="w-4 h-4" />,
  "Login Log": <LogIn className="w-4 h-4" />,
  "User's Wallet": <Wallet className="w-4 h-4" />,
  "User Assets": <Database className="w-4 h-4" />,
  "Cash Flow": <DollarSign className="w-4 h-4" />,
  "Notification Management": <Bell className="w-4 h-4" />,
  "Online Customer Service": <MessageSquare className="w-4 h-4" />,
  Transactions: <CreditCard className="w-4 h-4" />,
  "Deposit History": <DollarSign className="w-4 h-4" />,
  "Withdraw Records": <CreditCard className="w-4 h-4" />,
  "Contract Order": <FileText className="w-4 h-4" />,
  "Contract Settings": <Settings className="w-4 h-4" />,
  "Closing Records": <FileText className="w-4 h-4" />,
  "Mining Machine List": <HardDrive className="w-4 h-4" />,
  "Mining Machine in operation": <Database className="w-4 h-4" />,
  "Expired Mining Machine": <Package className="w-4 h-4" />,
  "Mining Machine Revenue list": <DollarSign className="w-4 h-4" />,
  "Frozen Profit": <Coins className="w-4 h-4" />,
  Posts: <MessageSquare className="w-4 h-4" />,
};

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const [activeTab, setActiveTab] = useState(pathname);
  const [accordionOpen, setAccordionOpen] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(false); // mobile toggle

  // ✅ Redirect from "/" to "/dashboard" automatically
  useEffect(() => {
    if (pathname === "/") {
      router.replace("/dashboard");
    }
  }, [pathname, router]);

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

  const handleLogout = () => {
    // Add logout logic here (e.g., clear tokens, redirect to login)
    router.push("/login");
  };

  return (
    <div className="flex h-screen bg-gray-100 w-full max-w-[2160px] mx-auto">
      {/* Sidebar */}
      <aside
        className={`fixed lg:static top-0 left-0 h-full w-64 bg-[#1f1f2e] text-white flex flex-col transform transition-transform duration-300 z-40
        ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        } lg:translate-x-0`}
      >
        {/* Logo */}
        <div className="py-2 font-bold text-xl flex items-center justify-center gap-2 border-b border-gray-700">
          <img src="/alogn.png" className="w-7" alt="Logo" />
          <span className="hidden sm:inline">Admin Panel</span>
        </div>

        {/* Accordion Header */}
        <div
          className="flex items-center justify-start gap-3 px-4 py-3 text-sm font-semibold uppercase tracking-wide cursor-pointer select-none border-b border-gray-700 hover:bg-gray-800 transition-all duration-300 ease-in-out"
          onClick={() => setAccordionOpen(!accordionOpen)}
        >
          {accordionOpen ? (
            <SquareMinus className="w-4 h-4" />
          ) : (
            <SquarePlus className="w-4 h-4" />
          )}
          <span>{accordionTitle}</span>
        </div>

        {/* Sidebar Items */}
        <div className="flex-1 overflow-y-auto">
          {accordionOpen && (
            <nav className="pl-4 space-y-2 mt-2 transition-all duration-300 ease-in-out">
              {sidebarItems?.map((item) => (
                <Link
                  key={item.label}
                  href={item.path}
                  onClick={() => setSidebarOpen(false)} // close on mobile
                  className={`flex items-center gap-2 px-3 py-2 text-sm transition-all ${
                    pathname === item.path
                      ? "bg-white text-gray-900"
                      : "hover:bg-gray-300 hover:text-gray-900"
                  }`}
                >
                  {iconMap[item.label] || <FileText className="w-4 h-4" />}
                  <span>{item.label}</span>
                </Link>
              ))}
            </nav>
          )}
        </div>

        {/* ✅ Logout Button */}
        <div className="border-t border-gray-700 mt-auto">
          <button
            onClick={handleLogout}
            className="w-full flex items-center cursor-pointer gap-2 px-4 py-3 text-sm font-medium text-left hover:bg-gray-800 transition-all"
          >
            <LogOut className="w-4 h-4" />
            Logout
          </button>
        </div>
      </aside>

      {/* Overlay for mobile */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-40 z-30 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        ></div>
      )}

      {/* Main Area */}
      <main className="flex-1 flex flex-col">
        {/* Top Navbar */}
        <header className="flex flex-wrap items-center justify-between bg-white border-b text-sm font-medium text-gray-600 px-4">
          {/* Mobile Toggle */}
          <button
            className="lg:hidden p-2"
            onClick={() => setSidebarOpen(!sidebarOpen)}
          >
            {sidebarOpen ? (
              <X className="w-5 h-5" />
            ) : (
              <Menu className="w-5 h-5" />
            )}
          </button>

          <div className="flex flex-wrap flex-1 justify-center lg:justify-start">
            {tabs.map((tab) => {
              const firstSubItem = sidebarConfig[tab.path]?.[0];
              return (
                <button
                  key={tab.path}
                  onClick={() => {
                    if (firstSubItem) {
                      router.push(firstSubItem.path);
                      setActiveTab(tab.path);
                      setAccordionOpen(true);
                      setSidebarOpen(false);
                    }
                  }}
                  className={`px-3 md:px-4 py-3 border-b-2 cursor-pointer transition-all text-xs md:text-sm ${
                    pathname.startsWith(tab.path)
                      ? "border-blue-500 text-blue-600 font-semibold"
                      : "border-transparent hover:border-gray-300"
                  }`}
                >
                  {tab.name}
                </button>
              );
            })}
          </div>
        </header>

        {/* Page Content */}
        <div className="flex-1 max-w-[1110px] overflow-y-auto p-4 md:p-6">
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
    {
      label: "Mining Machine List",
      path: "/mining-machine/mining-machine-list",
    },
    {
      label: "Mining Machine in operation",
      path: "/mining-machine/mining-machine-in-operation",
    },
    {
      label: "Expired Mining Machine",
      path: "/mining-machine/expired-mining-machine",
    },
    {
      label: "Mining Machine Revenue list",
      path: "/mining-machine/mining-machine-revenue-list",
    },
    {
      label: "Frozen Profit",
      path: "/mining-machine/frozen-profit",
    },
  ],

  "/content-management": [
    { label: "Posts", path: "/content-management/announcement-center" },
  ],
};
