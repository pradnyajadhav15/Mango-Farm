import { useEffect } from 'react';
import { SITE_URL, SITE_NAME, DEFAULT_IMAGE } from '../data/seo';

function upsertMeta(attr, key, content) {
  if (!content) return;
  let el = document.head.querySelector('meta[' + attr + '="' + key + '"]');
  if (!el) {
    el = document.createElement('meta');
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.setAttribute('content', content);
}

function upsertLink(rel, href) {
  if (!href) return;
  let el = document.head.querySelector('link[rel="' + rel + '"]');
  if (!el) {
    el = document.createElement('link');
    el.setAttribute('rel', rel);
    document.head.appendChild(el);
  }
  el.setAttribute('href', href);
}

export default function Seo({
  title,
  description,
  path = '/',
  image = DEFAULT_IMAGE,
  type = 'website',
  lang = 'en',
  jsonLd = null,
  noindex = false,
}) {
  const jsonLdKey = jsonLd ? JSON.stringify(jsonLd) : '';

  useEffect(() => {
    const url = SITE_URL + (path === '/' ? '/' : path);
    const fullTitle = title ? title + ' | ' + SITE_NAME : SITE_NAME;
    const absImage = image.startsWith('http') ? image : SITE_URL + image;

    document.title = fullTitle;
    document.documentElement.lang = lang;

    upsertMeta('name', 'description', description);
    upsertMeta('name', 'robots', noindex ? 'noindex,nofollow' : 'index,follow,max-image-preview:large');
    upsertLink('canonical', url);

    upsertMeta('property', 'og:site_name', SITE_NAME);
    upsertMeta('property', 'og:title', fullTitle);
    upsertMeta('property', 'og:description', description);
    upsertMeta('property', 'og:type', type);
    upsertMeta('property', 'og:url', url);
    upsertMeta('property', 'og:image', absImage);
    upsertMeta('property', 'og:locale', lang === 'hi' ? 'hi_IN' : lang === 'mr' ? 'mr_IN' : 'en_IN');

    upsertMeta('name', 'twitter:card', 'summary_large_image');
    upsertMeta('name', 'twitter:title', fullTitle);
    upsertMeta('name', 'twitter:description', description);
    upsertMeta('name', 'twitter:image', absImage);

    document.querySelectorAll('script[data-seo-jsonld]').forEach((n) => n.remove());
    if (jsonLd) {
      const blocks = Array.isArray(jsonLd) ? jsonLd : [jsonLd];
      blocks.forEach((block) => {
        const s = document.createElement('script');
        s.type = 'application/ld+json';
        s.setAttribute('data-seo-jsonld', '');
        s.textContent = JSON.stringify(block);
        document.head.appendChild(s);
      });
    }
  }, [title, description, path, image, type, lang, noindex, jsonLdKey]);

  return null;
}