"use client";
import Link from "next/link";
import { Header } from "@/components/layout/Header";
import { IconArrowLeft, IconInfo } from "@/components/ui/Icons";

export default function NotFound() {
  return (
    <main className="mx-auto min-h-screen max-w-[600px] bg-white shadow-sm">
      <Header />
      <section className="px-6 pt-12 text-center">
        <img
          src="/404-illustration.svg"
          alt="Page not found"
          className="mx-auto h-[220px] w-full max-w-[350px] object-contain"
        />
        <h1 className="mt-5 text-[27px] font-extrabold text-[#10183a]">
          Page Not Found
        </h1>
        <p className="mx-auto mt-2 max-w-[340px] text-[15px] leading-5 text-[#5d6a85]">
          The page you are looking for does not exist or has been moved.
        </p>
        <div className="mx-auto mt-5 grid max-w-[360px] gap-2">
          <Link
            href="/"
            className="flex h-11 items-center justify-center rounded-lg bg-[#0aae6b] text-[14px] font-semibold text-white"
          >
            ⌂ &nbsp; Go to Home
          </Link>
          <button
            type="button"
            onClick={() => history.back()}
            className="flex h-11 items-center justify-center rounded-lg border border-[#17213f] text-[14px] font-semibold text-[#17213f]"
          >
            <IconArrowLeft size={17} className="mr-2" />
            Go Back
          </button>
        </div>
      </section>
      <section className="mx-6 mt-5 rounded-lg bg-[#edfcf5] px-4 py-4">
        <div className="flex gap-3">
          <IconInfo size={23} className="text-[#0aae6b]" />
          <div>
            <p className="text-[14px] font-bold text-[#17203b]">
              Looking for something?
            </p>
            <p className="mt-1 text-[12px] leading-4 text-[#53617e]">
              Try searching for events, venues or categories.
            </p>
            <Link
              href="/"
              className="mt-2 inline-block text-[12px] font-bold text-[#0a9960]"
            >
              Search Events →
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
