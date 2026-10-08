"use client";

import { useEffect, useState } from "react";
import { Header } from "@/components/layout/Header";

type AccountId = "instagram" | "linkedin" | "whatsapp";

interface LinkedAccount {
  id: AccountId;
  name: string;
  description: string;
  placeholder: string;
}

const accounts: LinkedAccount[] = [
  {
    id: "instagram",
    name: "Instagram",
    description: "Connect your Instagram profile",
    placeholder: "Enter Instagram username",
  },
  {
    id: "linkedin",
    name: "LinkedIn",
    description: "Connect your professional or student profile",
    placeholder: "Enter profile URL or email",
  },
  {
    id: "whatsapp",
    name: "WhatsApp",
    description: "Receive event reminders and important updates",
    placeholder: "Enter WhatsApp phone number",
  },
];

const linkedAccountsKey = "zordr-mock-linked-accounts";

type LinkedAccountsState = Record<AccountId, string>;

const emptyState: LinkedAccountsState = {
  instagram: "",
  linkedin: "",
  whatsapp: "",
};

export default function LinkedAccountsPage() {
  const [linkedAccounts, setLinkedAccounts] =
    useState<LinkedAccountsState>(emptyState);
  const [openAccount, setOpenAccount] = useState<AccountId | null>(null);

  useEffect(() => {
    try {
      const saved = window.localStorage.getItem(linkedAccountsKey);

      if (saved) {
        const parsed = JSON.parse(saved);

        if (parsed && typeof parsed === "object") {
          setLinkedAccounts({
            ...emptyState,
            ...parsed,
          });
        }
      }
    } catch {
      window.localStorage.removeItem(linkedAccountsKey);
    }
  }, []);

  const handleSave = (accountId: AccountId) => {
    const value = linkedAccounts[accountId].trim();

    if (!value) return;

    const nextState = {
      ...linkedAccounts,
      [accountId]: value,
    };

    setLinkedAccounts(nextState);
    window.localStorage.setItem(linkedAccountsKey, JSON.stringify(nextState));
    setOpenAccount(null);
  };

  const handleDisconnect = (accountId: AccountId) => {
    const nextState = {
      ...linkedAccounts,
      [accountId]: "",
    };

    setLinkedAccounts(nextState);
    window.localStorage.setItem(linkedAccountsKey, JSON.stringify(nextState));
  };

  return (
    <main className="mx-auto min-h-screen max-w-[600px] bg-white pb-8 shadow-sm">
      <Header showBack />

      <div className="px-4 pt-5 sm:px-6">
        <h1 className="text-[25px] font-extrabold text-[#10183a]">
          Linked Accounts
        </h1>

        <p className="mt-1 text-[14px] text-[#5d6a85]">
          Connect your social and communication accounts to receive updates.
        </p>

        <section className="mt-5 overflow-hidden rounded-[10px] border border-[#e1e6ec]">
          {accounts.map((account, index) => {
            const value = linkedAccounts[account.id];
            const connected = Boolean(value);
            const isOpen = openAccount === account.id;

            return (
              <div
                key={account.id}
                className={`px-4 py-4 ${
                  index < accounts.length - 1
                    ? "border-b border-[#edf0f2]"
                    : ""
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#f1f5f9] text-[13px] font-bold text-[#17203b]">
                    {account.name.slice(0, 1)}
                  </div>

                  <div className="min-w-0 flex-1">
                    <p className="text-[13px] font-bold text-[#17203b]">
                      {account.name}
                    </p>

                    <p className="mt-0.5 text-[10px] text-[#65718a]">
                      {connected ? value : account.description}
                    </p>

                    {connected && (
                      <p className="mt-1 text-[9px] font-medium text-[#0a9960]">
                        Connected
                      </p>
                    )}
                  </div>

                  <button
                    type="button"
                    onClick={() =>
                      connected
                        ? handleDisconnect(account.id)
                        : setOpenAccount(account.id)
                    }
                    className={`h-8 rounded-md px-3 text-[10px] font-semibold ${
                      connected
                        ? "border border-[#e2a8b0] bg-white text-[#c53549]"
                        : "bg-[#0aae6b] text-white"
                    }`}
                  >
                    {connected ? "Disconnect" : "Connect"}
                  </button>
                </div>

                {isOpen && (
                  <div className="mt-3">
                    <input
                      type={
                        account.id === "whatsapp" ? "tel" : "text"
                      }
                      value={value}
                      onChange={(event) =>
                        setLinkedAccounts((current) => ({
                          ...current,
                          [account.id]: event.target.value,
                        }))
                      }
                      placeholder={account.placeholder}
                      className="h-10 w-full rounded-md border border-[#dfe5eb] bg-white px-3 text-[12px] text-[#17203b] outline-none focus:border-[#0aae6b]"
                    />

                    <button
                      type="button"
                      onClick={() => handleSave(account.id)}
                      disabled={!value.trim()}
                      className="mt-2 h-9 rounded-md bg-[#0aae6b] px-4 text-[11px] font-semibold text-white disabled:cursor-not-allowed disabled:opacity-50"
                    >
                      Save Account
                    </button>
                  </div>
                )}
              </div>
            );
          })}
        </section>
      </div>
    </main>
  );
}