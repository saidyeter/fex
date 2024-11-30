import { useSearchParams } from "next/navigation"

const rootDir = "../"


export function useTabParams() {
  const searchParams = useSearchParams()
  const dirEncoded = searchParams.get('dir')
  const path = dirEncoded ? convertFromBase64(dirEncoded) : rootDir
  const take = getIntSearchParam('take') ?? 10
  const skip = getIntSearchParam('skip') ?? 0
  const search = searchParams.get('search')
  const orderBy = searchParams.get('orderBy')
  const tabId = getIntSearchParam('tab')

  return {
    path,
    take,
    skip,
    search,
    orderBy,
    tabId,
    rootDir
  }

}
//http://localhost:3000/?dir=Li4vc3FsaXRlLWFwcA==&tab=1&take=10&skip=0

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
