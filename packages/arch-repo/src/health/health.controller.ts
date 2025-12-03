import { Controller, Get } from '@nestjs/common';
import {
  DiskHealthIndicator,
  HealthCheck,
  HealthCheckService,
  MemoryHealthIndicator,
  MikroOrmHealthIndicator,
} from '@nestjs/terminus';

@Controller()
export class HealthController {
  constructor(
    private readonly health: HealthCheckService,
    private readonly db: MikroOrmHealthIndicator,
    private readonly memory: MemoryHealthIndicator,
    private readonly disk: DiskHealthIndicator,
  ) {}
  
  @Get('/healthz')
  @HealthCheck()
  liveness() {
    // Мягкая проверка heap, чтобы не падало из-за кратковременных всплесков
    const heapLimit = Number(process.env.MEMORY_HEAP_MAX || 256 * 1024 * 1024); // 256MB
    return this.health.check([
      () => this.memory.checkHeap('memory_heap', heapLimit),
    ]);
  }
  
  @Get('/health')
  @HealthCheck()
  full() {
    const heapLimit = Number(process.env.MEMORY_HEAP_MAX || 256 * 1024 * 1024);
    const rssLimit = Number(process.env.MEMORY_RSS_MAX || 512 * 1024 * 1024);
    const diskPath = process.env.DISK_PATH || '/';
    const threshold = Number(process.env.DISK_THRESHOLD_PERCENT || 0.85);
    
    return this.health.check([
      () => this.db.pingCheck('database'),
      () => this.memory.checkHeap('memory_heap', heapLimit),
      () => this.memory.checkRSS('memory_rss', rssLimit),
      () => this.disk.checkStorage('disk', { path: diskPath, thresholdPercent: threshold }),
    ]);
  }
}
