"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import DashboardLayout from "@/app/page";

type FormState = {
  verificationEmail: string;
  emailAuthCode: string;
  verificationTemplate: string;
  emailServer: string;
  smsServer: string;
  smsMerchantId: string;
  smsMerchantKey: string;
  startingAmount: string;
  trxPrivateKey: string;
  usdtReceivingAddress: string;
  recommendedPageText: string;
  officialCustomerEmail: string;
  pcBottomText: string;
  trialCredits: string;
  websiteRegistration: "open" | "closed";
  withdrawalMaster: "open" | "closed";
  includeFreeTrialMachine: "no_delivery" | "with_delivery";
};

const initialState: FormState = {
  verificationEmail: "",
  emailAuthCode: "",
  verificationTemplate: "Your Verification code is",
  emailServer: "",
  smsServer: "",
  smsMerchantId: "",
  smsMerchantKey: "",
  startingAmount: "10.0000",
  trxPrivateKey: "",
  usdtReceivingAddress: "",
  recommendedPageText: "",
  officialCustomerEmail: "",
  pcBottomText: "",
  trialCredits: "0.00000000",
  websiteRegistration: "open",
  withdrawalMaster: "open",
  includeFreeTrialMachine: "no_delivery",
};

export default function Page() {
  const router = useRouter();
  const [form, setForm] = useState<FormState>(initialState);
  const [errors, setErrors] = useState<
    Partial<Record<keyof FormState, string>>
  >({});
  const [savedMessage, setSavedMessage] = useState<string | null>(null);

  useEffect(() => {
    try {
      const raw = localStorage.getItem("system_parameter_settings_v1");
      if (raw) setForm(JSON.parse(raw));
    } catch {}
  }, []);

  const handleChange = <K extends keyof FormState>(
    key: K,
    value: FormState[K]
  ) => {
    setForm((s) => ({ ...s, [key]: value }));
    setErrors((e) => ({ ...e, [key]: undefined }));
  };

  const validate = (): boolean => {
    const nextErrors: typeof errors = {};
    if (
      !form.verificationEmail ||
      !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(form.verificationEmail)
    )
      nextErrors.verificationEmail = "Enter a valid email address";

    if (
      !form.officialCustomerEmail ||
      !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(form.officialCustomerEmail)
    )
      nextErrors.officialCustomerEmail = "Enter a valid customer service email";

    if (isNaN(Number(form.startingAmount)))
      nextErrors.startingAmount = "Must be a number";
    if (isNaN(Number(form.trialCredits)))
      nextErrors.trialCredits = "Must be a number";

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const handleSubmit = (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!validate()) {
      setSavedMessage(null);
      return;
    }

    try {
      localStorage.setItem(
        "system_parameter_settings_v1",
        JSON.stringify(form)
      );
      setSavedMessage("Settings saved successfully.");
      setTimeout(() => setSavedMessage(null), 4000);
    } catch {
      setSavedMessage("Failed to save settings.");
    }
  };

  const handleReturn = () => router.back();

  return (
    <DashboardLayout>
      <main className="min-h-screen">
        <div className="max-w-6xl mx-auto bg-white overflow-hidden">
          <div className="px-6 py-6 border-b border-gray-300">
            <h1 className="text-2xl font-semibold">
              System Parameter Settings
            </h1>
            <p className="text-sm text-gray-500 mt-1">
              Update system-level parameters used across the platform.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="p-6 space-y-4">
            {(
              [
                { key: "verificationEmail", label: "Verification Email:" },
                { key: "emailAuthCode", label: "Email Authorization Code:" },
                {
                  key: "verificationTemplate",
                  label: "Verification Template:",
                },
                { key: "emailServer", label: "Email Server:" },
                { key: "smsServer", label: "SMS Server:" },
                { key: "smsMerchantId", label: "SMS Merchant ID:" },
                { key: "smsMerchantKey", label: "SMS Merchant Key:" },
                {
                  key: "startingAmount",
                  label: "Starting Amount for Collection:",
                },
                { key: "trxPrivateKey", label: "TRX Private Key:" },
                {
                  key: "usdtReceivingAddress",
                  label: "USDT Receiving Address:",
                },
                { key: "recommendedPageText", label: "Recommended Page Text:" },
                {
                  key: "officialCustomerEmail",
                  label: "Official Customer Email:",
                },
                { key: "pcBottomText", label: "PC Bottom Text:" },
                { key: "trialCredits", label: "Free Trial Credits:" },
              ] as { key: keyof FormState; label: string }[]
            ).map(({ key, label }) => (
              <div
                key={key}
                className="grid grid-cols-1 md:grid-cols-2 items-center gap-4"
              >
                <label className="font-medium text-gray-700 text-sm">
                  {label}
                </label>
                <div>
                  {key === "pcBottomText" ? (
                    <textarea
                      value={form[key] as string}
                      onChange={(e) => handleChange(key, e.target.value as any)}
                      rows={3}
                      className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-300"
                    />
                  ) : (
                    <input
                      value={form[key] as string}
                      onChange={(e) => handleChange(key, e.target.value as any)}
                      className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-300"
                    />
                  )}
                  {errors[key] && (
                    <p className="text-xs text-red-600 mt-1">{errors[key]}</p>
                  )}
                </div>
              </div>
            ))}

            <div className="grid grid-cols-1 md:grid-cols-2 items-center gap-4">
              <label className="font-medium text-gray-700 text-sm">
                Website Registration Switch:
              </label>
              <select
                value={form.websiteRegistration}
                onChange={(e) =>
                  handleChange("websiteRegistration", e.target.value as any)
                }
                className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-300"
              >
                <option value="open">Open</option>
                <option value="closed">Closed</option>
              </select>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 items-center gap-4">
              <label className="font-medium text-gray-700 text-sm">
                Withdrawal Master Switch:
              </label>
              <select
                value={form.withdrawalMaster}
                onChange={(e) =>
                  handleChange("withdrawalMaster", e.target.value as any)
                }
                className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-300"
              >
                <option value="open">Open</option>
                <option value="closed">Closed</option>
              </select>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 items-center gap-4">
              <label className="font-medium text-gray-700 text-sm">
                Include Free Trial Mining Machine:
              </label>
              <select
                value={form.includeFreeTrialMachine}
                onChange={(e) =>
                  handleChange("includeFreeTrialMachine", e.target.value as any)
                }
                className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-300"
              >
                <option value="no_delivery">No Delivery</option>
                <option value="with_delivery">With Delivery</option>
              </select>
            </div>

            <div className="flex items-center gap-3 pt-6">
              <button
                type="submit"
                className="px-5 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
              >
                Submit
              </button>
              <button
                type="button"
                onClick={handleReturn}
                className="px-5 py-2 bg-gray-500 text-white rounded hover:bg-gray-600 transition"
              >
                Return
              </button>
              {savedMessage && (
                <p className="text-sm text-green-600">{savedMessage}</p>
              )}
            </div>
          </form>
        </div>
      </main>
    </DashboardLayout>
  );
}
