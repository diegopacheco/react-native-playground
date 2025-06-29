import { Platform, StyleSheet } from 'react-native';

import { Collapsible } from '@/components/Collapsible';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { IconSymbol } from '@/components/ui/IconSymbol';

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
      <ThemedText>Application information and library versions.</ThemedText>
      <Collapsible title="Core Dependencies">
        <ThemedText>
          <ThemedText type="defaultSemiBold">React:</ThemedText> 19.0.0
        </ThemedText>
        <ThemedText>
          <ThemedText type="defaultSemiBold">React Native:</ThemedText> 0.79.4
        </ThemedText>
        <ThemedText>
          <ThemedText type="defaultSemiBold">Expo:</ThemedText> ~53.0.13
        </ThemedText>
        <ThemedText>
          <ThemedText type="defaultSemiBold">TypeScript:</ThemedText> ~5.8.3
        </ThemedText>
      </Collapsible>
      <Collapsible title="Navigation & UI">
        <ThemedText>
          <ThemedText type="defaultSemiBold">Expo Router:</ThemedText> ~5.1.1
        </ThemedText>
        <ThemedText>
          <ThemedText type="defaultSemiBold">React Navigation:</ThemedText> ^7.1.6
        </ThemedText>
        <ThemedText>
          <ThemedText type="defaultSemiBold">Expo Symbols:</ThemedText> ~0.4.5
        </ThemedText>
        <ThemedText>
          <ThemedText type="defaultSemiBold">Expo Vector Icons:</ThemedText> ^14.1.0
        </ThemedText>
      </Collapsible>
      <Collapsible title="Animation & Graphics">
        <ThemedText>
          <ThemedText type="defaultSemiBold">React Native Reanimated:</ThemedText> ~3.17.4
        </ThemedText>
        <ThemedText>
          <ThemedText type="defaultSemiBold">React Native Gesture Handler:</ThemedText> ~2.24.0
        </ThemedText>
        <ThemedText>
          <ThemedText type="defaultSemiBold">Expo Image:</ThemedText> ~2.3.0
        </ThemedText>
        <ThemedText>
          <ThemedText type="defaultSemiBold">Expo Blur:</ThemedText> ~14.1.5
        </ThemedText>
      </Collapsible>
      <Collapsible title="Utilities & System">
        <ThemedText>
          <ThemedText type="defaultSemiBold">Expo Constants:</ThemedText> ~17.1.6
        </ThemedText>
        <ThemedText>
          <ThemedText type="defaultSemiBold">Expo Haptics:</ThemedText> ~14.1.4
        </ThemedText>
        <ThemedText>
          <ThemedText type="defaultSemiBold">Expo Status Bar:</ThemedText> ~2.2.3
        </ThemedText>
        <ThemedText>
          <ThemedText type="defaultSemiBold">React Native Safe Area Context:</ThemedText> 5.4.0
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
