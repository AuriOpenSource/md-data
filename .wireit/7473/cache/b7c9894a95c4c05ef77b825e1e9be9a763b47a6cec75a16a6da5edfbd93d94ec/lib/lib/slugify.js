import s from 'slugify';
const defaults = {
    replacement: '-',
    remove: /[*+~.()'"!:@$%^()]/g,
    lower: true,
    strict: true,
    trim: true
};
const slugify = (str, _config = {}) => {
    const config = { ...defaults, ..._config };
    return s(str, config);
};
export { slugify };
