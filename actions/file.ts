"use server"

import { checkDirectoryExistsAsync, get } from "@/services/file-service";

export async function getAction(dir: string) {

  const result = await get(dir)
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