import { Injectable } from '@nestjs/common';

@Injectable()
export class FileStorageService implements FileStorage {
  getStorageFileName(file: Express.Multer.File): string {
    return file.filename;
  }

  getFile(fileName: string): Express.Multer.File {
    throw new Error('Method not implemented.');
  }
}
