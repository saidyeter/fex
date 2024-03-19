"use server"

import { get } from "@/services/file-service";

export async function getAction(dir : string) {

  const result = await get(dir)
  console.log('getAction', result);

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
 