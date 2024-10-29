
/**
 * 
 * @param {string} ext 
 * @returns 
 */
export function getType(ext) {

  if (isImage(ext)) {
    return "image"
  }
  if (isAudio(ext)) {
    return "audio"
  }
  if (isVideo(ext)) {
    return "video"
  }
  if (isSpreadSheet(ext)) {
    return "spreadsheet"
  }
  if (isDoc(ext)) {
    return "document"
  }
  if (isCompressed(ext)) {
    return "compressed"
  }
  if (isFont(ext)) {
    return "font"
  }
  if (isAcrobat(ext)) {
    return "acrobat"
  }
  if (isCode(ext)) {
    return "code"
  }
  // if (isBinary(ext)) {
  return "binary"
  // }
  // return "unknown"
}



/**
 * 
 * @param {string} ext 
 * @returns 
 */
function isBinary(ext) {
  return [
    'exe', // Executable file (Windows)
    'dll', // Dynamic Link Library
    'so', // Shared Object file (Linux/Unix)
    'dylib', // Dynamic Library (macOS)
    'bin', // Binary file
    'app', // Application bundle (macOS)
    'apk', // Android Package File
    'deb', // Debian software package
    'rpm', // Red Hat Package Manager package
    'msi', // Windows Installer package
    'dmg', // Apple Disk Image
    'iso', // ISO disk image
    'jar', // Java Archive file
    'war', // Web Application Archive file
    'ear', // Enterprise Archive file
    'class', // Java class file
    'swf', // Adobe Flash file
    'scr', // Screensaver file
    'com', // Command file (DOS)
    'bat', // Batch file (Windows)
    'cmd', // Command script file (Windows)
  ].includes(ext)
}



/**
 * 
 * @param {string} ext 
 * @returns 
 */
function isCode(ext) {
  return [
    'html', // Hypertext Markup Language
    'css', // Cascading Style Sheets
    'js', // JavaScript
    'jsx', // JSX (JavaScript XML)
    'ts', // TypeScript
    'tsx', // TypeScript with JSX
    'vue', // Vue.js file
    'svelte', // Svelte file
    'scss', // Sass CSS preprocessor file
    'sass', // Sass CSS preprocessor file
    'less', // Less CSS preprocessor file
    'styl', // Stylus CSS preprocessor file
    'php', // PHP Hypertext Preprocessor
    'ejs', // Embedded JavaScript
    'mjs',
    'twig', // Twig
    'hbs', // Handlebars
    'liquid', // Liquid template language
    'pug', // Pug (formerly Jade)
    'json', // JavaScript Object Notation
    'xml', // eXtensible Markup Language
    'graphql', // GraphQL Query Language
    'md', // Markdown
    'yml', // YAML Ain't Markup Language
    'toml', // TOML (Tom's Obvious, Minimal Language)
    'csv', // Comma-Separated Values File
    'ini', // Initialization file format

    'py', // Python
    'rb', // Ruby
    'java', // Java
    'cpp', // C++
    'c', // C
    'h', // Header file
    'cs', // C#
    'go', // Go
    'dart', // Dart
    'lua', // Lua
    'sh', // Shell Script
    'r', // R
    'scala', // Scala
    'vb', // Visual Basic
    'asm', // Assembly language
    'json', // JavaScript Object Notation
    'xml', // eXtensible Markup Language
    'yaml', // YAML Ain't Markup Language
    'ini', // Initialization file format
    'bat', // Windows Batch file
    'cmd', // Windows Command Script
    'sql', // Structured Query Language
    'cbl', // COBOL source code file
    'swift', // Swift source code file
    'pl', // Perl source code file
    'jsx', // React JSX source code file
    'm', // Objective-C source code file
    'groovy', // Groovy source code file
    'scss', // Sass CSS preprocessor file
    'sass', // Sass CSS preprocessor file
    'less', // Less CSS preprocessor file
    'styl', // Stylus CSS preprocessor file
    'coffee', // CoffeeScript file
    'yaml', // YAML file
    'toml', // TOML (Tom's Obvious, Minimal Language) file
    'bat', // Batch file
    'cmd', // Command file
  ].includes(ext)
}


/**
 * 
 * @param {string} ext 
 * @returns 
 */
function isAcrobat(ext) {
  return [
    'psd', // Adobe Photoshop Document
    'ai', // Adobe Illustrator Artwork
    'indd', // Adobe InDesign Document
    'idml', // Adobe InDesign Markup Language
    'pdf', // Portable Document Format
    'eps', // Encapsulated PostScript
    'fla', // Adobe Animate (Flash) Document
    'swf', // Adobe Flash Movie
    'aep', // Adobe After Effects Project
    'prproj', // Adobe Premiere Pro Project
    'aeproj', // Adobe After Effects Project
    'ai', // Adobe Illustrator Artwork
    'ait', // Adobe Illustrator Template
    'asl', // Adobe Photoshop Layer Style
    'ase', // Adobe Swatch Exchange
    'asnd', // Adobe Sound Document
    'atn', // Adobe Photoshop Action
    'csh', // Adobe Photoshop Custom Shapes
    'jsx', // Adobe ExtendScript File
    'pdf', // Portable Document Format
  ].includes(ext)
}


/**
 * 
 * @param {string} ext 
 * @returns 
 */
function isFont(ext) {
  return [
    'otf', // OpenType Font
    'ttf', // TrueType Font
    'woff', // Web Open Font Format
    'woff2', // Web Open Font Format 2
    'eot', // Embedded OpenType
    'svg' // Scalable Vector Graphics (often used for fonts)
  ].includes(ext)
}


/**
 * 
 * @param {string} ext 
 * @returns 
 */
function isCompressed(ext) {
  return [
    'zip', // ZIP archive
    'rar', // RAR archive
    '7z', // 7-Zip archive
    'tar', // Tape Archive
    'gz', // Gzip archive
    'bz2', // Bzip2 archive
    'xz', // XZ archive
    'tar.gz', // Tarball with Gzip compression
    'tar.bz2', // Tarball with Bzip2 compression
    'tar.xz', // Tarball with XZ compression
    'tar.Z', // Tarball with Unix compress compression
    'tar.lz', // Tarball with Lzip compression
    'tar.lz4', // Tarball with LZ4 compression
    'tar.lzma', // Tarball with LZMA compression
    'tar.Z', // Tarball with Unix compress compression
    'tar.lz', // Tarball with Lzip compression
    'tar.lz4', // Tarball with LZ4 compression
    'tar.lzma', // Tarball with LZMA compression
    'dmg', // Apple Disk Image
    'iso', // ISO disk image
    'deb', // Debian software package
    'rpm', // Red Hat Package Manager package
  ].includes(ext)
}


/**
 * 
 * @param {string} ext 
 * @returns 
 */
function isDoc(ext) {
  return [
    'doc', // Microsoft Word Document
    'docx', // Microsoft Word Open XML Document
    'pdf', // Portable Document Format
    'txt', // Plain Text File
    'rtf', // Rich Text Format
    'odt', // OpenDocument Text Document
    'csv', // Comma-Separated Values File
    'xls', // Microsoft Excel Spreadsheet
    'xlsx', // Microsoft Excel Open XML Spreadsheet
    'ppt', // Microsoft PowerPoint Presentation
    'pptx', // Microsoft PowerPoint Open XML Presentation
    'odp', // OpenDocument Presentation
    'odg', // OpenDocument Graphics
    'odp', // OpenDocument Presentation
    'odg', // OpenDocument Graphics
    'odf', // OpenDocument Formula
    'ods', // OpenDocument Spreadsheet
    'odc', // OpenDocument Chart
    'odm', // OpenDocument Text Master
    'odp', // OpenDocument Presentation
    'odt', // OpenDocument Textd
  ].includes(ext)
}

/**
 * 
 * @param {string} ext 
 * @returns 
 */
function isSpreadSheet(ext) {
  return [
    'csv', // Comma-Separated Values File
    'xls', // Microsoft Excel Spreadsheet
    'xlsx', // Microsoft Excel Open XML Spreadsheet
    'ods', // OpenDocument Spreadsheet
  ].includes(ext)
}



/**
 * 
 * @param {string} ext 
 * @returns 
 */
function isAudio(ext) {
  return [
    'mp3',
    'wav',
    'aiff',
    'flac',
    'aac',
    'ogg',
    'wma',
    'm4a',
    'opus',
    'ape'
  ].includes(ext)
}


/**
 * 
 * @param {string} ext 
 * @returns 
 */
function isVideo(ext) {
  return [
    'mp4', // MPEG-4 Part 14
    'mov', // QuickTime Movie
    'avi', // Audio Video Interleave
    'mkv', // Matroska Multimedia Container
    'wmv', // Windows Media Video
    'flv', // Flash Video
    'webm', // WebM
    'm4v', // MPEG-4 Video File
    'mpg', // MPEG Video File
    'mpeg', // MPEG Video File
    '3gp', // 3GPP Multimedia File
    'ogv', // Ogg Video File
    'vob', // DVD Video Object
    'rmvb', // RealMedia Variable Bitrate
    'divx', // DivX-Encoded Movie File
    'asf', // Advanced Systems Format
    'm2ts', // Blu-ray BDAV Video File
  ].includes(ext)
}


/**
 * 
 * @param {string} ext 
 * @returns 
 */
function isImage(ext) {
  return [
    "ase",
    "art",
    "bmp",
    "blp",
    "cd5",
    "cit",
    "cpt",
    "cr2",
    "cut",
    "dds",
    "dib",
    "djvu",
    "egt",
    "exif",
    "gif",
    "gpl",
    "grf",
    "icns",
    "ico",
    "iff",
    "jng",
    "jpeg",
    "jpg",
    "jfif",
    "jp2",
    "jps",
    "lbm",
    "max",
    "miff",
    "mng",
    "msp",
    "nef",
    "nitf",
    "ota",
    "pbm",
    "pc1",
    "pc2",
    "pc3",
    "pcf",
    "pcx",
    "pdn",
    "pgm",
    "PI1",
    "PI2",
    "PI3",
    "pict",
    "pct",
    "pnm",
    "pns",
    "ppm",
    "psb",
    "psd",
    "pdd",
    "psp",
    "px",
    "pxm",
    "pxr",
    "qfx",
    "raw",
    "rle",
    "sct",
    "sgi",
    "rgb",
    "int",
    "bw",
    "tga",
    "tiff",
    "tif",
    "vtf",
    "xbm",
    "xcf",
    "xpm",
    "3dv",
    "amf",
    "ai",
    "awg",
    "cgm",
    "cdr",
    "cmx",
    "dxf",
    "e2d",
    "egt",
    "eps",
    "fs",
    "gbr",
    "odg",
    "svg",
    "stl",
    "vrml",
    "x3d",
    "sxd",
    "v2d",
    "vnd",
    "wmf",
    "emf",
    "art",
    "xar",
    "png",
    "webp",
    "jxr",
    "hdp",
    "wdp",
    "cur",
    "ecw",
    "iff",
    "lbm",
    "liff",
    "nrrd",
    "pam",
    "pcx",
    "pgf",
    "sgi",
    "rgb",
    "rgba",
    "bw",
    "int",
    "inta",
    "sid",
    "ras",
    "sun",
    "tga",
    "heic",
    "heif"
  ].includes(ext)
}