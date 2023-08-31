/** From https://github.com/simov/slugify/blob/master/slugify.d.ts */
type SlugifyOptions = Options | string;

interface Options {
  replacement?: string;
  remove?: RegExp;
  lower?: boolean;
  strict?: boolean;
  locale?: string;
  trim?: boolean;
}

interface ExtractConfig {
  slugify?: SlugifyOptions;
  omitContent?: boolean;
}
