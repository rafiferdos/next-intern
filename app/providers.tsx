"use client";

import { NextUIProvider } from "@nextui-org/system";
import { ThemeProvider } from "next-themes";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <NextUIProvider>
      <ThemeProvider attribute="class" defaultTheme="dark" themes={['light', 'dark']}>
        {children}
      </ThemeProvider>
    </NextUIProvider>
  );
}
