import 'server-only';

import { FileInfo } from '@/lib/types';
import { promises as fs } from 'fs';
import path from 'path';


export async function checkDirectoryExistsAsync(dirPath: string): Promise<boolean> {
  try {
    const resolvedPath = path.resolve(dirPath);
    await fs.access(resolvedPath); // Check if path is accessible
    const stats = await fs.lstat(resolvedPath); // Get file stats
    return stats.isDirectory(); // Return true if it's a directory
  } catch (err) {
    console.error('Error checking directory:', err);
    return false;
  }
}
// Generator function to read directory contents
async function* readDirectory(directory: string, searchKey: string): AsyncGenerator<FileInfo> {
  const items = await fs.readdir(directory, { withFileTypes: true });
  for (const item of items) {
    const itemName = item.name.toLowerCase();
    const fullPath = path.join(directory, item.name); // Full path

    if (!searchKey || itemName.includes(searchKey.toLowerCase())) {
      yield {
        name: item.name,
        fullPath: fullPath, // Include full path
        isDirectory: item.isDirectory(),
        isFile: item.isFile(),
        ext: getExt(item.name),
      };
    }
  }
}

// Function to get files and folders with pagination and search
export async function get(
  directory: string,
  skip: number = 0,
  limit: number = Infinity,
  searchKey: string = ''
): Promise<FileInfo[]> {
  const results: FileInfo[] = [];
  const iterator = readDirectory(directory, searchKey);

  for await (const item of iterator) {
    if (skip > 0) {
      skip--;
      continue; // Skip this item
    }
    results.push(item);
    if (results.length >= limit) {
      break; // Limit reached
    }
  }

  return results;
}


function getExt(name: string) {
  const ext = name.includes('.') ? name.split('.').slice(-1)[0] : ''
  return ext
}
