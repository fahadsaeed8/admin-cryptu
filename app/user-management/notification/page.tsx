"use client";

import DashboardLayout from "@/app/page";
import { useState } from "react";

interface Notification {
  id: number;
  memberAccount: string;
  title: string;
  content: string;
  sendingTime: string;
  state: "Unread" | "Read";
}

export default function NotificationsPage() {
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: 293,
      memberAccount: "ranashahbaz043@gmail.com",
      title: "Fast Contract Trading",
      content:
        "The fast contract has been closed out; please add to your position promptly.",
      sendingTime: "2025-10-28 22:11:56",
      state: "Unread",
    },
    {
      id: 292,
      memberAccount: "rzubair5@gmail.com",
      title: "Fast Contract Trading",
      content:
        "The fast contract has been closed out; please add to your position promptly.",
      sendingTime: "2025-10-27 04:01:48",
      state: "Unread",
    },
    // Add more dummy records if needed
  ]);

  const handleDelete = () => {
    const checked = document.querySelectorAll<HTMLInputElement>(
      'input[type="checkbox"]:checked'
    );
    const idsToDelete = Array.from(checked).map((cb) => Number(cb.value));
    setNotifications((prev) => prev.filter((n) => !idsToDelete.includes(n.id)));
  };

  return (
    <DashboardLayout>
      <div className="">
        <h1 className="text-xl font-semibold mb-4">
          Send notification records
        </h1>

        {/* Search + Delete */}
        <div className="flex items-center mb-4 space-x-2">
          <button
            onClick={handleDelete}
            className="bg-red-500 text-white px-4 py-1 rounded hover:bg-red-600 transition"
          >
            Delete
          </button>
          <input
            type="text"
            placeholder="Please enter your query"
            className="border border-gray-300 rounded px-3 py-1 w-64 focus:ring-2 focus:ring-blue-400 outline-none"
          />
          <button className="ml-auto bg-yellow-400 text-black px-4 py-1 rounded hover:bg-yellow-500 transition">
            Initial search
          </button>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="min-w-full border border-gray-200 text-sm">
            <thead className="bg-gray-100 text-gray-700">
              <tr>
                <th className="p-2 border">
                  <input type="checkbox" />
                </th>
                <th className="p-2 border">ID</th>
                <th className="p-2 border">Member account</th>
                <th className="p-2 border">Notification Title</th>
                <th className="p-2 border">Notification content</th>
                <th className="p-2 border">Sending time</th>
                <th className="p-2 border">State</th>
              </tr>
            </thead>
            <tbody>
              {notifications.map((n) => (
                <tr key={n.id} className="hover:bg-gray-50">
                  <td className="p-2 border text-center">
                    <input type="checkbox" value={n.id} />
                  </td>
                  <td className="p-2 border text-center">{n.id}</td>
                  <td className="p-2 border">{n.memberAccount}</td>
                  <td className="p-2 border">{n.title}</td>
                  <td className="p-2 border">{n.content}</td>
                  <td className="p-2 border">{n.sendingTime}</td>
                  <td
                    className={`p-2 border font-semibold ${
                      n.state === "Unread" ? "text-red-500" : "text-green-600"
                    }`}
                  >
                    {n.state}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </DashboardLayout>
  );
}
