import assert from 'node:assert/strict';
import { test } from 'node:test';
import { between, erase, pathOf, spray, widthOf } from '../src/paint/strokes.ts';

const line = (points, tool = 'pencil') => ({ tool, color: '#E53935', size: 8, points });
const row = (from, to) => Array.from({ length: to - from + 1 }, (_, index) => ({ x: from + index, y: 100 }));

test('a fast finger drag leaves no gap wider than 3 units so the eraser can never slip between points', () => {
  const points = [{ x: 0, y: 0 }, ...between({ x: 0, y: 0 }, { x: 200, y: 150 })];
  const gaps = points.slice(1).map((point, index) => Math.hypot(point.x - points[index].x, point.y - points[index].y));
  assert.ok(Math.max(...gaps) <= 3);
  assert.deepEqual(points[points.length - 1], { x: 200, y: 150 });
});

test('a single tap still paints a visible dot', () => {
  assert.equal(pathOf(line([{ x: 10, y: 20 }])), 'M10 20h0.01');
});

test('a dragged line becomes one connected path', () => {
  assert.equal(pathOf(line([{ x: 1, y: 2 }, { x: 3.04, y: 4 }])), 'M1 2L3 4');
});

test('spray paints separate dots that stay close to the finger', () => {
  const dots = spray({ x: 100, y: 100 }, 14);
  assert.ok(dots.length >= 8);
  dots.forEach((dot) => assert.ok(Math.hypot(dot.x - 100, dot.y - 100) <= 14 * 1.5 + 0.001));
  assert.equal(pathOf(line(dots, 'spray')).split('M').length - 1, dots.length);
});

test('rubbing the middle of a line removes only that part and keeps both ends', () => {
  const stroke = line(row(0, 100));
  const left = erase([stroke], { x: 50, y: 100 }, 5);
  assert.equal(left.length, 2);
  const reach = 5 + widthOf(stroke) / 2;
  left.flatMap((piece) => piece.points).forEach((point) => assert.ok(Math.abs(point.x - 50) > reach));
  assert.equal(left[0].points[0].x, 0);
  assert.equal(left[1].points[left[1].points.length - 1].x, 100);
  assert.equal(left[0].color, stroke.color);
});

test('rubbing the edge of a fat brush stroke still erases it', () => {
  const stroke = line(row(0, 100), 'brush');
  const edge = { x: 50, y: 100 + widthOf(stroke) / 2 };
  assert.equal(erase([stroke], edge, 4).length, 2);
});

test('strokes away from the eraser are returned untouched so they are not redrawn', () => {
  const far = line(row(0, 20));
  const near = line(row(200, 220));
  const result = erase([far, near], { x: 210, y: 100 }, 100);
  assert.equal(result.length, 1);
  assert.equal(result[0], far);
});

test('the eraser removes only the spray dots it touches', () => {
  const stroke = line([{ x: 10, y: 10 }, { x: 200, y: 200 }, { x: 12, y: 10 }], 'spray');
  const result = erase([stroke], { x: 11, y: 10 }, 5);
  assert.equal(result.length, 1);
  assert.deepEqual(result[0].points, [{ x: 200, y: 200 }]);
});
