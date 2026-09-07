import { ReactNode } from "react";

/**
 * Optional analytics integration point.
 * Enable by setting NEXT_PUBLIC_ENABLE_ANALYTICS=true
 * and installing @vercel/analytics when ready.
 */
export function AnalyticsProvider({ children }: { children?: ReactNode }) {
  const enabled = process.env.NEXT_PUBLIC_ENABLE_ANALYTICS === "true";

  if (!enabled) {
    return children ?? null;
  }

  // Swap this stub for <Analytics /> from @vercel/analytics when enabled.
  return children ?? null;
}
