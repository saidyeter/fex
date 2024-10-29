"use client"

import { PreferencesContext } from "@/components/preferences-context";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { FileInfo } from "@/lib/types";
import { generateColor } from "@/lib/utils";
import { useRouter } from 'next/navigation';
import { useContext } from "react";
import { FileIcon } from "../lib/react-file-icon";
// import { FileIcon } from "react-file-icon";
// import FileIcon from "./file-icon";
import { Toolbar } from "./toolbar";


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

  const { name, fullPath, isDirectory, isFile, ext } = file
  const router = useRouter()
  const color = generateColor(isFile ? ext : "")

  const icon = <FileIcon
    color={color}
    labelColor="black"
    type={isDirectory ? 'drive' : 'spreadsheet'}
    extension={isFile ? ext : ""}
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