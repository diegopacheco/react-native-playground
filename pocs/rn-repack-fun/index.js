/**
 * @format
 */

import { AppRegistry } from 'react-native';
import { ScriptManager, Script } from '@callstack/repack/client';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as React from 'react';
import * as ReactNative from 'react-native';
import App from './App';
import { name as appName } from './app.json';

// Make React and ReactNative available globally for remote chunks
// eslint-disable-next-line no-undef
global.React = React;
// eslint-disable-next-line no-undef
global.ReactNative = ReactNative;
// eslint-disable-next-line no-undef
global.AsyncStorage = AsyncStorage;

console.log('[App] React, ReactNative, and AsyncStorage exposed globally');

// Configure ScriptManager with storage for caching
ScriptManager.shared.setStorage(AsyncStorage);

// Add resolver to locate remote chunks
ScriptManager.shared.addResolver(async (scriptId, caller) => {
  console.log(`[ScriptManager] Resolving script: ${scriptId}`);

  // In dev mode, resolve script location to remote server
  // The server serves bundles as ComponentName.bundle.js
  if (__DEV__) {
    const url = `http://localhost:3000/chunks/${scriptId}.bundle.js`;
    console.log(`[ScriptManager] DEV mode - URL: ${url}`);
    return {
      url,
      cache: false,
    };
  }

  // In production, resolve to remote server
  return {
    url: Script.getRemoteURL(`http://localhost:3000/chunks/${scriptId}.bundle.js`),
  };
});

console.log('[ScriptManager] Initialized with resolver and storage');

AppRegistry.registerComponent(appName, () => App);
