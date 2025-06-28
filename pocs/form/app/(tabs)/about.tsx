import Constants from 'expo-constants';
import { Platform, StyleSheet } from 'react-native';

import { Collapsible } from '@/components/Collapsible';
import { ExternalLink } from '@/components/ExternalLink';
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
          name="info.circle"
          style={styles.headerImage}
        />
      }>
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">About</ThemedText>
      </ThemedView>
      <ThemedText>Information about this React Native application.</ThemedText>
      
      <Collapsible title="React Native Version Information">
        <ThemedView style={styles.versionContainer}>
          <ThemedText type="subtitle">Framework Versions</ThemedText>
          <ThemedText>
            Expo SDK: <ThemedText type="defaultSemiBold">{Constants.expoVersion}</ThemedText>
          </ThemedText>
          <ThemedText>
            Platform: <ThemedText type="defaultSemiBold">{Platform.OS} {Platform.Version}</ThemedText>
          </ThemedText>
          <ThemedText>
            App Version: <ThemedText type="defaultSemiBold">{Constants.expoConfig?.version}</ThemedText>
          </ThemedText>
        </ThemedView>
        <ExternalLink href="https://reactnative.dev/">
          <ThemedText type="link">Learn more about React Native</ThemedText>
        </ExternalLink>
      </Collapsible>

      <Collapsible title="Key Libraries Used">
        <ThemedText>
          • <ThemedText type="defaultSemiBold">Expo Router</ThemedText> - File-based navigation
        </ThemedText>
        <ThemedText>
          • <ThemedText type="defaultSemiBold">Expo Image</ThemedText> - Optimized image component
        </ThemedText>
        <ThemedText>
          • <ThemedText type="defaultSemiBold">Expo Constants</ThemedText> - App constants and metadata
        </ThemedText>
        <ThemedText>
          • <ThemedText type="defaultSemiBold">React Navigation</ThemedText> - Bottom tabs navigation
        </ThemedText>
        <ExternalLink href="https://docs.expo.dev/">
          <ThemedText type="link">Expo Documentation</ThemedText>
        </ExternalLink>
      </Collapsible>

      <Collapsible title="Application Features">
        <ThemedText>
          This application demonstrates:
        </ThemedText>
        <ThemedText>
          • <ThemedText type="defaultSemiBold">Form Management</ThemedText> - Create and edit user data
        </ThemedText>
        <ThemedText>
          • <ThemedText type="defaultSemiBold">Data Persistence</ThemedText> - Store data in local state
        </ThemedText>
        <ThemedText>
          • <ThemedText type="defaultSemiBold">Date Picker</ThemedText> - Interactive date selection
        </ThemedText>
        <ThemedText>
          • <ThemedText type="defaultSemiBold">List Management</ThemedText> - Add, view, and edit entries
        </ThemedText>
      </Collapsible>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  headerImage: {
    color: '#808080',
    bottom: -90,
    left: -35,
    position: 'absolute',
  },
  titleContainer: {
    flexDirection: 'row',
    gap: 8,
  },
  versionContainer: {
    marginVertical: 8,
    gap: 4,
  },
});
