"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getMarkdownFilepathsSync = void 0;
var path_1 = __importDefault(require("path"));
var fs_1 = __importDefault(require("fs"));
/** Gets all files in a given dir, recursive */
var _getFilepathsSync = function (dir, filenames) {
    filenames = filenames || [];
    var content = fs_1.default.readdirSync(dir);
    for (var i in content) {
        var name_1 = path_1.default.join(dir, content[i]);
        var isDir = fs_1.default.statSync(name_1).isDirectory();
        if (isDir) {
            _getFilepathsSync(name_1, filenames);
        }
        else {
            filenames.push(name_1);
        }
    }
    return filenames;
};
var _getFilepathsByExtSync = function (dir, extFilters) {
    var exts;
    if (!extFilters || !extFilters.length) {
        exts = ['.*'];
    }
    else {
        exts = extFilters;
    }
    var rexs = exts.map(function (e) { return "(".concat(e, ")"); });
    var re = new RegExp("(".concat(rexs.join('|'), ")$"));
    var files = _getFilepathsSync(dir);
    return files.filter(function (f) { return re.test(f); });
};
/** Gets all markdown files in a given dir, recursive */
var getMarkdownFilepathsSync = function (dir) {
    return _getFilepathsByExtSync(dir, ['.md', '.markdown']);
};
exports.getMarkdownFilepathsSync = getMarkdownFilepathsSync;
