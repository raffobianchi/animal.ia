"use client";

import Link from "next/link";
import { useTranslations } from "next-intl";
import { useParams, usePathname, useRouter } from "next/navigation";
import { cn } from "~/lib/utils";

const navItems = [
  { key: "overview", icon: "📊", href: "" },
  { key: "policies", icon: "🛡️", href: "/policies" },
  { key: "claims", icon: "📝", href: "/claims" },
  { key: "records", icon: "📋", href: "/records" },
  { key: "documents", icon: "📁", href: "/documents" },
] as const;

export function DashboardSidebar() {
  const t = useTranslations("dashboard.nav");
  const tc = useTranslations("common");
  const params = useParams();
  const pathname = usePathname();
  const router = useRouter();
  const locale = params.locale as string;
  const otherLocale = locale === "it" ? "en" : "it";
  const basePath = `/${locale}/dashboard`;

  return (
    <>
      {/* Desktop sidebar */}
      <aside className="hidden w-72 shrink-0 flex-col border-r border-border/60 bg-card md:flex" aria-label="Dashboard sidebar">
        <div className="flex h-20 items-center gap-2.5 px-7">
          <Link href={`/${locale}`} className="flex items-center gap-2.5">
            <span className="text-3xl">🦒</span>
            <span className="text-2xl font-bold tracking-tight text-warm">
              animal<span className="text-giraffe">.ia</span>
            </span>
          </Link>
        </div>
        <nav className="flex flex-1 flex-col gap-1.5 p-5" aria-label="Dashboard navigation">
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
                aria-current={isActive ? "page" : undefined}
                className={cn(
                  "flex items-center gap-4 rounded-2xl px-4 py-3.5 text-base font-medium transition-colors",
                  isActive
                    ? "bg-secondary text-warm"
                    : "text-muted-foreground hover:bg-secondary/60 hover:text-warm"
                )}
              >
                <span className="text-xl" aria-hidden="true">{icon}</span>
                {t(key)}
              </Link>
            );
          })}

          {/* Vet finder CTA */}
          <Link
            href={`/${locale}/vet`}
            className="mt-4 flex items-center gap-4 rounded-2xl bg-giraffe/10 px-4 py-3.5 text-base font-semibold text-giraffe-dark transition-colors hover:bg-giraffe/20"
          >
            <span className="text-xl" aria-hidden="true">🏥</span>
            {t("vet")}
          </Link>
        </nav>

        {/* User section */}
        <div className="border-t border-border/60 p-5">
          <Link
            href={`/${otherLocale}/dashboard`}
            className="mb-2 flex items-center gap-4 rounded-2xl px-4 py-3 text-base font-medium text-muted-foreground transition-colors hover:bg-secondary/60 hover:text-warm"
          >
            <span className="text-xl">🌐</span>
            {otherLocale.toUpperCase()}
          </Link>
          <div className="my-3 flex items-center gap-3 rounded-2xl bg-secondary/50 px-4 py-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-full bg-giraffe text-base font-bold text-warm">
              U
            </div>
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-semibold text-warm">User</p>
              <p className="truncate text-xs text-muted-foreground">user@animal.ia</p>
            </div>
          </div>
          <button
            onClick={() => router.push(`/${locale}`)}
            className="flex w-full items-center gap-4 rounded-2xl px-4 py-3 text-base font-medium text-muted-foreground transition-colors hover:bg-secondary/60 hover:text-warm"
          >
            <span className="text-xl">🚪</span>
            {tc("logout")}
          </button>
        </div>
      </aside>

      {/* Mobile bottom nav */}
      <nav className="fixed bottom-0 left-0 right-0 z-50 flex border-t border-border/60 bg-background/95 pb-[env(safe-area-inset-bottom)] backdrop-blur-xl md:hidden" aria-label="Dashboard navigation">
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
              aria-current={isActive ? "page" : undefined}
              className={cn(
                "relative flex flex-1 flex-col items-center gap-1 py-2.5 text-[11px] font-medium transition-colors",
                isActive ? "text-warm" : "text-muted-foreground"
              )}
            >
              {isActive && (
                <span
                  aria-hidden="true"
                  className="absolute top-0 h-0.5 w-10 rounded-full bg-giraffe"
                />
              )}
              <span className="text-2xl" aria-hidden="true">{icon}</span>
              <span>{t(key)}</span>
            </Link>
          );
        })}
      </nav>
    </>
  );
}
