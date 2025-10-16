import React, { Suspense } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, ScrollView } from 'react-native';
import { ScriptManager, Script } from '@callstack/repack/client';

const HeaderInfoPage = React.lazy(async () => {
  console.log('[REMOTE] Loading HeaderInfoPage from remote server...');

  await ScriptManager.shared.addResolver(async (scriptId) => {
    return {
      url: Script.getRemoteURL(`http://localhost:3000/chunks/${scriptId}.bundle.js`),
      cache: false,
    };
  });

  const { HeaderInfoPage: Component } = await ScriptManager.shared.loadScript('HeaderInfoPage');

  console.log('[REMOTE] HeaderInfoPage loaded successfully');
  return { default: Component };
});

const ContentInfoPage = React.lazy(async () => {
  console.log('[REMOTE] Loading ContentInfoPage from remote server...');

  const { ContentInfoPage: Component } = await ScriptManager.shared.loadScript('ContentInfoPage');

  console.log('[REMOTE] ContentInfoPage loaded successfully');
  return { default: Component };
});

const FooterContentPage = React.lazy(async () => {
  console.log('[REMOTE] Loading FooterContentPage from remote server...');

  const { FooterContentPage: Component } = await ScriptManager.shared.loadScript('FooterContentPage');

  console.log('[REMOTE] FooterContentPage loaded successfully');
  return { default: Component };
});

export default function InfoScreen() {
  return (
    <View style={styles.container}>
      <Suspense
        fallback={
          <View style={styles.loading}>
            <ActivityIndicator size="large" color="#007AFF" />
            <Text style={styles.loadingText}>Loading Info...</Text>
          </View>
        }
      >
        <View style={styles.header}>
          <HeaderInfoPage />
        </View>
        <ScrollView style={styles.content}>
          <ContentInfoPage />
        </ScrollView>
        <View style={styles.footer}>
          <FooterContentPage />
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
  header: {
    borderBottomWidth: 1,
    borderBottomColor: '#E5E5E5',
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
