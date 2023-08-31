"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.defaultConfig = void 0;
/** Default config for mdExtract */
exports.defaultConfig = {
    slugify: {
        replacement: '-',
        remove: /[*+~.()'"!:@$%^()]/g,
        lower: true,
        strict: true,
        trim: true
    },
    omitContent: false
};
