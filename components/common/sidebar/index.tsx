"use client";

import { JSX, useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import {
  LayoutDashboard,
  Settings,
  ChevronDown,
  Menu,
  X,
  FileSpreadsheet,
  BarChart2,
  FileText,
  LogOut,
  User,
} from "lucide-react";
import Image from "next/image";
import SideProfilePopUp from "@/components/popup/side-profile-popup";

interface MenuItem {
  label: string;
  icon?: JSX.Element;
  link?: string;
  subItems?: MenuItem[];
}

const menuItems: MenuItem[] = [
  {
    label: "Dashboard",
    icon: <LayoutDashboard size={18} />,
    link: "/",
  },
  {
    label: "User",
    icon: <User size={18} />,
    link: "/users",
  },
  {
    label: "Orders",
    icon: <FileSpreadsheet size={18} />,
    link: "/orders",
  },
  {
    label: "Market",
    icon: <BarChart2 size={18} />,
    link: "/market",
  },
  {
    label: "Assets",
    icon: <FileText size={18} />,
    link: "/assets",
  },
  {
    label: "Account",
    icon: <Settings size={18} />,
    link: "/account",
  },
];

export default function Sidebar() {
  const pathname = usePathname();
  const [openDropdowns, setOpenDropdowns] = useState<string[]>([]);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const sidebarRef = useRef<HTMLDivElement>(null);

  const isActive = (link?: string) => {
    if (!link) return false;
    if (link === "/") {
      return pathname === "/";
    }
    return pathname === link || pathname.startsWith(link + "/");
  };

  const handleMenuClick = (item: MenuItem) => {
    if (item.subItems) {
      setOpenDropdowns((prev) =>
        prev.includes(item.label)
          ? prev.filter((i) => i !== item.label)
          : [...prev, item.label]
      );
    }
  };

  const renderMenu = (items: MenuItem[], level: number = 0) => {
    return items.map((item) => (
      <li key={item.label}>
        {!item.subItems ? (
          <Link
            href={item.link || "#"}
            className={`flex items-center justify-between w-full px-4 py-2 rounded-md text-sm transition ${
              isActive(item.link)
                ? `${
                    level === 0
                      ? "bg-blue-100 text-[#2F80ED]"
                      : "text-[#2F80ED]"
                  } active-menu-item`
                : "hover:bg-white/10 text-black font-medium"
            }`}
            onClick={() => {
              if (window.innerWidth < 1024) {
                setMobileMenuOpen(false);
              }
            }}
          >
            <div className="flex items-center gap-3">
              {item.icon}
              <span>{item.label}</span>
            </div>
          </Link>
        ) : (
          <div>
            <button
              onClick={() => handleMenuClick(item)}
              className={`flex items-center justify-between mb-1 w-full px-4 py-2 rounded-md text-sm cursor-pointer transition ${
                isActive(item.link) || openDropdowns.includes(item.label)
                  ? "bg-[#febd69] text-black"
                  : "hover:bg-white/10 text-gray-200"
              }`}
            >
              <div className="flex items-center gap-3">
                {item.icon}
                <span>{item.label}</span>
              </div>
              <ChevronDown
                size={16}
                className={`transition ${
                  openDropdowns.includes(item.label) ? "rotate-180" : ""
                }`}
              />
            </button>

            <AnimatePresence>
              {openDropdowns.includes(item.label) && (
                <motion.ul
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="pl-6"
                >
                  {renderMenu(item.subItems, level + 1)}
                </motion.ul>
              )}
            </AnimatePresence>
          </div>
        )}
      </li>
    ));
  };

  useEffect(() => {
    const openParents: string[] = [];

    const checkSubItems = (items: MenuItem[], parentLabel?: string) => {
      for (const item of items) {
        if (item.subItems) {
          checkSubItems(item.subItems, item.label);
        }
        if (item.link && pathname.startsWith(item.link)) {
          if (parentLabel && !openParents.includes(parentLabel)) {
            openParents.push(parentLabel);
          }
        }
      }
    };

    checkSubItems(menuItems);
    setOpenDropdowns(openParents);
  }, [pathname]);

  useEffect(() => {
    const activeItem = document.querySelector(".active-menu-item");
    if (activeItem && sidebarRef.current) {
      const sidebar = sidebarRef.current;
      const offsetTop = (activeItem as HTMLElement).offsetTop;
      sidebar.scrollTo({
        top: offsetTop - 100,
        behavior: "smooth",
      });
    }
  }, [pathname]);

  const handleLogout = () => {
    // Example logout logic:
    // remove auth token, clear localStorage, redirect to login page
    localStorage.removeItem("token");
    window.location.href = "/login";
  };

  return (
    <>
      {/* Mobile Menu Button */}
      <div className="lg:hidden fixed top-1 left-2 z-40">
        {!mobileMenuOpen && (
          <button
            onClick={() => setMobileMenuOpen(true)}
            className="p-2 rounded-md bg-transparent text-black"
          >
            <Menu size={24} />
          </button>
        )}
      </div>

      {/* Sidebar */}
      <div
        ref={sidebarRef}
        className={`fixed lg:relative z-30 w-[244px] min-w-[244px] max-w-[244px] h-screen overflow-y-auto 
        bg-[#F1F1F1] text-black hide-scrollbar
        transform transition-transform duration-300 ease-in-out
        ${
          mobileMenuOpen
            ? "translate-x-0"
            : "-translate-x-full lg:translate-x-0"
        }`}
      >
        {/* Close button for mobile */}
        <div className="lg:hidden flex justify-end mb-2">
          <button
            onClick={() => setMobileMenuOpen(false)}
            className="p-1 rounded-full hover:bg-white/10"
          >
            <X size={20} />
          </button>
        </div>

        {/* User Profile */}
        <div className="bg-white pt-4 px-4 rounded-bl-[20px] ">
          <div className="w-full flex justify-between items-center pb-4 mb-4">
            <div className="flex gap-2 items-center ">
              <Image
                src="/profile-active.jpg"
                width={35}
                height={35}
                alt="Logo"
                className="w-[35px] h-[35px] rounded-full cursor-pointer"
              />
              <div className="text-start">
                <p className="font-medium ml-2 text-[20px]">John Doe</p>
              </div>
            </div>
            <SideProfilePopUp />
          </div>
        </div>

        {/* Menu Items */}
        <div className="p-2 flex flex-col justify-between h-[calc(110%-150px)]">
          <ul className="-mt-2 bg-white p-4 rounded-[14px] overflow-y-auto">
            {renderMenu(menuItems)}
          </ul>

          {/* Logout Button (fixed at bottom) */}
          <div className="mt-4 px-4 py-2 bg-white rounded-[14px] shadow-sm">
            <button
              onClick={handleLogout}
              className="flex items-center cursor-pointer justify-center w-full gap-2 text-red-600 font-semibold hover:bg-red-100 transition py-2 rounded-md"
            >
              <LogOut size={18} />
              <span>Logout</span>
            </button>
          </div>
        </div>
      </div>

      {/* Overlay for mobile */}
      {mobileMenuOpen && (
        <div
          className="fixed inset-0 bg-transparent bg-opacity-50 z-20 lg:hidden"
          onClick={() => setMobileMenuOpen(false)}
        />
      )}
    </>
  );
}
