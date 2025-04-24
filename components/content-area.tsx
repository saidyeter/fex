"use client"

import { checkDirAction, getDirectoryContentAction } from "@/actions/file";
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
    getDirectoryContentAction(dirParams)
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

function ItemInfo({ file }: ItemInfoProps) {

  const [preferences,] = useContext(PreferencesContext)
  const showType = preferences.showType

  const { name, fullPath, isDirectory, isFile, ext } = file
  const color = isFile ? generateColor(ext) : preferences.theme == 'dark' ? "#666" : "#ddd"
  let twSize = getIconSize()

  let icon = (
    <div className={twSize}>
      <FileIcon
        color={color}
        labelColor={preferences.theme == 'dark' ? "white" : "black"}
        labelTextColor={preferences.theme == 'dark' ? "black" : "white"}
        type={isDirectory ? 'drive' : 'spreadsheet'}
        extension={isFile ? ext : ""}
        isDirectory={isDirectory}
      />
    </div>
  )

  if (isFile && isRenderableImage(ext) && preferences.previewImgs) {
    const imgPath = '/api/file?path=' + fullPath + '&ext=' + ext
    icon = <img src={imgPath} className={`${twSize} rounded-md object-cover`} />
  }

  let content = (
    <div className="flex items-center justify-start gap-4 p-2">
      {icon}
      <p className="text-lg ">{name}</p>
    </div>
  )
  if (showType == "icon") {
    content = (
      <div className={`inline-block m-4 ${twSize} justify-between `}>
        {icon}
        <p className="text-lg text-center overflow-ellipsis overflow-hidden text-nowrap ">{name}</p>
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

function isRenderableImage(extension: string): boolean {
  const ext = extension.toLowerCase();
  const renderableExtensions = new Set([
    "png",
    "jpg",
    "jpeg",
    "gif",
    "bmp",
    "webp",
    "ico",
    "svg",
  ]);
  return renderableExtensions.has(ext || "");
}

function getIconSize() {

  const [preferences,] = useContext(PreferencesContext)
  const showType = preferences.showType

  if (showType !== "icon") {
    return "w-8 h-10"
  }
  const size = preferences.size

  let twSize = "w-24 h-32";
  switch (size) {
    case 'xs':
      twSize = "w-12 h-16";
      break;
    case 'sm':
      twSize = "w-16 h-20";
      break;
    case 'lg':
      twSize = "w-32 h-40";
      break;
    case 'xl':
      twSize = "w-36 h-44";
      break;
    case '2xl':
      twSize = "w-48 h-60";
      break;

    default:
      break;
  }
  return twSize
}