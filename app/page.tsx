"use client"

import { checkDirAction } from "@/actions/file";
import { ContentArea } from "@/components/content-area";
import { TopMenu } from "@/components/top-menu";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import { useRouter, useSearchParams } from 'next/navigation';
import { Suspense, useEffect } from "react";

const rootDir = "../"

function HomeComponent() {
  const searchParams = useSearchParams()
  const searchEncoded = searchParams.get('dir')
  const search = convertFromBase64(searchEncoded)
  const router = useRouter()

  useEffect(() => {

    checkDirAction(search ?? rootDir)
      .then(d => {
        if (!d) {
          router.push(`?dir=${btoa(rootDir)}`)
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
            <ContentArea path={search} />
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

function convertFromBase64(str: string | null | undefined) {
  if (str && str.length > 0) {
    try {
      return Buffer.from(str, 'base64').toString('utf-8')
    } catch (error) {

    }
  }

  return ''
}