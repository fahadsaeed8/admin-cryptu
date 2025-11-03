"use client";
import DashboardLayout from "@/app/page";
import { useState } from "react";

interface Admin {
  id: number;
  username: string;
  nickname?: string;
  phone?: string;
  email: string;
  status: string;
}

export default function AdminPage() {
  const [admins] = useState<Admin[]>([
    {
      id: 1,
      username: "admin",
      nickname: "",
      phone: "",
      email: "test@gmail.com",
      status: "Normal",
    },
  ]);

  return (
    <DashboardLayout>
      <div className=" min-h-screen bg-white p-2 md:p-4">
        <h2 className="text-lg font-semibold mb-4 border-b border-gray-300">
          Administrators management
        </h2>

        {/* Buttons */}
        <div className="flex flex-wrap gap-2 mb-4">
          <button className="bg-green-500 cursor-pointer hover:bg-green-600 text-white px-3 py-1 rounded">
            New Additions
          </button>
          <button className="bg-sky-500 cursor-pointer hover:bg-sky-600 text-white px-3 py-1 rounded">
            Enlightenment
          </button>
          <button className="bg-yellow-500 cursor-pointer hover:bg-yellow-600 text-white px-3 py-1 rounded">
            Banned
          </button>
          <button className="bg-red-500 cursor-pointer hover:bg-red-600 text-white px-3 py-1 rounded">
            Deleted
          </button>

          {/* Filters */}
          <div className=" flex lg:flex-nowrap flex-wrap gap-2 items-center">
            <select className="border border-gray-300 rounded px-2 py-1 text-sm">
              <option>All Status</option>
              <option>Normal</option>
              <option>Banned</option>
            </select>
            <select className="border border-gray-300 rounded px-2 py-1 text-sm">
              <option>Username</option>
              <option>Nickname</option>
            </select>
            <input
              type="text"
              placeholder="Please enter the content"
              className="border border-gray-300 rounded px-2 py-1 text-sm w-48"
            />
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto bg-white">
          <table className="min-w-full text-sm border-collapse table-auto">
            <thead>
              <tr className="text-left uppercase text-gray-800">
                <th className="p-2 border border-gray-300">
                  <input type="checkbox" />
                </th>
                <th className="p-2 border border-gray-300">ID</th>
                <th className="p-2 border border-gray-300">Username</th>
                <th className="p-2 border border-gray-300">Nickname</th>
                <th className="p-2 border border-gray-300">
                  Mobile phone number
                </th>
                <th className="p-2 border border-gray-300">Mailbox</th>
                <th className="p-2 border border-gray-300">Status</th>
                <th className="p-2 border border-gray-300">Operation</th>
              </tr>
            </thead>

            <tbody>
              {admins.map((admin, index) => (
                <tr
                  key={admin.id}
                  className={`${
                    index % 2 === 0 ? "bg-gray-100" : "bg-white"
                  } hover:bg-orange-50 transition-colors`}
                >
                  <td className="p-2 border border-gray-300 align-top">
                    <input type="checkbox" />
                  </td>

                  <td className="p-2 border border-gray-300 align-top text-sm">
                    {admin.id}
                  </td>

                  <td className="p-2 border border-gray-300 align-top text-sm">
                    {admin.username}
                  </td>

                  <td className="p-2 border border-gray-300 align-top text-sm">
                    {admin.nickname || "-"}
                  </td>

                  <td className="p-2 border border-gray-300 align-top text-sm">
                    {admin.phone || "-"}
                  </td>

                  <td className="p-2 border border-gray-300 align-top text-sm">
                    {admin.email}
                  </td>

                  <td className="p-2 border border-gray-300 align-top text-sm">
                    <span
                      className={`inline-block px-2 py-1 rounded text-xs ${
                        admin.status === "Active"
                          ? "bg-green-100 text-green-700"
                          : "bg-red-100 text-red-700"
                      }`}
                    >
                      {admin.status}
                    </span>
                  </td>

                  <td className="p-2 border border-gray-300 align-top text-sm">
                    <button className="px-2 cursor-pointer py-1 text-xs bg-white border border-gray-300 rounded hover:bg-gray-100 text-indigo-600">
                      Edit
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {admins.length === 0 && (
            <div className="p-4 text-center text-gray-500 border-t border-gray-300">
              No records found
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="text-sm text-gray-500 mt-2">1 record 1/1 pages</div>
      </div>
    </DashboardLayout>
  );
}
