import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { test } from 'node:test';

const root = path.join(import.meta.dirname, '..', 'src', 'drawings');
const files = fs.readdirSync(path.join(root, 'data')).filter((file) => file.endsWith('.json'));
const categories = files.map((file) => ({ file, ...JSON.parse(fs.readFileSync(path.join(root, 'data', file), 'utf8')) }));
const drawings = categories.flatMap((category) => category.drawings.map((drawing) => ({ ...drawing, where: `${category.id}/${drawing.name}` })));
const sizes = { c: [3, 3], e: [4, 5], r: [4, 5], d: [3, 3], p: [1, 1], l: [1, 1] };

test('the kid gets more than 200 coloring pages', () => {
  assert.ok(drawings.length > 200, `only ${drawings.length} drawings`);
});

test('every category file is registered in the catalog so no page is hidden from the app', () => {
  const catalog = fs.readFileSync(path.join(root, 'catalog.ts'), 'utf8');
  files.forEach((file) => assert.ok(catalog.includes(`'./data/${file}'`), `${file} is not imported`));
  assert.equal(new Set(categories.map((category) => category.id)).size, categories.length);
  categories.forEach((category) => assert.equal(`${category.id}.json`, category.file));
});

test('every category has what the home card shows', () => {
  categories.forEach((category) => {
    assert.ok(category.name && category.emoji, category.file);
    assert.match(category.color, /^#[0-9a-fA-F]{6}$/, category.file);
    assert.ok(category.drawings.length >= 8, category.file);
  });
});

test('drawing names are unique inside a category because saved paintings are keyed by them', () => {
  categories.forEach((category) => {
    const names = category.drawings.map((drawing) => drawing.name);
    assert.equal(new Set(names).size, names.length, category.file);
  });
});

test('every shape is something the renderer knows how to paint', () => {
  drawings.forEach((drawing) => {
    assert.ok(drawing.shapes.length >= 4, drawing.where);
    drawing.shapes.forEach((shape, index) => {
      const where = `${drawing.where}[${index}]`;
      const [kind, ...values] = shape;
      assert.ok(sizes[kind], `${where} unknown kind ${kind}`);
      assert.ok(values.length >= sizes[kind][0] && values.length <= sizes[kind][1], `${where} wrong value count`);
      if (kind === 'p' || kind === 'l') {
        assert.match(values[0], /^M[MmLlHhVvCcSsQqTtAaZz0-9eE\s,.\-]*$/, where);
        if (kind === 'p') assert.match(values[0], /[Zz]\s*$/, `${where} region is not closed`);
        return;
      }
      values.forEach((value) => assert.ok(Number.isFinite(value), where));
    });
  });
});

test('every page has at least one region a child can tap to fill', () => {
  drawings.forEach((drawing) => {
    assert.ok(drawing.shapes.some((shape) => ['c', 'e', 'r', 'p'].includes(shape[0])), drawing.where);
  });
});

test('round and square regions stay on the page', () => {
  drawings.forEach((drawing) => {
    drawing.shapes.forEach((shape) => {
      const [kind, a, b, c, d] = shape;
      if (kind === 'c' || kind === 'd') assert.ok(a - c >= 0 && a + c <= 400 && b - c >= 0 && b + c <= 400, drawing.where);
      if (kind === 'r') assert.ok(a >= 0 && b >= 0 && a + c <= 400 && b + d <= 400, drawing.where);
    });
  });
});
