import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { User } from '@/data/mockUsers';
import { Image } from 'expo-image';
import React from 'react';
import { Dimensions, StyleSheet, View } from 'react-native';

const { width } = Dimensions.get('window');
const CARD_WIDTH = width * 0.8;

interface UserCardProps {
  user: User;
}

export function UserCard({ user }: UserCardProps) {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <ThemedView style={styles.card}>
      <View style={styles.cardHeader}>
        <ThemedText type="title" style={styles.name}>
          {user.name}
        </ThemedText>
      </View>
      
      <View style={styles.profilePictureSection}>
        <Image
          source={{ uri: user.profilePicture }}
          style={styles.profilePicture}
          contentFit="cover"
        />
      </View>
      
      <View style={styles.cardContent}>
        <View style={styles.infoSection}>
          <ThemedText type="defaultSemiBold" style={styles.label}>
            Date of Birth:
          </ThemedText>
          <ThemedText style={styles.value}>
            {formatDate(user.dob)}
          </ThemedText>
          
          <ThemedText type="defaultSemiBold" style={styles.label}>
            Email:
          </ThemedText>
          <ThemedText style={styles.value}>
            {user.email}
          </ThemedText>
        </View>
        
        <View style={styles.cardImageSection}>
          <Image
            source={{ uri: user.cardImage }}
            style={styles.cardImage}
            contentFit="contain"
          />
        </View>
      </View>
      
      <View style={styles.cardFooter}>
        {/* Empty footer to ensure border shows below image */}
      </View>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  card: {
    width: CARD_WIDTH,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 16,
    padding: 20,
    marginHorizontal: 10,
    borderWidth: 2,
    borderColor: 'rgba(28, 98, 197, 0.3)',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  cardHeader: {
    alignItems: 'center',
    marginBottom: 15,
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  profilePictureSection: {
    alignItems: 'center',
    marginBottom: 20,
  },
  profilePicture: {
    width: 80,
    height: 80,
    borderRadius: 40,
    borderWidth: 3,
    borderColor: 'rgba(255, 255, 255, 0.5)',
  },
  cardContent: {
    flexShrink: 1,
  },
  infoSection: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    marginTop: 10,
    marginBottom: 5,
  },
  value: {
    fontSize: 14,
    opacity: 0.8,
  },
  cardImageSection: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  cardImage: {
    width: 250,
    height: 160,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
  },
  cardFooter: {
    height: 10,
  },
});