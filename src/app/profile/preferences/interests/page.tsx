"use client";

import { useEffect, useState } from "react";
import { Header } from "@/components/layout/Header";
import { getMockUser, saveMockUser } from "@/lib/mock-api";

const interestOptions = [
  "Music",
  "Cultural",
  "Sports",
  "Technology",
  "Workshops",
  "Comedy",
];

export default function InterestsPage() {
  const [selectedInterests, setSelectedInterests] = useState<string[]>([]);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    const user = getMockUser();

    window.setTimeout(() => {
      setSelectedInterests(user.interests ?? []);
    }, 0);
  }, []);

  const toggleInterest = (interest: string) => {
    setSelectedInterests((current) =>
      current.includes(interest)
        ? current.filter((item) => item !== interest)
        : [...current, interest],
    );
  };

  const handleSave = () => {
    const user = getMockUser();

    saveMockUser({
      ...user,
      interests: selectedInterests,
    });

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
          Interests
        </h1>

        <p className="mt-1 text-[14px] text-[#5d6a85]">
          Select the types of events you are interested in.
        </p>

        <section className="mt-5 rounded-[10px] border border-[#e1e6ec] p-4">
          <div className="space-y-2">
            {interestOptions.map((interest) => {
              const selected = selectedInterests.includes(interest);

              return (
                <button
                  key={interest}
                  type="button"
                  onClick={() => toggleInterest(interest)}
                  className={`flex w-full items-center justify-between rounded-md border px-3 py-3 text-left text-[12px] font-semibold transition ${
                    selected
                      ? "border-[#0aae6b] bg-[#e9fbf3] text-[#0a9960]"
                      : "border-[#dfe5eb] bg-white text-[#53617a]"
                  }`}
                >
                  <span>{interest}</span>
                  <span>{selected ? "✓ " : ""}</span>
                </button>
              );
            })}
          </div>

          <button
            type="button"
            onClick={handleSave}
            className="mt-5 h-10 w-full rounded-md bg-[#0aae6b] text-[12px] font-semibold text-white"
          >
            Save Interests
          </button>

          {saved && (
            <p className="mt-2 text-center text-[11px] font-medium text-[#0a9960]">
              Interests saved successfully.
            </p>
          )}
        </section>
      </div>
    </main>
  );
}