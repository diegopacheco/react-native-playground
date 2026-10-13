import { useMemo, useRef, useState } from 'react';
import { between, erase, spray } from './strokes';
import type { Point, Stroke, ToolId } from './strokes';

export type Painting = { strokes: Stroke[]; fills: Record<string, string> };
export type Brush = { tool: ToolId; color: string; size: number };

export const EMPTY: Painting = { strokes: [], fills: {} };

const UNDO_LIMIT = 40;
const ERASER_REACH = 1.5;

export function usePainting(initial: Painting, brush: Brush) {
  const [painting, setPainting] = useState(initial);
  const [live, setLive] = useState<Stroke | null>(null);
  const state = useRef({ painting: initial, live: null as Stroke | null, past: [] as Painting[], last: { x: 0, y: 0 }, brush });
  state.current.brush = brush;

  const actions = useMemo(() => {
    const now = state.current;
    const show = (next: Painting) => {
      now.painting = next;
      setPainting(next);
    };
    const draw = (next: Stroke | null) => {
      now.live = next;
      setLive(next);
    };
    const remember = () => {
      now.past = [...now.past.slice(1 - UNDO_LIMIT), now.painting];
    };
    const rub = (spots: Point[]) => {
      const reach = now.brush.size * ERASER_REACH;
      show({ ...now.painting, strokes: spots.reduce((strokes, at) => erase(strokes, at, reach), now.painting.strokes) });
    };
    return {
      start: (point: Point) => {
        const { tool, color, size } = now.brush;
        now.last = point;
        if (tool === 'eraser') {
          remember();
          rub([point]);
          return;
        }
        draw({ tool, color, size, points: tool === 'spray' ? spray(point, size) : [point] });
      },
      move: (point: Point) => {
        const steps = between(now.last, point);
        now.last = point;
        if (now.brush.tool === 'eraser') {
          rub(steps);
          return;
        }
        if (!now.live) return;
        const added = now.live.tool === 'spray' ? spray(point, now.live.size) : steps;
        draw({ ...now.live, points: [...now.live.points, ...added] });
      },
      end: () => {
        if (!now.live) return;
        remember();
        show({ ...now.painting, strokes: [...now.painting.strokes, now.live] });
        draw(null);
      },
      fill: (key: string) => {
        remember();
        show({ ...now.painting, fills: { ...now.painting.fills, [key]: now.brush.color } });
      },
      undo: () => {
        const previous = now.past.pop();
        if (previous) show(previous);
      },
      clear: () => {
        remember();
        show(EMPTY);
      },
    };
  }, []);

  return { painting, live, ...actions };
}
