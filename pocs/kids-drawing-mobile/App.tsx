import { StatusBar } from 'expo-status-bar';
import { useRef, useState } from 'react';
import { StyleSheet } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { BLANK } from './src/drawings/catalog';
import type { Category, Drawing } from './src/drawings/catalog';
import { EMPTY } from './src/paint/usePainting';
import type { Painting } from './src/paint/usePainting';
import { CanvasScreen } from './src/screens/CanvasScreen';
import { GalleryScreen } from './src/screens/GalleryScreen';
import { HomeScreen } from './src/screens/HomeScreen';

export default function App() {
  const [category, setCategory] = useState<Category | null>(null);
  const [drawing, setDrawing] = useState<Drawing | null>(null);
  const kept = useRef<Record<string, Painting>>({});
  const key = `${category?.id ?? 'free'}/${drawing?.name}`;

  const leave = (painting: Painting) => {
    kept.current[key] = painting;
    setDrawing(null);
  };

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.app}>
        {drawing ? (
          <CanvasScreen drawing={drawing} initial={kept.current[key] ?? EMPTY} onBack={leave} />
        ) : category ? (
          <GalleryScreen category={category} onDrawing={setDrawing} onBack={() => setCategory(null)} />
        ) : (
          <HomeScreen onCategory={setCategory} onFreeDraw={() => setDrawing(BLANK)} />
        )}
        <StatusBar style="dark" />
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  app: { flex: 1, backgroundColor: '#FFF3D6' },
});
