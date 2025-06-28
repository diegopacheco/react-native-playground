import Constants from 'expo-constants';
import { Platform, StyleSheet } from 'react-native';
import { version as reactNativeVersion } from 'react-native/package.json';

import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { IconSymbol } from '@/components/ui/IconSymbol';

export default function AboutScreen() {
  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#D0D0D0', dark: '#353636' }}
      headerImage={
        <IconSymbol
          size={310}
          color="#808080"
          name="info.circle.fill"
          style={styles.headerImage}
        />
      }>
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">About</ThemedText>
      </ThemedView>
      
      <ThemedView style={styles.infoContainer}>
        <ThemedText type="subtitle">App Information</ThemedText>
        <ThemedView style={styles.versionContainer}>
          <ThemedText type="defaultSemiBold">React Native Version:</ThemedText>
          <ThemedText>{reactNativeVersion}</ThemedText>
        </ThemedView>
        
        <ThemedView style={styles.versionContainer}>
          <ThemedText type="defaultSemiBold">Expo SDK Version:</ThemedText>
          <ThemedText>{Constants.expoVersion}</ThemedText>
        </ThemedView>
        
        <ThemedView style={styles.versionContainer}>
          <ThemedText type="defaultSemiBold">Platform:</ThemedText>
          <ThemedText>{Platform.OS}</ThemedText>
        </ThemedView>
        
        <ThemedView style={styles.versionContainer}>
          <ThemedText type="defaultSemiBold">App Version:</ThemedText>
          <ThemedText>1.0.0</ThemedText>
        </ThemedView>
      </ThemedView>
      
      <ThemedView style={styles.descriptionContainer}>
        <ThemedText type="subtitle">Description</ThemedText>
        <ThemedText>
          This app demonstrates a React Native grid implementation with data fetched from external APIs.
          Built with Expo Router and TypeScript for a modern development experience.
        </ThemedText>
      </ThemedView>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 16,
  },
  headerImage: {
    color: '#808080',
    bottom: -90,
    left: -35,
    position: 'absolute',
  },
  infoContainer: {
    gap: 12,
    marginBottom: 24,
  },
  versionContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 4,
  },
  descriptionContainer: {
    gap: 8,
  },
});
