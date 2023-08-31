import { resolve } from 'path';
import { bench, describe } from 'vitest';
import { extract } from './index.js';


describe('EXTRACT:', () => {
  bench('normal', () => {
    const rootDir = resolve('.');
    const srcDir = resolve(rootDir, 'markdowns');
    extract(rootDir, srcDir);
  }, {
    iterations: 10
  });

  bench('ommiting content', () => {
    const opts = {
      omitContent: true
    };

    const rootDir = resolve('.');
    const srcDir = resolve(rootDir, 'markdowns');
    extract(rootDir, srcDir, opts);
  }, {
    iterations: 10
  });

  bench('with slugify', () => {
    const removed = new RegExp('m');

    const opts = {
      slugify: {
        remove: removed
      }
    };

    const rootDir = resolve('.');
    const srcDir = resolve(rootDir, 'markdowns');
    extract(rootDir, srcDir, opts);
  }, {
    iterations: 10
  });
});
