export interface FileInfo {
  name: string;
  fullPath: string;
  isDirectory: boolean;
  isFile: boolean;
  ext: string;
}

export type DirParams = {
  path: string;
  order: 'asc' | 'desc';
  take: number;
  skip: number;
  search: string;
  orderBy: string;
}