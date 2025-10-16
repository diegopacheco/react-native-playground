import React from 'react';
import { ScriptManager, Script } from '@callstack/repack/client';

const REMOTE_SERVER_URL = 'http://localhost:3000/chunks';

export class RemoteLoader {
  private static loadedModules: Map<string, any> = new Map();
  private static loadTimes: Map<string, number> = new Map();

  static async loadRemoteComponent(
    componentName: string,
  ): Promise<{ default: React.ComponentType<any> }> {
    const startTime = performance.now();
    console.log(`[REMOTE CHUNK] Loading ${componentName} from ${REMOTE_SERVER_URL}`);

    if (this.loadedModules.has(componentName)) {
      const cached = this.loadedModules.get(componentName);
      console.log(`[REMOTE CHUNK] Using cached ${componentName}`);
      return cached;
    }

    try {
      const scriptUrl = `${REMOTE_SERVER_URL}/${componentName}.bundle.js`;

      await ScriptManager.shared.loadScript(componentName, {
        url: scriptUrl,
        method: 'GET',
        timeout: 30000,
      });

      const container = await ScriptManager.shared.getContainer(componentName);

      if (!container) {
        throw new Error(`Failed to get container for ${componentName}`);
      }

      await container.init(__webpack_share_scopes__.default);

      const factory = await container.get('./index');
      const module = factory();

      this.loadedModules.set(componentName, module);

      const endTime = performance.now();
      const duration = (endTime - startTime).toFixed(2);
      this.loadTimes.set(componentName, parseFloat(duration));

      console.log(`[REMOTE CHUNK] SUCCESS: ${componentName} loaded in ${duration}ms`);

      return module;
    } catch (error) {
      const endTime = performance.now();
      const duration = (endTime - startTime).toFixed(2);
      console.error(`[REMOTE CHUNK] ERROR: ${componentName} failed after ${duration}ms`, error);
      throw error;
    }
  }

  static createLazyRemoteComponent<T extends React.ComponentType<any>>(
    componentName: string,
  ): React.LazyExoticComponent<T> {
    return React.lazy(() => this.loadRemoteComponent(componentName)) as React.LazyExoticComponent<T>;
  }

  static getLoadTimes() {
    return Array.from(this.loadTimes.entries()).map(([name, time]) => ({
      name,
      time,
    }));
  }

  static printSummary() {
    const times = this.getLoadTimes();
    if (times.length === 0) {
      console.log('[REMOTE CHUNK] No remote chunks loaded yet');
      return;
    }

    console.log('[REMOTE CHUNK] === Remote Load Summary ===');
    times.forEach(({ name, time }) => {
      console.log(`[REMOTE CHUNK]   ${name}: ${time}ms`);
    });
    const total = times.reduce((sum, { time }) => sum + time, 0).toFixed(2);
    console.log(`[REMOTE CHUNK]   TOTAL: ${total}ms`);
    console.log('[REMOTE CHUNK] ========================');
  }
}
