export interface FileInfo {
    name: string;
    fullPath: string;
    isDirectory: boolean;
    isFile: boolean;
    ext:string;
    type: "image" | "audio" | "video" | "document" | "compressed" | "font" | "acrobat" | "code" | "binary" | 'drive' 
}
