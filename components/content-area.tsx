"use client"

import { checkDirAction, getAction } from "@/actions/file";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { PreferencesContext } from "@/data/preferences-provider";
import { useDirParams } from "@/lib/hooks/use-dir-params";
import { FileInfo } from "@/lib/types";
import { generateColor } from "@/lib/utils";
import Link from "next/link";
import { useRouter } from 'next/navigation';
import { useContext, useEffect, useState } from "react";
import { FileIcon } from "../lib/react-file-icon";
import { Toolbar } from "./toolbar";

export function ContentArea({ }: {}) {
  const dirParams = useDirParams();
  const dirPath = dirParams.path;
  const [isDir, setIsDir] = useState(false)
  const router = useRouter()

  useEffect(() => {
    checkDirAction(dirPath ?? '')
      .then(d => {
        if (!d) { router.push(`/`) }
        else { setIsDir(true) }
      })
  }, [dirPath, router])

  const [content, setContent] = useState([] as FileInfo[])
  useEffect(() => {
    getAction(dirParams)
      .then(d => {
        if (d && d.success) {
          setContent(d.content ?? [])
        }
      })
  }, [dirPath])


  if (!isDir) {
    return <div>loading...</div>
  }


  return (
    <div className="h-full w-full">
      <Toolbar path={dirPath} />
      <ScrollArea className="h-[calc(100%-9.7rem)] w-full">
        {content.map(c => <ItemInfo key={c.fullPath} file={c} />)}
        <ScrollBar />
      </ScrollArea>
    </div>
  )
}

type ItemInfoProps = {
  file: FileInfo,
}

function ItemInfo({ file, }: ItemInfoProps) {

  const [preferences,] = useContext(PreferencesContext)
  const showType = preferences.showType
  const size = preferences.size

  const { name, fullPath, isDirectory, isFile, ext } = file
  const color = isFile ? generateColor(ext) : preferences.theme == 'dark' ? "#666" : "#ddd"

  const icon = <FileIcon
    color={color}
    labelColor={preferences.theme == 'dark' ? "white" : "black"}
    labelTextColor={preferences.theme == 'dark' ? "black" : "white"}
    type={isDirectory ? 'drive' : 'spreadsheet'}
    extension={isFile ? ext : ""}
    isDirectory={isDirectory}
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
    <Link href={`?p=${btoa(fullPath)}`} >
      {content}
    </Link>
  )
}
