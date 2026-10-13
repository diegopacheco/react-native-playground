import { FlatList, Pressable, StyleSheet, Text } from 'react-native';
import { CATEGORIES } from '../drawings/catalog';
import type { Category } from '../drawings/catalog';

type Props = { onCategory: (category: Category) => void; onFreeDraw: () => void };

type CardProps = { emoji: string; name: string; note: string; color: string; onPress: () => void };

function Card({ emoji, name, note, color, onPress }: CardProps) {
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={name}
      onPress={onPress}
      style={({ pressed }) => [styles.card, { backgroundColor: color }, pressed && styles.pressed]}
    >
      <Text style={styles.emoji}>{emoji}</Text>
      <Text style={styles.name}>{name}</Text>
      <Text style={styles.note}>{note}</Text>
    </Pressable>
  );
}

export function HomeScreen({ onCategory, onFreeDraw }: Props) {
  return (
    <FlatList
      data={CATEGORIES}
      numColumns={2}
      keyExtractor={(category) => category.id}
      contentContainerStyle={styles.list}
      columnWrapperStyle={styles.row}
      ListHeaderComponent={
        <>
          <Text style={styles.title}>🎨 Let's Color!</Text>
          <Card emoji="✏️" name="Free Draw" note="Blank page" color="#FFFFFF" onPress={onFreeDraw} />
        </>
      }
      renderItem={({ item }) => (
        <Card emoji={item.emoji} name={item.name} note={`${item.drawings.length} pages`} color={item.color} onPress={() => onCategory(item)} />
      )}
    />
  );
}

const styles = StyleSheet.create({
  list: { padding: 12, gap: 12 },
  row: { gap: 12 },
  title: { fontSize: 34, fontWeight: '900', color: '#FF7043', textAlign: 'center', marginBottom: 12 },
  card: {
    flex: 1,
    borderRadius: 24,
    paddingVertical: 16,
    alignItems: 'center',
    borderWidth: 3,
    borderColor: '#FFFFFF',
    shadowColor: '#000000',
    shadowOpacity: 0.12,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 3 },
    elevation: 3,
  },
  pressed: { transform: [{ scale: 0.95 }] },
  emoji: { fontSize: 56 },
  name: { fontSize: 20, fontWeight: '800', color: '#3E2723', textAlign: 'center' },
  note: { fontSize: 14, fontWeight: '600', color: '#5D4037' },
});
