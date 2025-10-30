"use client";

import DashboardLayout from "@/app/page";

interface CustomerRecord {
  id: number;
  memberAccount: string;
  unansweredRecords: number;
}

export default function CustomerServicePage() {
  const records: CustomerRecord[] = [
    { id: 554, memberAccount: "test@gmail.com", unansweredRecords: 1 },
  ];

  return (
    <DashboardLayout>
      <div className="">
        <h1 className="text-xl font-semibold mb-4">Online customer service</h1>

        <div className="overflow-x-auto border rounded-lg shadow-sm">
          <table className="min-w-full text-sm text-left border-collapse">
            <thead className="bg-gray-100 text-gray-700 border-b">
              <tr>
                <th className="p-2 border w-10 text-center">
                  <input type="checkbox" />
                </th>
                <th className="p-2 border w-16 text-center">ID</th>
                <th className="p-2 border">Member account</th>
                <th className="p-2 border text-center">Unanswered records</th>
                <th className="p-2 border text-center">Operate</th>
              </tr>
            </thead>

            <tbody>
              {records.map((r) => (
                <tr key={r.id} className="hover:bg-gray-50">
                  <td className="p-2 border text-center">
                    <input type="checkbox" />
                  </td>
                  <td className="p-2 border text-center">{r.id}</td>
                  <td className="p-2 border">{r.memberAccount}</td>
                  <td className="p-2 border text-center">
                    {r.unansweredRecords}
                  </td>
                  <td className="p-2 border text-center">
                    <button className="bg-gray-700 text-white text-xs px-3 py-1 rounded hover:bg-gray-800 transition">
                      check the details
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="p-2 text-sm text-gray-600">
            {records.length} record{records.length !== 1 && "s"} per page 1/1
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
