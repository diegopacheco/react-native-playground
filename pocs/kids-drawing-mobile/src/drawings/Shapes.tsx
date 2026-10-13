import { Circle, Ellipse, Path, Rect } from 'react-native-svg';
import type { Shape } from './catalog';

export const PAGE = 400;
export const INK = '#2B2B2B';

type Props = {
  shapes: Shape[];
  fills?: Record<string, string>;
  mask?: boolean;
  onFill?: (key: string) => void;
};

export function Shapes({ shapes, fills, mask, onFill }: Props) {
  const line = mask ? '#FFFFFF' : INK;
  return shapes.map((shape, index) => {
    const key = String(index);
    const kind = shape[0];
    const n = shape.slice(1) as number[];
    const d = shape[1] as string;
    const outline = { stroke: line, strokeWidth: 5, strokeLinejoin: 'round' as const, strokeLinecap: 'round' as const };
    if (kind === 'd') return <Circle key={key} cx={n[0]} cy={n[1]} r={n[2]} fill={line} pointerEvents="none" />;
    if (kind === 'l') return <Path key={key} d={d} fill="none" pointerEvents="none" {...outline} />;
    const region = {
      ...outline,
      fill: mask ? '#000000' : fills?.[key] ?? '#FFFFFF',
      onPress: onFill ? () => onFill(key) : undefined,
    };
    if (kind === 'c') return <Circle key={key} cx={n[0]} cy={n[1]} r={n[2]} {...region} />;
    if (kind === 'e') return <Ellipse key={key} cx={n[0]} cy={n[1]} rx={n[2]} ry={n[3]} transform={`rotate(${n[4] ?? 0} ${n[0]} ${n[1]})`} {...region} />;
    if (kind === 'r') return <Rect key={key} x={n[0]} y={n[1]} width={n[2]} height={n[3]} rx={n[4] ?? 0} {...region} />;
    return <Path key={key} d={d} {...region} />;
  });
}
