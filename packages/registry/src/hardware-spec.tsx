import * as React from "react";
import { cn } from "@/lib/utils";

export interface HardwareSpecProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Interface name, e.g. "USB 3.1 Gen 2" */
  name: string;
  /** Interface type, e.g. "Universal Serial Bus" */
  type?: string;
  /** Version string, e.g. "3.1 Gen 2" */
  version?: string;
  /** Transfer speed or clock frequency, e.g. "10 Gbps" or "400 kHz" */
  speed?: string;
  /** Operating voltage(s), e.g. "3.3V / 1.8V" */
  voltage?: string;
  /** Number of physical pins/lanes */
  pins?: number;
  /** Protocol or standard, e.g. "PCIe Gen 4" */
  protocol?: string;
  /** Optional prose description */
  description?: string;
}

/**
 * HardwareSpec — structured hardware interface specification card.
 *
 * Displays key interface parameters (type, version, speed, voltage, pins,
 * protocol) as a compact key-value grid. Fields are only rendered when
 * provided, so the card adapts to how much data you supply.
 *
 * @example
 * <HardwareSpec
 *   name="USB 3.1 Gen 2"
 *   type="Universal Serial Bus"
 *   speed="10 Gbps"
 *   voltage="3.3V / 1.8V"
 *   pins={24}
 *   description="High-speed USB for peripheral connectivity."
 * />
 */
export const HardwareSpec = React.forwardRef<HTMLDivElement, HardwareSpecProps>(
  (
    {
      name,
      type,
      version,
      speed,
      voltage,
      pins,
      protocol,
      description,
      className,
      ...props
    },
    ref,
  ) => {
    const fields: Array<{ label: string; value: React.ReactNode }> = [];
    if (type) fields.push({ label: "Type", value: type });
    if (version) fields.push({ label: "Version", value: version });
    if (speed) fields.push({ label: "Speed", value: speed });
    if (voltage) fields.push({ label: "Voltage", value: voltage });
    if (pins !== undefined) fields.push({ label: "Pins", value: pins });
    if (protocol) fields.push({ label: "Protocol", value: protocol });

    return (
      <div
        ref={ref}
        data-hardware-spec
        className={cn(
          "my-6 overflow-hidden rounded-lg border border-border bg-card text-card-foreground",
          className,
        )}
        {...props}
      >
        {/* Header */}
        <div className="flex items-center gap-2 border-b border-border bg-muted/40 px-4 py-2.5">
          {/* Chip icon */}
          <svg
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="shrink-0 text-muted-foreground"
          >
            <rect x="9" y="9" width="6" height="6" rx="1" />
            <path d="M15 2v2M9 2v2M2 9h2M2 15h2M22 9h-2M22 15h-2M15 22v-2M9 22v-2M5 5l2 2M19 5l-2 2M5 19l2-2M19 19l-2-2" />
          </svg>
          <span className="text-sm font-semibold text-foreground">{name}</span>
        </div>

        {/* Fields grid */}
        {fields.length > 0 && (
          <dl className="grid grid-cols-2 gap-px bg-border sm:grid-cols-3">
            {fields.map(({ label, value }) => (
              <div key={label} className="bg-card px-4 py-2.5">
                <dt className="text-[11px] font-medium uppercase tracking-wide text-muted-foreground">
                  {label}
                </dt>
                <dd className="mt-0.5 font-mono text-sm text-foreground">
                  {value}
                </dd>
              </div>
            ))}
          </dl>
        )}

        {/* Description */}
        {description && (
          <p className="border-t border-border px-4 py-3 text-sm text-muted-foreground">
            {description}
          </p>
        )}
      </div>
    );
  },
);
HardwareSpec.displayName = "HardwareSpec";
