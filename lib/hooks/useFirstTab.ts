import { TabsContext } from "@/data/tabs-provider"
// import { useRouter } from "next/router"
import { useContext } from "react"
import { useTabParams } from "./useTabParams"

export function useFirstTab() {
  console.log('useFirstTab')
  const { path, take, skip, search, orderBy, tabId, rootDir } = useTabParams()
  const [tabs, setTabs] = useContext(TabsContext)

  if (tabs.length > 0) {
    let firstTab = !!tabId ? (tabs.find(t => t.order == tabId) ?? tabs[0]) : tabs[0]
    if (path != rootDir) {
      firstTab = { ...firstTab, path: path }
      setTabs(p => [...p.filter(t => t.order != firstTab.order), firstTab])
    }
    return firstTab
  }

  var firstTab = {
    order: 1,
    name: 'tab 1',
    path: path,
    take: take,
    skip: skip,
    search: search,
    orderBy: orderBy
  }
  setTabs([firstTab])
  return firstTab

}



