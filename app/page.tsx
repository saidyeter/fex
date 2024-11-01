"use client"

import { checkDirAction, getAction } from "@/actions/file";
import { ContentArea } from "@/components/content-area";
import { TopMenu } from "@/components/top-menu";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import { FileInfo } from "@/lib/types";
import { useLang } from "@/lib/useLang";
import { useRouter, useSearchParams } from 'next/navigation';
import { Suspense, useEffect, useState } from "react";

const rootDir = "../"

function HomeComponent() {
  const searchParams = useSearchParams()
  const { txt } = useLang()
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
  }, [search, router])

  return (
    <main className="min-h-screen container">
      <div className="h-16">
        <TopMenu />

      </div>
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

// this component is for to avoid this error
// ⨯ useSearchParams() should be wrapped in a suspense boundary at page "/". Read more: https://nextjs.org/docs/messages/missing-suspense-with-csr-bailout
export default function Page() {
  return <Suspense fallback={<div>loading...</div>}>
    <HomeComponent />
  </Suspense>
}