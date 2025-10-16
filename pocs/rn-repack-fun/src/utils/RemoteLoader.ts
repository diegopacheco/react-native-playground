import React from 'react';
import { ScriptManager } from '@callstack/repack/client';

/**
 * RemoteLoader - Load standalone remote scripts (not Module Federation)
 * Works with simple webpack bundles that expose components as globals
 */
export class RemoteLoader {
  private static loadedModules: Map<string, any> = new Map();
  private static loadTimes: Map<string, number> = new Map();

  /**
   * Load a remote component using ScriptManager
   * The script should expose the component as a global variable
   */
  static async loadRemoteComponent(
    componentName: string,
  ): Promise<{ default: React.ComponentType<any> }> {
    const startTime = Date.now();
    console.log(`[RemoteLoader] Loading ${componentName}...`);

    // Check cache first
    if (this.loadedModules.has(componentName)) {
      const cached = this.loadedModules.get(componentName);
      console.log(`[RemoteLoader] Using cached ${componentName}`);
      return cached;
    }

    try {
      // Use ScriptManager to load the remote script
      // The resolver configured in index.js will determine the URL
      console.log(`[RemoteLoader] Calling ScriptManager.loadScript('${componentName}')`);
      
      await ScriptManager.shared.loadScript(componentName);

      console.log(`[RemoteLoader] Script loaded, checking for component...`);

      // After the script is loaded, the component should be available globally
      // Check for the component on globalThis
      let Component = null;
      
      if ((globalThis as any)[componentName]) {
        Component = (globalThis as any)[componentName];
        console.log(`[RemoteLoader] Found ${componentName} on globalThis`);
      }

      if (!Component) {
        // List what's available for debugging
        console.error(`[RemoteLoader] Component ${componentName} not found. Available globals:`, 
          Object.keys(globalThis).filter(k => k.includes('Calc') || k.includes('Note') || k.includes('Info') || k.includes('Header') || k.includes('Content') || k.includes('Footer')));
        throw new Error(`Component ${componentName} not found after loading script`);
      }

      // Wrap in module format
      const module = { default: Component };

      // Cache the module
      this.loadedModules.set(componentName, module);

      const endTime = Date.now();
      const duration = (endTime - startTime);
      this.loadTimes.set(componentName, duration);

      console.log(`[RemoteLoader] SUCCESS: ${componentName} loaded in ${duration}ms`);

      return module;
    } catch (error) {
      const endTime = Date.now();
      const duration = (endTime - startTime);
      console.error(`[RemoteLoader] ERROR: ${componentName} failed after ${duration}ms`, error);
      throw error;
    }
  }

  /**
   * Create a lazy component that will be loaded on demand
   */
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
      console.log('[RemoteLoader] No remote chunks loaded yet');
      return;
    }

    console.log('[RemoteLoader] === Remote Load Summary ===');
    times.forEach(({ name, time }) => {
      console.log(`[RemoteLoader]   ${name}: ${time}ms`);
    });
    const total = times.reduce((sum, { time }) => sum + time, 0).toFixed(2);
    console.log(`[RemoteLoader]   TOTAL: ${total}ms`);
    console.log('[RemoteLoader] ========================');
  }
}
