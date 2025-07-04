import { StyleSheet } from 'react-native';

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
      <ThemedText>This gallery app showcases random images using Lorem Picsum API.</ThemedText>
      
      <Collapsible title="How the Gallery Works">
        <ThemedText>
          The gallery displays a 2-column grid of random images fetched from Lorem Picsum API. Each image uses a seeded URL 
          <ThemedText type="defaultSemiBold"> https://picsum.photos/seed/gallery[N]/400/300</ThemedText> to ensure consistent images across app reloads.
        </ThemedText>
        <ThemedText>
          Images are rendered using <ThemedText type="defaultSemiBold">expo-image</ThemedText> with cover content fit and smooth transitions.
        </ThemedText>
        <ThemedText>
          The gallery is responsive and adjusts to screen width, with touch feedback on image taps.
        </ThemedText>
      </Collapsible>

      <Collapsible title="Core Dependencies">
        <ThemedText type="subtitle">Framework & Core:</ThemedText>
        <ThemedText>• <ThemedText type="defaultSemiBold">React 19.0.0</ThemedText> - UI library</ThemedText>
        <ThemedText>• <ThemedText type="defaultSemiBold">React Native 0.79.5</ThemedText> - Cross-platform framework</ThemedText>
        <ThemedText>• <ThemedText type="defaultSemiBold">Expo ~53.0.17</ThemedText> - Development platform</ThemedText>
        
        <ThemedText type="subtitle" style={styles.sectionTitle}>Navigation:</ThemedText>
        <ThemedText>• <ThemedText type="defaultSemiBold">@react-navigation/native ^7.1.6</ThemedText> - Navigation library</ThemedText>
        <ThemedText>• <ThemedText type="defaultSemiBold">@react-navigation/bottom-tabs ^7.3.10</ThemedText> - Tab navigation</ThemedText>
        <ThemedText>• <ThemedText type="defaultSemiBold">expo-router ~5.1.3</ThemedText> - File-based routing</ThemedText>
      </Collapsible>

      <Collapsible title="Expo SDK & UI">
        <ThemedText>• <ThemedText type="defaultSemiBold">expo-image ~2.3.2</ThemedText> - Optimized image component</ThemedText>
        <ThemedText>• <ThemedText type="defaultSemiBold">expo-blur ~14.1.5</ThemedText> - Blur effects</ThemedText>
        <ThemedText>• <ThemedText type="defaultSemiBold">expo-font ~13.3.2</ThemedText> - Custom fonts</ThemedText>
        <ThemedText>• <ThemedText type="defaultSemiBold">expo-haptics ~14.1.4</ThemedText> - Haptic feedback</ThemedText>
        <ThemedText>• <ThemedText type="defaultSemiBold">expo-symbols ~0.4.5</ThemedText> - SF Symbols support</ThemedText>
        <ThemedText>• <ThemedText type="defaultSemiBold">@expo/vector-icons ^14.1.0</ThemedText> - Icon library</ThemedText>
      </Collapsible>

      <Collapsible title="Animation & Interaction">
        <ThemedText>• <ThemedText type="defaultSemiBold">react-native-reanimated ~3.17.4</ThemedText> - Smooth animations</ThemedText>
        <ThemedText>• <ThemedText type="defaultSemiBold">react-native-gesture-handler ~2.24.0</ThemedText> - Touch gestures</ThemedText>
        <ThemedText>• <ThemedText type="defaultSemiBold">react-native-screens ~4.11.1</ThemedText> - Native screen optimization</ThemedText>
      </Collapsible>

      <Collapsible title="Development Tools">
        <ThemedText>• <ThemedText type="defaultSemiBold">TypeScript ~5.8.3</ThemedText> - Type safety</ThemedText>
        <ThemedText>• <ThemedText type="defaultSemiBold">ESLint ^9.25.0</ThemedText> - Code linting</ThemedText>
        <ThemedText>• <ThemedText type="defaultSemiBold">eslint-config-expo ~9.2.0</ThemedText> - Expo ESLint rules</ThemedText>
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
  sectionTitle: {
    marginTop: 16,
    marginBottom: 8,
  },
});
