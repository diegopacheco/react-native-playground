import React, { useRef, useState } from 'react';
import { StyleSheet, View, FlatList, Dimensions, Platform } from 'react-native';
import { UserCard } from './UserCard';
import { User } from '@/data/mockUsers';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';

const { width } = Dimensions.get('window');
const CARD_WIDTH = width * 0.8;

interface UserCarouselProps {
  users: User[];
}

export function UserCarousel({ users }: UserCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const flatListRef = useRef<FlatList>(null);

  const handleScroll = (event: any) => {
    const contentOffsetX = event.nativeEvent.contentOffset.x;
    const index = Math.round(contentOffsetX / (CARD_WIDTH + 20));
    setCurrentIndex(index);
  };

  const renderCard = ({ item }: { item: User }) => (
    <UserCard user={item} />
  );

  const renderDots = () => (
    <View style={styles.dotsContainer}>
      {users.map((_, index) => (
        <View
          key={index}
          style={[
            styles.dot,
            index === currentIndex && styles.activeDot
          ]}
        />
      ))}
    </View>
  );

  return (
    <ThemedView style={styles.container}>
      <ThemedView style={styles.header}>
        <ThemedText type="title" style={styles.title}>
          User Cards
        </ThemedText>
        <ThemedText style={styles.subtitle}>
          {currentIndex + 1} of {users.length}
        </ThemedText>
      </ThemedView>

      <FlatList
        ref={flatListRef}
        data={users}
        renderItem={renderCard}
        keyExtractor={(item) => item.id.toString()}
        horizontal
        showsHorizontalScrollIndicator={false}
        snapToInterval={CARD_WIDTH + 20}
        decelerationRate="fast"
        snapToAlignment="center"
        contentContainerStyle={styles.carouselContent}
        onScroll={handleScroll}
        scrollEventThrottle={16}
      />

      {renderDots()}
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    alignItems: 'center',
    marginBottom: 20,
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  subtitle: {
    fontSize: 16,
    opacity: 0.7,
  },
  carouselContent: {
    paddingHorizontal: (width - CARD_WIDTH) / 2,
  },
  dotsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
    paddingBottom: Platform.select({
      ios: 100,
      default: 20,
    }),
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    marginHorizontal: 4,
  },
  activeDot: {
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    width: 12,
    height: 12,
    borderRadius: 6,
  },
});