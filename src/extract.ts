import { readFileSync } from 'fs';
import { basename, relative, resolve, sep } from 'path';

import { randomUUID } from 'crypto';
import { defaultConfig } from './config.js';
import { getMarkdownFilepathsSync } from './lib/files.js';
import { parseMd } from './lib/markdown.js';
import { slugify } from './lib/slugify.js';

async function extractFrontmatterAndContent<T>(filepath: string, config: ExtractConfig) {
  const {fm, content: parsedContent} = await parseMd<T>(filepath);  
  const content = config.omitContent ? '' : parsedContent;
  return { fm, content };
}

function extractFileInfo(
  filepath: string,
  rootDir: string,
  config: ExtractConfig
) {
  const relativePath = relative(rootDir, filepath)
    .replace(new RegExp(`${sep}[^${sep}]*$`, 'g'), sep)
    .replace(/\\/g, '/');
  const relativeDir = relativePath.replace(new RegExp(`${sep}[^${sep}]*$`), '');

  const id = randomUUID();
  const filename = basename(filepath);
  const filenameNoExt = filename.replace(/((\.md)|(\.markdown))$/, '');
  const slug = slugify(filenameNoExt, config.slugify);
  return { relativePath, relativeDir, id, filename, slug };
}

/**
 * The `extract` function takes a root directory, source directory, and optional configuration object,
 * and returns an array of JSON objects containing information extracted from Markdown files in the
 * source directory.
 * @param rootDir - The `rootDir` parameter is a string that represents the root directory
 * path where the source directory is located.
 * @param srcDir - The `srcDir` parameter is a string that represents the directory path where
 * the markdown files are located.
 * @param config - The `_config` parameter is an optional object that allows you to
 * customize the behavior of the `extract` function. It has the following properties:
 * @returns an array of objects. Each object contains properties such as `fm`, `content`,
 * `relativePath`, `relativeDir`, `filename`, `slug`, and `id`.
 */
async function extract<T>(
  rootDir: string,
  srcDir: string,
  config: ExtractConfig = {}
) {
  const _config = { ...defaultConfig, ...config };
  const srcDirPath = resolve(rootDir, srcDir);
  const mdFilepaths = getMarkdownFilepathsSync(srcDirPath);

  if (!mdFilepaths) throw new Error('404: Markdown not found');

  const jsons = await Promise.all(mdFilepaths.map(async (filepath) => {
    const raw = readFileSync(filepath, 'utf-8');

    /** Get frontmatter and markdown content */
    const { fm, content } = await extractFrontmatterAndContent<T>(raw, _config);
    const fileInfo = extractFileInfo(filepath, rootDir, _config);

    return { fm, content: content.replaceAll(/\r/g, ''), ...fileInfo };
  }))

  return jsons;
}

export default extract;
