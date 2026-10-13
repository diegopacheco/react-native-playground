import { memo, useMemo } from 'react';
import { PanResponder, StyleSheet, View } from 'react-native';
import type { GestureResponderEvent } from 'react-native';
import Svg, { Defs, Mask, Path, Rect } from 'react-native-svg';
import type { Drawing } from '../drawings/catalog';
import { INK, PAGE, Shapes } from '../drawings/Shapes';
import { opacityOf, pathOf, widthOf } from '../paint/strokes';
import type { Point, Stroke } from '../paint/strokes';
import type { Painting } from '../paint/usePainting';

type Props = {
  drawing: Drawing;
  painting: Painting;
  live: Stroke | null;
  side: number;
  tapToFill: boolean;
  onStart: (point: Point) => void;
  onMove: (point: Point) => void;
  onEnd: () => void;
  onFill: (key: string) => void;
};

const VIEW_BOX = `0 0 ${PAGE} ${PAGE}`;

const StrokePath = memo(({ stroke }: { stroke: Stroke }) => (
  <Path
    d={pathOf(stroke)}
    stroke={stroke.color}
    strokeWidth={widthOf(stroke)}
    opacity={opacityOf(stroke)}
    strokeLinecap="round"
    strokeLinejoin="round"
    fill="none"
  />
));

const Paper = memo(({ drawing, fills, onFill }: { drawing: Drawing; fills: Record<string, string>; onFill: (key: string) => void }) => (
  <Svg style={StyleSheet.absoluteFill} viewBox={VIEW_BOX}>
    <Rect width={PAGE} height={PAGE} fill={fills.page ?? '#FFFFFF'} onPress={() => onFill('page')} />
    <Shapes shapes={drawing.shapes} fills={fills} onFill={onFill} />
  </Svg>
));

const LineArt = memo(({ drawing }: { drawing: Drawing }) => (
  <Svg style={StyleSheet.absoluteFill} viewBox={VIEW_BOX} pointerEvents="none">
    <Defs>
      <Mask id="ink" x={0} y={0} width={PAGE} height={PAGE} maskUnits="userSpaceOnUse">
        <Rect width={PAGE} height={PAGE} fill="#000000" />
        <Shapes shapes={drawing.shapes} mask />
      </Mask>
    </Defs>
    <Rect width={PAGE} height={PAGE} fill={INK} mask="url(#ink)" />
  </Svg>
));

export function Canvas({ drawing, painting, live, side, tapToFill, onStart, onMove, onEnd, onFill }: Props) {
  const pan = useMemo(() => {
    const pointOf = (event: GestureResponderEvent): Point => ({
      x: (event.nativeEvent.locationX * PAGE) / side,
      y: (event.nativeEvent.locationY * PAGE) / side,
    });
    return PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: () => true,
      onPanResponderTerminationRequest: () => false,
      onPanResponderGrant: (event) => onStart(pointOf(event)),
      onPanResponderMove: (event) => onMove(pointOf(event)),
      onPanResponderRelease: onEnd,
      onPanResponderTerminate: onEnd,
    });
  }, [side, onStart, onMove, onEnd]);

  return (
    <View style={[styles.page, { width: side, height: side }]}>
      <Paper drawing={drawing} fills={painting.fills} onFill={onFill} />
      <Svg style={StyleSheet.absoluteFill} viewBox={VIEW_BOX} pointerEvents="none">
        {painting.strokes.map((stroke, index) => (
          <StrokePath key={index} stroke={stroke} />
        ))}
        {live && <StrokePath stroke={live} />}
      </Svg>
      <LineArt drawing={drawing} />
      <View style={StyleSheet.absoluteFill} pointerEvents={tapToFill ? 'none' : 'auto'} {...pan.panHandlers} />
    </View>
  );
}

const styles = StyleSheet.create({
  page: { backgroundColor: '#FFFFFF', borderRadius: 16, overflow: 'hidden', borderWidth: 3, borderColor: '#FFD180' },
});
