import { Skeleton } from "~/components/ui/skeleton";
import { dashContainer, dashPage } from "~/lib/ui";

export default function PoliciesLoading() {
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

        {/* Policy card */}
        <div className="rounded-3xl border border-border/60 bg-card p-8 md:p-12">
          <div className="mb-8 flex flex-wrap items-start justify-between gap-4">
            <div>
              <Skeleton className="mb-2 h-10 w-56 rounded-2xl" />
              <Skeleton className="h-5 w-40 rounded-lg" />
            </div>
            <Skeleton className="h-9 w-24 rounded-full" />
          </div>

          {/* 3-col stats grid */}
          <div className="mb-10 grid gap-5 sm:grid-cols-3">
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="rounded-2xl bg-secondary/50 p-6">
                <Skeleton className="mb-2 h-3 w-28 rounded-lg" />
                <Skeleton className="h-8 w-32 rounded-xl" />
              </div>
            ))}
          </div>

          {/* Coverage list */}
          <Skeleton className="mb-5 h-5 w-32 rounded-lg" />
          <div className="grid gap-3 sm:grid-cols-2">
            {Array.from({ length: 6 }).map((_, i) => (
              <Skeleton key={i} className="h-5 w-48 rounded-lg" />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
