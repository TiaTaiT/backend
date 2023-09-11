interface FileStorage {
  // Return actual file name in storage
  getStorageFileName(file: Express.Multer.File): string;

  // Get file from it's name
  getFile(fileName: string): Express.Multer.File;
}
