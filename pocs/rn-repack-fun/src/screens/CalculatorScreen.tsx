import React, { Suspense } from 'react';
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';
import { ChunkLogger } from '../utils/ChunkLogger';

const Calculator = ChunkLogger.createLazyComponent(
  'Calculator',
  () => import('../remotes/calculator/Calculator')
);

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
    backgroundColor: '#F5F5F5',
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
