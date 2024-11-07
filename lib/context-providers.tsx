// 'use client'

import { TabsProvider } from "@/data/tabs-provider";
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
        <TabsProvider>
          {children}
        </TabsProvider>
      </ThemeProvider>
    </PreferenceProvider>
  )
}