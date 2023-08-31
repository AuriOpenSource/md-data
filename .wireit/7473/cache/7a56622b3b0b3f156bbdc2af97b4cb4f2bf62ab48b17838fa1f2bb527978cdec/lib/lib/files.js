import path from 'path';
import fs from 'fs';
/** Gets all files in a given dir, recursive */
const _getFilepathsSync = (dir, filenames) => {
    filenames = filenames || [];
    const content = fs.readdirSync(dir);
    for (let i in content) {
        const name = path.join(dir, content[i]);
        const isDir = fs.statSync(name).isDirectory();
        if (isDir) {
            _getFilepathsSync(name, filenames);
        }
        else {
            filenames.push(name);
        }
    }
    return filenames;
};
const _getFilepathsByExtSync = (dir, extFilters) => {
    let exts;
    if (!extFilters || !extFilters.length) {
        exts = ['.*'];
    }
    else {
        exts = extFilters;
    }
    const rexs = exts.map((e) => `(${e})`);
    const re = new RegExp(`(${rexs.join('|')})$`);
    const files = _getFilepathsSync(dir);
    return files.filter((f) => re.test(f));
};
/** Gets all markdown files in a given dir, recursive */
const getMarkdownFilepathsSync = (dir) => {
    return _getFilepathsByExtSync(dir, ['.md', '.markdown']);
};
export { getMarkdownFilepathsSync };
