import { Skeleton } from "@/components/ui/Skeleton";

export function ExploreSkeleton() {
  return (
    <div className="mt-5 grid grid-cols-2 gap-3">
      {Array.from({ length: 6 }).map((_, index) => (
        <div
          key={index}
          className="overflow-hidden rounded-[10px] border border-[var(--color-border)] bg-white"
        >
          <Skeleton className="aspect-[2.35/1] w-full" />

          <div className="space-y-2 p-2">
            <Skeleton className="h-4 w-4/5" />
            <Skeleton className="h-4 w-2/5" />
            <Skeleton className="h-3 w-3/4" />
            <Skeleton className="h-3 w-2/3" />

            <div className="flex justify-between pt-1">
              <Skeleton className="h-4 w-1/3" />
              <Skeleton className="h-4 w-4" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
