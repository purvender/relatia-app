import { getEventStatusBadgeConfig } from "@/lib/events/event-helpers";

export function EventStatusBadge({ status }: { status: string }) {
  const config = getEventStatusBadgeConfig(status);

  return (
    <span
      className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold ${config.className}`}
    >
      {config.label}
    </span>
  );
}
