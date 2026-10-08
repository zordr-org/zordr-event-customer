"use client";

import { useEffect, useState } from "react";
import { Header } from "@/components/layout/Header";
import { getMockUser, saveMockUser } from "@/lib/mock-api";
import { mockUser } from "@/lib/mock-account";

export default function PersonalInformationPage() {
  const [user, setUser] = useState(mockUser);
  const [saved, setSaved] = useState(false);
  useEffect(() => {
    const storedUser = getMockUser();
    window.setTimeout(() => {
      setUser(storedUser);
    }, 0);
  }, []);
  const handleSave = () => {
    saveMockUser(user);
    setSaved(true);
    window.setTimeout(() => {
      setSaved(false);
    }, 2000);
  };
  return (
    <main className="mx-auto min-h-screen max-w-[600px] bg-white pb-8 shadow-sm">
      <Header showBack />
      <div className="px-4 pt-5 sm:px-6">
        <h1 className="text-[25px] font-extrabold text-[#10183a]">
          Personal Information
        </h1>
        <p className="mt-1 text-[14px] text-[#5d6a85]">
          Manage your personal details.
        </p>
        <section className="mt-5 rounded-[10px] border border-[#e1e6ec] p-4">
          <div className="space-y-4">
            <div>
              <label className="text-[11px] font-semibold text-[#53617a]">
                Name
              </label>
              <input
                value={user.name}
                onChange={(event) =>
                  setUser((current) => ({
                    ...current,
                    name: event.target.value,
                  }))
                }
                className="mt-1 h-10 w-full rounded-md border border-[#dfe5eb] bg-white px-3 text-[13px] text-[#17203b] outline-none focus:border-[#0aae6b]"
              />
            </div>

            <div>
              <label className="text-[11px] font-semibold text-[#53617a]">
                Email
              </label>

              <input
                value={user.email}
                readOnly
                className="mt-1 h-10 w-full rounded-md border border-[#dfe5eb] bg-[#f5f7fa] px-3 text-[13px] text-[#65718a] outline-none"
              />

              <p className="mt-1 text-[10px] text-[#65718a]">
                Email cannot be changed.
              </p>
            </div>

            <div>
              <label className="text-[11px] font-semibold text-[#53617a]">
                Phone
              </label>

              <input
                value={user.phone}
                readOnly
                className="mt-1 h-10 w-full rounded-md border border-[#dfe5eb] bg-[#f5f7fa] px-3 text-[13px] text-[#65718a] outline-none"
              />

              <p className="mt-1 text-[10px] text-[#65718a]">
                Phone number cannot be changed.
              </p>
            </div>

            <div>
              <label className="text-[11px] font-semibold text-[#53617a]">
                College
              </label>

              <input
                value={user.college ?? " "}
                onChange={(event) =>
                  setUser((current) => ({
                    ...current,
                    college: event.target.value,
                  }))
                }
                className="mt-1 h-10 w-full rounded-md border border-[#dfe5eb] bg-white px-3 text-[13px] text-[#17203b] outline-none focus:border-[#0aae6b]"
              />
            </div>

            <div>
              <label className="text-[11px] font-semibold text-[#53617a]">
                Branch
              </label>

              <input
                value={user.branch ?? " "}
                onChange={(event) =>
                  setUser((current) => ({
                    ...current,
                    branch: event.target.value,
                  }))
                }
                className="mt-1 h-10 w-full rounded-md border border-[#dfe5eb] bg-white px-3 text-[13px] text-[#17203b] outline-none focus:border-[#0aae6b]"
              />
            </div>

            <div>
              <label className="text-[11px] font-semibold text-[#53617a]">
                Year
              </label>

              <input
                value={user.year ??  ""}
                onChange={(event) =>
                  setUser((current) => ({
                    ...current,
                    year: event.target.value,
                  }))
                }
                className="mt-1 h-10 w-full rounded-md border border-[#dfe5eb] bg-white px-3 text-[13px] text-[#17203b] outline-none focus:border-[#0aae6b]"
              />
            </div>
          </div>

          <button
            type="button"
            onClick={handleSave}
            className="mt-5 h-10 w-full rounded-md bg-[#0aae6b] text-[12px] font-semibold text-white"
          >
            Save Changes
          </button>

          {saved && (
            <p className="mt-2 text-center text-[11px] font-medium text-[#0a9960]">
              Changes saved successfully.
            </p>
          )}
        </section>
      </div>
    </main>
  );
}