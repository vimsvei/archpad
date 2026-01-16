import { Injectable } from '@nestjs/common';
import { randomUUID } from 'node:crypto';
import type {
  ImportJob,
  ImportJobPublicView,
  ImportJobReporter,
} from './open-exchange-import.types';

@Injectable()
export class OpenExchangeImportJobStore {
  private readonly jobs = new Map<string, ImportJob>();

  createJob(input?: { fileName?: string }): ImportJobPublicView {
    const id = randomUUID();
    const now = Date.now();

    const job: ImportJob = {
      id,
      status: 'queued',
      progress: 0,
      fileName: input?.fileName,
      createdAt: now,
      logs: [],
    };

    this.jobs.set(id, job);
    return this.toPublic(job);
  }

  getJob(id: string): ImportJobPublicView | undefined {
    const job = this.jobs.get(id);
    return job ? this.toPublic(job) : undefined;
  }

  async runJob<T>(
    id: string,
    fn: (reporter: ImportJobReporter) => Promise<T>,
  ): Promise<void> {
    const job = this.jobs.get(id);
    if (!job) return;

    job.status = 'running';
    job.startedAt = Date.now();
    job.progress = Math.max(job.progress, 1);

    const reporter: ImportJobReporter = {
      setProgress: (p) => {
        const next = Math.max(0, Math.min(100, Number(p) || 0));
        job.progress = next;
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
      reporter.log('repository.open-exchange.error', {
        message: job.error,
      });
    }
  }

  setResult(id: string, result: ImportJob['result']) {
    const job = this.jobs.get(id);
    if (!job) return;
    job.result = result;
  }

  private toPublic(job: ImportJob): ImportJobPublicView {
    // We intentionally expose `error` too for UI.
    return { ...job };
  }
}
