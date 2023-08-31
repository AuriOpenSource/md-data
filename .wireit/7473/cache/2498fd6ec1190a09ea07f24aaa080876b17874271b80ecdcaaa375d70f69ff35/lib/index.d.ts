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
declare function extract<T>(rootDir: string, srcDir: string, _config?: ExtractConfig): {
    fm: Record<string, any> | T;
    content: string | undefined;
    relativePath: string;
    relativeDir: string;
    filename: string;
    slug: string;
    id: string;
}[];
export default extract;
