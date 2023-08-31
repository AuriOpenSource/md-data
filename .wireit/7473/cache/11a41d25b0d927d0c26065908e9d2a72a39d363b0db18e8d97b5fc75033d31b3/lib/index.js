var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
import path from 'path';
import fs from 'fs';
import getUuid from 'uuid-by-string';
import { getMarkdownFilepathsSync } from './lib/files';
import { parseMd } from './lib/markdown';
import { slugify } from './lib/slugify';
import { defaultConfig } from './config';
/** Extracts json data about all markdown files in a directory (srcDir), with respect to a given rootDir */
var extract = function (rootDir, srcDir, _config) {
    if (_config === void 0) { _config = {}; }
    var config = __assign(__assign({}, defaultConfig), _config);
    var srcDirPath = path.resolve(rootDir, srcDir);
    var mdFilepaths = getMarkdownFilepathsSync(srcDirPath);
    var jsons = mdFilepaths.map(function (filepath) {
        var raw = fs.readFileSync(filepath, 'utf-8');
        /** Get frontmatter and markdown content */
        var _a = parseMd(raw), fm = _a.fm, contentExtracted = _a.content;
        var content;
        if (!config.omitContent) {
            content = contentExtracted;
        }
        /** Get relative path and dir of markdown file */
        var relativePath = path.relative(rootDir, filepath);
        var relativeDir = relativePath.replace(/\/[^/]*$/, '');
        /** Get id by hashing relativePath. You can't have two files with the same path ;)  */
        var id = getUuid(relativePath);
        /** Get filename of markdown file */
        var match = relativePath.match(/\/([^/]+)$/);
        if (!match) {
            throw new Error("Error when parsing filename for file at path: ".concat(filepath));
        }
        var filename = match[1];
        /** Get slug from filename */
        var filenameNoExt = filename.replace(/((\.md)|(\.markdown))$/, '');
        var slug = slugify(filenameNoExt, config.slugify);
        return { fm: fm, content: content, relativePath: relativePath, relativeDir: relativeDir, filename: filename, slug: slug, id: id };
    });
    return jsons;
};
