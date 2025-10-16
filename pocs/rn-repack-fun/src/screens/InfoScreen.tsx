import React, { Suspense } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, ScrollView } from 'react-native';
import { RemoteLoader } from '../utils/RemoteLoader';

const HeaderInfoPage = RemoteLoader.createLazyRemoteComponent('HeaderInfoPage');
const ContentInfoPage = RemoteLoader.createLazyRemoteComponent('ContentInfoPage');
const FooterContentPage = RemoteLoader.createLazyRemoteComponent('FooterContentPage');

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
