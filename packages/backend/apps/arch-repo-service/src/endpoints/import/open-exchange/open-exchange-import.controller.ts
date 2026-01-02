import {
  BadRequestException,
  Controller,
  Get,
  NotFoundException,
  Param,
  Post,
  Query,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiOkResponse, ApiOperation, ApiParam, ApiTags } from '@nestjs/swagger';
import { UploadedFile } from '@nestjs/common';
import { ArchpadContext } from '@/common/decorators/archpad-context.decorator';
import type { ArchpadRequestContext } from '@/request-context/archpad-request-context';
import { OpenExchangeImportJobStore } from './open-exchange-import.job-store';
import { OpenExchangeImportService } from './open-exchange-import.service';

class CreateImportJobResponse {
  jobId!: string;
}

@ApiTags('Импорт / Open Exchange')
@Controller('import/open-exchange')
export class OpenExchangeImportController {
  constructor(
    private readonly jobs: OpenExchangeImportJobStore,
    private readonly service: OpenExchangeImportService,
  ) {}

  @Post('jobs')
  @ApiOperation({ summary: 'Создать job импорта Open Exchange XML (multipart/form-data)' })
  @ApiOkResponse({ type: CreateImportJobResponse })
  @UseInterceptors(
    FileInterceptor('file', {
      limits: { fileSize: 25 * 1024 * 1024 }, // 25MB
    }),
  )
  createJob(
    // NOTE: avoid `Express.Multer.File` typing to keep build independent of `@types/multer`
    // (docker build uses `--frozen-lockfile`).
    @UploadedFile()
    file:
      | {
          buffer?: Buffer;
          originalname?: string;
        }
      | undefined,
    @ArchpadContext() context: ArchpadRequestContext,
    @Query('clear') clear?: string,
  ): CreateImportJobResponse {
    if (!file?.buffer?.length) {
      throw new BadRequestException('file is required');
    }
    const fileName = file.originalname || 'model.xml';
    const xml = file.buffer.toString('utf8');
    const shouldClear = clear === '1' || clear === 'true' || clear === 'yes';

    const job = this.jobs.createJob({ fileName });

    // Run async (return immediately).
    setImmediate(() => {
      void this.jobs.runJob(job.id, async (reporter) => {
        reporter.log('upload.open-exchange.stage.started', {
          fileName,
        });
        const result = await this.service.importApplicationFromOpenExchangeXml(
          xml,
          context,
          reporter,
          { clear: shouldClear },
        );
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


