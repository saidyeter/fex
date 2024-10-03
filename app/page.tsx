"use client"

import { getAction } from "@/actions/file";
import { generateColor } from "@/lib/utils";
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
import { FileInfo } from "@/lib/types";

const rootDir = "../"
export default function Home() {
  const [currentDir, setCurrentDir] = useState(rootDir)

  const [content, setContent] = useState([] as FileInfo[])

  useEffect(() => {

    getAction(currentDir)
      .then(d => {
        if (d && d.success) {
          setContent(d.content ?? [])
        }
      })
  }, [currentDir])

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
function ContentArea({ content }: { content: FileInfo[] }) {
  const [showType, setShowType] = useState("icon" as ShowType)

  function handleChange(checked: CheckedState) {


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
          const propsss = {
            file: c,
            showType
          }

          return (<ItemInfo key={c.fullPath} {...propsss} />)
        })}


        <ScrollBar />
      </ScrollArea>
    </div>
  )
}

type ItemInfo = {
  file: FileInfo,
  showType: ShowType
}

function ItemInfo(
  { file, showType }: ItemInfo) {
  const { name, fullPath, isDirectory, isFile, type, ext } = file

  const color = generateColor(ext)

  const icon = <FileIcon
    color={color}
    labelColor="black"

    fold={isDirectory}
    type={type}
    extension={ext}
  // glyphColor="rgba(255,255,255,0.8)"
  />
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
      <div className="max-w-24 w-full inline-block m-4">
        {icon}
        <p className="text-sm text-center w-full overflow-ellipsis overflow-hidden text-nowrap ">{name}</p>
      </div>
    )
  }

  return content
}