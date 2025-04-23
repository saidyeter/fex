import { getFileBuffer } from "@/services/file-service";

export async function GET(request: Request) {
  const params = new URL(request.url).searchParams;
  const path = params.get('path');
  const ext = params.get('ext');
  if (!path) {
    return new Response('No path provided', { status: 400 })
  }


  const res = new Response(await getFileBuffer(path))
  res.headers.set('Content-Type', 'image/' + ext)
  return res
}
