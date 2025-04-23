"use client"

import { ContentArea } from "@/components/content-area";
import { TopMenu } from "@/components/top-menu";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import { Suspense, } from "react";

function HomeComponent() {
  return (
    <main className="min-h-screen container">
      <div className="h-16">
        <TopMenu />
      </div>
      <div className="h-[calc(100vh-6rem)]">
        <ResizablePanelGroup id={'content'} direction="horizontal">
          <ResizablePanel order={1} defaultSize={0}>One</ResizablePanel>
          <ResizableHandle withHandle />
          <ResizablePanel order={2} defaultSize={100} minSize={35} >
            <ContentArea />
          </ResizablePanel>
          <ResizableHandle withHandle />
          <ResizablePanel order={3} defaultSize={0}>three</ResizablePanel>
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
