// 'use client'

import { ThemeProvider } from "@/data/theme-provider";
import { PreferenceProvider } from "../data/preferences-provider";

export function ContextProvider({ children }: { children: React.ReactNode }) {

  return (
    <PreferenceProvider>
      <ThemeProvider
        attribute="class"
        defaultTheme="system"
        enableSystem
        disableTransitionOnChange
      >
        {children}
      </ThemeProvider>
    </PreferenceProvider>
  )
}