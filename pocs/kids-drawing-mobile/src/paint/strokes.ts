export type Point = { x: number; y: number };
export type ToolId = 'crayon' | 'pencil' | 'marker' | 'brush' | 'spray' | 'fill' | 'eraser';
export type Stroke = { tool: ToolId; color: string; size: number; points: Point[] };
export type Tool = { id: ToolId; emoji: string; width: number; opacity: number };

export const TOOLS: Tool[] = [
  { id: 'crayon', emoji: '🖍️', width: 1, opacity: 0.8 },
  { id: 'pencil', emoji: '✏️', width: 0.35, opacity: 1 },
  { id: 'marker', emoji: '🖊️', width: 1.4, opacity: 0.55 },
  { id: 'brush', emoji: '🖌️', width: 2.2, opacity: 1 },
  { id: 'spray', emoji: '💨', width: 0.22, opacity: 0.9 },
  { id: 'fill', emoji: '🪣', width: 0, opacity: 1 },
  { id: 'eraser', emoji: '🧽', width: 1.5, opacity: 1 },
];

export const SIZES = [8, 14, 22];

export const COLORS = [
  '#E53935', '#FF7043', '#FFA726', '#FFEB3B', '#C0CA33', '#66BB6A', '#2E7D32', '#26C6DA',
  '#42A5F5', '#1E50C8', '#7E57C2', '#BA68C8', '#F48FB1', '#EC407A', '#FFCCBC', '#D7A77A',
  '#8D6E63', '#5D4037', '#FFFFFF', '#CFD8DC', '#90A4AE', '#546E7A', '#263238', '#000000',
];

const STEP = 3;
const SPRAY_DOTS = 12;

const toolOf = (id: ToolId): Tool => TOOLS.find((tool) => tool.id === id) as Tool;

const round = (value: number): number => Math.round(value * 10) / 10;

export const widthOf = (stroke: Stroke): number => stroke.size * toolOf(stroke.tool).width;

export const opacityOf = (stroke: Stroke): number => toolOf(stroke.tool).opacity;

export const between = (from: Point, to: Point): Point[] => {
  const count = Math.max(1, Math.ceil(Math.hypot(to.x - from.x, to.y - from.y) / STEP));
  return Array.from({ length: count }, (_, index) => {
    const t = (index + 1) / count;
    return { x: from.x + (to.x - from.x) * t, y: from.y + (to.y - from.y) * t };
  });
};

export const spray = (at: Point, size: number, random: () => number = Math.random): Point[] =>
  Array.from({ length: SPRAY_DOTS }, () => {
    const angle = random() * Math.PI * 2;
    const reach = Math.sqrt(random()) * size * 1.5;
    return { x: at.x + Math.cos(angle) * reach, y: at.y + Math.sin(angle) * reach };
  });

export const pathOf = (stroke: Stroke): string => {
  const spots = stroke.points.map((point) => `${round(point.x)} ${round(point.y)}`);
  if (stroke.tool === 'spray' || spots.length === 1) return spots.map((spot) => `M${spot}h0.01`).join('');
  return `M${spots.join('L')}`;
};

export const erase = (strokes: Stroke[], at: Point, radius: number): Stroke[] =>
  strokes.flatMap((stroke) => {
    const reach = radius + widthOf(stroke) / 2;
    const hit = (point: Point) => Math.hypot(point.x - at.x, point.y - at.y) <= reach;
    if (!stroke.points.some(hit)) return [stroke];
    const runs: Point[][] = [[]];
    stroke.points.forEach((point) => {
      if (!hit(point)) runs[runs.length - 1].push(point);
      else if (stroke.tool !== 'spray') runs.push([]);
    });
    return runs.filter((run) => run.length > 0).map((points) => ({ ...stroke, points }));
  });
