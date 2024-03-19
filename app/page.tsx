"use client"

import { getAction } from "@/actions/file";
import { generateColor } from "@/lib/utils";
import { EntryType, get, getExt, getType } from "@/services/file-service";
import { useEffect, useState } from "react";
import { FileIcon } from "react-file-icon";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable"
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { CheckedState } from "@radix-ui/react-checkbox";


export default function Home() {
  const [content, setContent] = useState([] as EntryType[])

  useEffect(() => {

    getAction("dir")
      .then(d => {

        if (d && d.success) {
          setContent(d.content ?? [])
        }

      })
  }, [])

  return (
    <main className="min-h-screen container">
      <div className="h-16">header</div>
      <div className="h-[calc(100vh-6rem)]">
        <ResizablePanelGroup id={'content'} direction="horizontal">
          <ResizablePanel order={1} defaultSize={10}>One</ResizablePanel>
          <ResizableHandle withHandle />
          <ResizablePanel order={2} defaultSize={80} minSize={35}>
            <ContentArea content={content} />
          </ResizablePanel>
          <ResizableHandle withHandle />
          <ResizablePanel order={3} defaultSize={10}>three</ResizablePanel>
        </ResizablePanelGroup>
      </div>
      <div className="h-8 ">footer</div>
    </main>
  );
}

type ShowType = "icon" | "list"
function ContentArea({ content }: { content: EntryType[] }) {
  const [showType, setShowType] = useState("icon" as ShowType)

  function handleChange(checked: CheckedState) {

    // console.log(checked);

    if (checked) {
      setShowType("icon")
    }
    else {
      setShowType("list")
    }
  }
  return (
    <div className="h-full w-full">
      <div className="h-8 w-full flex items-center gap-1 p-2">

        <Checkbox id="show-type" onCheckedChange={handleChange} defaultChecked />
        <label htmlFor="show-type">Show as Icon</label>

      </div>
      <ScrollArea className="h-[calc(100%-2rem)] w-full">

        {content.map(c => {
          return showType == "icon" ?
            (<ItemInfoIcon {...c} key={c.fullPath} />)
            :
            (<ItemInfoLine {...c} key={c.fullPath} />)


        })}


        <ScrollBar />
      </ScrollArea>
    </div>
  )
}

function ItemInfoIcon({ name, fullPath, isDir, subDir }: EntryType) {

  const ext = getExt(isDir ? "folder" : name)
  // console.log(ext);

  const color = generateColor(ext)
  // console.log(ext, color);

  const type = getType(ext)

  const icon = <FileIcon
    color={color}
    labelColor="black"

    fold={!isDir}
    type={type}
    extension={isDir ? undefined : ext}
  // glyphColor="rgba(255,255,255,0.8)"
  />

  return (
    <div className="max-w-24 w-full inline-block m-4">
      {icon}
      <p className="text-sm text-center w-full overflow-ellipsis overflow-hidden text-nowrap ">{name}</p>
    </div>
  )
}




function ItemInfoLine({ name, fullPath, isDir, subDir }: EntryType) {

  const ext = getExt(isDir ? "folder" : name)
  // console.log(ext);

  const color = generateColor(ext)
  // console.log(ext, color);

  const type = getType(ext)

  const icon = <FileIcon
    color={color}
    labelColor="black"

    fold={!isDir}
    type={type}
    extension={isDir ? undefined : ext}
  // glyphColor="rgba(255,255,255,0.8)"
  />

  return (
    <div className="flex items-center justify-start gap-4 p-2">
      <div className="max-w-8 w-8">
        {icon}
      </div>
      <p className="text-sm ">{name}</p>
    </div>
  )
} 