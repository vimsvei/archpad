import {
  BadRequestException,
  Controller,
  Get,
  NotFoundException,
  Param,
  Post,
  Query,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { UploadedFile } from '@nestjs/common';
import { UseInterceptors } from '@nestjs/common';
import {
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
import { ArchpadContext } from '@/common/decorators/archpad-context.decorator';
import type { ArchpadRequestContext } from '@/request-context/archpad-request-context';
import { DrawIoImportJobStore } from './draw-io-import.job-store';
import { DrawIoImportService } from './draw-io-import.service';

class CreateImportJobResponse {
  jobId!: string;
}

@ApiTags('Импорт / Draw.io')
@Controller('import/draw-io')
export class DrawIoImportController {
  constructor(
    private readonly jobs: DrawIoImportJobStore,
    private readonly service: DrawIoImportService,
  ) {}

  @Post('jobs')
  @ApiOperation({
    summary: 'Создать job импорта Draw.io схемы (multipart/form-data)',
  })
  @ApiOkResponse({ type: CreateImportJobResponse })
  @UseInterceptors(
    FileInterceptor('file', {
      limits: { fileSize: 25 * 1024 * 1024 },
    }),
  )
  createJob(
    @UploadedFile()
    file:
      | { buffer?: Buffer; originalname?: string }
      | undefined,
    @ArchpadContext() _context: ArchpadRequestContext,
    @Query('clear') clear?: string,
  ): CreateImportJobResponse {
    if (!file?.buffer?.length) {
      throw new BadRequestException('file is required');
    }
    const fileName = file.originalname || 'diagram.drawio';
    const xml = file.buffer.toString('utf8');
    const shouldClear = clear === '1' || clear === 'true' || clear === 'yes';

    const job = this.jobs.createJob({ fileName });

    setImmediate(() => {
      void this.jobs.runJob(job.id, async (reporter) => {
        reporter.log('repository.draw-io.stage.started', { fileName });
        const result = await this.service.importFromDrawIo(xml, reporter, {
          clear: shouldClear,
        });
        this.jobs.setResult(job.id, result);
      });
    });

    return { jobId: job.id };
  }

  @Get('jobs/:jobId')
  @ApiOperation({ summary: 'Получить статус job импорта' })
  @ApiParam({ name: 'jobId' })
  @ApiOkResponse({ type: Object })
  getJob(@Param('jobId') jobId: string) {
    const job = this.jobs.getJob(jobId);
    if (!job) throw new NotFoundException('job not found');
    return job;
  }
}
