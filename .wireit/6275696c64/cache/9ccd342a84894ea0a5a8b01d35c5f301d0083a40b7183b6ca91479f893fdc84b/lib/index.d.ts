import { ExtractConfig } from './types';
/** Extracts json data about all markdown files in a directory (srcDir), with respect to a given rootDir */
declare const extract: (rootDir: string, srcDir: string, _config?: ExtractConfig) => {
    fm: {
        [key: string]: any;
    };
    content: string | undefined;
    relativePath: string;
    relativeDir: string;
    filename: string;
    slug: string;
    id: string;
}[];
export = extract;
