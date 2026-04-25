"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  FileText,
  Target,
  LayoutDashboard,
  PoundSterling,
  Type,
  GitBranch,
  Palette,
  type LucideIcon,
} from "lucide-react";
import { cn } from "@/lib/utils";

type NavItem = {
  href: string;
  label: string;
  icon: LucideIcon;
};

const NAV: NavItem[] = [
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/brief", label: "Brief", icon: FileText },
  { href: "/channels", label: "Channels", icon: Target },
  { href: "/budget", label: "Budget", icon: PoundSterling },
  { href: "/copy", label: "Copy", icon: Type },
  { href: "/flow", label: "Flow", icon: GitBranch },
  { href: "/style-guide", label: "Style guide", icon: Palette },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside
      aria-label="Primary navigation"
      className="hidden lg:flex w-64 shrink-0 flex-col border-r border-[var(--color-border)] bg-[var(--color-surface)] sticky top-0 h-screen overflow-y-auto"
    >
      <div className="px-6 pt-8 pb-6">
        <Link
          href="/dashboard"
          className="font-display text-[28px] leading-none tracking-[-0.02em] text-[var(--color-ink-1)]"
        >
          Signal
          <span aria-hidden className="ml-1 text-[var(--color-accent)]">
            .
          </span>
        </Link>
      </div>

      <nav className="px-3 flex-1 flex flex-col gap-0.5">
        {NAV.map(({ href, label, icon: Icon }) => {
          const active =
            href === "/dashboard"
              ? pathname === "/dashboard"
              : pathname?.startsWith(href);
          return (
            <Link
              key={href}
              href={href}
              aria-current={active ? "page" : undefined}
              className={cn(
                "relative flex items-center gap-2.5 h-10 px-3 rounded-md text-[14px] font-medium transition-colors",
                active
                  ? "bg-[var(--color-bg)] text-[var(--color-ink-1)]"
                  : "text-[var(--color-ink-2)] hover:text-[var(--color-ink-1)] hover:bg-[var(--color-bg)]/60",
              )}
            >
              {active && (
                <span
                  aria-hidden
                  className="absolute left-0 top-1.5 bottom-1.5 w-[2px] bg-[var(--color-accent)] rounded-full"
                />
              )}
              <Icon size={16} strokeWidth={1.75} aria-hidden />
              <span>{label}</span>
            </Link>
          );
        })}
      </nav>

      <div className="px-4 pb-6">
        <div className="rounded-xl border border-[var(--color-border)] bg-[var(--color-bg)]/60 p-3 flex items-center gap-3">
          <span
            aria-hidden
            className="size-7 rounded-md bg-[var(--color-ink-1)] text-[var(--color-bg)] grid place-items-center text-[11px] font-semibold tracking-tight"
          >
            JD
          </span>
          <span className="sr-only">Logged in as John Doe.</span>
          <div className="min-w-0">
            <div className="text-[13px] font-medium text-[var(--color-ink-1)] truncate">
              Acme Productivity
            </div>
            <div className="text-[11px] text-[var(--color-ink-3)] truncate">
              John Doe · Marketing Lead
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
}
