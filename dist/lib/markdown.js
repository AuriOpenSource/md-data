import { randomUUID } from 'crypto';
import matter from 'gray-matter';
import { LRUCache } from 'lru-cache';
import { pipeline } from 'stream';
import { promisify } from 'util';
const pipelineAsync = promisify(pipeline);
const cache = new LRUCache({ max: 2048 });
async function parseMd(text) {
    const cacheKey = randomUUID();
    if (cache.has(cacheKey))
        return cache.get(cacheKey);
    const parsed = matter(text);
    const { data: fm, content } = parsed;
    const markdownData = { fm, content };
    cache.set(cacheKey, markdownData);
    return markdownData;
}
export { parseMd };
//# sourceMappingURL=markdown.js.map