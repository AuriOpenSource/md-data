import { resolve } from 'path';
import { beforeAll, describe, expect, it } from 'vitest';
import { extract } from './index.js';
import { getMarkdownFilepathsSync } from './lib/files.js';

let testMarkdownFilepaths: string[];

beforeAll(() => {
  const dir = resolve('.', 'markdowns');
  testMarkdownFilepaths = getMarkdownFilepathsSync(dir) || [];
});

describe('extract()', async () => {
  const rootDir = resolve('.');
  const srcDir = resolve(rootDir, 'markdowns');

  const jsons = await extract(rootDir, srcDir);

  it('Returns objects of expected format', async () => {
    // deep dive jsons[0]
    expect(jsons[0].content).toMatch(
      '\n# On the first day\n\nGod created markdown'
    );
    expect(jsons[0].relativePath).toMatch(`markdowns/flat/md1.md`);
    expect(jsons[0].relativeDir).toMatch(`markdowns/flat`);
    expect(jsons[0].slug).toMatch('md1');
    expect(jsons[0].filename).toMatch('md1.md');
    expect(jsons[0].fm).toMatchObject({
      title: 'foo1',
      tags: ['foo', 'bar']
    });

    // generic tests for the rest
    jsons.forEach((j) => {
      expect(typeof j.content).toMatch('string');
      expect(j.fm).toMatchObject({});
      expect(j.relativePath).toMatch(/((\.md)|(\.markdown))$/);
      expect(j.relativeDir).toMatch(j.relativePath.replace(/\/[^/]*$/, ''));
      expect(typeof j.slug).toMatch('string');
      expect(j.filename).toMatch(/((\.md)|(\.markdown))$/);
    });
  });

  it('Returns an object for every markdown file', () => {
    expect(jsons).toHaveLength(testMarkdownFilepaths.length);
  });

  it.todo('Should not return mf if no mf', () => {
    console.log(jsons);
  });
});

describe('Config: options.omitContent', async () => {
  const opts = {
    omitContent: true
  };

  const rootDir = resolve('.');
  const srcDir = resolve(rootDir, 'markdowns');

  const jsonsWithConfig = await extract(rootDir, srcDir, opts);

  it('Returns objects of expected format', () => {
    expect(jsonsWithConfig.every((j) => !j.content)).toBe(true);
  });
});

describe('Config: options.slugify', async () => {
  const removed = new RegExp('m');

  const opts = {
    slugify: {
      remove: removed
    }
  };

  const rootDir = resolve('.');
  const srcDir = resolve(rootDir, 'markdowns');

  const jsonsWithConfig = await extract(rootDir, srcDir, opts);

  it('Returns objects of expected format', () => {
    expect(jsonsWithConfig.every((j) => !j.slug.match(removed))).toBe(true);
  });
});
