"use client";
import DashboardLayout from "@/app/page";
import { useState } from "react";

interface Log {
  id: number;
  username: string;
  type: string;
  content: string;
  ip: string;
  time: string;
  state: "Available" | "Disabled";
}

export default function LoginLogPage() {
  const [logs, setLogs] = useState<Log[]>([
    {
      id: 478,
      username: "ranashahbaz043@gmail.com",
      type: "Login",
      content: "Mailbox login",
      ip: "51.235.235.90",
      time: "2025-10-30 05:44:12",
      state: "Available",
    },
    {
      id: 477,
      username: "ranashahbaz043@gmail.com",
      type: "Login",
      content: "Mailbox login",
      ip: "51.235.235.90",
      time: "2025-10-30 05:44:10",
      state: "Available",
    },
  ]);

  const [selected, setSelected] = useState<number[]>([]);
  const [query, setQuery] = useState("");

  // --- Button Handlers ---
  const handleSelectAll = (checked: boolean) => {
    setSelected(checked ? logs.map((log) => log.id) : []);
  };

  const handleSelect = (id: number, checked: boolean) => {
    setSelected((prev) =>
      checked ? [...prev, id] : prev.filter((item) => item !== id)
    );
  };

  const handleNew = () => {
    const newId = logs.length ? Math.max(...logs.map((l) => l.id)) + 1 : 1;
    const newLog: Log = {
      id: newId,
      username: "newuser@example.com",
      type: "Login",
      content: "Mailbox login",
      ip: "127.0.0.1",
      time: new Date().toISOString().slice(0, 19).replace("T", " "),
      state: "Available",
    };
    setLogs((prev) => [newLog, ...prev]);
  };

  const handleEnable = () => {
    setLogs((prev) =>
      prev.map((log) =>
        selected.includes(log.id) ? { ...log, state: "Available" } : log
      )
    );
  };

  const handleDisable = () => {
    setLogs((prev) =>
      prev.map((log) =>
        selected.includes(log.id) ? { ...log, state: "Disabled" } : log
      )
    );
  };

  const handleDelete = () => {
    setLogs((prev) => prev.filter((log) => !selected.includes(log.id)));
    setSelected([]);
  };

  const filteredLogs = logs.filter((log) =>
    log.username.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <DashboardLayout>
      <div className="p-6 max-w-7xl mx-auto">
        <h2 className="text-lg font-semibold mb-4">Login Log</h2>

        {/* Buttons */}
        <div className="flex flex-wrap gap-2 mb-4">
          <button
            onClick={handleNew}
            className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded"
          >
            New
          </button>
          <button
            onClick={handleEnable}
            disabled={!selected.length}
            className={`px-3 py-1 rounded text-white ${
              selected.length
                ? "bg-sky-500 hover:bg-sky-600"
                : "bg-sky-300 cursor-not-allowed"
            }`}
          >
            Enable
          </button>
          <button
            onClick={handleDisable}
            disabled={!selected.length}
            className={`px-3 py-1 rounded text-white ${
              selected.length
                ? "bg-yellow-500 hover:bg-yellow-600"
                : "bg-yellow-300 cursor-not-allowed"
            }`}
          >
            Disable
          </button>
          <button
            onClick={handleDelete}
            disabled={!selected.length}
            className={`px-3 py-1 rounded text-white ${
              selected.length
                ? "bg-red-500 hover:bg-red-600"
                : "bg-red-300 cursor-not-allowed"
            }`}
          >
            Delete
          </button>

          <div className="ml-auto flex gap-2 items-center">
            <select className="border rounded px-2 py-1 text-sm">
              <option>All states</option>
              <option>Available</option>
              <option>Disabled</option>
            </select>
            <select className="border rounded px-2 py-1 text-sm">
              <option>username</option>
              <option>IP</option>
            </select>
            <input
              type="text"
              placeholder="Please enter your query"
              className="border rounded px-2 py-1 text-sm w-48"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto border rounded-lg">
          <table className="min-w-full text-sm text-left border-collapse">
            <thead className="bg-gray-100 text-gray-700">
              <tr>
                <th className="px-4 py-2 border">
                  <input
                    type="checkbox"
                    onChange={(e) => handleSelectAll(e.target.checked)}
                    checked={
                      selected.length > 0 && selected.length === logs.length
                    }
                  />
                </th>
                <th className="px-4 py-2 border">ID</th>
                <th className="px-4 py-2 border">Username</th>
                <th className="px-4 py-2 border">Type</th>
                <th className="px-4 py-2 border">Content</th>
                <th className="px-4 py-2 border">Operate IP</th>
                <th className="px-4 py-2 border">Operation time</th>
                <th className="px-4 py-2 border">State</th>
                <th className="px-4 py-2 border">Operate</th>
              </tr>
            </thead>
            <tbody>
              {filteredLogs.map((log) => (
                <tr
                  key={log.id}
                  className={`border-t ${
                    selected.includes(log.id) ? "bg-blue-50" : ""
                  }`}
                >
                  <td className="px-4 py-2 border">
                    <input
                      type="checkbox"
                      checked={selected.includes(log.id)}
                      onChange={(e) => handleSelect(log.id, e.target.checked)}
                    />
                  </td>
                  <td className="px-4 py-2 border">{log.id}</td>
                  <td className="px-4 py-2 border">{log.username}</td>
                  <td className="px-4 py-2 border">{log.type}</td>
                  <td className="px-4 py-2 border">{log.content}</td>
                  <td className="px-4 py-2 border">{log.ip}</td>
                  <td className="px-4 py-2 border">{log.time}</td>
                  <td
                    className={`px-4 py-2 border font-medium ${
                      log.state === "Available"
                        ? "text-green-600"
                        : "text-red-500"
                    }`}
                  >
                    {log.state}
                  </td>
                  <td className="px-4 py-2 border">
                    <button
                      onClick={() =>
                        alert(`Editing log entry for ${log.username}`)
                      }
                      className="bg-indigo-500 hover:bg-indigo-600 text-white px-3 py-1 rounded text-xs"
                    >
                      edit
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Footer */}
        <div className="text-sm text-gray-500 mt-2">
          {filteredLogs.length} record(s)
        </div>
      </div>
    </DashboardLayout>
  );
}
