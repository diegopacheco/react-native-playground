import React from 'react';
import { ScrollView, StyleSheet, Dimensions, TouchableOpacity } from 'react-native';
import { Image } from 'expo-image';
import { ThemedView } from './ThemedView';
import { ThemedText } from './ThemedText';

const { width } = Dimensions.get('window');
const imageWidth = (width - 50) / 2;

interface GalleryProps {
  imageCount?: number;
}

export function Gallery({ imageCount = 20 }: GalleryProps) {
  const images = Array.from({ length: imageCount }, (_, index) => ({
    id: index + 1,
    url: `https://picsum.photos/seed/gallery${index + 1}/400/300`,
  }));

  return (
    <ThemedView style={styles.container}>
      <ThemedText type="title" style={styles.title}>Gallery</ThemedText>
      <ScrollView 
        contentContainerStyle={styles.scrollContainer}
        showsVerticalScrollIndicator={false}
      >
        <ThemedView style={styles.grid}>
          {images.map((image) => (
            <TouchableOpacity 
              key={image.id} 
              style={styles.imageContainer}
              activeOpacity={0.7}
            >
              <Image
                source={{ uri: image.url }}
                style={styles.image}
                contentFit="cover"
                transition={200}
              />
            </TouchableOpacity>
          ))}
        </ThemedView>
      </ScrollView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    marginBottom: 20,
    textAlign: 'center',
  },
  scrollContainer: {
    paddingBottom: 20,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  imageContainer: {
    width: imageWidth,
    height: imageWidth * 0.75,
    borderRadius: 8,
    overflow: 'hidden',
    backgroundColor: '#f0f0f0',
    marginBottom: 10,
  },
  image: {
    width: '100%',
    height: '100%',
  },
});