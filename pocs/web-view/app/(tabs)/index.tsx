import { ThemedView } from '@/components/ThemedView';
import { IconSymbol } from '@/components/ui/IconSymbol';
import { useFocusEffect } from '@react-navigation/native';
import { useCallback, useRef, useState } from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { WebView } from 'react-native-webview';

export default function HomeScreen() {
  const [refreshKey, setRefreshKey] = useState(0);
  const webViewRef = useRef<WebView>(null);

  useFocusEffect(
    useCallback(() => {
      // Force WebView to reload by changing the key
      setRefreshKey(prev => prev + 1);
    }, [])
  );

  const handleRefresh = () => {
    if (webViewRef.current) {
      webViewRef.current.reload();
    }
  };

  return (
    <ThemedView style={styles.container}>
      <TouchableOpacity style={styles.refreshButton} onPress={handleRefresh}>
        <IconSymbol size={24} name="arrow.clockwise" color="#007AFF" />
      </TouchableOpacity>
      <WebView 
        ref={webViewRef}
        key={refreshKey}
        source={{ uri: 'https://news.ycombinator.com' }}
        style={styles.webview}
        startInLoadingState={true}
        scalesPageToFit={true}
        pullToRefreshEnabled={true}
      />
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  refreshButton: {
    position: 'absolute',
    top: 50,
    right: 20,
    zIndex: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderRadius: 20,
    padding: 8,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  webview: {
    flex: 1,
  },
});
