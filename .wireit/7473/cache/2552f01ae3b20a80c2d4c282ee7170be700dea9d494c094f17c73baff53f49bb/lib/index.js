"use strict";
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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var path_1 = __importDefault(require("path"));
var fs_1 = __importDefault(require("fs"));
var uuid_by_string_1 = __importDefault(require("uuid-by-string"));
var files_1 = require("./lib/files");
var markdown_1 = require("./lib/markdown");
var slugify_1 = require("./lib/slugify");
var config_1 = require("./config");
/** Extracts json data about all markdown files in a directory (srcDir), with respect to a given rootDir */
var extract = function (rootDir, srcDir, _config) {
    if (_config === void 0) { _config = {}; }
    var config = __assign(__assign({}, config_1.defaultConfig), _config);
    var srcDirPath = path_1.default.resolve(rootDir, srcDir);
    var mdFilepaths = (0, files_1.getMarkdownFilepathsSync)(srcDirPath);
    var jsons = mdFilepaths.map(function (filepath) {
        var raw = fs_1.default.readFileSync(filepath, 'utf-8');
        /** Get frontmatter and markdown content */
        var _a = (0, markdown_1.parseMd)(raw), fm = _a.fm, contentExtracted = _a.content;
        var content;
        if (!config.omitContent) {
            content = contentExtracted;
        }
        /** Get relative path and dir of markdown file */
        var relativePath = path_1.default.relative(rootDir, filepath);
        var relativeDir = relativePath.replace(/\/[^/]*$/, '');
        /** Get id by hashing relativePath. You can't have two files with the same path ;)  */
        var id = (0, uuid_by_string_1.default)(relativePath);
        /** Get filename of markdown file */
        var match = relativePath.match(/\/([^/]+)$/);
        if (!match) {
            throw new Error("Error when parsing filename for file at path: ".concat(filepath));
        }
        var filename = match[1];
        /** Get slug from filename */
        var filenameNoExt = filename.replace(/((\.md)|(\.markdown))$/, '');
        var slug = (0, slugify_1.slugify)(filenameNoExt, config.slugify);
        return { fm: fm, content: content, relativePath: relativePath, relativeDir: relativeDir, filename: filename, slug: slug, id: id };
    });
    return jsons;
};
module.exports = extract;
