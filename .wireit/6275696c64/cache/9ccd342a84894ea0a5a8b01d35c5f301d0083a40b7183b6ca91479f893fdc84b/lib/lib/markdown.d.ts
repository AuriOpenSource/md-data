interface MarkdownData {
    fm: {
        [key: string]: any;
    };
    content: string;
}
declare const parseMd: (text: string) => MarkdownData;
export { parseMd };
