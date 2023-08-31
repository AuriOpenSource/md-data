interface MarkdownData<T> {
    fm: Record<string, any> | T;
    content: string;
}
declare function parseMd<T>(text: string): MarkdownData<T>;
export { parseMd };
