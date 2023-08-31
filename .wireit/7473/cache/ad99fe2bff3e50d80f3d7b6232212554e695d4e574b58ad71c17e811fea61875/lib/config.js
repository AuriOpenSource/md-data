/** Default config for mdExtract */
export const defaultConfig = {
    slugify: {
        replacement: '-',
        remove: /[*+~.()'"!:@$%^()]/g,
        lower: true,
        strict: true,
        trim: true
    },
    omitContent: false
};
