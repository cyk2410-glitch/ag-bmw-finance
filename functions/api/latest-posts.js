// Cloudflare Pages Function: /api/latest-posts
// Merges recent RSS posts from two Naver blogs, newest six first.
const BLOGS = ['cyk2410', 'sjykmk1031'];
function decode(s = '') {
  return s.replace(/<!\[CDATA\[([\s\S]*?)\]\]>/g, '$1')
    .replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"').replace(/&#39;/g, "'").trim();
}
function field(xml, tag) {
  const m = xml.match(new RegExp(`<${tag}(?:\s[^>]*)?>([\s\S]*?)<\/${tag}>`, 'i'));
  return decode(m?.[1] || '');
}
function parseRSS(xml) {
  return [...xml.matchAll(/<item(?:\s[^>]*)?>([\s\S]*?)<\/item>/gi)]
    .map(m => {
      const s = m[1], title = field(s, 'title'), link = field(s, 'link');
      const stamp = Date.parse(field(s, 'pubDate'));
      return { title, link, date: Number.isFinite(stamp) ? new Date(stamp).toISOString() : '', stamp: Number.isFinite(stamp) ? stamp : 0 };
    }).filter(x => x.title && /^https?:\/\//.test(x.link));
}
export async function onRequestGet() {
  const warnings = [];
  const results = await Promise.all(BLOGS.map(async id => {
    try {
      const controller = new AbortController();
      const timeout = setTimeout(() => controller.abort(), 8500);
      try {
        const r = await fetch(`https://rss.blog.naver.com/${id}.xml`, {
          headers: { Accept: 'application/rss+xml, application/xml, text/xml' },
          signal: controller.signal
        });
        if (!r.ok) throw new Error(`HTTP ${r.status}`);
        const posts = parseRSS(await r.text());
        if (!posts.length) throw new Error('RSS 항목 없음');
        return posts;
      } finally { clearTimeout(timeout); }
    } catch (e) { warnings.push(`${id}: ${e.message}`); return []; }
  }));
  const posts = [...new Map(results.flat().map(p => [p.link, p])).values()]
    .sort((a, b) => b.stamp - a.stamp).slice(0, 6).map(({stamp, ...p}) => p);
  return new Response(JSON.stringify({ posts, warnings }), {
    status: posts.length ? 200 : 503,
    headers: { 'Content-Type': 'application/json; charset=utf-8', 'Cache-Control': 'public, max-age=300, s-maxage=900' }
  });
}
