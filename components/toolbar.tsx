
"use client"

import { useLang } from "@/lib/hooks/useLang";
import { ArrowLeft, ArrowRight, ArrowUp, Clipboard, Copy, FileArchive, Scissors, TextCursor } from "lucide-react";
import { useRouter } from 'next/navigation';
import { Button } from "./ui/button";
import { Label } from "./ui/label";


export function Toolbar({ path }: { path: string }) {
  const { txt } = useLang()
  const router = useRouter()

  return (
    <>
      <div className="w-full flex items-center justify-start gap-1 p-2 border-b border-muted flex-wrap">
        <Button disabled variant={"outline"} className="flex items-center gap-2">
          <ArrowUp />
          {txt('up')}
        </Button>
        <Button onClick={() => router.back()} variant={"outline"} className="flex items-center gap-2">
          <ArrowLeft />
          {txt('back')}
        </Button>
        <Button onClick={() => router.forward()} variant={"outline"} className="flex items-center gap-2">
          <ArrowRight />
          {txt('forward')}
        </Button>
        <div className="border-l border-muted border h-10"></div>
        <Label className="border-muted rounded-lg border-2 flex-1 p-2 h-10 ">{path}</Label>
      </div>

      <div className="w-full flex items-center justify-start gap-1 p-2 border-b border-muted flex-wrap">

        <Button disabled variant={"outline"} className="flex items-center gap-2">
          <Scissors />
          {txt('cut')}
        </Button>
        <Button disabled variant={"outline"} className="flex items-center gap-2">
          <Clipboard />
          {txt('paste')}
        </Button>
        <Button disabled variant={"outline"} className="flex items-center gap-2">
          <Copy />
          {txt('copy')}
        </Button>
        <Button disabled variant={"outline"} className="flex items-center gap-2">
          <TextCursor />
          {txt('rename')}
        </Button>
        <Button disabled variant={"outline"} className="flex items-center gap-2">
          <FileArchive />
          {txt('compress')}
        </Button>
      </div>
    </>
  )
}