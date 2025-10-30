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
      <div className="max-w-7xl mx-auto">
        <h2 className="text-lg font-semibold mb-4">
          Administrators management
        </h2>

        {/* Buttons */}
        <div className="flex flex-wrap gap-2 mb-4">
          <button className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded">
            New Additions
          </button>
          <button className="bg-sky-500 hover:bg-sky-600 text-white px-3 py-1 rounded">
            Enlightenment
          </button>
          <button className="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1 rounded">
            Banned
          </button>
          <button className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded">
            Deleted
          </button>

          {/* Filters */}
          <div className="ml-auto flex gap-2 items-center">
            <select className="border rounded px-2 py-1 text-sm">
              <option>All Status</option>
              <option>Normal</option>
              <option>Banned</option>
            </select>
            <select className="border rounded px-2 py-1 text-sm">
              <option>Username</option>
              <option>Nickname</option>
            </select>
            <input
              type="text"
              placeholder="Please enter the content"
              className="border rounded px-2 py-1 text-sm w-48"
            />
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto border rounded-lg">
          <table className="min-w-full text-sm text-left border-collapse">
            <thead className="bg-gray-100 text-gray-700">
              <tr>
                <th className="px-4 py-2 border">
                  <input type="checkbox" />
                </th>
                <th className="px-4 py-2 border">ID</th>
                <th className="px-4 py-2 border">Username</th>
                <th className="px-4 py-2 border">Nickname</th>
                <th className="px-4 py-2 border">Mobile phone number</th>
                <th className="px-4 py-2 border">Mailbox</th>
                <th className="px-4 py-2 border">Status</th>
                <th className="px-4 py-2 border">Operation</th>
              </tr>
            </thead>
            <tbody>
              {admins.map((admin) => (
                <tr key={admin.id} className="border-t">
                  <td className="px-4 py-2 border">
                    <input type="checkbox" />
                  </td>
                  <td className="px-4 py-2 border">{admin.id}</td>
                  <td className="px-4 py-2 border">{admin.username}</td>
                  <td className="px-4 py-2 border">{admin.nickname || "-"}</td>
                  <td className="px-4 py-2 border">{admin.phone || "-"}</td>
                  <td className="px-4 py-2 border">{admin.email}</td>
                  <td className="px-4 py-2 border">{admin.status}</td>
                  <td className="px-4 py-2 border">
                    <button className="bg-indigo-500 hover:bg-indigo-600 text-white px-3 py-1 rounded text-xs">
                      Editor
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Footer */}
        <div className="text-sm text-gray-500 mt-2">1 record 1/1 pages</div>
      </div>
    </DashboardLayout>
  );
}
