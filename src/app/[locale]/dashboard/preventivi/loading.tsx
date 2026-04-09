import { Skeleton } from "~/components/ui/skeleton";
import { dashContainer, dashPage } from "~/lib/ui";

export default function PreventiviLoading() {
  return (
    <div className={dashPage}>
      <div className={dashContainer}>
        {/* Header + button */}
        <div className="mb-12 flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <Skeleton className="mb-3 h-12 w-48 rounded-2xl" />
            <Skeleton className="h-6 w-64 rounded-xl" />
          </div>
          <Skeleton className="h-14 w-52 rounded-full" />
        </div>

        {/* Card grid */}
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 3 }).map((_, i) => (
            <div
              key={i}
              className="rounded-3xl border border-border/60 bg-card p-7"
            >
              <div className="mb-4 flex items-baseline justify-between">
                <Skeleton className="h-9 w-28 rounded-xl" />
                <Skeleton className="h-4 w-12 rounded-lg" />
              </div>
              <Skeleton className="mb-2 h-4 w-40 rounded-lg" />
              <Skeleton className="h-4 w-32 rounded-lg" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
