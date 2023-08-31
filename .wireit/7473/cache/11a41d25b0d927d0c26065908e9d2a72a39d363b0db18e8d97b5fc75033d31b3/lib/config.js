/** Default config for mdExtract */
export var defaultConfig = {
    slugify: {
        replacement: '-',
        remove: /[*+~.()'"!:@$%^()]/g,
        lower: true,
        strict: true,
        trim: true
    },
    omitContent: false
};
