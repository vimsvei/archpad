export type ImportJobStatus = 'queued' | 'running' | 'completed' | 'failed';

export type ImportJobLogItem = {
  /**
   * Tolgee key, e.g. "repository.open-exchange.stage.parse"
   */
  key: string;
  /**
   * Optional interpolation params for Tolgee ICU format
   */
  params?: Record<string, string | number | boolean | null | undefined>;
  /**
   * Epoch ms
   */
  at: number;
};

export type ImportJob = {
  id: string;
  status: ImportJobStatus;
  progress: number; // 0..100
  fileName?: string;
  createdAt: number;
  startedAt?: number;
  finishedAt?: number;
  error?: string;
  logs: ImportJobLogItem[];
  result?: {
    created: {
      applicationComponents: number;
      applicationFunctions: number;
      applicationInterfaces: number;
      applicationEvents: number;
      dataObjects: number;
      applicationFlows: number;
      componentFunctionLinks: number;
    };
  };
};

export type ImportJobPublicView = Omit<ImportJob, 'error'> & {
  error?: string;
};

export type ImportJobReporter = {
  setProgress(progress: number): void;
  log(key: string, params?: ImportJobLogItem['params']): void;
};
