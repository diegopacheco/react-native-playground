import React, { Suspense } from 'react';
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';
import { createRemoteLazyComponent } from '../utils/RemoteComponentLoader';

const NoteTaking = createRemoteLazyComponent('NoteTaking');
const NoteTakingFooter = createRemoteLazyComponent('NoteTakingFooter');

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
