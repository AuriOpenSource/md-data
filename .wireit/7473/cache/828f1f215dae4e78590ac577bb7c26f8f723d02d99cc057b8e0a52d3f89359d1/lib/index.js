import path from 'path';
import fs from 'fs';
import getUuid from 'uuid-by-string';
import { getMarkdownFilepathsSync } from './lib/files.js';
import { parseMd } from './lib/markdown.js';
import { slugify } from './lib/slugify.js';
import { defaultConfig } from './config.js';
/**
 * The `extract` function takes a root directory, source directory, and optional configuration object,
 * and returns an array of JSON objects containing information extracted from Markdown files in the
 * source directory.
 * @param {string} rootDir - The `rootDir` parameter is a string that represents the root directory
 * path where the source directory is located.
 * @param {string} srcDir - The `srcDir` parameter is a string that represents the directory path where
 * the markdown files are located.
 * @param {ExtractConfig} _config - The `_config` parameter is an optional object that allows you to
 * customize the behavior of the `extract` function. It has the following properties:
 * @returns an array of objects. Each object contains properties such as `fm`, `content`,
 * `relativePath`, `relativeDir`, `filename`, `slug`, and `id`.
 */
function extract(rootDir, srcDir, _config = {}) {
    const config = { ...defaultConfig, ..._config };
    const srcDirPath = path.resolve(rootDir, srcDir);
    const mdFilepaths = getMarkdownFilepathsSync(srcDirPath);
    const jsons = mdFilepaths.map((filepath) => {
        const raw = fs.readFileSync(filepath, 'utf-8');
        /** Get frontmatter and markdown content */
        const { fm, content: contentExtracted } = parseMd(raw);
        let content;
        if (!config.omitContent) {
            content = contentExtracted;
        }
        /** Get relative path and dir of markdown file */
        const relativePath = path.relative(rootDir, filepath);
        const relativeDir = relativePath.replace(/\/[^/]*$/, '');
        /** Get id by hashing relativePath. You can't have two files with the same path ;)  */
        const id = getUuid(relativePath);
        /** Get filename of markdown file */
        const match = relativePath.match(/\/([^/]+)$/);
        if (!match) {
            throw new Error(`Error when parsing filename for file at path: ${filepath}`);
        }
        const filename = match[1];
        /** Get slug from filename */
        const filenameNoExt = filename.replace(/((\.md)|(\.markdown))$/, '');
        const slug = slugify(filenameNoExt, config.slugify);
        return { fm, content, relativePath, relativeDir, filename, slug, id };
    });
    return jsons;
}
export default extract;
