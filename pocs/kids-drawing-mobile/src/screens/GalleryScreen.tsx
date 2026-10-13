import { memo } from 'react';
import { FlatList, Pressable, StyleSheet, Text, useWindowDimensions, View } from 'react-native';
import Svg from 'react-native-svg';
import { RoundButton } from '../components/RoundButton';
import type { Category, Drawing } from '../drawings/catalog';
import { PAGE, Shapes } from '../drawings/Shapes';

type Props = { category: Category; onDrawing: (drawing: Drawing) => void; onBack: () => void };

const GAP = 12;

const Thumb = memo(({ drawing, side, onPress }: { drawing: Drawing; side: number; onPress: (drawing: Drawing) => void }) => (
  <Pressable
    accessibilityRole="button"
    accessibilityLabel={drawing.name}
    onPress={() => onPress(drawing)}
    style={({ pressed }) => [styles.thumb, { width: side }, pressed && styles.pressed]}
  >
    <Svg width={side - 16} height={side - 16} viewBox={`0 0 ${PAGE} ${PAGE}`}>
      <Shapes shapes={drawing.shapes} />
    </Svg>
    <Text style={styles.name} numberOfLines={1}>
      {drawing.name}
    </Text>
  </Pressable>
));

export function GalleryScreen({ category, onDrawing, onBack }: Props) {
  const { width } = useWindowDimensions();
  const side = (width - GAP * 3) / 2;
  return (
    <View style={styles.screen}>
      <View style={styles.header}>
        <RoundButton emoji="🏠" label="Back" onPress={onBack} />
        <Text style={styles.title} numberOfLines={1}>
          {category.emoji} {category.name}
        </Text>
      </View>
      <FlatList
        data={category.drawings}
        numColumns={2}
        keyExtractor={(drawing) => drawing.name}
        contentContainerStyle={styles.list}
        columnWrapperStyle={styles.row}
        renderItem={({ item }) => <Thumb drawing={item} side={side} onPress={onDrawing} />}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1 },
  header: { flexDirection: 'row', alignItems: 'center', gap: 12, paddingHorizontal: 12, paddingVertical: 8 },
  title: { flex: 1, fontSize: 26, fontWeight: '900', color: '#FF7043' },
  list: { padding: GAP, gap: GAP },
  row: { gap: GAP },
  thumb: { backgroundColor: '#FFFFFF', borderRadius: 20, padding: 8, alignItems: 'center', borderWidth: 3, borderColor: '#FFD180' },
  pressed: { transform: [{ scale: 0.95 }] },
  name: { fontSize: 16, fontWeight: '800', color: '#3E2723' },
});
