import type { ReactNode } from 'react';
import { Pressable, StyleSheet, Text } from 'react-native';

type Props = { emoji?: string; label: string; active?: boolean; onPress: () => void; children?: ReactNode };

export function RoundButton({ emoji, label, active, onPress, children }: Props) {
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={label}
      onPress={onPress}
      style={({ pressed }) => [styles.button, active && styles.active, pressed && styles.pressed]}
    >
      {emoji ? <Text style={styles.emoji}>{emoji}</Text> : children}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 3,
    borderColor: '#FFE0A3',
  },
  active: { borderColor: '#FF7043', backgroundColor: '#FFE9C7', transform: [{ scale: 1.12 }] },
  pressed: { opacity: 0.6 },
  emoji: { fontSize: 24 },
});
