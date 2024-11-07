'use client'

import { createContext, useState } from "react";

import { Tab } from "../lib/db";

export const TabsContext = createContext({} as [Tab[], React.Dispatch<React.SetStateAction<Tab[]>>]);


export function TabsProvider({ children }: { children: React.ReactNode }) {

  const [tabs, setTabs] = useState<Tab[]>([])

  // useEffect(() => {
  //   console.log('useEffect tabsprovider db');
  //   db.tabs
  //     .toArray()
  //     .then(t => {
  //       if (t.length == 0) {
  //         setTabs([
  //           {
  //             order: 1,
  //             name: 'home',
  //             path: '../',
  //             take: 10,
  //             skip: 0,
  //             search: null,
  //             orderBy: null
  //           }
  //         ])
  //       }
  //       else {
  //         setTabs(t)
  //       }
  //     })
  // }, [db])

  // useEffect(() => {
  //   console.log('useEffect tabsprovider tabs');

  //   db.tabs.bulkUpdate(tabs.map(t => {
  //     return {
  //       key: t.id,
  //       changes: t
  //     }
  //   }))
  // }, [tabs])


  return (
    <TabsContext.Provider value={[tabs, setTabs]}>
      {children}
    </TabsContext.Provider>
  )
}