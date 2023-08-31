"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.parseMd = void 0;
var gray_matter_1 = __importDefault(require("gray-matter"));
var parseMd = function (text) {
    var parsed = (0, gray_matter_1.default)(text);
    var fm = parsed.data, content = parsed.content;
    return { fm: fm, content: content };
};
exports.parseMd = parseMd;
