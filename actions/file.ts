"use server"

import { DirParams } from "@/lib/types";
import { checkDirectoryExistsAsync, getDirectoryContent } from "@/services/file-service";

export async function getDirectoryContentAction(params: DirParams) {
  const result = await getDirectoryContent(params)
  // console.log('getAction', result);

  if (result) {
    return {
      success: true,
      content: result
    }
  }
  return {
    success: false,
    chats: []
  }
}

export async function checkDirAction(dir: string | undefined | null) {
  if (!dir) {
    return false
  }
  return await checkDirectoryExistsAsync(dir)
}

