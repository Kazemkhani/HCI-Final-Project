import type { LucideIcon } from "lucide-react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export function EmptyState({
  Icon,
  title,
  body,
  action,
}: {
  Icon?: LucideIcon;
  title: string;
  body?: string;
  action?: { label: string; href: string };
}) {
  return (
    <div className="min-h-[40vh] flex flex-col items-center justify-center text-center px-6">
      {Icon && (
        <Icon
          size={28}
          strokeWidth={1.4}
          className="text-[var(--color-ink-400)] mb-4"
          aria-hidden
        />
      )}
      <h2 className="font-display italic text-[28px] sm:text-[32px] leading-[1.1] text-[var(--color-ink-900)]">
        {title}
      </h2>
      {body && (
        <p className="mt-2 text-[14px] text-[var(--color-ink-600)] max-w-sm">
          {body}
        </p>
      )}
      {action && (
        <Link
          href={action.href}
          className="mt-6 inline-flex items-center gap-1.5 h-9 px-4 rounded-md bg-[var(--color-ink-900)] text-[var(--color-bg)] text-[13.5px] font-medium hover:translate-y-[-1px] transition-transform"
        >
          {action.label}
          <ArrowRight size={13} aria-hidden />
        </Link>
      )}
    </div>
  );
}
