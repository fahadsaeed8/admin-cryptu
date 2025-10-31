"use client";
import DashboardLayout from "@/app/page";
import React from "react";

interface Announcement {
  id: number;
  title: string;
  updateTime: string;
  state: string;
}

const AnnouncementCenter: React.FC = () => {
  const announcements: Announcement[] = [
    {
      id: 18,
      title: "Deposit and withdraw please contact the customer service.",
      updateTime: "2022-11-29 21:19:27",
      state: "show",
    },
  ];

  return (
    <DashboardLayout>
      <div className="min-h-screen">
        {/* Page Header */}
        <h1 className="text-lg font-semibold text-gray-700 mb-4">
          Announcement Center
        </h1>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center gap-2 mb-4">
          <button className="bg-green-500 text-white px-4 py-1.5 rounded hover:bg-green-600 text-sm">
            New
          </button>
          <button className="bg-red-500 text-white px-4 py-1.5 rounded hover:bg-red-600 text-sm">
            Delete
          </button>
        </div>

        {/* Table Container */}
        <div className="overflow-x-auto bg-white">
          <table className="min-w-full text-sm border-collapse table-auto">
            <thead>
              <tr className=" text-left">
                <th className="p-2 border border-gray-300 w-10">
                  <input type="checkbox" className="accent-blue-600" />
                </th>
                <th className="p-2  border border-gray-300 font-semibold whitespace-nowrap">
                  ID
                </th>
                <th className="p-2  border border-gray-300 font-semibold whitespace-nowrap">
                  Announcement Title
                </th>
                <th className="p-2  border border-gray-300 font-semibold whitespace-nowrap">
                  Update time
                </th>
                <th className="p-2  border border-gray-300 font-semibold whitespace-nowrap">
                  state
                </th>
                <th className="p-2  border border-gray-300 font-semibold whitespace-nowrap">
                  operate
                </th>
              </tr>
            </thead>

            <tbody>
              {announcements.length > 0 ? (
                announcements.map((item, index) => (
                  <tr
                    key={item.id}
                    className={`${
                      index % 2 === 0 ? "bg-gray-100" : "bg-white"
                    } hover:bg-orange-50 transition-colors`}
                  >
                    <td className="p-2 border border-gray-300 text-center">
                      <input type="checkbox" className="accent-blue-600" />
                    </td>
                    <td className="p-2 border border-gray-300">{item.id}</td>
                    <td className="p-2 border border-gray-300">{item.title}</td>
                    <td className="p-2 border border-gray-300">
                      {item.updateTime}
                    </td>
                    <td className="p-2 border border-gray-300 capitalize">
                      <span
                        className={`px-2 py-1 rounded text-xs ${
                          item.state === "active"
                            ? "bg-green-100 text-green-700"
                            : "bg-gray-100 text-gray-700"
                        }`}
                      >
                        {item.state}
                      </span>
                    </td>
                    <td className="p-2 border border-gray-300 flex gap-2">
                      <button className="px-2 py-1 text-xs bg-white border border-gray-300 rounded hover:bg-orange-100 transition">
                        Edit
                      </button>
                      <button className="px-2 py-1 text-xs bg-red-50 border border-gray-300 text-red-600 rounded hover:bg-red-100 transition">
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan={6}
                    className="text-center py-10 text-gray-400 italic border border-gray-300 bg-white"
                  >
                    No announcements available.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination Info */}
        <div className="text-gray-500 text-sm mt-3">
          {announcements.length} record, 1/1 page
        </div>
      </div>
    </DashboardLayout>
  );
};

export default AnnouncementCenter;
