import type { Metadata } from "next";
import { Suspense } from "react";

import { Header } from "@/components/layout/Header";
import { ExploreScreen } from "@/components/discovery/ExploreScreen";
import { ExploreSkeleton } from "@/components/discovery/ExploreSkeleton";

export const metadata: Metadata = {
  title: "Explore Events – Zordr",
  description: "Find events, experiences and communities around you.",
};

function ExploreContent() {
  return (
    <Suspense fallback={<ExploreSkeleton />}>
      <ExploreScreen />
    </Suspense>
  );
}

export default function ExploreEventsPage() {
  return (
    <main className="mx-auto min-h-screen max-w-[600px] bg-white pb-8 shadow-sm">
      <Header />

      <div className="px-4 pt-5 sm:px-6">
        <h1 className="text-[25px] font-extrabold text-[#10183a]">
          Explore Events
        </h1>

        <p className="mt-1 text-[15px] text-[#5d6a85]">
          Find events, experiences and communities around you.
        </p>

        <ExploreContent />
      </div>
    </main>
  );
}
