import React from 'react';

export class ChunkLogger {
  private static startTimes: Map<string, number> = new Map();
  private static moduleLoadTimes: Map<string, number> = new Map();

  static log(message: string, ...args: any[]) {
    if (__DEV__) {
      console.log(`[CHUNK] ${message}`, ...args);
    }
  }

  static logChunkStart(chunkName: string) {
    const startTime = performance.now();
    this.startTimes.set(chunkName, startTime);
    this.log(`START loading: ${chunkName}`);
  }

  static logChunkEnd(chunkName: string, error?: Error) {
    const startTime = this.startTimes.get(chunkName);
    if (!startTime) {
      console.warn(`[CHUNK] No start time found for ${chunkName}`);
      return;
    }

    const endTime = performance.now();
    const duration = (endTime - startTime).toFixed(2);

    if (error) {
      console.error(`[CHUNK] FAILED ${chunkName} after ${duration}ms`, error);
    } else {
      this.log(`LOADED ${chunkName} in ${duration}ms`);
    }

    this.startTimes.delete(chunkName);
  }

  static createLazyComponent<T extends React.ComponentType<any>>(
    chunkName: string,
    importFn: () => Promise<{ default: T }>
  ): React.LazyExoticComponent<T> {
    return React.lazy(async () => {
      const startTime = performance.now();
      this.log(`IMPORT started: ${chunkName}`);

      try {
        const module = await importFn();
        const endTime = performance.now();
        const duration = (endTime - startTime).toFixed(2);

        this.moduleLoadTimes.set(chunkName, parseFloat(duration));
        this.log(`SUCCESS: ${chunkName} loaded in ${duration}ms`);

        return module;
      } catch (error) {
        const endTime = performance.now();
        const duration = (endTime - startTime).toFixed(2);
        console.error(`[CHUNK] ERROR: ${chunkName} failed after ${duration}ms`, error);
        throw error;
      }
    });
  }

  static getLoadTimes() {
    return Array.from(this.moduleLoadTimes.entries()).map(([name, time]) => ({
      name,
      time,
    }));
  }

  static printSummary() {
    const times = this.getLoadTimes();
    if (times.length === 0) {
      this.log('No chunks loaded yet');
      return;
    }

    this.log('=== Chunk Load Summary ===');
    times.forEach(({ name, time }) => {
      this.log(`  ${name}: ${time}ms`);
    });
    const total = times.reduce((sum, { time }) => sum + time, 0).toFixed(2);
    this.log(`  TOTAL: ${total}ms`);
    this.log('========================');
  }
}
