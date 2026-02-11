export type DrawIoImportJobStatus = 'queued' | 'running' | 'completed' | 'failed';

export type DrawIoImportJobLogItem = {
  key: string;
  params?: Record<string, string | number | boolean | null | undefined>;
  at: number;
};

export type DrawIoImportJob = {
  id: string;
  status: DrawIoImportJobStatus;
  progress: number;
  fileName?: string;
  createdAt: number;
  startedAt?: number;
  finishedAt?: number;
  error?: string;
  logs: DrawIoImportJobLogItem[];
  result?: {
    created: {
      applicationComponents: number;
      applicationFunctions: number;
      dataObjects: number;
      systemSoftware: number;
      componentFunctionLinks: number;
      componentHierarchyLinks: number;
      applicationFlows: number;
    };
  };
};

export type DrawIoImportJobPublicView = Omit<DrawIoImportJob, 'error'> & {
  error?: string;
};

export type DrawIoImportJobReporter = {
  setProgress(progress: number): void;
  log(key: string, params?: DrawIoImportJobLogItem['params']): void;
};
