import { ThemedView } from '@/components/ThemedView';
import { UserCarousel } from '@/components/UserCarousel';
import { mockUsers } from '@/data/mockUsers';
import { StyleSheet } from 'react-native';

export default function HomeScreen() {
  return (
    <ThemedView style={styles.container}>
      <UserCarousel users={mockUsers} />
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 50,
  },
});
