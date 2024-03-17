import { Button } from "@/components/ui/button";
import { generateColor } from "@/lib/utils";
import { EntryType, get, getExt, getType } from "@/services/file-service";
import { FileIcon } from "react-file-icon";

export default async function Home() {
  const content = await get("dir")
  return (
    <main className="flex min-h-screen flex-col items-center justify-start p-24">
      <div className="container flex flex-wrap gap-4">

        {content.map(c => {
          return <ItemInfo {...c} key={c.fullPath} />
        })}
      </div>
    </main>
  );
}



function ItemInfo({ name, fullPath, isDir, subDir }: EntryType) {

  const ext = getExt(isDir ? "folder" : name)
  // console.log(ext);

  const color = generateColor(ext)
  // console.log(ext, color);

  const type = getType(ext)


  console.log(ext,type);
  

  const icon = <FileIcon
    color={color}
    labelColor="#A8A8A8"
    foldColor="#8A8A8A"
    fold={!isDir}
    type={type}
    extension={isDir ? undefined : ext}
    glyphColor="rgba(255,255,255,0.6)"
  />

  return (
    <div className="max-w-36 w-full">
      {icon}
      <p className="text-sm text-center w-full">{name}</p>
    </div>
  )
}
