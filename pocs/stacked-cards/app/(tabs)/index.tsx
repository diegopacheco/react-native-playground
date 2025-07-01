import { Image } from 'expo-image';
import React, { useCallback, useState } from 'react';
import { Dimensions, Platform, StyleSheet, Text, View } from 'react-native';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import Animated, {
  interpolate,
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from 'react-native-reanimated';

const { width: screenWidth } = Dimensions.get('window');
const CARD_WIDTH = screenWidth - 60;
const CARD_HEIGHT = 320; 
const SWIPE_THRESHOLD = 80;
const VELOCITY_THRESHOLD = 400;
const STACK_OFFSET = 15; 
const SCALE_FACTOR = 0.03; 

interface UserCard {
  id: number;
  name: string;
  role: string;
  dob: string;
  email: string;
  profilePic: string;
}

const mockData: UserCard[] = [
  {
    id: 1,
    name: "John Smith",
    role: "Software Engineer",
    dob: "1990-05-15",
    email: "john.smith@email.com",
    profilePic: "https://picsum.photos/100?random=1"
  },
  {
    id: 2,
    name: "Sarah Johnson",
    role: "Product Manager",
    dob: "1988-12-03",
    email: "sarah.johnson@email.com",
    profilePic: "https://picsum.photos/100?random=2"
  },
  {
    id: 3,
    name: "Mike Wilson",
    role: "UX Designer",
    dob: "1992-08-22",
    email: "mike.wilson@email.com",
    profilePic: "https://picsum.photos/100?random=3"
  },
  {
    id: 4,
    name: "Emma Davis",
    role: "Data Scientist",
    dob: "1991-03-10",
    email: "emma.davis@email.com",
    profilePic: "https://picsum.photos/100?random=4"
  },
  {
    id: 5,
    name: "Alex Thompson",
    role: "DevOps Engineer",
    dob: "1989-11-18",
    email: "alex.thompson@email.com",
    profilePic: "https://picsum.photos/100?random=5"
  },
  {
    id: 6,
    name: "Lisa Chen",
    role: "Marketing Director",
    dob: "1987-07-25",
    email: "lisa.chen@email.com",
    profilePic: "https://picsum.photos/100?random=6"
  },
  {
    id: 7,
    name: "David Brown",
    role: "Backend Developer",
    dob: "1993-01-14",
    email: "david.brown@email.com",
    profilePic: "https://picsum.photos/100?random=7"
  },
  {
    id: 8,
    name: "Jessica White",
    role: "Frontend Developer",
    dob: "1990-09-08",
    email: "jessica.white@email.com",
    profilePic: "https://picsum.photos/100?random=8"
  },
  {
    id: 9,
    name: "Ryan Garcia",
    role: "QA Engineer",
    dob: "1994-04-30",
    email: "ryan.garcia@email.com",
    profilePic: "https://picsum.photos/100?random=9"
  },
  {
    id: 10,
    name: "Amy Rodriguez",
    role: "Scrum Master",
    dob: "1986-06-12",
    email: "amy.rodriguez@email.com",
    profilePic: "https://picsum.photos/100?random=10"
  }
];

function CardComponent({ user, index, translateX, translateY }: {
  user: UserCard;
  index: number;
  translateX: Animated.SharedValue<number>;
  translateY: Animated.SharedValue<number>;
}) {
  const animatedStyle = useAnimatedStyle(() => {
    const isTopCard = index === 0;
    
    if (isTopCard) {
      const rotation = interpolate(
        translateX.value,
        [-200, 0, 200],
        [-8, 0, 8],
        'clamp'
      );
      
      const opacity = interpolate(
        Math.abs(translateX.value),
        [0, screenWidth * 0.8],
        [1, 0.3],
        'clamp'
      );

      return {
        transform: [
          { translateX: translateX.value },
          { translateY: translateY.value * 0.3 },
          { rotate: `${rotation}deg` },
          { translateY: -index * STACK_OFFSET },
          { scale: 1 - index * SCALE_FACTOR },
        ],
        opacity,
        zIndex: 1000 - index,
      };
    } else {
      return {
        transform: [
          { translateY: -index * STACK_OFFSET },
          { scale: 1 - index * SCALE_FACTOR },
        ],
        zIndex: 1000 - index,
      };
    }
  }, [index]);

  const formatDate = useCallback((dateString: string) => {
    try {
      return new Date(dateString).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      });
    } catch {
      return dateString;
    }
  }, []);

  return (
    <Animated.View style={[styles.card, animatedStyle]}>
      <View style={styles.cardContent}>
        <View style={styles.cardHeader}>
          <Image 
            source={{ uri: user.profilePic }} 
            style={styles.profilePic}
            cachePolicy="memory-disk"
          />
          <View style={styles.userInfo}>
            <Text style={styles.userName}>{user.name}</Text>
            <Text style={styles.userRole}>{user.role}</Text>
          </View>
        </View>
        
        <View style={styles.cardBody}>
          <View style={styles.infoRow}>
            <Text style={styles.label}>Date of Birth:</Text>
            <Text style={styles.value}>{formatDate(user.dob)}</Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.label}>Email:</Text>
            <Text style={styles.value} numberOfLines={1} ellipsizeMode="tail">
              {user.email}
            </Text>
          </View>
        </View>
        
        <View style={styles.cardFooter}>
          <Image 
            source={{ uri: `https://picsum.photos/800/200?random=${user.id + 10}` }} 
            style={styles.backgroundImage}
            cachePolicy="memory-disk"
          />
        </View>
      </View>
    </Animated.View>
  );
}

export default function HomeScreen() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const translateX = useSharedValue(0);
  const translateY = useSharedValue(0);

  const updateIndex = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % mockData.length);
    translateX.value = 0;
    translateY.value = 0;
  }, []);

  const pan = Gesture.Pan()
    .onUpdate((event) => {
      translateX.value = event.translationX;
      translateY.value = event.translationY;
    })
    .onEnd((event) => {
      const shouldSwipe = 
        Math.abs(event.translationX) > SWIPE_THRESHOLD || 
        Math.abs(event.velocityX) > VELOCITY_THRESHOLD;
      
      if (shouldSwipe) {
        const direction = event.translationX > 0 ? 1 : -1;
        
        translateX.value = withTiming(
          direction * screenWidth * 1.5,
          { duration: 300 },
          (finished) => {
            if (finished) {
              runOnJS(updateIndex)();
            }
          }
        );
        translateY.value = withSpring(0);
      } else {
        translateX.value = withSpring(0, {
          damping: 20,
          stiffness: 300,
        });
        translateY.value = withSpring(0, {
          damping: 20,
          stiffness: 300,
        });
      }
    });

  const visibleCards = React.useMemo(() => {
    const cards = [];
    for (let i = 0; i < Math.min(8, mockData.length); i++) {
      const cardIndex = (currentIndex + i) % mockData.length;
      cards.push(mockData[cardIndex]);
    }
    return cards;
  }, [currentIndex]);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Team Cards</Text>
        <Text style={styles.subtitle}>
          Swipe to browse • {currentIndex + 1} of {mockData.length}
        </Text>
      </View>

      <View style={styles.cardContainer}>
        <GestureDetector gesture={pan}>
          <View style={styles.stackContainer}>
            {visibleCards.map((user, index) => (
              <CardComponent
                key={`${user.id}-${currentIndex}`}
                user={user}
                index={index}
                translateX={translateX}
                translateY={translateY}
              />
            ))}
          </View>
        </GestureDetector>
      </View>

      <View style={styles.footer}>
        <View style={styles.dotContainer}>
          {mockData.map((_, index) => (
            <View
              key={index}
              style={[
                styles.dot,
                { 
                  opacity: index === currentIndex ? 1 : 0.3,
                  backgroundColor: index === currentIndex ? '#000' : '#ccc'
                }
              ]}
            />
          ))}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Platform.OS === 'ios' ? 80 : 60,
    paddingBottom: Platform.OS === 'ios' ? 120 : 100,
    backgroundColor: '#f5f5f5',
  },
  header: {
    alignItems: 'center',
    paddingHorizontal: 30,
    marginBottom: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#000',
  },
  subtitle: {
    marginTop: 8,
    opacity: 0.7,
    fontSize: 16,
    color: '#666',
  },
  cardContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  stackContainer: {
    width: CARD_WIDTH,
    height: CARD_HEIGHT + (STACK_OFFSET * 8),
    position: 'relative',
  },
  card: {
    position: 'absolute',
    width: CARD_WIDTH,
    height: CARD_HEIGHT,
    borderRadius: 16,
    borderWidth: 2,
    borderColor: '#000',
    backgroundColor: '#fff',
    bottom: 0,
    overflow: 'hidden',
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.15,
        shadowRadius: 4,
      },
      android: {
        elevation: 4,
      },
    }),
  },
  cardContent: {
    flex: 1,
    padding: 20,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  profilePic: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginRight: 15,
    borderWidth: 2,
    borderColor: '#000',
    overflow: 'hidden',
  },
  userInfo: {
    flex: 1,
  },
  userName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#000',
  },
  userRole: {
    fontSize: 16,
    color: '#666',
  },
  cardBody: {
    marginBottom: 15,
  },
  infoRow: {
    marginBottom: 8,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
    marginBottom: 2,
  },
  value: {
    fontSize: 14,
    color: '#666',
  },
  cardFooter: {
    height: 165,
    borderRadius: 8,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#000',
    marginHorizontal: 10, 
    marginTop: 2, 
    marginBottom: 20,
    paddingBottom: 5,
  },
  backgroundImage: {
    width: '100%',
    height: 160,
    borderRadius: 6,
  },
  footer: {
    alignItems: 'center',
    paddingHorizontal: 30,
    paddingTop: 60,
  },
  dotContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginHorizontal: 4,
  },
});