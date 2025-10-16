import React from 'react';

export const loadRemoteComponent = async (componentName: string): Promise<{ default: React.ComponentType<any> }> => {
  const url = `http://localhost:3000/chunks/${componentName}.bundle.js`;
  const startTime = performance.now();

  console.log(`[REMOTE] Loading ${componentName} from ${url}`);

  try {
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }

    const code = await response.text();
    const sizeKB = (code.length / 1024).toFixed(2);

    const exports: any = {};
    const module = { exports };

    const React = require('react');
    const ReactNative = require('react-native');
    const AsyncStorage = require('@react-native-async-storage/async-storage').default;

    const customRequire = (moduleName: string) => {
      if (moduleName === 'react') return React;
      if (moduleName === 'react-native') return ReactNative;
      if (moduleName === '@react-native-async-storage/async-storage') return { default: AsyncStorage };
      return require(moduleName);
    };

    const func = new Function('module', 'exports', 'React', 'require', code);
    func(module, exports, React, customRequire);

    let Component = module.exports;

    if (typeof Component !== 'function' && Component.default) {
      Component = Component.default;
    }

    if (typeof Component !== 'function' && (window as any)[componentName]) {
      Component = (window as any)[componentName];
    }

    const endTime = performance.now();
    const duration = (endTime - startTime).toFixed(2);

    console.log(`[REMOTE] ✓ ${componentName} loaded | ${sizeKB} KB | ${duration}ms`);

    return { default: Component };
  } catch (error) {
    const endTime = performance.now();
    const duration = (endTime - startTime).toFixed(2);

    console.error(`[REMOTE] ✗ ${componentName} failed | ${duration}ms`, error);
    throw error;
  }
};

export const createRemoteLazyComponent = <T extends React.ComponentType<any>>(
  componentName: string
): React.LazyExoticComponent<T> => {
  return React.lazy(() => loadRemoteComponent(componentName)) as React.LazyExoticComponent<T>;
};
