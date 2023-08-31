import matter from 'gray-matter';
var parseMd = function (text) {
    var parsed = matter(text);
    var fm = parsed.data, content = parsed.content;
    return { fm: fm, content: content };
};
export { parseMd };
