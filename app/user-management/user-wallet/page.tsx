"use client";
import DashboardLayout from "@/app/page";
import { useState } from "react";

interface Wallet {
  id: number;
  username: string;
  currency: string;
  walletName: string;
  walletAddress: string;
  operationTime: string;
}

export default function UserWalletPage() {
  const [wallets, setWallets] = useState<Wallet[]>([]);
  const [selected, setSelected] = useState<number[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [query, setQuery] = useState("");
  const [newWallet, setNewWallet] = useState({
    username: "",
    currency: "",
    walletName: "",
    walletAddress: "",
  });

  // Filter wallets by username or currency
  const filteredWallets = wallets.filter((wallet) =>
    wallet.username.toLowerCase().includes(query.toLowerCase())
  );

  // --- Handlers ---
  const handleSelectAll = (checked: boolean) => {
    setSelected(checked ? wallets.map((w) => w.id) : []);
  };

  const handleSelect = (id: number, checked: boolean) => {
    setSelected((prev) =>
      checked ? [...prev, id] : prev.filter((item) => item !== id)
    );
  };

  const handleDelete = () => {
    setWallets((prev) => prev.filter((w) => !selected.includes(w.id)));
    setSelected([]);
  };

  const handleAddWallet = () => {
    if (
      !newWallet.username ||
      !newWallet.currency ||
      !newWallet.walletName ||
      !newWallet.walletAddress
    ) {
      alert("Please fill in all fields!");
      return;
    }

    const newId = wallets.length
      ? Math.max(...wallets.map((w) => w.id)) + 1
      : 1;
    const newEntry: Wallet = {
      id: newId,
      username: newWallet.username,
      currency: newWallet.currency,
      walletName: newWallet.walletName,
      walletAddress: newWallet.walletAddress,
      operationTime: new Date().toISOString().slice(0, 19).replace("T", " "),
    };

    setWallets((prev) => [newEntry, ...prev]);
    setShowModal(false);
    setNewWallet({
      username: "",
      currency: "",
      walletName: "",
      walletAddress: "",
    });
  };

  return (
    <DashboardLayout>
      <div className="max-w-7xl mx-auto">
        <h2 className="text-lg font-semibold mb-4">User wallet</h2>

        {/* Buttons */}
        <div className="flex flex-wrap gap-2 mb-4">
          <button
            onClick={() => setShowModal(true)}
            className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded"
          >
            New
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
              <option>Currency</option>
              <option>USD</option>
              <option>BTC</option>
              <option>ETH</option>
            </select>
            <select className="border rounded px-2 py-1 text-sm">
              <option>username</option>
              <option>wallet name</option>
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
        <div className="overflow-x-auto bg-white">
          <table className="min-w-full text-sm text-left border-collapse table-auto">
            <thead className="text-gray-800 uppercase">
              <tr>
                <th className="p-2 border border-gray-300">
                  <input
                    type="checkbox"
                    onChange={(e) => handleSelectAll(e.target.checked)}
                    checked={
                      selected.length > 0 && selected.length === wallets.length
                    }
                  />
                </th>
                <th className="p-2 border border-gray-300">ID</th>
                <th className="p-2 border border-gray-300">Username</th>
                <th className="p-2 border border-gray-300">Currency</th>
                <th className="p-2 border border-gray-300">Wallet Name</th>
                <th className="p-2 border border-gray-300">Wallet Address</th>
                <th className="p-2 border border-gray-300">Operation Time</th>
                <th className="p-2 border border-gray-300">Operate</th>
              </tr>
            </thead>

            <tbody>
              {filteredWallets.length > 0 ? (
                filteredWallets.map((wallet, index) => (
                  <tr
                    key={wallet.id}
                    className={`${
                      index % 2 === 0 ? "bg-gray-100" : "bg-white"
                    } hover:bg-orange-50 transition-colors`}
                  >
                    <td className="p-2 border border-gray-300 align-top">
                      <input
                        type="checkbox"
                        checked={selected.includes(wallet.id)}
                        onChange={(e) =>
                          handleSelect(wallet.id, e.target.checked)
                        }
                      />
                    </td>

                    <td className="p-2 border border-gray-300 align-top text-sm">
                      {wallet.id}
                    </td>

                    <td className="p-2 border border-gray-300 align-top text-sm">
                      {wallet.username}
                    </td>

                    <td className="p-2 border border-gray-300 align-top text-sm">
                      {wallet.currency}
                    </td>

                    <td className="p-2 border border-gray-300 align-top text-sm">
                      {wallet.walletName}
                    </td>

                    <td className="p-2 border border-gray-300 align-top text-sm">
                      {wallet.walletAddress}
                    </td>

                    <td className="p-2 border border-gray-300 align-top text-sm">
                      {wallet.operationTime}
                    </td>

                    <td className="p-2 border border-gray-300 align-top text-sm">
                      <button
                        onClick={() =>
                          alert(`Editing wallet for ${wallet.username}`)
                        }
                        className="px-2 py-1 text-xs bg-white border border-gray-300 rounded hover:bg-gray-100 text-orange-600"
                      >
                        Edit
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan={8}
                    className="text-center text-gray-500 py-6 border border-gray-300 bg-white"
                  >
                    No data available.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Modal */}
        {showModal && (
          <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-lg shadow-lg w-96">
              <h3 className="text-lg font-semibold mb-4 text-center">
                Add New Wallet
              </h3>
              <div className="space-y-3">
                <input
                  type="text"
                  placeholder="Username"
                  className="w-full border rounded px-3 py-2"
                  value={newWallet.username}
                  onChange={(e) =>
                    setNewWallet({ ...newWallet, username: e.target.value })
                  }
                />
                <input
                  type="text"
                  placeholder="Currency"
                  className="w-full border rounded px-3 py-2"
                  value={newWallet.currency}
                  onChange={(e) =>
                    setNewWallet({ ...newWallet, currency: e.target.value })
                  }
                />
                <input
                  type="text"
                  placeholder="Wallet Name"
                  className="w-full border rounded px-3 py-2"
                  value={newWallet.walletName}
                  onChange={(e) =>
                    setNewWallet({ ...newWallet, walletName: e.target.value })
                  }
                />
                <input
                  type="text"
                  placeholder="Wallet Address"
                  className="w-full border rounded px-3 py-2"
                  value={newWallet.walletAddress}
                  onChange={(e) =>
                    setNewWallet({
                      ...newWallet,
                      walletAddress: e.target.value,
                    })
                  }
                />
              </div>

              {/* Buttons */}
              <div className="flex justify-end gap-3 mt-5">
                <button
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 bg-gray-300 hover:bg-gray-400 rounded"
                >
                  Cancel
                </button>
                <button
                  onClick={handleAddWallet}
                  className="px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded"
                >
                  Add
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
