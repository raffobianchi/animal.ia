import { Skeleton } from "~/components/ui/skeleton";
import { dashContainer, dashPage } from "~/lib/ui";

export default function DashboardLoading() {
  return (
    <div className={dashPage}>
      <div className={dashContainer}>
        {/* Header */}
        <div className="mb-12">
          <Skeleton className="mb-3 h-12 w-48 rounded-2xl" />
          <Skeleton className="h-6 w-72 rounded-xl" />
        </div>

        {/* 4-stat cards grid */}
        <div className="mb-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <div
              key={i}
              className="rounded-3xl border border-border/60 bg-card p-7"
            >
              <Skeleton className="mb-5 h-14 w-14 rounded-2xl" />
              <Skeleton className="mb-2 h-4 w-24 rounded-lg" />
              <Skeleton className="mb-2 h-8 w-32 rounded-xl" />
              <Skeleton className="h-4 w-40 rounded-lg" />
            </div>
          ))}
        </div>

        {/* 2-column layout */}
        <div className="grid gap-6 lg:grid-cols-2">
          <div className="rounded-3xl border border-border/60 bg-card p-8">
            <Skeleton className="mb-6 h-8 w-44 rounded-xl" />
            <div className="space-y-3">
              {Array.from({ length: 3 }).map((_, i) => (
                <Skeleton key={i} className="h-20 w-full rounded-2xl" />
              ))}
            </div>
          </div>
          <div className="rounded-3xl border border-border/60 bg-card p-8">
            <Skeleton className="mb-6 h-8 w-40 rounded-xl" />
            <div className="space-y-3">
              {Array.from({ length: 3 }).map((_, i) => (
                <Skeleton key={i} className="h-20 w-full rounded-2xl" />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
