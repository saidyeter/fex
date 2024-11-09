"use client"

import { ContentArea } from "@/components/content-area";
import { TopMenu } from "@/components/top-menu";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import { useTabs } from "@/lib/hooks/useTabs";
import { motion } from "framer-motion";
import Link from "next/link";
import { useSearchParams } from 'next/navigation';
import { Suspense, } from "react";

function HomeComponent() {
  const searchParams = useSearchParams()
  const tab = searchParams.get('tab')
  const { tabs, addTab } = useTabs(searchParams)

  return (
    <main className="min-h-screen container">
      <div className="h-16">
        <TopMenu onNewTab={(_path) => {
          addTab({
            order: tabs.length + 1,
            name: 'tab ' + (tabs.length + 1),
            path: _path,
            take: 10,
            skip: 0,
          });
        }} />
      </div>
      <div className="h-[calc(100vh-6rem)]">
        <ResizablePanelGroup id={'content'} direction="horizontal">
          <ResizablePanel order={1} defaultSize={10}>One</ResizablePanel>
          <ResizableHandle withHandle />
          <ResizablePanel order={2} defaultSize={80} minSize={35} >

            <div className="h-10  justify-start flex-row flex">

              {tabs?.sort((a, b) => a.order - b.order).map(t => {
                const params = new URLSearchParams()
                params.append('tab', t.order?.toString() ?? '')
                params.append('take', t.take.toString())
                params.append('skip', t.skip.toString())
                if (t.search) {
                  params.append('search', t.search)
                }
                if (t.orderBy) {
                  params.append('orderBy', t.orderBy)
                }
                return (
                  <Link
                    prefetch={true}
                    key={t.order}
                    href={`?dir=${btoa(t.path)}&${params}`}
                    className={"relative mr-2 px-3 py-1.5 font-medium outline-2 outline-sky-400"}
                  >
                    {tab == t.order?.toString() &&
                      (
                        <motion.div
                          layoutId="active-tab"
                          className="bg-primary absolute inset-0 rounded-lg"
                          transition={{ duration: 0.5, type: 'spring' }}
                        />
                      )}
                    <span className={`relative z-10 ${tab == t.order?.toString() ? "text-primary-foreground" : "text-secondary-foreground"} `}>{t.name}</span>
                  </Link>
                )
              })}
            </div>
            {tabs?.length > 0 ? (
              <ContentArea tab={tabs.find(t => t.order?.toString() == tab) ?? tabs[0]} />
            ) : null}



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
