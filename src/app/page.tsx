import { Header } from "@/components/layout/Header";
import { HeroCarousel } from "@/components/discovery/HeroCarousel";
import { FeaturedEventCard } from "@/components/discovery/FeaturedEventCard";
import { CompactEventRow } from "@/components/discovery/CompactEventRow";
import { CategoryGrid } from "@/components/discovery/CategoryGrid";
import { CommunityPromo } from "@/components/discovery/CommunityPromo";
import { SectionHeader } from "@/components/layout/SectionHeader";
import { mockEvents } from "./home-data";

const categories = [
  { name: "Music", href: "/events?category=Music", icon: "music" },
  { name: "Cultural", href: "/events?category=Cultural", icon: "cultural" },
  { name: "Tech", href: "/events?category=Tech", icon: "tech" },
  { name: "Sports", href: "/events?category=Sports", icon: "sports" },
  { name: "Workshops", href: "/events?category=Workshops", icon: "workshops" },
  { name: "Comedy", href: "/events?category=Comedy", icon: "comedy" },
  { name: "Food", href: "/events?category=Food", icon: "food" },
  { name: "Literary", href: "/events?category=Literary", icon: "literary" },
];

export default function Home() {
  const heroEvents = [mockEvents[0], mockEvents[1], mockEvents[3]];

  const featuredEvents = [mockEvents[0], mockEvents[1]];

  const upcomingEvents = [mockEvents[2]];

  const trendingEvents = [mockEvents[3]];

  return (
    <main className="min-h-screen bg-white">
      <Header />
      <div className="mx-auto w-full max-w-[708px] px-4 pb-8 sm:px-6">
        <section>
          <HeroCarousel events={heroEvents} />
        </section>

        <section className="mt-5">
          <SectionHeader
            title="Featured Events"
            actionLabel="View All →"
            actionHref="/events?filter=featured"
          />

          <div className="mt-2.5 grid grid-cols-2 gap-4">
            {featuredEvents.map((event) => (
              <FeaturedEventCard key={event.id} event={event} />
            ))}
          </div>
        </section>

        <section className="mt-5">
          <SectionHeader
            title="Browse by Category"
            actionLabel="View All →"
            actionHref="/categories"
          />

          <div className="mt-2.5">
            <CategoryGrid categories={categories} />
          </div>
        </section>

        <section className="mt-5">
          <SectionHeader
            title="Upcoming Events"
            actionLabel="View All →"
            actionHref="/events?filter=upcoming"
          />

          <div className="mt-2">
            {upcomingEvents.map((event) => (
              <CompactEventRow key={event.id} event={event} />
            ))}
          </div>
        </section>

        <section className="mt-5">
          <SectionHeader
            title="Trending Near You"
            actionLabel="View All →"
            actionHref="/events?filter=trending"
          />

          <div className="mt-2">
            {trendingEvents.map((event) => (
              <CompactEventRow key={event.id} event={event} />
            ))}
          </div>
        </section>

        <section className="mt-3">
          <CommunityPromo />
        </section>
      </div>
    </main>
  );
}
