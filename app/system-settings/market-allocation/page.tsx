"use client";

import DashboardLayout from "@/app/page";
import React, { useState, useEffect } from "react";

// MarketAllocationPage.tsx
// Next.js + Tailwind CSS + TypeScript single-file page/component
// Put this file in /app/(dashboard)/market-allocation/page.tsx or /pages/market-allocation.tsx

export type DisplayStatus = "Available" | "Disable";
export type TxStatus = "normal" | "prohibit";

export type Pair = {
  id: number;
  pair: string;
  sort: number;
  displayStatus: DisplayStatus;
  txStatus: TxStatus;
  selected?: boolean;
};

const INITIAL_DATA: Pair[] = [
  {
    id: 26,
    pair: "BNB/USDT",
    sort: 0,
    displayStatus: "Available",
    txStatus: "prohibit",
  },
  {
    id: 1,
    pair: "BTC/USDT",
    sort: 1,
    displayStatus: "Available",
    txStatus: "normal",
  },
  {
    id: 2,
    pair: "ETH/USDT",
    sort: 2,
    displayStatus: "Available",
    txStatus: "normal",
  },
  {
    id: 15,
    pair: "USDC/USDT",
    sort: 3,
    displayStatus: "Available",
    txStatus: "normal",
  },
  {
    id: 3,
    pair: "DOGE/USDT",
    sort: 4,
    displayStatus: "Available",
    txStatus: "normal",
  },
  {
    id: 4,
    pair: "BCH/USDT",
    sort: 4,
    displayStatus: "Available",
    txStatus: "normal",
  },
  {
    id: 5,
    pair: "SOL/USDT",
    sort: 5,
    displayStatus: "Available",
    txStatus: "normal",
  },
  {
    id: 6,
    pair: "PEPE/USDT",
    sort: 7,
    displayStatus: "Available",
    txStatus: "normal",
  },
  {
    id: 7,
    pair: "XRP/USDT",
    sort: 8,
    displayStatus: "Available",
    txStatus: "normal",
  },
  {
    id: 8,
    pair: "IOTA/USDT",
    sort: 9,
    displayStatus: "Available",
    txStatus: "normal",
  },
  {
    id: 9,
    pair: "FIL/USDT",
    sort: 10,
    displayStatus: "Available",
    txStatus: "normal",
  },
  {
    id: 10,
    pair: "SHIB/USDT",
    sort: 11,
    displayStatus: "Disable",
    txStatus: "normal",
  },
  {
    id: 11,
    pair: "FLOW/USDT",
    sort: 12,
    displayStatus: "Available",
    txStatus: "normal",
  },
];

function useLocalState<T>(key: string, fallback: T) {
  const [state, setState] = useState<T>(() => {
    try {
      const raw = localStorage.getItem(key);
      return raw ? (JSON.parse(raw) as T) : fallback;
    } catch (e) {
      return fallback;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(key, JSON.stringify(state));
    } catch (e) {
      // ignore
    }
  }, [key, state]);

  return [state, setState] as const;
}

export default function MarketAllocationPage() {
  const [data, setData] = useLocalState<Pair[]>(
    "market_pairs_v1",
    INITIAL_DATA
  );
  const [selectAll, setSelectAll] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [editing, setEditing] = useState<Pair | null>(null);

  // Selection logic
  useEffect(() => {
    setSelectAll(data.length > 0 && data.every((d) => d.selected));
  }, [data]);

  function toggleSelectAll() {
    const v = !selectAll;
    setSelectAll(v);
    setData((prev) => prev.map((p) => ({ ...p, selected: v })));
  }

  function toggleRowSelect(id: number) {
    setData((prev) =>
      prev.map((p) => (p.id === id ? { ...p, selected: !p.selected } : p))
    );
  }

  function performBulk(action: "enable" | "disable" | "delete") {
    if (action === "delete") {
      setData((prev) => prev.filter((p) => !p.selected));
      return;
    }
    setData((prev) =>
      prev.map((p) =>
        p.selected
          ? {
              ...p,
              displayStatus: action === "enable" ? "Available" : "Disable",
            }
          : p
      )
    );
  }

  function openNew() {
    setEditing(null);
    setShowModal(true);
  }

  function openEdit(p: Pair) {
    setEditing(p);
    setShowModal(true);
  }

  function upsertPair(
    payload: Omit<Pair, "id" | "selected"> & { id?: number }
  ) {
    if (payload.id) {
      // edit
      setData((prev) =>
        prev.map((p) => (p.id === payload.id ? { ...p, ...payload } : p))
      );
    } else {
      // create new id
      const newId = Math.max(0, ...data.map((d) => d.id)) + 1;
      setData((prev) => [{ id: newId, selected: false, ...payload }, ...prev]);
    }
    setShowModal(false);
  }

  function updateSort(id: number, newSort: number) {
    setData((prev) =>
      prev.map((p) => (p.id === id ? { ...p, sort: newSort } : p))
    );
  }

  return (
    <DashboardLayout>
      <div className=" bg-white p-3">
        <h2 className="text-lg font-semibold mb-4">
          Market allocation (trading pairs that access external data)
        </h2>

        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-4">
          <div className="flex flex-wrap gap-2">
            <button
              onClick={openNew}
              className="px-3 py-1.5 rounded bg-green-500 text-white text-sm shadow-sm hover:bg-green-600"
            >
              New
            </button>
            <button
              onClick={() => performBulk("enable")}
              className="px-3 py-1.5 rounded bg-blue-500 text-white text-sm shadow-sm hover:bg-blue-600"
            >
              Enable
            </button>
            <button
              onClick={() => performBulk("disable")}
              className="px-3 py-1.5 rounded bg-amber-500 text-white text-sm shadow-sm hover:bg-amber-600"
            >
              Disable
            </button>
            <button
              onClick={() => performBulk("delete")}
              className="px-3 py-1.5 rounded bg-red-500 text-white text-sm shadow-sm hover:bg-red-600"
            >
              Delete
            </button>
          </div>

          <div className="text-sm text-gray-600">
            Selected: {data.filter((d) => d.selected).length}
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto bg-white">
          <table className=" min-w-full text-sm border-collapse table-auto">
            <thead>
              <tr className="text-left  uppercase text-gray-800">
                <th className="p-2 border border-gray-300">
                  <input
                    type="checkbox"
                    checked={selectAll}
                    onChange={toggleSelectAll}
                  />
                </th>
                <th className="p-2 border border-gray-300">ID</th>
                <th className="p-2 border border-gray-300">
                  Market trading pairs
                </th>
                <th className="p-2 border border-gray-300">Sort</th>
                <th className="p-2 border border-gray-300">Display Status</th>
                <th className="p-2 border border-gray-300">
                  Transaction status
                </th>
                <th className="p-2 border border-gray-300">Operate</th>
              </tr>
            </thead>

            <tbody>
              {data
                .slice()
                .sort((a, b) => a.sort - b.sort)
                .map((row, index) => (
                  <tr
                    key={row.id}
                    className={`${
                      index % 2 === 0 ? "bg-gray-100" : "bg-white"
                    } hover:bg-orange-50 transition-colors`}
                  >
                    <td className="p-2 border border-gray-300 align-top">
                      <input
                        type="checkbox"
                        checked={!!row.selected}
                        onChange={() => toggleRowSelect(row.id)}
                      />
                    </td>

                    <td className="p-2 border border-gray-300 align-top text-sm">
                      {row.id}
                    </td>

                    <td className="p-2 border border-gray-300 align-top text-sm">
                      {row.pair}
                    </td>

                    <td className="p-2 border border-gray-300 align-top text-sm">
                      <input
                        className="w-16 p-1 border border-gray-300 rounded text-sm"
                        type="number"
                        value={row.sort}
                        onChange={(e) =>
                          updateSort(row.id, Number(e.target.value || 0))
                        }
                      />
                    </td>

                    <td className="p-2 border border-gray-300 align-top text-sm">
                      <span
                        className={`inline-block px-2 py-1 rounded text-xs ${
                          row.displayStatus === "Available"
                            ? "bg-green-100 text-green-700"
                            : "bg-red-100 text-red-700"
                        }`}
                      >
                        {row.displayStatus}
                      </span>
                    </td>

                    <td className="p-2 border border-gray-300 align-top text-sm">
                      <span
                        className={`inline-block px-2 py-1 rounded text-xs ${
                          row.txStatus === "normal"
                            ? "bg-green-100 text-green-700"
                            : "bg-red-100 text-red-700"
                        }`}
                      >
                        {row.txStatus}
                      </span>
                    </td>

                    <td className="p-2 border border-gray-300 align-top text-sm">
                      <div className="flex gap-2">
                        <button
                          className="px-2 py-1 text-xs bg-white border border-gray-300 rounded hover:bg-gray-100"
                          onClick={() => openEdit(row)}
                        >
                          edit
                        </button>
                        <button
                          className="px-2 py-1 text-xs bg-white border border-gray-300 rounded hover:bg-gray-100"
                          onClick={() =>
                            setData((prev) =>
                              prev.map((p) =>
                                p.id === row.id
                                  ? {
                                      ...p,
                                      displayStatus:
                                        p.displayStatus === "Available"
                                          ? "Disable"
                                          : "Available",
                                    }
                                  : p
                              )
                            )
                          }
                        >
                          {row.displayStatus === "Available"
                            ? "Disable"
                            : "Enable"}
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>

        {/* Mobile card view */}
        <div className="mt-4 space-y-3 sm:hidden">
          {data
            .slice()
            .sort((a, b) => a.sort - b.sort)
            .map((row) => (
              <div
                key={row.id}
                className="border rounded p-3 bg-white shadow-sm"
              >
                <div className="flex items-start justify-between">
                  <div>
                    <div className="flex items-center gap-3">
                      <input
                        type="checkbox"
                        checked={!!row.selected}
                        onChange={() => toggleRowSelect(row.id)}
                      />
                      <div className="text-sm font-medium">{row.pair}</div>
                    </div>
                    <div className="text-xs text-gray-500 mt-1">
                      ID: {row.id}
                    </div>
                  </div>
                  <div className="text-right space-y-1">
                    <div>
                      <span
                        className={`inline-block px-2 py-0.5 rounded-full text-xs ${
                          row.displayStatus === "Available"
                            ? "bg-green-100 text-green-700"
                            : "bg-red-100 text-red-700"
                        }`}
                      >
                        {row.displayStatus}
                      </span>
                    </div>
                    <div>
                      <button
                        className="text-xs px-2 py-1 border rounded"
                        onClick={() => openEdit(row)}
                      >
                        edit
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
        </div>

        {/* Modal area */}
        {showModal && (
          <Modal onClose={() => setShowModal(false)}>
            <PairForm
              initial={editing}
              onCancel={() => setShowModal(false)}
              onSave={upsertPair}
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
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/40" onClick={onClose}></div>
      <div className="relative bg-white rounded-lg shadow-lg w-full max-w-xl mx-4 p-4">
        {children}
      </div>
    </div>
  );
}

function PairForm({
  initial,
  onSave,
  onCancel,
}: {
  initial: Pair | null;
  onSave: (payload: Omit<Pair, "selected" | "id"> & { id?: number }) => void;
  onCancel: () => void;
}) {
  const [pair, setPair] = useState<string>(initial?.pair ?? "");
  const [sort, setSort] = useState<number>(initial?.sort ?? 0);
  const [displayStatus, setDisplayStatus] = useState<DisplayStatus>(
    initial?.displayStatus ?? "Available"
  );
  const [txStatus, setTxStatus] = useState<TxStatus>(
    initial?.txStatus ?? "normal"
  );

  function submit(e?: React.FormEvent) {
    e?.preventDefault();
    if (!pair.trim()) return alert("Please provide a trading pair name.");
    onSave({
      id: initial?.id,
      pair: pair.trim(),
      sort,
      displayStatus,
      txStatus,
    });
  }

  return (
    <form onSubmit={submit} className="space-y-3">
      <h3 className="text-lg font-semibold">
        {initial ? "Edit Pair" : "Add New Pair"}
      </h3>

      <div>
        <label className="block text-sm text-gray-700">
          Market trading pairs
        </label>
        <input
          value={pair}
          onChange={(e) => setPair(e.target.value)}
          className="mt-1 block w-full border rounded px-3 py-2"
          placeholder="e.g. BTC/USDT"
        />
      </div>

      <div>
        <label className="block text-sm text-gray-700">Sort (number)</label>
        <input
          value={sort}
          onChange={(e) => setSort(Number(e.target.value || 0))}
          type="number"
          className="mt-1 block w-36 border rounded px-3 py-2"
        />
      </div>

      <div className="flex gap-3">
        <div>
          <label className="block text-sm text-gray-700">Display status</label>
          <select
            value={displayStatus}
            onChange={(e) => setDisplayStatus(e.target.value as DisplayStatus)}
            className="mt-1 block border rounded px-3 py-2"
          >
            <option value="Available">Available</option>
            <option value="Disable">Disable</option>
          </select>
        </div>

        <div>
          <label className="block text-sm text-gray-700">
            Transaction status
          </label>
          <select
            value={txStatus}
            onChange={(e) => setTxStatus(e.target.value as TxStatus)}
            className="mt-1 block border rounded px-3 py-2"
          >
            <option value="normal">normal</option>
            <option value="prohibit">prohibit</option>
          </select>
        </div>
      </div>

      <div className="flex justify-end gap-2 pt-2">
        <button
          type="button"
          onClick={onCancel}
          className="px-3 py-1.5 border rounded"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="px-3 py-1.5 bg-blue-600 text-white rounded"
        >
          Save
        </button>
      </div>
    </form>
  );
}
