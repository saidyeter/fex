"use client"

import { Checkbox } from "@/components/ui/checkbox";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { FileInfo } from "@/lib/types";
import { generateColor } from "@/lib/utils";
import { CheckedState } from "@radix-ui/react-checkbox";
import { useRouter } from 'next/navigation';
import { useContext, useState } from "react";
import { FileIcon } from "react-file-icon";
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { PreferencesContext } from "@/components/preferences-context";
import { Toolbar } from "./toolbar";

type ShowType = "icon" | "list"

export function ContentArea({ content }: { content: FileInfo[] }) {

    return (
        <div className="h-full w-full">
            <Toolbar />
            <ScrollArea className="h-[calc(100%-2rem)] w-full">
                {content.map(c => <ItemInfo key={c.fullPath} file={c} />)}
                <ScrollBar />
            </ScrollArea>
        </div>
    )
}

type ItemInfoProps = {
    file: FileInfo,
}

function ItemInfo({ file }: ItemInfoProps) {


    const [preferences,] = useContext(PreferencesContext)
    const showType = preferences.showType
    const size = preferences.size

    const { name, fullPath, isDirectory, isFile, type, ext } = file
    const router = useRouter()
    const color = generateColor(ext)

    const icon = <FileIcon
        color={color}
        labelColor="black"
        fold={isDirectory}
        type={type}
        extension={ext}
    />
    let twSize = "max-w-24";
    switch (size) {
        case 'xs':
            twSize = "max-w-12";
            break;
        case 'sm':
            twSize = "max-w-16";
            break;
        case 'lg':
            twSize = "max-w-32";
            break;
        case 'xl':
            twSize = "max-w-36";
            break;
        case '2xl':
            twSize = "max-w-48";
            break;

        default:
            break;
    }

    let content = (
        <div className="flex items-center justify-start gap-4 p-2">
            <div className="max-w-8 w-8">
                {icon}
            </div>
            <p className="text-sm ">{name}</p>
        </div>
    )
    if (showType == "icon") {
        content = (
            <div className={`w-full inline-block m-4 ${twSize}`}>
                {icon}
                <p className="text-sm text-center w-full overflow-ellipsis overflow-hidden text-nowrap ">{name}</p>
            </div>
        )
    }

    if (isFile) {
        return content
    }

    return (
        <button onClick={() => router.push(`?dir=${fullPath}`)} >
            {content}
        </button>
    )
}