'use client'
import {
  Menubar,
  MenubarCheckboxItem,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarRadioGroup,
  MenubarRadioItem,
  MenubarSeparator,
  MenubarShortcut,
  MenubarSub,
  MenubarSubContent,
  MenubarSubTrigger,
  MenubarTrigger
} from "@/components/ui/menubar";
import { PreferencesContext } from "@/data/preferences-provider";
import { useLang } from "@/lib/hooks/useLang";
import { useTheme } from "next-themes";
import { useRouter } from 'next/navigation';
import { useContext } from "react";

export function TopMenu() {
  const [preferences, setPreferences] = useContext(PreferencesContext)

  const { txt } = useLang()
  const router = useRouter()

  const { setTheme } = useTheme()

  function handlePreviewImgChange(checked: boolean) {
    if (checked) {
      setPreferences(p => ({ ...p, previewImgs: true }))
    }
    else {
      setPreferences(p => ({ ...p, previewImgs: false }))
    }
  }

  function handleShowTypeChange(checked: boolean) {
    if (checked) {
      setPreferences(p => ({ ...p, showType: "list" }))
    }
    else {
      setPreferences(p => ({ ...p, showType: 'icon' }))
    }
  }

  function handleSizeChange(value: string) {
    if (value === "xs" || value === "sm" || value === "md" || value === "lg" || value === "xl" || value === "2xl") {
      setPreferences(p => ({ ...p, size: value }))
    }
    else {
      setPreferences(p => ({ ...p, size: 'md' }))
    }
  }

  function handleLangChange(value: string) {
    if (value === 'en' || value === 'tr') {
      setPreferences(p => ({ ...p, lang: value }))
    }
    else {
      setPreferences(p => ({ ...p, lang: 'tr' }))
    }
  }
  function handleThemeChange(value: string) {
    if (value === 'dark' || value === 'light' || value === 'system') {
      setTheme(value)
      setPreferences(p => ({ ...p, theme: value }))
    } else {
      setPreferences(p => ({ ...p, theme: 'system' }))
    }
  }

  return (
    <Menubar>
      <MenubarMenu>
        <MenubarTrigger>{txt('file')}</MenubarTrigger>
        <MenubarContent>
          <MenubarItem onClick={() => router.push(`/`)}>
            {txt('home-page')} <MenubarShortcut>⌘H</MenubarShortcut>
          </MenubarItem>
        </MenubarContent>
      </MenubarMenu>
      <MenubarMenu>
        <MenubarTrigger>{txt('appearance')}</MenubarTrigger>
        <MenubarContent>
          <MenubarSub>
            <MenubarSubTrigger disabled={preferences.showType == 'list'} inset>{txt('size')}</MenubarSubTrigger>
            <MenubarSubContent>
              <MenubarRadioGroup value={preferences.size}>
                <MenubarRadioItem value="xs" onClick={() => handleSizeChange('xs')}>{txt('xs')}</MenubarRadioItem>
                <MenubarRadioItem value="sm" onClick={() => handleSizeChange('sm')}>{txt('sm')}</MenubarRadioItem>
                <MenubarRadioItem value="md" onClick={() => handleSizeChange('md')}>{txt('md')}</MenubarRadioItem>
                <MenubarRadioItem value="lg" onClick={() => handleSizeChange('lg')}>{txt('lg')}</MenubarRadioItem>
                <MenubarRadioItem value="xl" onClick={() => handleSizeChange('xl')}>{txt('xl')}</MenubarRadioItem>
                <MenubarRadioItem value="2xl" onClick={() => handleSizeChange('2xl')}>{txt('2xl')}</MenubarRadioItem>
              </MenubarRadioGroup>ı
            </MenubarSubContent>
          </MenubarSub>
          <MenubarSeparator />
          <MenubarRadioGroup value={preferences.showType}>
            <MenubarRadioItem value="list" onClick={() => handleShowTypeChange(true)}>{txt('list')}</MenubarRadioItem>
            <MenubarRadioItem value="icon" onClick={() => handleShowTypeChange(false)}>{txt('icon')}</MenubarRadioItem>
          </MenubarRadioGroup>
          <MenubarSeparator />
          <MenubarCheckboxItem checked={preferences.previewImgs} onClick={() => handlePreviewImgChange(!preferences.previewImgs)}          >
            {txt('preview-images')}
          </MenubarCheckboxItem>
        </MenubarContent>
      </MenubarMenu>

      <MenubarMenu>
        <MenubarTrigger>{txt('preferences')}</MenubarTrigger>
        <MenubarContent>
          <MenubarSub>
            <MenubarSubTrigger inset>{txt('theme')}</MenubarSubTrigger>
            <MenubarSubContent>
              <MenubarRadioGroup value={preferences.theme}>
                <MenubarRadioItem value="light" onClick={() => handleThemeChange('light')}>{txt('light')}</MenubarRadioItem>
                <MenubarRadioItem value="dark" onClick={() => handleThemeChange('dark')}>{txt('dark')}</MenubarRadioItem>
                <MenubarRadioItem value="system" onClick={() => handleThemeChange('system')}>{txt('system')}</MenubarRadioItem>
              </MenubarRadioGroup>
            </MenubarSubContent>
          </MenubarSub>
          <MenubarSub>
            <MenubarSubTrigger inset>{txt('language')}</MenubarSubTrigger>
            <MenubarSubContent>
              <MenubarRadioGroup value={preferences.lang}>
                <MenubarRadioItem value="tr" onClick={() => handleLangChange('tr')}>{txt('tr')}</MenubarRadioItem>
                <MenubarRadioItem value="en" onClick={() => handleLangChange('en')}>{txt('en')}</MenubarRadioItem>
              </MenubarRadioGroup>
            </MenubarSubContent>
          </MenubarSub>
        </MenubarContent>
      </MenubarMenu>
    </Menubar>
  )
}