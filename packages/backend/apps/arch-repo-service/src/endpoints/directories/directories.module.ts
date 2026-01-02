import { Module } from '@nestjs/common';
import {
  CreateDirectoryDto,
  UpdateDirectoryDto,
} from '@/model/dto/directory.dto';
import { BaseDirectoryModule } from './base-directory/base-directory.module';
import { DIRECTORIES } from '@/model/directories/directories.const';
import { DirectoryMetadataController } from './directory-metadata.controller';

@Module({
  imports: [
    ...BaseDirectoryModule.registerMany(
      DIRECTORIES.map((d) => ({
        ...d,
        createDto: CreateDirectoryDto,
        updateDto: UpdateDirectoryDto,
      })),
    ),
  ],
  controllers: [DirectoryMetadataController],
})
export class DirectoriesModule {}
