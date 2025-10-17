"use client";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import NotificationPopUp from "@/components/popup/notification-popup";

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <div className=" bg-[#F1F1F1]">
      {" "}
      {/* Parent Background */}
      <div className="w-full bg-white rounded-br-[20px] px-4 py-[23px] flex items-center justify-between text-white relative">
        {/* Left Section - Mobile Menu and Locations */}
        <div className="flex items-center gap-2">
          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden mr-1"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Right Section - Icons and Profile */}
        <div className="flex items-center gap-2 sm:gap-4">
          {/* Icons - Always visible but spaced differently */}
          <div className="hidden sm:flex mr-12 items-center gap-2 sm:gap-4">
            <NotificationPopUp />
          </div>

          <div className="block sm:hidden">
            <NotificationPopUp />
          </div>
        </div>
      </div>
    </div>
  );
}
