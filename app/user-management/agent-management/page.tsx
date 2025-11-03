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
      <div className=" min-h-screen bg-white p-2 md:p-4">
        <h1 className="text-xl font-semibold mb-4 border-b border-gray-300">
          Agent Management
        </h1>

        <div className="overflow-x-auto bg-white">
          <table className="min-w-[1400px] text-sm border-collapse table-auto">
            <thead>
              <tr className="text-left uppercase text-gray-800">
                <th className="p-2 border border-gray-300">
                  <input type="checkbox" />
                </th>
                <th className="p-2 border border-gray-300">ID</th>
                <th className="p-2 border border-gray-300">Proxy Account</th>
                <th className="p-2 border border-gray-300">
                  Registration IP/Time
                </th>
                <th className="p-2 border border-gray-300">
                  Total People (3 Generations)
                </th>
                <th className="p-2 border border-gray-300">Generation 1</th>
                <th className="p-2 border border-gray-300">Generation 2</th>
                <th className="p-2 border border-gray-300">Generation 3</th>
                <th className="p-2 border border-gray-300">Invitation Code</th>
                <th className="p-2 border border-gray-300">Operate</th>
              </tr>
            </thead>

            <tbody>
              {agents.map((agent, index) => (
                <tr
                  key={agent.id}
                  className={`${
                    index % 2 === 0 ? "bg-gray-100" : "bg-white"
                  } hover:bg-orange-50 transition-colors`}
                >
                  <td className="p-2 border border-gray-300 align-top">
                    <input type="checkbox" />
                  </td>

                  <td className="p-2 border border-gray-300 align-top text-sm">
                    {agent.id}
                  </td>

                  <td className="p-2 border border-gray-300 align-top text-sm text-blue-600 underline">
                    {agent.email}
                  </td>

                  <td className="p-2 border border-gray-300 align-top text-xs">
                    <div>IP: {agent.ip}</div>
                    <div>Time: {agent.time}</div>
                  </td>

                  <td className="p-2 border border-gray-300 align-top text-sm">
                    {agent.totalPeople} people
                  </td>

                  <td className="p-2 border border-gray-300 align-top text-sm">
                    {agent.generation1} people
                  </td>

                  <td className="p-2 border border-gray-300 align-top text-sm">
                    {agent.generation2} people
                  </td>

                  <td className="p-2 border border-gray-300 align-top text-sm">
                    {agent.generation3} people
                  </td>

                  <td className="p-2 border border-gray-300 align-top text-sm">
                    {agent.invitationCode}
                  </td>

                  <td className="p-2 border border-gray-300 align-top text-sm">
                    <button
                      onClick={() => cancelAgent(agent.id)}
                      className="px-2 py-1 cursor-pointer text-xs bg-white border border-gray-300 rounded hover:bg-gray-100 text-red-600"
                    >
                      Cancel the agent
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {agents.length === 0 && (
            <div className="p-4 text-center text-gray-500 border border-t-0 border-gray-300">
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
