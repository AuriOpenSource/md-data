import s from 'slugify';

const defaults = {
  replacement: '-',
  remove: /[*+~.()'"!:@$%^()]/g,
  lower: true,
  strict: true,
  trim: true
};

const slugifyInstance = s.default;
/**
 * The function slugify takes a string and an optional configuration object, and returns a slugified
 * version of the string.
 * @param {string} str - The `str` parameter is a string that you want to convert into a slug. A slug
 * is a URL-friendly version of a string, typically used in URLs, file names, or as an identifier.
 * @param config - The `config` parameter is an optional object that allows you to customize the
 * behavior of the `slugify` function. It is merged with the `defaults` object using the spread
 * operator (`...`) to create a new `config` object. This allows you to override any default
 * configuration options with your
 * @returns The function `slugify` is returning a string.
 */
function slugify(str: string, config = {}): string {
  const _config = { ...defaults, ...config };
  return slugifyInstance(str, _config);
}

export { slugify };
