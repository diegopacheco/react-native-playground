import React, { Suspense } from 'react';
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';
import { ScriptManager, Script } from '@callstack/repack/client';

const NoteTaking = React.lazy(async () => {
  console.log('[REMOTE] Loading NoteTaking from remote server...');

  await ScriptManager.shared.addResolver(async (scriptId) => {
    return {
      url: Script.getRemoteURL(`http://localhost:3000/chunks/${scriptId}.bundle.js`),
      cache: false,
    };
  });

  const { NoteTaking: Component } = await ScriptManager.shared.loadScript('NoteTaking');

  console.log('[REMOTE] NoteTaking loaded successfully');
  return { default: Component };
});

const NoteTakingFooter = React.lazy(async () => {
  console.log('[REMOTE] Loading NoteTakingFooter from remote server...');

  const { NoteTakingFooter: Component } = await ScriptManager.shared.loadScript('NoteTakingFooter');

  console.log('[REMOTE] NoteTakingFooter loaded successfully');
  return { default: Component };
});

export default function NotesScreen() {
  return (
    <View style={styles.container}>
      <Suspense
        fallback={
          <View style={styles.loading}>
            <ActivityIndicator size="large" color="#007AFF" />
            <Text style={styles.loadingText}>Loading Notes...</Text>
          </View>
        }
      >
        <View style={styles.content}>
          <NoteTaking />
        </View>
        <View style={styles.footer}>
          <NoteTakingFooter />
        </View>
      </Suspense>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  content: {
    flex: 1,
  },
  footer: {
    borderTopWidth: 1,
    borderTopColor: '#E5E5E5',
  },
  loading: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: '#666',
  },
});
