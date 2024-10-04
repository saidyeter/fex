"use client"

import { checkDirAction, getAction } from "@/actions/file";
import { ContentArea } from "@/components/content-area";
import { Checkbox } from "@/components/ui/checkbox";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { FileInfo } from "@/lib/types";
import { generateColor } from "@/lib/utils";
import { CheckedState } from "@radix-ui/react-checkbox";
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from "react";
import { FileIcon } from "react-file-icon";

const rootDir = "../"
export default function Home() {
  const searchParams = useSearchParams()

  const search = searchParams.get('dir')
  const router = useRouter()
  const [content, setContent] = useState([] as FileInfo[])

  useEffect(() => {
    checkDirAction(search ?? rootDir)
      .then(d => {
        if (d) {
          getAction(search ?? rootDir!)
            .then(d => {
              if (d && d.success) {
                setContent(d.content ?? [])
              }
            })
        }
        else {
          router.push(`?dir=${rootDir}`)
        }
      })
  }, [search])

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
 