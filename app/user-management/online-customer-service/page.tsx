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
      <div className=" bg-white p-2 md:p-4 min-h-screen">
        <h1 className="text-xl font-semibold mb-4 border-b border-gray-300">
          Online customer service
        </h1>

        <div className="overflow-x-auto w-full bg-white">
          <table className=" min-w-[800px] md:min-w-full text-sm border-collapse table-auto">
            <thead>
              <tr className="text-left">
                <th className="p-2 border border-gray-300 w-10 text-center">
                  <input type="checkbox" />
                </th>
                <th className="p-2 border border-gray-300 w-16 text-center">
                  ID
                </th>
                <th className="p-2 border border-gray-300">Member account</th>
                <th className="p-2 border border-gray-300 text-center">
                  Unanswered records
                </th>
                <th className="p-2 border border-gray-300 text-center">
                  Operate
                </th>
              </tr>
            </thead>

            <tbody>
              {records.map((r, index) => (
                <tr
                  key={r.id}
                  className={`${
                    index % 2 === 0 ? "bg-gray-100" : "bg-white"
                  } hover:bg-orange-50 transition-colors`}
                >
                  <td className="p-2 border border-gray-300 text-center">
                    <input type="checkbox" />
                  </td>
                  <td className="p-2 border border-gray-300 text-center">
                    {r.id}
                  </td>
                  <td className="p-2 border border-gray-300">
                    {r.memberAccount}
                  </td>
                  <td className="p-2 border border-gray-300 text-center">
                    {r.unansweredRecords}
                  </td>
                  <td className="p-2 border border-gray-300 text-center">
                    <button className="px-2 cursor-pointer py-1 text-xs bg-white border border-gray-300 rounded hover:bg-orange-100 transition">
                      check the details
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="p-2 text-sm text-gray-600 border-t border-gray-200">
            {records.length} record{records.length !== 1 && "s"} per page 1/1
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
