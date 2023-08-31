/**
 * The function `getMarkdownFilepathsSync` returns an array of filepaths with the extensions `.md` and
 * `.markdown` in the specified directory.
 * @param {string} dir - A string representing the directory path where the function should search for
 * markdown files.
 * @returns an array of filepaths that have the extensions '.md' or '.markdown'.
 */
declare function getMarkdownFilepathsSync(dir: string): string[] | undefined;
export { getMarkdownFilepathsSync };
