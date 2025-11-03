"use client";
import DashboardLayout from "@/app/page";
import React, { useEffect, useMemo, useState } from "react";

// UserManagementPage.tsx
// Drop into a Next.js app (e.g. /app/user-management/page.tsx or /pages/user-management.tsx)
// Uses Tailwind CSS and TypeScript. Data persisted to localStorage for development.

type UserStatus = "Normal" | "Frozen";
type WithdrawalState = "Allowed" | "Prohibited";

type User = {
  id: number;
  email: string;
  usdtBalance: number;
  loginCount: number;
  registration: { ip: string; time: string };
  address: string;
  recommender?: string[]; // list of emails (1st,2nd,3rd generation)
  certification?: string; // e.g. 'Not submitted' | 'Authentication successful'
  status: UserStatus;
  withdrawal: WithdrawalState;
  userType: string; // e.g. Normal, VIP, Admin
  selected?: boolean;
};

const SAMPLE: User[] = [
  {
    id: 822,
    email: "rameez4738942@gmail.com",
    usdtBalance: 0,
    loginCount: 0,
    registration: { ip: "223.123.19.81", time: "2025-10-20 01:45:04" },
    address: "China Mobile - 0xA9681d1EE33584FE983cCdBD8D5054CEc021359",
    recommender: [],
    certification: "Not submitted",
    status: "Normal",
    withdrawal: "Allowed",
    userType: "Normal",
  },
  {
    id: 821,
    email: "rzubair5@gmail.com",
    usdtBalance: 9.8,
    loginCount: 11,
    registration: { ip: "45.89.53.115", time: "2025-10-20 01:14:44" },
    address: "IANA reserved address - 0xA968...",
    recommender: [
      "ranashahbazs043@gmail.com",
      "uhjeni@gmail.com",
      "moonjhahan334@gmail.com",
    ],
    certification: "Authentication successful",
    status: "Normal",
    withdrawal: "Allowed",
    userType: "Normal",
  },
  {
    id: 820,
    email: "usmanbutt78910@gmail.com",
    usdtBalance: 3.4,
    loginCount: 14,
    registration: { ip: "128.234.98.131", time: "2025-10-20 01:10:17" },
    address: "Romania - 0xA968...",
    recommender: [],
    certification: "Authentication successful",
    status: "Normal",
    withdrawal: "Allowed",
    userType: "Normal",
  },
  {
    id: 819,
    email: "yali34255@gmail.com",
    usdtBalance: 0,
    loginCount: 0,
    registration: { ip: "37.224.254.79", time: "2025-10-20 00:56:03" },
    address: "Romania - 0xA968...",
    recommender: [],
    certification: "Not submitted",
    status: "Normal",
    withdrawal: "Prohibited",
    userType: "Normal",
  },
  {
    id: 818,
    email: "ranashahbazs043@gmail.com",
    usdtBalance: 14,
    loginCount: 32,
    registration: { ip: "51.83.13.46", time: "2025-10-19 23:22:48" },
    address: "UK Social Security Department - 0xA968...",
    recommender: ["uhjeni@gmail.com"],
    certification: "Authentication successful",
    status: "Normal",
    withdrawal: "Allowed",
    userType: "Normal",
  },
  {
    id: 817,
    email: "uhjeni@gmail.com",
    usdtBalance: 26448,
    loginCount: 4,
    registration: { ip: "182.252.87.24", time: "2025-10-21 21:37:23" },
    address: "Bangladesh - 0xA968...",
    recommender: ["moonjhahan334@gmail.com"],
    certification: "Authentication successful",
    status: "Normal",
    withdrawal: "Allowed",
    userType: "Admin",
  },
];

function useLocalState<T>(key: string, fallback: T) {
  const [state, setState] = useState<T>(() => {
    try {
      const raw =
        typeof window !== "undefined" ? localStorage.getItem(key) : null;
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

export default function UserManagementPage() {
  const [users, setUsers] = useLocalState<User[]>("users_v1", SAMPLE);
  const [selectAll, setSelectAll] = useState(false);

  // Filters
  const [stateFilter, setStateFilter] = useState<string>("All states");
  const [userTypeFilter, setUserTypeFilter] = useState<string>("All users");
  const [emailFilter, setEmailFilter] = useState<string>("All emails");
  const [search, setSearch] = useState<string>("");

  // Derived list of email options for filter
  const emailOptions = useMemo(() => {
    const setEmails = new Set(users.map((u) => u.email));
    return ["All emails", ...Array.from(setEmails)];
  }, [users]);

  useEffect(() => {
    setSelectAll(users.length > 0 && users.every((u) => u.selected));
  }, [users]);

  function toggleSelectAll() {
    const v = !selectAll;
    setSelectAll(v);
    setUsers((prev) => prev.map((u) => ({ ...u, selected: v })));
  }

  function toggleSelect(id: number) {
    setUsers((prev) =>
      prev.map((u) => (u.id === id ? { ...u, selected: !u.selected } : u))
    );
  }

  function performBulk(action: string) {
    const selected = users.filter((u) => u.selected);
    if (selected.length === 0) return alert("Please select at least one user.");

    if (action === "freeze") {
      setUsers((prev) =>
        prev.map((u) => (u.selected ? { ...u, status: "Frozen" } : u))
      );
      return;
    }
    if (action === "thaw") {
      setUsers((prev) =>
        prev.map((u) => (u.selected ? { ...u, status: "Normal" } : u))
      );
      return;
    }
    if (action === "allow_withdrawals") {
      setUsers((prev) =>
        prev.map((u) => (u.selected ? { ...u, withdrawal: "Allowed" } : u))
      );
      return;
    }
    if (action === "prohibit_withdrawals") {
      setUsers((prev) =>
        prev.map((u) => (u.selected ? { ...u, withdrawal: "Prohibited" } : u))
      );
      return;
    }
    if (action === "delete") {
      if (!confirm("Delete selected users? This cannot be undone.")) return;
      setUsers((prev) => prev.filter((u) => !u.selected));
      return;
    }
    if (action === "mass_notification") {
      const emails = selected.map((s) => s.email).join(", ");
      // simulate sending notification
      alert(`Mass notification sent to: ${emails}`);
      return;
    }
  }

  function updateUser(updated: User) {
    setUsers((prev) =>
      prev.map((u) => (u.id === updated.id ? { ...updated } : u))
    );
  }

  function addUser(payload: Omit<User, "id" | "selected">) {
    const newId = Math.max(0, ...users.map((u) => u.id)) + 1;
    setUsers((prev) => [{ id: newId, selected: false, ...payload }, ...prev]);
  }

  const filtered = useMemo(() => {
    return users
      .filter((u) => {
        if (stateFilter !== "All states" && u.status !== stateFilter)
          return false;
        if (userTypeFilter !== "All users" && u.userType !== userTypeFilter)
          return false;
        if (emailFilter !== "All emails" && u.email !== emailFilter)
          return false;
        if (search.trim()) {
          const s = search.toLowerCase();
          if (!`${u.email} ${u.address} ${u.id}`.toLowerCase().includes(s))
            return false;
        }
        return true;
      })
      .sort((a, b) => b.usdtBalance - a.usdtBalance);
  }, [users, stateFilter, userTypeFilter, emailFilter, search]);

  const userTypes = useMemo(() => {
    const setTypes = new Set(users.map((u) => u.userType));
    return ["All users", ...Array.from(setTypes)];
  }, [users]);

  const stateOptions = ["All states", "Normal", "Frozen"];

  // modal
  const [showModal, setShowModal] = useState(false);
  const [editing, setEditing] = useState<User | null>(null);

  function openNew() {
    setEditing(null);
    setShowModal(true);
  }
  function openEdit(u: User) {
    setEditing(u);
    setShowModal(true);
  }

  return (
    <DashboardLayout>
      <div className="bg-white p-2 md:p-4">
        <h2 className="text-lg font-semibold mb-4 border-b border-gray-300">
          User Management
        </h2>

        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between mb-4">
          <div className="flex flex-wrap gap-2">
            <button
              onClick={openNew}
              className="px-3 py-1.5 cursor-pointer rounded bg-green-500 text-white text-sm"
            >
              New
            </button>
            <button
              onClick={() => performBulk("freeze")}
              className="px-3 py-1.5 cursor-pointer rounded bg-sky-500 text-white text-sm"
            >
              freeze
            </button>
            <button
              onClick={() => performBulk("thaw")}
              className="px-3 py-1.5 cursor-pointer rounded bg-rose-500 text-white text-sm"
            >
              thaw
            </button>
            <button
              onClick={() => performBulk("allow_withdrawals")}
              className="px-3 py-1.5 cursor-pointer rounded bg-blue-500 text-white text-sm"
            >
              Allow withdrawals
            </button>
            <button
              onClick={() => performBulk("prohibit_withdrawals")}
              className="px-3 py-1.5 cursor-pointer rounded bg-red-500 text-white text-sm"
            >
              Withdrawals are prohibited
            </button>
            <button
              onClick={() => performBulk("delete")}
              className="px-3 py-1.5 cursor-pointer rounded bg-red-700 text-white text-sm"
            >
              delete
            </button>
            <button
              onClick={() => performBulk("mass_notification")}
              className="px-3 py-1.5 cursor-pointer rounded bg-lime-500 text-white text-sm"
            >
              Mass notification
            </button>
          </div>
        </div>
        <div className="flex items-center gap-2 flex-wrap my-4">
          <select
            value={stateFilter}
            onChange={(e) => setStateFilter(e.target.value)}
            className="border border-gray-300 rounded px-2 py-1 text-sm"
          >
            {stateOptions.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>

          <select
            value={userTypeFilter}
            onChange={(e) => setUserTypeFilter(e.target.value)}
            className="border border-gray-300 rounded px-2 py-1 text-sm"
          >
            {userTypes.map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </select>

          <select
            value={emailFilter}
            onChange={(e) => setEmailFilter(e.target.value)}
            className="border border-gray-300 rounded px-2 py-1 text-sm max-w-xs"
          >
            {emailOptions.map((eopt) => (
              <option key={eopt} value={eopt}>
                {eopt}
              </option>
            ))}
          </select>

          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Please enter your email or id"
            className="border border-gray-300 rounded px-2 py-1 text-sm w-56"
          />
        </div>

        {/* Desktop table with remembered styling */}
        <div className=" bg-white overflow-x-auto">
          <table className="min-w-full text-sm border-collapse table-auto">
            <thead>
              <tr className="text-left uppercase text-gray-800">
                <th className="p-2 border border-gray-300">
                  <input
                    type="checkbox"
                    checked={selectAll}
                    onChange={toggleSelectAll}
                  />
                </th>
                <th className="p-2 border border-gray-300">ID</th>
                <th className="p-2 border border-gray-300">Member account</th>
                <th className="p-2 border border-gray-300">USDT balance</th>
                <th className="p-2 border border-gray-300">Login</th>
                <th className="p-2 border border-gray-300">
                  Registration IP/Time
                </th>
                <th className="p-2 border border-gray-300">Address</th>
                <th className="p-2 border border-gray-300">Recommender</th>
                <th className="p-2 border border-gray-300">Certification</th>
                <th className="p-2 border border-gray-300">Status/Type</th>
                <th className="p-2 border border-gray-300">Operate</th>
              </tr>
            </thead>

            <tbody>
              {filtered.map((u, index) => (
                <tr
                  key={u.id}
                  className={`${
                    index % 2 === 0 ? "bg-gray-100" : "bg-white"
                  } hover:bg-orange-50 transition-colors`}
                >
                  <td className="p-2 border border-gray-300 align-top">
                    <input
                      type="checkbox"
                      checked={!!u.selected}
                      onChange={() => toggleSelect(u.id)}
                    />
                  </td>

                  <td className="p-2 border border-gray-300 align-top text-sm">
                    {u.id}
                  </td>

                  <td className="p-2 border border-gray-300 align-top text-sm text-blue-600 underline">
                    {u.email}
                  </td>

                  <td className="p-2 border border-gray-300 align-top text-sm">
                    {u.usdtBalance.toLocaleString(undefined, {
                      maximumFractionDigits: 8,
                    })}
                  </td>

                  <td className="p-2 border border-gray-300 align-top text-sm">
                    {u.loginCount} times
                  </td>

                  <td className="p-2 border border-gray-300 align-top text-xs">
                    <div>Last login IP: {u.registration.ip}</div>
                    <div>Registration time: {u.registration.time}</div>
                  </td>

                  <td className="p-2 border border-gray-300 align-top text-sm break-words max-w-[200px]">
                    {u.address}
                  </td>

                  <td className="p-2 border border-gray-300 align-top text-sm text-sky-700">
                    {u.recommender && u.recommender.length > 0 ? (
                      <div className="text-xs space-y-1">
                        {u.recommender.map((r, idx) => (
                          <div key={r}>
                            <span className="text-gray-500">
                              {idx + 1}st generation:
                            </span>{" "}
                            {r}
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="text-xs text-gray-500">
                        No direct superiors
                      </div>
                    )}
                  </td>

                  <td className="p-2 border border-gray-300 align-top text-sm">
                    {u.certification}
                  </td>

                  <td className="p-2 border border-gray-300 align-top text-xs">
                    <div>
                      Login: <span className="text-green-600">{u.status}</span>
                    </div>
                    <div>
                      Withdrawal:{" "}
                      <span
                        className={`font-medium ${
                          u.withdrawal === "Allowed"
                            ? "text-green-600"
                            : "text-red-600"
                        }`}
                      >
                        {u.withdrawal}
                      </span>
                    </div>
                    <div>
                      User Type:{" "}
                      <span className="text-green-600">{u.userType}</span>
                    </div>
                  </td>

                  <td className="p-2 border border-gray-300 align-top text-sm">
                    <div className="flex gap-2">
                      <button
                        onClick={() => openEdit(u)}
                        className="px-2 py-1 cursor-pointer text-xs bg-white border border-gray-300 rounded hover:bg-gray-100"
                      >
                        edit
                      </button>
                      <button
                        onClick={() =>
                          setUsers((prev) =>
                            prev.map((p) =>
                              p.id === u.id
                                ? {
                                    ...p,
                                    status:
                                      p.status === "Normal"
                                        ? "Frozen"
                                        : "Normal",
                                  }
                                : p
                            )
                          )
                        }
                        className="px-2 py-1 cursor-pointer text-xs bg-white border border-gray-300 rounded hover:bg-gray-100"
                      >
                        {u.status === "Normal" ? "freeze" : "thaw"}
                      </button>
                      <button
                        onClick={() =>
                          setUsers((prev) =>
                            prev.map((p) =>
                              p.id === u.id
                                ? {
                                    ...p,
                                    withdrawal:
                                      p.withdrawal === "Allowed"
                                        ? "Prohibited"
                                        : "Allowed",
                                  }
                                : p
                            )
                          )
                        }
                        className="px-2 py-1 cursor-pointer text-xs bg-white border border-gray-300 rounded hover:bg-gray-100"
                      >
                        {u.withdrawal === "Allowed"
                          ? "prohibit withdrawals"
                          : "allow withdrawals"}
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Mobile card list */}
        {/* <div className="sm:hidden mt-4 space-y-3">
          {filtered.map((u) => (
            <div
              key={u.id}
              className="border border-gray-300 rounded p-3 bg-white shadow-sm"
            >
              <div className="flex items-start justify-between">
                <div>
                  <div className="flex items-center gap-3">
                    <input
                      type="checkbox"
                      checked={!!u.selected}
                      onChange={() => toggleSelect(u.id)}
                    />
                    <div className="text-sm font-medium text-blue-600 underline">
                      {u.email}
                    </div>
                  </div>
                  <div className="text-xs text-gray-500 mt-1">
                    ID: {u.id} — Balance: {u.usdtBalance}
                  </div>
                  <div className="text-xs text-gray-500">
                    Last IP: {u.registration.ip}
                  </div>
                  <div className="text-xs mt-1">{u.address}</div>
                </div>

                <div className="text-right space-y-2">
                  <div>
                    <span
                      className={`inline-block px-2 py-0.5 rounded-full text-xs ${
                        u.withdrawal === "Allowed"
                          ? "bg-green-100 text-green-700"
                          : "bg-red-100 text-red-700"
                      }`}
                    >
                      {u.withdrawal}
                    </span>
                  </div>
                  <div>
                    <button
                      onClick={() => openEdit(u)}
                      className="text-xs px-2 cursor-pointer py-1 border border-gray-300 rounded"
                    >
                      edit
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div> */}

        {/* Modal for add/edit */}
        {showModal && (
          <Modal onClose={() => setShowModal(false)}>
            <UserForm
              initial={editing}
              onCancel={() => setShowModal(false)}
              onSave={(payload) => {
                if (payload.id) updateUser(payload as User);
                else addUser(payload as Omit<User, "selected">);
                setShowModal(false);
              }}
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
      <div className="relative bg-white rounded-lg shadow-lg w-full max-w-2xl mx-4 p-4">
        {children}
      </div>
    </div>
  );
}

function UserForm({
  initial,
  onSave,
  onCancel,
}: {
  initial: User | null;
  onSave: (payload: Partial<User> & { id?: number }) => void;
  onCancel: () => void;
}) {
  const [email, setEmail] = useState(initial?.email ?? "");
  const [balance, setBalance] = useState<number>(initial?.usdtBalance ?? 0);
  const [loginCount, setLoginCount] = useState<number>(
    initial?.loginCount ?? 0
  );
  const [ip, setIp] = useState<string>(initial?.registration.ip ?? "");
  const [time, setTime] = useState<string>(
    initial?.registration.time ?? new Date().toISOString()
  );
  const [address, setAddress] = useState<string>(initial?.address ?? "");
  const [cert, setCert] = useState<string>(
    initial?.certification ?? "Not submitted"
  );
  const [status, setStatus] = useState<UserStatus>(initial?.status ?? "Normal");
  const [withdrawal, setWithdrawal] = useState<WithdrawalState>(
    initial?.withdrawal ?? "Allowed"
  );
  const [userType, setUserType] = useState<string>(
    initial?.userType ?? "Normal"
  );

  function submit(e?: React.FormEvent) {
    e?.preventDefault();
    if (!email.trim()) return alert("Please provide an email.");
    const payload: Partial<User> & { id?: number } = {
      id: initial?.id,
      email: email.trim(),
      usdtBalance: balance,
      loginCount,
      registration: { ip, time },
      address,
      recommender: initial?.recommender ?? [],
      certification: cert,
      status,
      withdrawal,
      userType,
    };

    onSave(payload);
  }

  return (
    <form onSubmit={submit} className="space-y-3">
      <h3 className="text-lg font-semibold">
        {initial ? "Edit User" : "Add New User"}
      </h3>

      <div>
        <label className="block text-sm text-gray-700">Email</label>
        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="mt-1 block w-full border border-gray-300 rounded px-3 py-2"
        />
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="block text-sm text-gray-700">USDT Balance</label>
          <input
            type="number"
            value={balance}
            onChange={(e) => setBalance(Number(e.target.value || 0))}
            className="mt-1 block w-full border border-gray-300 rounded px-3 py-2"
          />
        </div>
        <div>
          <label className="block text-sm text-gray-700">Login Count</label>
          <input
            type="number"
            value={loginCount}
            onChange={(e) => setLoginCount(Number(e.target.value || 0))}
            className="mt-1 block w-full border border-gray-300 rounded px-3 py-2"
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="block text-sm text-gray-700">Registration IP</label>
          <input
            value={ip}
            onChange={(e) => setIp(e.target.value)}
            className="mt-1 block w-full border border-gray-300 rounded px-3 py-2"
          />
        </div>
        <div>
          <label className="block text-sm text-gray-700">
            Registration Time
          </label>
          <input
            value={time}
            onChange={(e) => setTime(e.target.value)}
            className="mt-1 block w-full border border-gray-300 rounded px-3 py-2"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm text-gray-700">Address</label>
        <input
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          className="mt-1 block w-full border border-gray-300 rounded px-3 py-2"
        />
      </div>

      <div className="grid grid-cols-3 gap-3">
        <div>
          <label className="block text-sm text-gray-700">Certification</label>
          <select
            value={cert}
            onChange={(e) => setCert(e.target.value)}
            className="mt-1 block w-full border border-gray-300 rounded px-3 py-2"
          >
            <option>Not submitted</option>
            <option>Authentication successful</option>
          </select>
        </div>
        <div>
          <label className="block text-sm text-gray-700">Status</label>
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value as UserStatus)}
            className="mt-1 block w-full border border-gray-300 rounded px-3 py-2"
          >
            <option value="Normal">Normal</option>
            <option value="Frozen">Frozen</option>
          </select>
        </div>
        <div>
          <label className="block text-sm text-gray-700">Withdrawal</label>
          <select
            value={withdrawal}
            onChange={(e) => setWithdrawal(e.target.value as WithdrawalState)}
            className="mt-1 block w-full border border-gray-300 rounded px-3 py-2"
          >
            <option value="Allowed">Allowed</option>
            <option value="Prohibited">Prohibited</option>
          </select>
        </div>
      </div>

      <div className="flex justify-end gap-2 pt-2">
        <button
          type="button"
          onClick={onCancel}
          className="px-3 cursor-pointer py-1.5 border border-gray-300 rounded"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="px-3 py-1.5 cursor-pointer bg-blue-600 text-white rounded"
        >
          Save
        </button>
      </div>
    </form>
  );
}
