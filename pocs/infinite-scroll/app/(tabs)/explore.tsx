import { StyleSheet } from 'react-native';
import { Collapsible } from '@/components/Collapsible';
import { ExternalLink } from '@/components/ExternalLink';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { IconSymbol } from '@/components/ui/IconSymbol';
const packageJson = require('../../package.json');

export default function TabTwoScreen() {
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
      <ThemedText>Infinite Scroll Demo - React Native {packageJson.dependencies['react-native']}</ThemedText>
      <Collapsible title="How Infinite Scroll Works">
        <ThemedText>
          The infinite scroll implementation uses React Native&apos;s{' '}
          <ThemedText type="defaultSemiBold">FlatList</ThemedText> component with the{' '}
          <ThemedText type="defaultSemiBold">onEndReached</ThemedText> prop to detect when the user
          scrolls near the bottom of the list.
        </ThemedText>
        <ThemedText>
          Key features:
        </ThemedText>
        <ThemedText>
          • <ThemedText type="defaultSemiBold">Pagination:</ThemedText> Loads 15 items per page
        </ThemedText>
        <ThemedText>
          • <ThemedText type="defaultSemiBold">Loading States:</ThemedText> Shows loading indicators during data fetch
        </ThemedText>
        <ThemedText>
          • <ThemedText type="defaultSemiBold">Performance:</ThemedText> FlatList only renders visible items
        </ThemedText>
        <ThemedText>
          • <ThemedText type="defaultSemiBold">End Detection:</ThemedText> Stops loading after 10 pages (150 items)
        </ThemedText>
        <ExternalLink href="https://reactnative.dev/docs/flatlist">
          <ThemedText type="link">Learn more about FlatList</ThemedText>
        </ExternalLink>
      </Collapsible>
      <Collapsible title="Implementation Details">
        <ThemedText>
          The <ThemedText type="defaultSemiBold">InfiniteScrollList</ThemedText> component is located in{' '}
          <ThemedText type="defaultSemiBold">components/InfiniteScrollList.tsx</ThemedText>
        </ThemedText>
        <ThemedText>
          It uses React hooks for state management:
        </ThemedText>
        <ThemedText>
          • <ThemedText type="defaultSemiBold">useState:</ThemedText> Manages data, loading state, and pagination
        </ThemedText>
        <ThemedText>
          • <ThemedText type="defaultSemiBold">useCallback:</ThemedText> Optimizes data loading functions
        </ThemedText>
        <ThemedText>
          • <ThemedText type="defaultSemiBold">useEffect:</ThemedText> Triggers initial data load
        </ThemedText>
      </Collapsible>
      <Collapsible title="Key Props & Configuration">
        <ThemedText>
          The FlatList component uses these important props:
        </ThemedText>
        <ThemedText>
          • <ThemedText type="defaultSemiBold">onEndReached:</ThemedText> Callback when user reaches bottom
        </ThemedText>
        <ThemedText>
          • <ThemedText type="defaultSemiBold">onEndReachedThreshold:</ThemedText> Set to 0.1 (10% from bottom)
        </ThemedText>
        <ThemedText>
          • <ThemedText type="defaultSemiBold">ListFooterComponent:</ThemedText> Shows loading indicator
        </ThemedText>
        <ThemedText>
          • <ThemedText type="defaultSemiBold">keyExtractor:</ThemedText> Unique key for each item
        </ThemedText>
        <ExternalLink href="https://reactnative.dev/docs/flatlist#onendreached">
          <ThemedText type="link">Learn more about onEndReached</ThemedText>
        </ExternalLink>
      </Collapsible>
      <Collapsible title="Performance Optimizations">
        <ThemedText>
          Several optimizations make infinite scroll performant:
        </ThemedText>
        <ThemedText>
          • <ThemedText type="defaultSemiBold">Virtual Scrolling:</ThemedText> Only renders visible items
        </ThemedText>
        <ThemedText>
          • <ThemedText type="defaultSemiBold">Memoized Callbacks:</ThemedText> Prevents unnecessary re-renders
        </ThemedText>
        <ThemedText>
          • <ThemedText type="defaultSemiBold">Debounced Loading:</ThemedText> Prevents multiple rapid requests
        </ThemedText>
        <ThemedText>
          • <ThemedText type="defaultSemiBold">Efficient Key Extraction:</ThemedText> Uses stable item IDs
        </ThemedText>
        <ExternalLink href="https://reactnative.dev/docs/performance">
          <ThemedText type="link">Learn more about performance</ThemedText>
        </ExternalLink>
      </Collapsible>
      <Collapsible title="Technology Stack">
        <ThemedText>
          This demo uses the following technologies:
        </ThemedText>
        <ThemedText>
          • <ThemedText type="defaultSemiBold">React Native:</ThemedText> {packageJson.dependencies['react-native']}
        </ThemedText>
        <ThemedText>
          • <ThemedText type="defaultSemiBold">React:</ThemedText> {packageJson.dependencies['react']}
        </ThemedText>
        <ThemedText>
          • <ThemedText type="defaultSemiBold">Expo:</ThemedText> {packageJson.dependencies['expo']}
        </ThemedText>
        <ThemedText>
          • <ThemedText type="defaultSemiBold">TypeScript:</ThemedText> {packageJson.devDependencies['typescript']}
        </ThemedText>
        <ExternalLink href="https://reactnative.dev/">
          <ThemedText type="link">Learn more about React Native</ThemedText>
        </ExternalLink>
      </Collapsible>
      <Collapsible title="Try It Out">
        <ThemedText>
          Switch to the Home tab to see the infinite scroll in action:
        </ThemedText>
        <ThemedText>
          • <ThemedText type="defaultSemiBold">Initial Load:</ThemedText> Displays first 15 items
        </ThemedText>
        <ThemedText>
          • <ThemedText type="defaultSemiBold">Scroll Down:</ThemedText> Automatically loads more items
        </ThemedText>
        <ThemedText>
          • <ThemedText type="defaultSemiBold">Loading State:</ThemedText> Shows spinner during data fetch
        </ThemedText>
        <ThemedText>
          • <ThemedText type="defaultSemiBold">End State:</ThemedText> Stops loading after 150 items
        </ThemedText>
        <ThemedText>
          Each page simulates a 1-second network delay to demonstrate the loading experience.
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
});
