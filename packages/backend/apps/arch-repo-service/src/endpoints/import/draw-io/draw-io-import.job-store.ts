import { Injectable } from '@nestjs/common';
import { randomUUID } from 'node:crypto';
import type {
  DrawIoImportJob,
  DrawIoImportJobPublicView,
  DrawIoImportJobReporter,
} from './draw-io-import.types';

@Injectable()
export class DrawIoImportJobStore {
  private readonly jobs = new Map<string, DrawIoImportJob>();

  createJob(input?: { fileName?: string }): DrawIoImportJobPublicView {
    const id = randomUUID();
    const now = Date.now();
    const job: DrawIoImportJob = {
      id,
      status: 'queued',
      progress: 0,
      fileName: input?.fileName,
      createdAt: now,
      logs: [],
    };
    this.jobs.set(id, job);
    return { ...job };
  }

  getJob(id: string): DrawIoImportJobPublicView | undefined {
    const job = this.jobs.get(id);
    return job ? { ...job } : undefined;
  }

  async runJob<T>(
    id: string,
    fn: (reporter: DrawIoImportJobReporter) => Promise<T>,
  ): Promise<void> {
    const job = this.jobs.get(id);
    if (!job) return;

    job.status = 'running';
    job.startedAt = Date.now();
    job.progress = Math.max(job.progress, 1);

    const reporter: DrawIoImportJobReporter = {
      setProgress: (p) => {
        job.progress = Math.max(0, Math.min(100, Number(p) || 0));
      },
      log: (key, params) => {
        job.logs.push({ key, params, at: Date.now() });
      },
    };

    try {
      await fn(reporter);
      job.status = 'completed';
      job.progress = 100;
      job.finishedAt = Date.now();
    } catch (e: any) {
      job.status = 'failed';
      job.finishedAt = Date.now();
      job.error = e?.message ?? 'Import failed';
      reporter.log('repository.draw-io.error', { message: job.error });
    }
  }

  setResult(id: string, result: DrawIoImportJob['result']) {
    const job = this.jobs.get(id);
    if (!job) return;
    job.result = result;
  }
}
