import React, { Suspense } from 'react';
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';
import { ScriptManager, Script } from '@callstack/repack/client';

const Calculator = React.lazy(async () => {
  console.log('[REMOTE] Loading Calculator from remote server...');

  await ScriptManager.shared.addResolver(async (scriptId) => {
    return {
      url: Script.getRemoteURL(`http://localhost:3000/chunks/${scriptId}.bundle.js`),
      cache: false,
    };
  });

  const { Calculator: Component } = await ScriptManager.shared.loadScript('Calculator');

  console.log('[REMOTE] Calculator loaded successfully');
  return { default: Component };
});

export default function CalculatorScreen() {
  return (
    <View style={styles.container}>
      <Suspense
        fallback={
          <View style={styles.loading}>
            <ActivityIndicator size="large" color="#007AFF" />
            <Text style={styles.loadingText}>Loading Calculator...</Text>
          </View>
        }
      >
        <Calculator />
      </Suspense>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  loading: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#000',
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: '#FFF',
  },
});
