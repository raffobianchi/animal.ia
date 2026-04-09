import { Skeleton } from "~/components/ui/skeleton";
import { dashPage } from "~/lib/ui";

export default function RecordsLoading() {
  return (
    <div className={dashPage}>
      <div className="mx-auto max-w-4xl">
        {/* Header + button */}
        <div className="mb-12 flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <Skeleton className="mb-3 h-12 w-48 rounded-2xl" />
            <Skeleton className="h-6 w-64 rounded-xl" />
          </div>
          <Skeleton className="h-14 w-40 rounded-full" />
        </div>

        {/* Record entries */}
        <div className="space-y-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <div
              key={i}
              className="flex gap-4 rounded-3xl border border-border/60 bg-card p-6"
            >
              <Skeleton className="h-12 w-12 shrink-0 rounded-2xl" />
              <div className="min-w-0 flex-1">
                <Skeleton className="mb-2 h-5 w-2/3 rounded-lg" />
                <Skeleton className="mb-1 h-4 w-1/2 rounded-lg" />
                <Skeleton className="h-4 w-1/3 rounded-lg" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
