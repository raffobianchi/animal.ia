import type { ReactNode } from "react";

// Root layout — just passes through to [locale] layout
export default function RootLayout({ children }: { children: ReactNode }) {
  return children;
}
