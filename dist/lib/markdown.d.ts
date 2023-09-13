interface MarkdownData<T> {
    fm: Record<string, any> | T;
    content: string;
}
declare function parseMd<T>(text: string): Promise<MarkdownData<T>>;
export { parseMd };
