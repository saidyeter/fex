import { ReadonlyURLSearchParams } from "next/navigation";
import { useContext, useEffect } from "react";
import { Tab } from "../db";

import { TabsContext } from "@/data/tabs-provider";

const rootDir = "../"

async function update(
  searchParams: ReadonlyURLSearchParams,
  tabs: Tab[],
  setTabs: React.Dispatch<React.SetStateAction<Tab[]>>
) {
  // console.log('update useTabs');

  const dirEncoded = searchParams.get('dir')
  const path = dirEncoded ? convertFromBase64(dirEncoded) : rootDir
  const take = getIntSearchParam('take') ?? 10
  const skip = getIntSearchParam('skip') ?? 0
  const search = searchParams.get('search')
  const orderBy = searchParams.get('orderBy')

  const tab = searchParams.get('tab')
  const _tab = tabs.find(t => t.order?.toString() == tab) ?? tabs[0]

  if (_tab) {
    setTabs([
      ...tabs.filter(t => t.order?.toString() != tab),
      {
        ..._tab,
        take: take,
        skip: skip,
        search: search,
        orderBy: orderBy,
        path: path,
      }
    ])
  }
  else {
    setTabs([
      {
        order: 1,
        name: 'home',
        path: path,
        take: take,
        skip: skip,
        search: search,
        orderBy: orderBy
      }
    ]);
  }

}

export function useTabs(searchParams: ReadonlyURLSearchParams) {

  const [tabs, setTabs] = useContext(TabsContext)

  useEffect(() => {
    update(searchParams, tabs, setTabs)
  }, [searchParams])

  async function addTab(tab: Tab) {
    // console.log('addTab useTabs');
    if (tab) {
      setTabs([
        ...tabs,
        tab
      ])
    }
  }

  return {
    addTab,
    // removeTab: removeItem,
    // updateTab: updateItem,
    // getTab: getItem,
    tabs
  }
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

function getIntSearchParam(param: string | null | undefined) {
  if (!param) {
    return undefined
  }
  const value = parseInt(param)
  if (isNaN(value)) {
    return undefined
  }

  return value
}
