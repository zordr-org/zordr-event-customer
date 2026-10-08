"use client";

import { useEffect, useState } from "react";
import { Header } from "@/components/layout/Header";
import { getMockUser, saveMockUser } from "@/lib/mock-api";

const languageOptions = [
  "English",
  "Telugu",
  "Hindi",
];

export default function LanguagePage() {
  const [selectedLanguage, setSelectedLanguage] = useState("English");
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    const user = getMockUser();

    window.setTimeout(() => {
      setSelectedLanguage(user.language ?? "English");
    }, 0);
  }, []);

  const handleSave = () => {
    const user = getMockUser();

    saveMockUser({
      ...user,
      language: selectedLanguage,
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
          Language
        </h1>

        <p className="mt-1 text-[14px] text-[#5d6a85]">
          Choose your preferred app language.
        </p>

        <section className="mt-5 overflow-hidden rounded-[10px] border border-[#e1e6ec]">
          {languageOptions.map((language, index) => {
            const selected = selectedLanguage === language;

            return (
              <button
                key={language}
                type="button"
                onClick={() => setSelectedLanguage(language)}
                className={`flex min-h-[54px] w-full items-center justify-between px-4 text-left ${
                  index < languageOptions.length - 1
                    ? "border-b border-[#edf0f2]"
                    : ""
                }`}
              >
                <span>
                  <b className="block text-[13px] text-[#17203b]">
                    {language}
                  </b>

                  <span className="text-[10px] text-[#65718a]">
                    {language === "English"
                      ? "English"
                      : language === "Telugu"
                        ? "తెలుగు"
                        : "हिन्दी"}
                  </span>
                </span>

                <span
                  className={`flex h-5 w-5 items-center justify-center rounded-full border text-[11px] ${
                    selected
                      ? "border-[#0aae6b] bg-[#0aae6b] text-white"
                      : "border-[#cbd3de] text-transparent"
                  }`}
                >
                  ✓
                </span>
              </button>
            );
          })}
        </section>

        <button
          type="button"
          onClick={handleSave}
          className="mt-5 h-10 w-full rounded-md bg-[#0aae6b] text-[12px] font-semibold text-white"
        >
          Save Language
        </button>

        {saved && (
          <p className="mt-2 text-center text-[11px] font-medium text-[#0a9960]">
            Language preference saved successfully.
          </p>
        )}
      </div>
    </main>
  );
}