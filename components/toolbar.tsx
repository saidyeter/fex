
"use client"

import { useLang } from "@/lib/useLang";
import { ArrowLeft, ArrowRight, ArrowUp, Clipboard, Copy, FileArchive, Scissors, TextCursor } from "lucide-react";
import { useRouter } from 'next/navigation';
import { Button } from "./ui/button";


export function Toolbar() {
  // const [preferences, setPreferences] = useContext(PreferencesContext)
  const { txt } = useLang()
  const router = useRouter()

  return (
    <div className="w-full flex items-center justify-start gap-1 p-2 border-b border-gray-200 flex-wrap">
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
      <div className="border-l border-gray-200 border h-10"></div>
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
  )
}