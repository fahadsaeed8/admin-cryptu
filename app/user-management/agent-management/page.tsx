"use client";

import DashboardLayout from "@/app/page";
import React, { useState } from "react";

interface Agent {
  id: number;
  email: string;
  ip: string;
  time: string;
  totalPeople: number;
  generation1: number;
  generation2: number;
  generation3: number;
  invitationCode: string;
}

const AgentManagement: React.FC = () => {
  const [agents, setAgents] = useState<Agent[]>([
    {
      id: 554,
      email: "test@gmail.com",
      ip: "0.0.0.0",
      time: "2024-06-08 21:41:26",
      totalPeople: 0,
      generation1: 0,
      generation2: 0,
      generation3: 0,
      invitationCode: "11223344",
    },
  ]);

  const cancelAgent = (id: number) => {
    if (confirm("Are you sure you want to cancel this agent?")) {
      setAgents((prev) => prev.filter((agent) => agent.id !== id));
    }
  };

  return (
    <DashboardLayout>
      <div className="">
        <h1 className="text-xl font-semibold mb-4">Agent Management</h1>

        <div className="overflow-x-auto border rounded-lg bg-white shadow-sm">
          <table className="min-w-[1400px] text-sm text-left">
            <thead className="bg-gray-100 text-gray-700 uppercase">
              <tr>
                <th className="p-3 border-b">
                  <input type="checkbox" />
                </th>
                <th className="p-3 border-b">ID</th>
                <th className="p-3 border-b">Proxy Account</th>
                <th className="p-3 border-b">Registration IP/Time</th>
                <th className="p-3 border-b">Total People (3 Generations)</th>
                <th className="p-3 border-b">Generation 1</th>
                <th className="p-3 border-b">Generation 2</th>
                <th className="p-3 border-b">Generation 3</th>
                <th className="p-3 border-b">Invitation Code</th>
                <th className="p-3 border-b">Operate</th>
              </tr>
            </thead>
            <tbody>
              {agents.map((agent) => (
                <tr key={agent.id} className="border-b hover:bg-gray-50">
                  <td className="p-3">
                    <input type="checkbox" />
                  </td>
                  <td className="p-3">{agent.id}</td>
                  <td className="p-3 text-blue-600">{agent.email}</td>
                  <td className="p-3">
                    <div>IP: {agent.ip}</div>
                    <div>Time: {agent.time}</div>
                  </td>
                  <td className="p-3">{agent.totalPeople} people</td>
                  <td className="p-3">{agent.generation1} people</td>
                  <td className="p-3">{agent.generation2} people</td>
                  <td className="p-3">{agent.generation3} people</td>
                  <td className="p-3">{agent.invitationCode}</td>
                  <td className="p-3">
                    <button
                      onClick={() => cancelAgent(agent.id)}
                      className="bg-red-500 text-white text-xs px-3 py-1 rounded hover:bg-red-600"
                    >
                      Cancel the agent
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {agents.length === 0 && (
            <div className="p-4 text-center text-gray-500">
              No records found
            </div>
          )}
        </div>

        <div className="mt-4 text-sm text-gray-600">1 record, 1 page</div>
      </div>
    </DashboardLayout>
  );
};

export default AgentManagement;
