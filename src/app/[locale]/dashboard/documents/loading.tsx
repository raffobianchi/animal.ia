import { Skeleton } from "~/components/ui/skeleton";
import { dashContainer, dashPage } from "~/lib/ui";

export default function DocumentsLoading() {
  return (
    <div className={dashPage}>
      <div className={dashContainer}>
        {/* Header + button */}
        <div className="mb-12 flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <Skeleton className="mb-3 h-12 w-52 rounded-2xl" />
            <Skeleton className="h-6 w-72 rounded-xl" />
          </div>
          <Skeleton className="h-14 w-36 rounded-full" />
        </div>

        {/* Document grid cards */}
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <div
              key={i}
              className="rounded-3xl border border-border/60 bg-card p-6"
            >
              <Skeleton className="mb-4 h-12 w-12 rounded-2xl" />
              <Skeleton className="mb-2 h-5 w-3/4 rounded-lg" />
              <Skeleton className="mb-1 h-4 w-1/2 rounded-lg" />
              <Skeleton className="h-4 w-1/3 rounded-lg" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
