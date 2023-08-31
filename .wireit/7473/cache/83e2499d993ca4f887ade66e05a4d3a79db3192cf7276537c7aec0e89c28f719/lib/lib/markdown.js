import matter from 'gray-matter';
const parseMd = (text) => {
    const parsed = matter(text);
    const { data: fm, content } = parsed;
    return { fm, content };
};
export { parseMd };