import { Image } from 'expo-image';
import { Platform, StyleSheet, FlatList, View, Dimensions } from 'react-native';

import { HelloWave } from '@/components/HelloWave';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';

const DATA = [
  { id: '1', title: 'Beautiful Landscape', description: 'A stunning view of mountains and lakes' },
  { id: '2', title: 'City Skyline', description: 'Modern architecture at its finest' },
  { id: '3', title: 'Ocean Waves', description: 'Peaceful waves crashing on the shore' },
  { id: '4', title: 'Forest Path', description: 'A serene walk through nature' },
  { id: '5', title: 'Desert Sunset', description: 'Golden hour in the desert' },
  { id: '6', title: 'Mountain Peak', description: 'Snow-capped mountain summit' },
  { id: '7', title: 'River Valley', description: 'Flowing water through green valleys' },
  { id: '8', title: 'Tropical Beach', description: 'Paradise found on sandy shores' },
];

const { width } = Dimensions.get('window');

export default function HomeScreen() {
  const renderItem = ({ item, index }: { item: typeof DATA[0]; index: number }) => (
    <View style={styles.listItem}>
      <Image
        source={{ uri: `https://picsum.photos/300/200?random=${index + 1}` }}
        style={styles.itemImage}
        contentFit="cover"
      />
      <View style={styles.textContainer}>
        <ThemedText type="subtitle" style={styles.itemTitle}>
          {item.title}
        </ThemedText>
        <ThemedText style={styles.itemDescription}>
          {item.description}
        </ThemedText>
      </View>
    </View>
  );

  return (
    <ThemedView style={styles.container}>
      <ThemedView style={styles.header}>
        <ThemedText type="title">Photo Gallery</ThemedText>
        <HelloWave />
      </ThemedView>
      <FlatList
        data={DATA}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        style={styles.flatList}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.listContainer}
      />
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingTop: 60,
    paddingBottom: 20,
  },
  flatList: {
    flex: 1,
  },
  listContainer: {
    paddingHorizontal: 16,
    paddingBottom: 20,
  },
  listItem: {
    backgroundColor: '#f8f9fa',
    borderRadius: 12,
    marginBottom: 16,
    overflow: 'hidden',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  itemImage: {
    width: '100%',
    height: 200,
  },
  textContainer: {
    padding: 16,
  },
  itemTitle: {
    marginBottom: 8,
    fontSize: 18,
    fontWeight: '600',
  },
  itemDescription: {
    fontSize: 14,
    opacity: 0.7,
    lineHeight: 20,
  },
});
