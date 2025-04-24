'use client'

import { createContext, useState } from "react";

type Preferences = {
  theme: "light" | "dark" | 'system',
  lang: "en" | "tr",
  showType: "icon" | "list",
  size: "xs" | "sm" | "md" | "lg" | "xl" | "2xl"
  previewImgs: boolean,
}

export const PreferencesContext = createContext({} as [Preferences, React.Dispatch<React.SetStateAction<Preferences>>]);


export function PreferenceProvider({ children }: { children: React.ReactNode }) {

  // const { setTheme, theme } = useTheme()
  // console.log(them)

  const [preferences, setPreferences] = useState<Preferences>({
    theme: "light",
    lang: "tr",
    showType: "icon",
    size: "md",
    previewImgs: true,
  })

  return (
    <PreferencesContext.Provider value={[preferences, setPreferences]}>
      {children}
    </PreferencesContext.Provider>
  )
}