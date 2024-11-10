import { Tab } from "@/lib/db"

export function getUrl(tab: Tab) {
  const params = new URLSearchParams()
  params.append('tab', tab.order?.toString() ?? '')
  params.append('take', tab.take.toString())
  params.append('skip', tab.skip.toString())
  if (tab.search) {
    params.append('search', tab.search)
  }
  if (tab.orderBy) {
    params.append('orderBy', tab.orderBy)
  }
  return `?dir=${btoa(tab.path)}&${params}`
}

export default {
  getUrl
}