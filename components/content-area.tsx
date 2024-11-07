"use client"

import { checkDirAction, getAction } from "@/actions/file";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { PreferencesContext } from "@/data/preferences-provider";
import { Tab } from "@/lib/db";
import { FileInfo } from "@/lib/types";
import { generateColor } from "@/lib/utils";
import Link from "next/link";
import { useRouter } from 'next/navigation';
import { useContext, useEffect, useState } from "react";
import { FileIcon } from "../lib/react-file-icon";
import { Toolbar } from "./toolbar";

export function ContentArea({ tab }: { tab: Tab }) {

  const dirPath = tab.path
  const [isDir, setIsDir] = useState(false)
  const router = useRouter()

  useEffect(() => {
    checkDirAction(dirPath ?? '')
      .then(d => {
        if (!d) {
          router.push(`/`)
        }
        else {
          setIsDir(true)
        }
      })
  }, [dirPath, router])


  const [content, setContent] = useState([] as FileInfo[])
  useEffect(() => {

    getAction(dirPath)
      .then(d => {
        if (d && d.success) {
          setContent(d.content ?? [])
        }
      })
  }, [dirPath])


  if (!isDir) {
    return <div>loading...</div>
  }

  const params = new URLSearchParams()
  params.append('tab', tab.order?.toString() ?? '')
  params.append('take', tab.take.toString())
  params.append('skip', tab.skip.toString())
  if (tab.search) {
    params.append('search', tab.search)
  }
  if (tab.orderBy) {
    params.append('orderBy', tab.orderBy)
  }
  return (
    <div className="h-full w-full">
      <Toolbar path={dirPath} />
      <ScrollArea className="h-[calc(100%-2rem)] w-full">
        {content.map(c => <ItemInfo key={c.fullPath} file={c} params={params.toString()} />)}
        <ScrollBar />
      </ScrollArea>
    </div>
  )
}

type ItemInfoProps = {
  file: FileInfo,
  params: string
}

function ItemInfo({ file, params }: ItemInfoProps) {

  const [preferences,] = useContext(PreferencesContext)
  const showType = preferences.showType
  const size = preferences.size

  const { name, fullPath, isDirectory, isFile, ext } = file
  const router = useRouter()
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
    <Link href={`?dir=${btoa(fullPath)}&${params}`} >
      {content}
    </Link>
  )
}
