import { randomUUID } from 'crypto';
import matter from 'gray-matter';
import { LRUCache } from 'lru-cache';
interface MarkdownData<T> {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  fm: Record<string, any> | T;
  content: string;
}

const cache = new LRUCache<string, MarkdownData<any>>({ max: 2048 });

function parseMd<T>(text: string) {
  const cacheKey = randomUUID();
  if (cache.has(cacheKey)) return cache.get(cacheKey) as MarkdownData<T>;

  const parsed = matter(text);
  const { data: fm, content } = parsed;

  const markdownData = { fm, content } as MarkdownData<T>;
  cache.set(cacheKey, markdownData);
  
  return markdownData;
}

export { parseMd };
