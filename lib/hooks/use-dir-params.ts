import { useSearchParams } from "next/navigation"
import { DirParams } from "../types"

const PATH_QUERY_KEY = 'p'
const ORDER_QUERY_KEY = 'o'
const TAKE_QUERY_KEY = 't'
const SKIP_QUERY_KEY = 's'
const SEARCH_QUERY_KEY = 'q'
const ORDER_BY_QUERY_KEY = 'ob'

export function useDirParams() {
  const searchParams = useSearchParams()
  const encodedPath = searchParams.get(PATH_QUERY_KEY)
  const path = encodedPath ? atob(encodedPath) : './'
  let order = searchParams.get(ORDER_QUERY_KEY)
  if (order !== 'desc' && order !== 'asc') {
    order = 'asc'
  }
  const take = getNum(searchParams.get(TAKE_QUERY_KEY), 10)
  const skip = getNum(searchParams.get(SKIP_QUERY_KEY), 0)
  const search = searchParams.get(SEARCH_QUERY_KEY) ?? ''
  const orderBy = searchParams.get(ORDER_BY_QUERY_KEY) ?? ''

  return {
    path,
    order,
    take,
    skip,
    search,
    orderBy
  } as DirParams
}

function getNum(str: string | undefined | null, defaultVal?: number) {
  let res = defaultVal ?? 0
  if (str) {
    const num = parseInt(str)
    if (!isNaN(num) && num.toString() == str) {
      res = num
    }
  }
  return res
}
