import { useState } from 'react';
import { Pressable, StyleSheet, useWindowDimensions, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Canvas } from '../components/Canvas';
import { RoundButton } from '../components/RoundButton';
import type { Drawing } from '../drawings/catalog';
import { COLORS, SIZES, TOOLS } from '../paint/strokes';
import type { ToolId } from '../paint/strokes';
import { usePainting } from '../paint/usePainting';
import type { Painting } from '../paint/usePainting';

type Props = { drawing: Drawing; initial: Painting; onBack: (painting: Painting) => void };

const CHROME = 290;
const PER_ROW = 8;

export function CanvasScreen({ drawing, initial, onBack }: Props) {
  const { width, height } = useWindowDimensions();
  const insets = useSafeAreaInsets();
  const [tool, setTool] = useState<ToolId>('crayon');
  const [color, setColor] = useState(COLORS[0]);
  const [size, setSize] = useState(SIZES[1]);
  const { painting, live, start, move, end, fill, undo, clear } = usePainting(initial, { tool, color, size });
  const side = Math.min(width - 16, height - insets.top - insets.bottom - CHROME);
  const swatch = Math.min(44, (width - 16) / PER_ROW - 6);

  return (
    <View style={styles.screen}>
      <View style={styles.bar}>
        <RoundButton emoji="🏠" label="Back" onPress={() => onBack(painting)} />
        <View style={styles.group}>
          {SIZES.map((option) => (
            <RoundButton key={option} label={`Size ${option}`} active={option === size} onPress={() => setSize(option)}>
              <View style={{ width: option + 4, height: option + 4, borderRadius: option, backgroundColor: color, borderWidth: 1, borderColor: '#999999' }} />
            </RoundButton>
          ))}
        </View>
        <View style={styles.group}>
          <RoundButton emoji="↩️" label="Undo" onPress={undo} />
          <RoundButton emoji="🗑️" label="Clear" onPress={clear} />
        </View>
      </View>
      <Canvas
        drawing={drawing}
        painting={painting}
        live={live}
        side={side}
        tapToFill={tool === 'fill'}
        onStart={start}
        onMove={move}
        onEnd={end}
        onFill={fill}
      />
      <View style={styles.bar}>
        {TOOLS.map((option) => (
          <RoundButton key={option.id} emoji={option.emoji} label={option.id} active={option.id === tool} onPress={() => setTool(option.id)} />
        ))}
      </View>
      <View style={styles.palette}>
        {COLORS.map((option) => (
          <Pressable
            key={option}
            accessibilityRole="button"
            accessibilityLabel={`Color ${option}`}
            onPress={() => setColor(option)}
            style={[
              styles.swatch,
              { width: swatch, height: swatch, borderRadius: swatch / 2, backgroundColor: option },
              option === color && styles.picked,
            ]}
          />
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, alignItems: 'center', justifyContent: 'space-evenly' },
  bar: { flexDirection: 'row', alignSelf: 'stretch', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 8 },
  group: { flexDirection: 'row', gap: 8 },
  palette: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center', gap: 6, paddingHorizontal: 8 },
  swatch: { borderWidth: 2, borderColor: '#BDBDBD' },
  picked: { borderWidth: 5, borderColor: '#2B2B2B', transform: [{ scale: 1.15 }] },
});
