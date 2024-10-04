// 'use client'

import { ThemeProvider } from "@/components/theme-provider";
import { PreferenceProvider } from "../components/preferences-context";

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