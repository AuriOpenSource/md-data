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
Object.defineProperty(exports, "__esModule", { value: true });
exports.slugify = void 0;
var slugify_1 = __importDefault(require("slugify"));
var defaults = {
    replacement: '-',
    remove: /[*+~.()'"!:@$%^()]/g,
    lower: true,
    strict: true,
    trim: true
};
var slugify = function (str, _config) {
    if (_config === void 0) { _config = {}; }
    var config = __assign(__assign({}, defaults), _config);
    return (0, slugify_1.default)(str, config);
};
exports.slugify = slugify;
