"use client";

import Link from "next/link";
import { useParams, usePathname, useRouter } from "next/navigation";
import { cn } from "~/lib/utils";
import { Separator } from "~/components/ui/separator";

const navItems = [
  { key: "overview", icon: "📊", href: "" },
  { key: "policies", icon: "🛡️", href: "/policies" },
  { key: "claims", icon: "📝", href: "/claims" },
  { key: "records", icon: "📋", href: "/records" },
  { key: "documents", icon: "📁", href: "/documents" },
] as const;

const labels: Record<string, { it: string; en: string }> = {
  overview: { it: "Panoramica", en: "Overview" },
  policies: { it: "Polizze", en: "Policies" },
  claims: { it: "Sinistri", en: "Claims" },
  records: { it: "Cartella Clinica", en: "Medical Records" },
  documents: { it: "Documenti", en: "Documents" },
};

export function DashboardSidebar() {
  const params = useParams();
  const pathname = usePathname();
  const router = useRouter();
  const locale = params.locale as string;
  const isIt = locale === "it";
  const otherLocale = locale === "it" ? "en" : "it";
  const basePath = `/${locale}/dashboard`;

  return (
    <>
      {/* Desktop sidebar */}
      <aside className="hidden w-60 shrink-0 flex-col border-r border-border bg-card md:flex">
        <div className="flex h-16 items-center gap-2 border-b border-border px-5">
          <Link href={`/${locale}`} className="flex items-center gap-2">
            <span className="text-xl">🦒</span>
            <span className="font-bold text-warm">
              animal<span className="text-giraffe">.ia</span>
            </span>
          </Link>
        </div>
        <nav className="flex flex-1 flex-col gap-1 p-3">
          {navItems.map(({ key, icon, href }) => {
            const fullPath = `${basePath}${href}`;
            const isActive =
              href === ""
                ? pathname === basePath || pathname === `${basePath}/`
                : pathname.startsWith(fullPath);
            return (
              <Link
                key={key}
                href={fullPath}
                className={cn(
                  "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm transition-colors",
                  isActive
                    ? "bg-giraffe/10 font-medium text-warm"
                    : "text-muted-foreground hover:bg-muted hover:text-foreground"
                )}
              >
                <span>{icon}</span>
                {labels[key]?.[locale as "it" | "en"] ?? labels[key]?.en}
              </Link>
            );
          })}
        </nav>

        {/* User section */}
        <div className="border-t border-border p-3">
          <Link
            href={`/${otherLocale}/dashboard`}
            className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"
          >
            <span>🌐</span>
            {otherLocale.toUpperCase()}
          </Link>
          <Separator className="my-2" />
          <div className="flex items-center gap-3 rounded-lg px-3 py-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-giraffe/20 text-sm font-medium text-warm">
              U
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-warm truncate">User</p>
              <p className="text-xs text-muted-foreground truncate">user@animal.ia</p>
            </div>
          </div>
          <button
            onClick={() => router.push(`/${locale}`)}
            className="mt-1 flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"
          >
            <span>🚪</span>
            {isIt ? "Esci" : "Log out"}
          </button>
        </div>
      </aside>

      {/* Mobile bottom nav */}
      <nav className="fixed bottom-0 left-0 right-0 z-50 flex border-t border-border bg-card md:hidden">
        {navItems.map(({ key, icon, href }) => {
          const fullPath = `${basePath}${href}`;
          const isActive =
            href === ""
              ? pathname === basePath || pathname === `${basePath}/`
              : pathname.startsWith(fullPath);
          return (
            <Link
              key={key}
              href={fullPath}
              className={cn(
                "flex flex-1 flex-col items-center gap-1 py-2.5 text-xs",
                isActive
                  ? "text-giraffe font-medium"
                  : "text-muted-foreground"
              )}
            >
              <span className="text-lg">{icon}</span>
              <span>{labels[key]?.[locale as "it" | "en"] ?? labels[key]?.en}</span>
            </Link>
          );
        })}
      </nav>
    </>
  );
}
