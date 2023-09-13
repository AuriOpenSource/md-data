import { resolve } from 'path';
import { getMarkdownFilepathsSync } from './files.js';
import { describe, expect, it } from 'vitest';

describe('getMarkdownFilepathsSync()', () => {
  const dir = resolve('.', 'markdowns');
  const files = getMarkdownFilepathsSync(dir);

  it('Gets all markdown filepaths in dir', () => {
    expect(files).toHaveLength(10); // hard coding - change this if number of test markdowns changes
  });

  it('Only gets markdown files', () => {
    const allFilesAreMd = files?.every((f) => /((\.md)|(\.markdown))$/.test(f));
    expect(allFilesAreMd).toBe(true);
  });
});
