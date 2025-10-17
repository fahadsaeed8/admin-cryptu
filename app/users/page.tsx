"use client"

import DashboardLayout from "@/components/dashboardLayout";
import React, { useState, useEffect } from "react";

export type User = {
  id: string;
  name: string;
  email: string;
  phone?: string;
  status?: "active" | "inactive" | "suspended";
  registeredAt?: string; // ISO date
  totalInvested?: number;
};

const mockUsers: User[] = [
  {
    id: "u1",
    name: "Ali Khan",
    email: "ali@example.com",
    phone: "+92 300 1112233",
    status: "active",
    registeredAt: "2024-05-01T10:20:30Z",
    totalInvested: 1200.5,
  },
  {
    id: "u2",
    name: "Sara Ahmed",
    email: "sara@example.com",
    phone: "+92 300 2223344",
    status: "inactive",
    registeredAt: "2024-06-15T14:12:00Z",
    totalInvested: 5000,
  },
];

export default function AdminUsersPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [query, setQuery] = useState("");

  useEffect(() => {
    // replace with API call
    setUsers(mockUsers);
  }, []);

  const filtered = users.filter(
    (u) =>
      u.name.toLowerCase().includes(query.toLowerCase()) ||
      u.email.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <DashboardLayout>
    <div className="min-h-screen bg-white px-5 py-10">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-2xl font-bold mb-4">Admin - Users</h1>

        <div className="flex flex-col md:flex-row gap-6">
          {/* Left - Users list */}
          <div className="md:w-1/3 bg-white p-4 rounded shadow">
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search users..."
              className="w-full mb-4 border px-3 py-2 rounded"
            />

            <div className="space-y-2">
              {filtered.map((u) => (
                <button
                  key={u.id}
                  onClick={() => setSelectedUser(u)}
                  className={`w-full text-left p-3 rounded cursor-pointer hover:bg-gray-100 flex justify-between items-center ${
                    selectedUser?.id === u.id ? "bg-gray-100 " : ""
                  }`}
                >
                  <div>
                    <div className="font-semibold">{u.name}</div>
                    <div className="text-sm text-gray-500">{u.email}</div>
                  </div>
                  <div className="text-sm text-gray-600">
                    {u.totalInvested} USD
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Right - Details */}
          <div className="flex-1 bg-white p-6 rounded shadow">
            {!selectedUser ? (
              <div className="text-center text-gray-500">
                Select a user to view details
              </div>
            ) : (
              <div>
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-xl font-bold">{selectedUser.name}</h2>
                    <div className="text-sm text-gray-600">
                      {selectedUser.email}
                    </div>
                  </div>
                  <div className="text-sm">Status: {selectedUser.status}</div>
                </div>

                <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-gray-50 p-4 rounded">
                    <div className="text-sm text-gray-500">Registered</div>
                    <div className="font-semibold">
                      {new Date(
                        selectedUser.registeredAt || ""
                      ).toLocaleString()}
                    </div>
                  </div>

                  <div className="bg-gray-50 p-4 rounded">
                    <div className="text-sm text-gray-500">Total Invested</div>
                    <div className="font-semibold">
                      ${selectedUser.totalInvested}
                    </div>
                  </div>
                </div>

                <div className="mt-6">
                  <h3 className="font-semibold mb-2">Investments</h3>
                  <div className="space-y-2">
                    {/* mock investments */}
                    <div className="p-3 border rounded flex justify-between">
                      <div>
                        <div className="font-semibold">Bitcoin</div>
                        <div className="text-sm text-gray-500">
                          Purchased on 2024-07-01
                        </div>
                      </div>
                      <div className="font-semibold">$500</div>
                    </div>

                    <div className="p-3 border rounded flex justify-between">
                      <div>
                        <div className="font-semibold">Ethereum</div>
                        <div className="text-sm text-gray-500">
                          Purchased on 2024-08-10
                        </div>
                      </div>
                      <div className="font-semibold">$700</div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
    </DashboardLayout>
  );
}
