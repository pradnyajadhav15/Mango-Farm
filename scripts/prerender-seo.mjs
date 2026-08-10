import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { join } from 'node:path';
import {
  SITE_URL, SITE_NAME, DEFAULT_IMAGE, allRoutes, metaForPath,
  alternatesFor, HREFLANG, OG_LOCALE,
} from '../src/data/seo.js';

const shell = readFileSync('dist/index.html', 'utf8');

function esc(s) {
  return String(s).replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;');
}
function setTag(html, matcher, tag) {
  return matcher.test(html) ? html.replace(matcher, tag) : html.replace('</head>', '    ' + tag + '\n  </head>');
}

let count = 0;
for (const r of allRoutes()) {
  const m = metaForPath(r.base, r.lang);
  const url = SITE_URL + r.path;
  const fullTitle = m.title + ' | ' + SITE_NAME;
  const image = SITE_URL + DEFAULT_IMAGE;

  let html = shell;
  html = html.replace(/<html lang="[^"]*"/i, '<html lang="' + (HREFLANG[r.lang] || 'en-IN') + '"');
  html = html.replace(/<title>[\s\S]*?<\/title>/i, '<title>' + esc(fullTitle) + '</title>');
  html = setTag(html, /<meta\s+name="description"[^>]*>/i, '<meta name="description" content="' + esc(m.description) + '" />');
  html = setTag(html, /<link\s+rel="canonical"[^>]*>/i, '<link rel="canonical" href="' + url + '" />');
  html = setTag(html, /<meta\s+property="og:title"[^>]*>/i, '<meta property="og:title" content="' + esc(fullTitle) + '" />');
  html = setTag(html, /<meta\s+property="og:description"[^>]*>/i, '<meta property="og:description" content="' + esc(m.description) + '" />');
  html = setTag(html, /<meta\s+property="og:url"[^>]*>/i, '<meta property="og:url" content="' + url + '" />');
  html = setTag(html, /<meta\s+property="og:image"[^>]*>/i, '<meta property="og:image" content="' + image + '" />');
  html = setTag(html, /<meta\s+property="og:locale"[^>]*>/i, '<meta property="og:locale" content="' + (OG_LOCALE[r.lang] || 'en_IN') + '" />');
  html = setTag(html, /<meta\s+name="twitter:title"[^>]*>/i, '<meta name="twitter:title" content="' + esc(fullTitle) + '" />');
  html = setTag(html, /<meta\s+name="twitter:description"[^>]*>/i, '<meta name="twitter:description" content="' + esc(m.description) + '" />');

  const altTags = alternatesFor(r.base)
    .map((a) => '<link rel="alternate" hreflang="' + a.hreflang + '" href="' + a.href + '" />')
    .join('\n    ');
  html = html.replace('</head>', '    ' + altTags + '\n  </head>');

  if (r.path === '/') {
    writeFileSync('dist/index.html', html, 'utf8');
  } else {
    const dir = join('dist', r.path.replace(/^\//, ''));
    mkdirSync(dir, { recursive: true });
    writeFileSync(join(dir, 'index.html'), html, 'utf8');
  }
  count++;
}
console.log('prerendered meta for ' + count + ' routes');