import { extname, join } from 'path';
import { statSync, readdirSync } from 'fs';
import { LRUCache } from 'lru-cache';
const cache = new LRUCache({ max: 2048 });
/**
 * The function recursively retrieves all file paths within a given directory.
 * @param {string} dir - The `dir` parameter is a string that represents the directory path from which
 * you want to retrieve the file paths.
 * @param {string[]} filenames - The `filenames` parameter is an optional array of strings that
 * represents the filenames that have been found so far. It is initially an empty array, but as the
 * function recursively traverses through directories, it adds the file paths to this array.
 * @returns an array of file paths.
 */
function getFilepathsSync(dir, filenames = []) {
    const content = readdirSync(dir);
    for (const item in content) {
        const filePath = join(dir, content[item]);
        const isDir = statSync(filePath).isDirectory();
        if (isDir) {
            getFilepathsSync(filePath, filenames);
        }
        else {
            filenames.push(filePath);
        }
    }
    return filenames;
}
/**
 * The function `getFilepathsByExtSync` returns an array of file paths in a directory that match the
 * specified file extensions.
 * @param {string} dir - The `dir` parameter is a string that represents the directory path where the
 * function will search for files.
 * @param {string[]} extFilters - The `extFilters` parameter is an optional array of file extensions
 * that you want to filter the files by. If `extFilters` is not provided or is an empty array, it will
 * default to filtering by all file extensions.
 * @returns an array of file paths that match the specified extension filters.
 */
function getFilepathsByExtSync(dir, extFilters = []) {
    const cacheKey = `${dir}-${extFilters.join(',')}`;
    if (cache.has(cacheKey))
        return cache.get(cacheKey);
    const exts = new Set(extFilters.length ? extFilters : ['.*']);
    const files = getFilepathsSync(dir);
    const filteredFiles = files.filter((f) => exts.has(extname(f)));
    cache.set(cacheKey, filteredFiles);
    return filteredFiles;
}
/**
 * The function `getMarkdownFilepathsSync` returns an array of filepaths with the extensions `.md` and
 * `.markdown` in the specified directory.
 * @param {string} dir - A string representing the directory path where the function should search for
 * markdown files.
 * @returns an array of filepaths that have the extensions '.md' or '.markdown'.
 */
function getMarkdownFilepathsSync(dir) {
    return getFilepathsByExtSync(dir, ['.md', '.markdown']);
}
export { getMarkdownFilepathsSync };
//# sourceMappingURL=files.js.map