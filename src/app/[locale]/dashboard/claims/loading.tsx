import { Skeleton } from "~/components/ui/skeleton";
import { dashContainer, dashPage } from "~/lib/ui";

export default function ClaimsLoading() {
  return (
    <div className={dashPage}>
      <div className={dashContainer}>
        {/* Header + button */}
        <div className="mb-12 flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <Skeleton className="mb-3 h-12 w-48 rounded-2xl" />
            <Skeleton className="h-6 w-64 rounded-xl" />
          </div>
          <Skeleton className="h-14 w-44 rounded-full" />
        </div>

        {/* Claim cards */}
        <div className="space-y-4">
          {Array.from({ length: 3 }).map((_, i) => (
            <div
              key={i}
              className="flex flex-col gap-4 rounded-3xl border border-border/60 bg-card p-6 sm:flex-row sm:items-center md:p-8"
            >
              <Skeleton className="h-14 w-14 shrink-0 rounded-2xl" />
              <div className="min-w-0 flex-1">
                <Skeleton className="mb-2 h-5 w-3/4 rounded-lg" />
                <Skeleton className="h-4 w-1/2 rounded-lg" />
              </div>
              <Skeleton className="h-8 w-24 shrink-0 rounded-full" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
