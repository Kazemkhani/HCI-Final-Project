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

export function TopNav() {
  const pathname = usePathname();

  return (
    <header className="lg:hidden sticky top-0 z-40 border-b border-[var(--color-border)] bg-[var(--color-surface)]/85 backdrop-blur supports-[backdrop-filter]:bg-[var(--color-surface)]/70">
      <div className="flex items-center justify-between px-5 h-14">
        <Link
          href="/dashboard"
          className="font-display text-[22px] leading-none tracking-[-0.02em] text-[var(--color-ink-1)]"
        >
          Signal
          <span aria-hidden className="ml-1 text-[var(--color-accent)]">
            .
          </span>
        </Link>
        <span
          aria-hidden
          className="size-7 rounded-md bg-[var(--color-ink-1)] text-[var(--color-bg)] grid place-items-center text-[11px] font-semibold tracking-tight"
        >
          JD
        </span>
        <span className="sr-only">Logged in as John Doe.</span>
      </div>
      <nav
        aria-label="Primary"
        className="flex gap-1 overflow-x-auto px-3 pb-2 -mb-px"
      >
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
                "shrink-0 inline-flex items-center gap-1.5 h-8 px-3 rounded-md text-[12.5px] font-medium",
                active
                  ? "bg-[var(--color-bg)] text-[var(--color-ink-1)]"
                  : "text-[var(--color-ink-2)] hover:text-[var(--color-ink-1)]",
              )}
            >
              <Icon size={14} strokeWidth={1.75} aria-hidden />
              <span>{label}</span>
            </Link>
          );
        })}
      </nav>
    </header>
  );
}
