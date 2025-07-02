import React, { useState, useCallback } from 'react';
import { StyleSheet, FlatList, TouchableOpacity, Modal, Alert, Image } from 'react-native';
import { WebView } from 'react-native-webview';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';

interface Video {
  id: string;
  title: string;
  url: string;
}

const initialVideos: Video[] = [
  { id: '1', title: 'Top Gun: Maverick - Official Trailer', url: 'https://www.youtube.com/watch?v=qSqVVswa420' },
  { id: '2', title: 'Avatar: The Way of Water - Official Trailer', url: 'https://www.youtube.com/watch?v=d9MyW72ELq0' },
  { id: '3', title: 'Spider-Man: No Way Home - Official Trailer', url: 'https://www.youtube.com/watch?v=JfVOs4VSpmA' },
  { id: '4', title: 'Black Panther: Wakanda Forever - Official Trailer', url: 'https://www.youtube.com/watch?v=_Z3QKkl1WyM' },
  { id: '5', title: 'The Batman - Official Trailer', url: 'https://www.youtube.com/watch?v=mqqft2x_Aa4' },
  { id: '6', title: 'Dune - Official Trailer', url: 'https://www.youtube.com/watch?v=n9xhJrPXop4' },
  { id: '7', title: 'Fast X - Official Trailer', url: 'https://www.youtube.com/watch?v=32RAq6JzY-w' },
  { id: '8', title: 'Doctor Strange in the Multiverse of Madness - Official Trailer', url: 'https://www.youtube.com/watch?v=aWzlQ2N6qqg' },
  { id: '9', title: 'Thor: Love and Thunder - Official Trailer', url: 'https://www.youtube.com/watch?v=Go8nTmfrQd8' },
  { id: '10', title: 'Jurassic World Dominion - Official Trailer', url: 'https://www.youtube.com/watch?v=fb5ELWi-ekk' }
];

export default function ViewScreen() {
  const [videos, setVideos] = useState<Video[]>([]);
  const [selectedVideo, setSelectedVideo] = useState<Video | null>(null);
  const [modalVisible, setModalVisible] = useState(false);

  const loadVideos = async () => {
    try {
      const existingVideos = await AsyncStorage.getItem('videos');
      if (existingVideos) {
        setVideos(JSON.parse(existingVideos));
      } else {
        await AsyncStorage.setItem('videos', JSON.stringify(initialVideos));
        setVideos(initialVideos);
      }
    } catch {
      Alert.alert('Error', 'Failed to load videos');
      setVideos(initialVideos);
    }
  };

  useFocusEffect(
    useCallback(() => {
      loadVideos();
    }, [])
  );

  const getYouTubeVideoId = (url: string): string | null => {
    const match = url.match(/(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|\S*?[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/);
    return match ? match[1] : null;
  };

  const getYouTubeEmbedUrl = (url: string): string => {
    const videoId = getYouTubeVideoId(url);
    return videoId ? `https://www.youtube.com/embed/${videoId}?autoplay=0` : url;
  };

  const getYouTubeThumbnail = (url: string): string => {
    const videoId = getYouTubeVideoId(url);
    return videoId ? `https://img.youtube.com/vi/${videoId}/hqdefault.jpg` : '';
  };

  const openVideo = (video: Video) => {
    setSelectedVideo(video);
    setModalVisible(true);
  };

  const closeVideo = () => {
    setSelectedVideo(null);
    setModalVisible(false);
  };

  const renderVideoItem = ({ item }: { item: Video }) => (
    <TouchableOpacity style={styles.videoItem} onPress={() => openVideo(item)}>
      <ThemedView style={styles.videoCard}>
        <Image
          source={{ uri: getYouTubeThumbnail(item.url) }}
          style={styles.thumbnail}
          resizeMode="cover"
        />
        <ThemedView style={styles.videoContent}>
          <ThemedText type="subtitle" style={styles.videoTitle} numberOfLines={2}>
            {item.title}
          </ThemedText>
          <ThemedText style={styles.videoUrl} numberOfLines={1}>
            {item.url}
          </ThemedText>
        </ThemedView>
      </ThemedView>
    </TouchableOpacity>
  );

  return (
    <ThemedView style={styles.container}>
      <ThemedText type="title" style={styles.title}>Videos</ThemedText>
      
      <FlatList
        data={videos}
        renderItem={renderVideoItem}
        keyExtractor={(item) => item.id}
        style={styles.list}
        showsVerticalScrollIndicator={false}
      />

      <Modal
        visible={modalVisible}
        animationType="slide"
        onRequestClose={closeVideo}
      >
        <ThemedView style={styles.modalContainer}>
          <ThemedView style={styles.modalHeader}>
            <ThemedText type="subtitle" style={styles.modalTitle}>
              {selectedVideo?.title}
            </ThemedText>
            <TouchableOpacity style={styles.closeButton} onPress={closeVideo}>
              <ThemedText style={styles.closeButtonText}>✕</ThemedText>
            </TouchableOpacity>
          </ThemedView>
          
          {selectedVideo && (
            <WebView
              source={{ uri: getYouTubeEmbedUrl(selectedVideo.url) }}
              style={styles.webview}
              allowsFullscreenVideo={true}
              javaScriptEnabled={true}
              domStorageEnabled={true}
              startInLoadingState={true}
            />
          )}
        </ThemedView>
      </Modal>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  title: {
    textAlign: 'center',
    marginVertical: 20,
  },
  list: {
    flex: 1,
    paddingHorizontal: 16,
  },
  videoItem: {
    backgroundColor: '#fff',
    marginBottom: 12,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    overflow: 'hidden',
  },
  videoCard: {
    flexDirection: 'row',
  },
  thumbnail: {
    width: 120,
    height: 90,
    backgroundColor: '#f0f0f0',
  },
  videoContent: {
    flex: 1,
    padding: 12,
    justifyContent: 'center',
  },
  videoTitle: {
    marginBottom: 6,
    fontSize: 14,
    lineHeight: 18,
  },
  videoUrl: {
    color: '#666',
    fontSize: 11,
  },
  modalContainer: {
    flex: 1,
    backgroundColor: '#000',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#000',
    paddingTop: 50,
  },
  modalTitle: {
    color: '#fff',
    flex: 1,
    marginRight: 16,
  },
  closeButton: {
    padding: 8,
  },
  closeButtonText: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
  },
  webview: {
    flex: 1,
  },
});
