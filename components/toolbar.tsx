
"use client"

import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { PreferencesContext } from "@/components/preferences-context";
import { useLang } from "@/lib/useLang";
import { CheckedState } from "@radix-ui/react-checkbox";
import { useContext } from "react";
import { useTheme } from "next-themes";


export function Toolbar() {
    const [preferences, setPreferences] = useContext(PreferencesContext)
    const { txt } = useLang()

    const { setTheme } = useTheme()
    
    function handleShowTypeChange(checked: CheckedState) {
        if (checked) {
            setPreferences(p => ({ ...p, showType: "list" }))
        }
        else {
            setPreferences(p => ({ ...p, showType: 'icon' }))
        }
    }

    function handleSizeChange(value: string) {
        if (
            value === "xs" || value === "sm" || value === "md" || value === "lg" || value === "xl" || value === "2xl"
        ) {

            setPreferences(p => ({ ...p, size: value }))
        }
        else {
            setPreferences(p => ({ ...p, size: 'md' }))

        }
    }

    function handleLangChange(value: string) {
        if (
            value === 'en' || value === 'tr'
        ) {

            setPreferences(p => ({ ...p, lang: value }))
        }
        else {
            setPreferences(p => ({ ...p, lang: 'tr' }))

        }
    }
    function handleThemeChange(value: string) {
        if (
            value === 'dark' || value === 'light' || value === 'system'
        ) {

            setTheme(value)
            setPreferences(p => ({ ...p, theme: value }))
        }
        else {
            setPreferences(p => ({ ...p, theme: 'system' }))

        }
    }

    return (
        <div className="w-full flex flex-col items-start gap-4 p-2 border-b border-gray-200 flex-wrap">
            <div className="flex items-center gap-1">
                <Label>{txt('appearance')} : </Label>
                <Checkbox
                    id="show-type"
                    onCheckedChange={handleShowTypeChange}
                    defaultChecked={preferences.showType === "list"}
                />
                <label htmlFor="show-type">{txt('list')}</label>
            </div>
            {
                preferences.showType == 'list' ? null :
                    (
                        <div className="flex items-center gap-1 ">
                            <Label>{txt('size')} : </Label>
                            <RadioGroup
                                defaultValue={preferences.size}
                                className="grid-flow-col"
                                onValueChange={handleSizeChange}>
                                <div className="flex items-center space-x-2">
                                    <RadioGroupItem value="xs" id="xs" />
                                    <Label htmlFor="xs">{txt('xs')}</Label>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <RadioGroupItem value="sm" id="sm" />
                                    <Label htmlFor="sm">{txt('sm')}</Label>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <RadioGroupItem value="md" id="md" />
                                    <Label htmlFor="md">{txt('md')}</Label>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <RadioGroupItem value="lg" id="lg" />
                                    <Label htmlFor="lg">{txt('lg')}</Label>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <RadioGroupItem value="xl" id="xl" />
                                    <Label htmlFor="xl">{txt('xl')}</Label>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <RadioGroupItem value="2xl" id="2xl" />
                                    <Label htmlFor="2xl">{txt('2xl')}</Label>
                                </div>
                            </RadioGroup>

                        </div>
                    )
            }
            <div className="flex items-center gap-1 ">
                <Label>{txt('language')} : </Label>
                <RadioGroup
                    defaultValue={preferences.lang}
                    className="grid-flow-col"
                    onValueChange={handleLangChange}>
                    <div className="flex items-center space-x-2">
                        <RadioGroupItem value="tr" id="tr" />
                        <Label htmlFor="tr">{txt('tr')}</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                        <RadioGroupItem value="en" id="en" />
                        <Label htmlFor="en">{txt('en')}</Label>
                    </div>
                </RadioGroup>

            </div>

            <div className="flex items-center gap-1 ">

                <Label>{txt('theme')} : </Label>
                <RadioGroup
                    defaultValue={preferences.theme}
                    className="grid-flow-col"
                    onValueChange={handleThemeChange}>
                    <div className="flex items-center space-x-2">
                        <RadioGroupItem value="dark" id="dark" />
                        <Label htmlFor="dark">{txt('dark')}</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                        <RadioGroupItem value="light" id="light" />
                        <Label htmlFor="light">{txt('light')}</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                        <RadioGroupItem value="system" id="system" />
                        <Label htmlFor="system">{txt('system')}</Label>
                    </div>
                </RadioGroup>

            </div>
        </div>
    )
}