"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import DashboardLayout from "@/app/page";

type ImageFieldKey =
  | "mobileLogo"
  | "pcLogo"
  | "mobileCarton1"
  | "mobileCarton2"
  | "mobileCarton3"
  | "mobileNewCoin"
  | "mobileMiningHome"
  | "pcCarousel1"
  | "pcCarousel2"
  | "pcCarousel3"
  | "pcCarousel4"
  | "pcNewCurrency"
  | "pcMiningHome"
  | "mobileRecLogo1"
  | "mobileRecLogo2";

type FormState = {
  nameOfWebsite: string;
  titleOfWebsite: string;
  statusOfWebsite: string;
  images: Partial<Record<ImageFieldKey, string>>; // data URLs
};

const initialState: FormState = {
  nameOfWebsite: "",
  titleOfWebsite: "",
  statusOfWebsite: "正常",
  images: {},
};

export default function Page() {
  const router = useRouter();
  const [form, setForm] = useState<FormState>(initialState);
  const [errors, setErrors] = useState<{ [k: string]: string }>({});
  const [savedMessage, setSavedMessage] = useState<string | null>(null);

  useEffect(() => {
    // load from localStorage
    try {
      const raw = localStorage.getItem("basic_website_config_v1");
      if (raw) setForm(JSON.parse(raw));
    } catch (e) {
      // ignore
    }
  }, []);

  const handleInput = (key: keyof FormState, value: any) => {
    setForm((s) => ({ ...s, [key]: value }));
  };

  const handleImage = (field: ImageFieldKey, file?: File) => {
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      const dataUrl = reader.result as string;
      setForm((s) => ({ ...s, images: { ...s.images, [field]: dataUrl } }));
      setErrors((e) => ({ ...e, [field]: "" }));
    };
    reader.readAsDataURL(file);
  };

  const removeImage = (field: ImageFieldKey) => {
    setForm((s) => {
      const copy = { ...s.images };
      delete copy[field];
      return { ...s, images: copy };
    });
  };

  const validate = () => {
    const next: typeof errors = {};
    if (!form.nameOfWebsite.trim()) next.nameOfWebsite = "Required";
    if (!form.titleOfWebsite.trim()) next.titleOfWebsite = "Required";
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const handleSubmit = (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!validate()) return;
    try {
      localStorage.setItem("basic_website_config_v1", JSON.stringify(form));
      setSavedMessage("Configuration saved successfully.");
      setTimeout(() => setSavedMessage(null), 4000);
    } catch (err) {
      setSavedMessage("Failed to save. Check browser storage.");
    }
  };

  return (
    <DashboardLayout>
      <main className="min-h-screen">
        <div className="max-w-5xl mx-auto bg-white overflow-hidden">
          <div className="px-6 py-3 border-b border-gray-300">
            <h2 className="text-xl font-semibold">
              Basic website configuration
            </h2>
          </div>

          <form onSubmit={handleSubmit} className="p-6">
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-start">
                <label className="md:col-span-2 text-sm font-medium text-gray-700 py-2">
                  Name of website:
                </label>
                <div className="md:col-span-8">
                  <input
                    className="w-full border border-gray-300 rounded px-3 py-2"
                    value={form.nameOfWebsite}
                    onChange={(e) =>
                      handleInput("nameOfWebsite", e.target.value)
                    }
                  />
                  {errors.nameOfWebsite && (
                    <p className="text-xs text-red-600">
                      {errors.nameOfWebsite}
                    </p>
                  )}
                </div>
                <div className="md:col-span-2 text-sm text-gray-500"></div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-start">
                <label className="md:col-span-2 text-sm font-medium text-gray-700 py-2">
                  Title of website:
                </label>
                <div className="md:col-span-8">
                  <input
                    className="w-full border border-gray-300 rounded px-3 py-2"
                    value={form.titleOfWebsite}
                    onChange={(e) =>
                      handleInput("titleOfWebsite", e.target.value)
                    }
                  />
                  {errors.titleOfWebsite && (
                    <p className="text-xs text-red-600">
                      {errors.titleOfWebsite}
                    </p>
                  )}
                </div>
                <div className="md:col-span-2 text-sm text-gray-500"></div>
              </div>

              {/* image rows: each row shows label, preview/upload area, and hint column */}
              <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
                <div className="md:col-span-2 text-sm font-medium text-gray-700 py-2">
                  Mobile phone logo pictures:
                </div>

                <div className="md:col-span-8">
                  <ImageUploader
                    fieldKey="mobileLogo"
                    value={form.images.mobileLogo}
                    onChange={(file) => handleImage("mobileLogo", file)}
                    onRemove={() => removeImage("mobileLogo")}
                    sizeHint="* 200*200px"
                  />
                </div>

                <div className="md:col-span-2 text-sm text-red-600">
                  * 200*200px
                </div>
              </div>

              {/* PC logo */}
              <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
                <div className="md:col-span-2 text-sm font-medium text-gray-700 py-2">
                  Photo of the PC logo:
                </div>
                <div className="md:col-span-8">
                  <ImageUploader
                    fieldKey="pcLogo"
                    value={form.images.pcLogo}
                    onChange={(file) => handleImage("pcLogo", file)}
                    onRemove={() => removeImage("pcLogo")}
                  />
                </div>
                <div className="md:col-span-2 text-sm text-red-600">
                  * 200*200px
                </div>
              </div>

              {/* Mobile carton 1,2,3 */}
              <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
                <div className="md:col-span-2 text-sm font-medium text-gray-700 py-2">
                  Mobile phone carton 1:
                </div>
                <div className="md:col-span-8">
                  <ImageUploader
                    fieldKey="mobileCarton1"
                    value={form.images.mobileCarton1}
                    onChange={(file) => handleImage("mobileCarton1", file)}
                    onRemove={() => removeImage("mobileCarton1")}
                  />
                </div>
                <div className="md:col-span-2 text-sm text-red-600">
                  * 700*350px
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
                <div className="md:col-span-2 text-sm font-medium text-gray-700 py-2">
                  Mobile phone carton 2:
                </div>
                <div className="md:col-span-8">
                  <ImageUploader
                    fieldKey="mobileCarton2"
                    value={form.images.mobileCarton2}
                    onChange={(file) => handleImage("mobileCarton2", file)}
                    onRemove={() => removeImage("mobileCarton2")}
                  />
                </div>
                <div className="md:col-span-2 text-sm text-red-600">
                  * 700*350px
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
                <div className="md:col-span-2 text-sm font-medium text-gray-700 py-2">
                  Mobile phone carton 3:
                </div>
                <div className="md:col-span-8">
                  <ImageUploader
                    fieldKey="mobileCarton3"
                    value={form.images.mobileCarton3}
                    onChange={(file) => handleImage("mobileCarton3", file)}
                    onRemove={() => removeImage("mobileCarton3")}
                  />
                </div>
                <div className="md:col-span-2 text-sm text-red-600">
                  * 700*350px
                </div>
              </div>

              {/* rest of images similar pattern: mobileNewCoin, mobileMiningHome, pcCarousel1..4, pcNewCurrency, pcMiningHome, mobileRecLogo1, mobileRecLogo2 */}

              {[
                [
                  "mobileNewCoin",
                  "Mobile phone new coin subscription pictures:",
                ],
                [
                  "mobileMiningHome",
                  "Mobile phone mining machine home picture:",
                ],
                ["pcCarousel1", "PC end carousel diagram 1:"],
                ["pcCarousel2", "PC end carousel Figure 2:"],
                ["pcCarousel3", "PC-end carousel Figure 3:"],
                ["pcCarousel4", "PC end carousel diagram 4:"],
                [
                  "pcNewCurrency",
                  "PC-Deployed New Currency Subscription Images:",
                ],
                ["pcMiningHome", "PC terminal mining machine home picture:"],
                [
                  "mobileRecLogo1",
                  "Mobile phone recommended page logo pictures:",
                ],
                [
                  "mobileRecLogo2",
                  "Mobile phone recommended page logo pictures:",
                ],
              ].map((item) => {
                const key = item[0] as ImageFieldKey;
                const label = item[1];
                return (
                  <div
                    key={key}
                    className="grid grid-cols-1 md:grid-cols-12 gap-4"
                  >
                    <div className="md:col-span-2 text-sm font-medium text-gray-700 py-2">
                      {label}
                    </div>
                    <div className="md:col-span-8">
                      <ImageUploader
                        fieldKey={key}
                        value={(form.images as any)[key]}
                        onChange={(file) => handleImage(key, file)}
                        onRemove={() => removeImage(key)}
                      />
                    </div>
                    <div className="md:col-span-2 text-sm text-red-600">
                      * 700*350px
                    </div>
                  </div>
                );
              })}

              <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
                <label className="md:col-span-2 text-sm font-medium text-gray-700">
                  Status of the website:
                </label>
                <div className="md:col-span-8">
                  <select
                    className="w-full border border-gray-300 rounded px-3 py-2"
                    value={form.statusOfWebsite}
                    onChange={(e) =>
                      handleInput("statusOfWebsite", e.target.value)
                    }
                  >
                    <option>正常</option>
                    <option>维护</option>
                    <option>关闭</option>
                  </select>
                </div>
                <div className="md:col-span-2 text-sm text-gray-500"></div>
              </div>

              <div className="flex items-center gap-3 pt-4">
                <button
                  type="submit"
                  onClick={handleSubmit}
                  className="px-5 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
                >
                  submit
                </button>

                <button
                  type="button"
                  onClick={() => router.back()}
                  className="px-5 py-2 bg-gray-300 text-gray-800 rounded hover:bg-gray-400 transition"
                >
                  return
                </button>

                {savedMessage && (
                  <p className="text-sm text-green-600">{savedMessage}</p>
                )}
              </div>
            </div>
          </form>
        </div>
      </main>
    </DashboardLayout>
  );
}

function ImageUploader({
  fieldKey,
  value,
  onChange,
  onRemove,
  sizeHint,
}: {
  fieldKey: ImageFieldKey;
  value?: string | undefined;
  onChange: (file: File) => void;
  onRemove: () => void;
  sizeHint?: string;
}) {
  return (
    <div className="flex items-start gap-4">
      <div className="w-28 h-20 bg-gray-100 rounded border border-gray-300 flex items-center justify-center overflow-hidden">
        {value ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={value}
            alt={fieldKey}
            className="object-contain w-full h-full"
          />
        ) : (
          <div className="text-xs text-gray-400">Click to add a picture</div>
        )}
      </div>

      <div className="flex flex-col gap-2">
        <label className="inline-flex items-center gap-2">
          <input
            type="file"
            accept="image/*"
            className="hidden"
            onChange={(e) => {
              const f = e.target.files?.[0];
              if (f) onChange(f);
            }}
          />
          <span className="px-3 py-1 bg-white border border-gray-300 rounded text-sm cursor-pointer">
            Upload
          </span>
        </label>

        {value && (
          <button
            type="button"
            onClick={onRemove}
            className="px-3 py-1 bg-red-50 border border-red-200 text-red-600 rounded text-sm"
          >
            Remove
          </button>
        )}

        {sizeHint && <div className="text-xs text-gray-500">{sizeHint}</div>}
      </div>
    </div>
  );
}
