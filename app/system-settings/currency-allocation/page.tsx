"use client";

import DashboardLayout from "@/app/page";
import React, { useEffect, useState } from "react";

type Currency = {
  id: number;
  code: string;
  name: string;
  type: string;
  agentInformation: string;
  contractAddress: string;
  state: "Available" | "Unavailable";
  deposit: string;
  withdrawal: string;
  feeTypes: string;
  cryptoTransFee: string;
  contractFees: string;
  defaultChannel: boolean;
};

const sampleData: Currency[] = [
  {
    id: 25,
    code: "USDT",
    name: "USDT",
    type: "Wallet Coins",
    agentInformation: "System default channel",
    contractAddress: "TZswg86h...UsAEjU1",
    state: "Available",
    deposit: "normal",
    withdrawal: "normal",
    feeTypes: "Proportionally: 0.00%",
    cryptoTransFee: "0.00%",
    contractFees: "0.00%",
    defaultChannel: true,
  },
  {
    id: 26,
    code: "ETH",
    name: "ETH",
    type: "Wallet Coins",
    agentInformation: "0",
    contractAddress: "0xA9681d...021359",
    state: "Available",
    deposit: "normal",
    withdrawal: "normal",
    feeTypes: "Proportionally: 0.00%",
    cryptoTransFee: "0.00%",
    contractFees: "0.00%",
    defaultChannel: false,
  },
  {
    id: 27,
    code: "BTC",
    name: "BTC",
    type: "Wallet Coins",
    agentInformation: "0",
    contractAddress: "3Pnfroe...QpHuMs",
    state: "Available",
    deposit: "normal",
    withdrawal: "normal",
    feeTypes: "Proportionally: 0.00%",
    cryptoTransFee: "0.00%",
    contractFees: "0.00%",
    defaultChannel: false,
  },
];

export default function CurrencyManagementPage() {
  const [data, setData] = useState<Currency[]>(() => {
    try {
      const raw = localStorage.getItem("currency_management_v1");
      if (raw) return JSON.parse(raw) as Currency[];
    } catch {}
    return sampleData;
  });

  const [selectedIds, setSelectedIds] = useState<number[]>([]);
  const [editing, setEditing] = useState<Currency | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [filter, setFilter] = useState("");
  const [message, setMessage] = useState<string | null>(null);

  useEffect(() => {
    try {
      localStorage.setItem("currency_management_v1", JSON.stringify(data));
    } catch {}
  }, [data]);

  const toggleSelect = (id: number) => {
    setSelectedIds((s) =>
      s.includes(id) ? s.filter((x) => x !== id) : [...s, id]
    );
  };

  const selectAll = (checked: boolean) => {
    setSelectedIds(checked ? data.map((d) => d.id) : []);
  };

  const openEdit = (row: Currency) => {
    setEditing(row);
    setShowModal(true);
  };

  const saveEdit = (updated: Currency) => {
    setData((d) => d.map((r) => (r.id === updated.id ? updated : r)));
    setShowModal(false);
    setEditing(null);
    setMessage("Saved.");
    setTimeout(() => setMessage(null), 2500);
  };

  const bulkEnable = () => {
    if (selectedIds.length === 0) return setMessage("Select at least one row.");
    setData((d) =>
      d.map((r) =>
        selectedIds.includes(r.id) ? { ...r, state: "Available" } : r
      )
    );
    setMessage("Enabled selected.");
    setTimeout(() => setMessage(null), 2000);
  };

  const bulkDisable = () => {
    if (selectedIds.length === 0) return setMessage("Select at least one row.");
    setData((d) =>
      d.map((r) =>
        selectedIds.includes(r.id) ? { ...r, state: "Unavailable" } : r
      )
    );
    setMessage("Disabled selected.");
    setTimeout(() => setMessage(null), 2000);
  };

  const bulkDelete = () => {
    if (selectedIds.length === 0) return setMessage("Select at least one row.");
    if (!confirm("Delete selected currencies?")) return;
    setData((d) => d.filter((r) => !selectedIds.includes(r.id)));
    setSelectedIds([]);
    setMessage("Deleted selected.");
    setTimeout(() => setMessage(null), 2000);
  };

  const toggleDefaultChannel = (id: number) => {
    setData((d) =>
      d.map((r) => ({
        ...r,
        defaultChannel: r.id === id ? true : r.defaultChannel,
      }))
    ); // keep existing true
    // if want exclusive default, first set others false
    setData((d) =>
      d.map((r) =>
        r.id === id
          ? { ...r, defaultChannel: !r.defaultChannel }
          : { ...r, defaultChannel: false }
      )
    );
  };

  const simulateCheckBalance = (id: number) => {
    setMessage(`Checked balance for ID ${id}.`);
    setTimeout(() => setMessage(null), 2000);
  };

  const filtered = data.filter((r) =>
    filter ? r.code.includes(filter) || r.name.includes(filter) : true
  );

  return (
    <DashboardLayout>
      <div className="bg-white p-2 md:p-4">
        <div className=" bg-white">
          <div className=" mb-4 border-b border-gray-300 flex items-center justify-between gap-4">
            <h2 className="text-lg font-semibold">Currency Management</h2>
          </div>
          <div className="flex flex-wrap xl:flex-nowrap items-center gap-2">
            <button className="px-3 py-1 bg-green-500 text-white rounded text-sm">
              New
            </button>
            <button
              className="px-3 py-1 bg-blue-500 text-white rounded text-sm"
              onClick={() => alert("Supplement TRX miner fees (stub)")}
            >
              Supplement TRX miner fees
            </button>
            <button
              className="px-3 py-1 bg-sky-600 text-white rounded text-sm"
              onClick={() => alert("Check balance (stub)")}
            >
              Check balance
            </button>
            <button className="px-3 py-1 bg-indigo-600 text-white rounded text-sm">
              One-click USDT aggregation
            </button>
            <button
              className="px-3 py-1 bg-gray-200 text-gray-800 rounded text-sm"
              onClick={bulkEnable}
            >
              Enable
            </button>
            <button
              className="px-3 py-1 bg-yellow-300 text-gray-800 rounded text-sm"
              onClick={bulkDisable}
            >
              Disable
            </button>
            <button
              className="px-3 py-1 bg-red-500 text-white rounded text-sm"
              onClick={bulkDelete}
            >
              delete
            </button>
          </div>

          <div className="my-4">
            <div className="flex items-center gap-2 mb-3">
              <input
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
                placeholder="filter by code or name"
                className="border border-gray-300 rounded px-3 py-2 text-sm"
              />
              <div className="text-sm text-gray-500">
                {filtered.length} records
              </div>
              {message && (
                <div className="ml-auto text-sm text-green-600">{message}</div>
              )}
            </div>
            <div className="overflow-x-auto">
              <table className="min-w-[1600px] text-sm border-collapse table-auto">
                <thead>
                  <tr className="text-left ">
                    <th className="p-2 border border-gray-300">
                      <input
                        type="checkbox"
                        onChange={(e) => selectAll(e.target.checked)}
                        checked={selectedIds.length === data.length}
                      />
                    </th>
                    <th className="p-2 border border-gray-300">ID</th>
                    <th className="p-2 border border-gray-300">code</th>
                    <th className="p-2 border border-gray-300">name</th>
                    <th className="p-2 border border-gray-300">type</th>
                    <th className="p-2 border border-gray-300">
                      Agent Information
                    </th>
                    <th className="p-2 border border-gray-300">
                      Contract Address
                    </th>
                    <th className="p-2 border border-gray-300">state</th>
                    <th className="p-2 border border-gray-300">Deposit</th>
                    <th className="p-2 border border-gray-300">Withdrawal</th>
                    <th className="p-2 border border-gray-300">Fee types</th>
                    <th className="p-2 border border-gray-300">
                      Cryptocurrency transaction fees
                    </th>
                    <th className="p-2 border border-gray-300">
                      Contract fees
                    </th>
                    <th className="p-2 border border-gray-300">
                      Default channel
                    </th>
                    <th className="p-2 border border-gray-300">operate</th>
                  </tr>
                </thead>

                <tbody>
                  {filtered.map((row, index) => (
                    <tr
                      key={row.id}
                      className={`${
                        index % 2 === 0 ? "bg-gray-100" : "bg-white"
                      } hover:bg-orange-50 transition-colors`}
                    >
                      <td className="p-2 border border-gray-300">
                        <input
                          type="checkbox"
                          checked={selectedIds.includes(row.id)}
                          onChange={() => toggleSelect(row.id)}
                        />
                      </td>
                      <td className="p-2 border border-gray-300">{row.id}</td>
                      <td className="p-2 border border-gray-300">{row.code}</td>
                      <td className="p-2 border border-gray-300">{row.name}</td>
                      <td className="p-2 border border-gray-300">{row.type}</td>
                      <td className="p-2 border border-gray-300 text-red-600">
                        {row.agentInformation}
                      </td>
                      <td className="p-2 border border-gray-300 max-w-xs truncate">
                        {row.contractAddress}
                      </td>
                      <td className="p-2 border border-gray-300">
                        <span
                          className={`px-2 py-1 rounded text-xs ${
                            row.state === "Available"
                              ? "bg-green-100 text-green-700"
                              : "bg-gray-100 text-gray-700"
                          }`}
                        >
                          {row.state}
                        </span>
                      </td>
                      <td className="p-2 border border-gray-300">
                        {row.deposit}
                      </td>
                      <td className="p-2 border border-gray-300">
                        {row.withdrawal}
                      </td>
                      <td className="p-2 border border-gray-300">
                        {row.feeTypes}
                      </td>
                      <td className="p-2 border border-gray-300">
                        {row.cryptoTransFee}
                      </td>
                      <td className="p-2 border border-gray-300">
                        {row.contractFees}
                      </td>
                      <td className="p-2 border border-gray-300">
                        {row.defaultChannel ? (
                          <span className="text-green-600">yes</span>
                        ) : (
                          <span className="text-gray-500">no</span>
                        )}
                      </td>
                      <td className="p-2 border border-gray-300 flex gap-2">
                        <button
                          className="px-2 py-1 text-xs bg-white border border-gray-300 rounded"
                          onClick={() => openEdit(row)}
                        >
                          edit
                        </button>
                        <button
                          className="px-2 py-1 text-xs bg-white border border-gray-300 rounded"
                          onClick={() => simulateCheckBalance(row.id)}
                        >
                          Check balance
                        </button>
                        <button
                          className="px-2 py-1 text-xs bg-white border border-gray-300 rounded"
                          onClick={() => toggleDefaultChannel(row.id)}
                        >
                          set default
                        </button>
                        <button
                          className="px-2 py-1 text-xs bg-red-50 border border-gray-300 text-red-600 rounded"
                          onClick={() => {
                            if (!confirm(`Delete currency ${row.code}?`))
                              return;
                            setData((d) => d.filter((r) => r.id !== row.id));
                          }}
                        >
                          del
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {showModal && editing && (
          <Modal onClose={() => setShowModal(false)}>
            <EditForm
              initial={editing}
              onCancel={() => setShowModal(false)}
              onSave={saveEdit}
            />
          </Modal>
        )}
      </div>
    </DashboardLayout>
  );
}

function Modal({
  children,
  onClose,
}: {
  children: React.ReactNode;
  onClose: () => void;
}) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
      <div className="bg-white rounded shadow-lg w-11/12 md:w-1/2 p-4 relative">
        <button
          className="absolute right-3 top-3 text-gray-500"
          onClick={onClose}
        >
          ✕
        </button>
        {children}
      </div>
    </div>
  );
}

function EditForm({
  initial,
  onCancel,
  onSave,
}: {
  initial: Currency;
  onCancel: () => void;
  onSave: (c: Currency) => void;
}) {
  const [state, setState] = useState<Currency>(initial);
  return (
    <div>
      <h3 className="text-lg font-semibold mb-3">
        Edit currency {initial.code}
      </h3>
      <div className="space-y-3">
        <div>
          <label className="text-sm font-medium">Name</label>
          <input
            className="w-full border border-gray-300 rounded px-2 py-1"
            value={state.name}
            onChange={(e) => setState({ ...state, name: e.target.value })}
          />
        </div>

        <div>
          <label className="text-sm font-medium">Contract Address</label>
          <input
            className="w-full border border-gray-300 rounded px-2 py-1"
            value={state.contractAddress}
            onChange={(e) =>
              setState({ ...state, contractAddress: e.target.value })
            }
          />
        </div>

        <div className="grid grid-cols-2 gap-2">
          <div>
            <label className="text-sm font-medium">State</label>
            <select
              className="w-full border border-gray-300 rounded px-2 py-1"
              value={state.state}
              onChange={(e) =>
                setState({ ...state, state: e.target.value as any })
              }
            >
              <option value="Available">Available</option>
              <option value="Unavailable">Unavailable</option>
            </select>
          </div>

          <div>
            <label className="text-sm font-medium">Deposit</label>
            <input
              className="w-full border border-gray-300 rounded px-2 py-1"
              value={state.deposit}
              onChange={(e) => setState({ ...state, deposit: e.target.value })}
            />
          </div>
        </div>

        <div className="flex gap-2 justify-end pt-2">
          <button
            className="px-3 py-1 rounded border border-gray-300"
            onClick={onCancel}
            type="button"
          >
            Cancel
          </button>
          <button
            className="px-3 py-1 rounded bg-blue-600 text-white"
            onClick={() => onSave(state)}
            type="button"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
}
