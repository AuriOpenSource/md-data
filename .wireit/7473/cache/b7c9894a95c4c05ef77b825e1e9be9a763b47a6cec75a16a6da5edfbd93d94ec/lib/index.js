import path from 'path';
import fs from 'fs';
import getUuid from 'uuid-by-string';
import { getMarkdownFilepathsSync } from './lib/files';
import { parseMd } from './lib/markdown';
import { slugify } from './lib/slugify';
import { defaultConfig } from './config';
/** Extracts json data about all markdown files in a directory (srcDir), with respect to a given rootDir */
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
