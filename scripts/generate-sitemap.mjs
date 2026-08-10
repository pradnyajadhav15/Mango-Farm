import { writeFileSync, mkdirSync } from 'node:fs';
import { SITE_URL, allRoutes } from '../src/data/seo.js';

const today = new Date().toISOString().slice(0, 10);
const routes = allRoutes();

const body = routes
  .map((r) => {
    const isHome = r === '/';
    return '  <url>\n' +
      '    <loc>' + SITE_URL + r + '</loc>\n' +
      '    <lastmod>' + today + '</lastmod>\n' +
      '    <changefreq>' + (isHome ? 'weekly' : 'monthly') + '</changefreq>\n' +
      '    <priority>' + (isHome ? '1.0' : '0.7') + '</priority>\n' +
      '  </url>';
  })
  .join('\n');

const xml = '<?xml version="1.0" encoding="UTF-8"?>\n' +
  '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n' +
  body + '\n</urlset>\n';

mkdirSync('dist', { recursive: true });
writeFileSync('dist/sitemap.xml', xml, 'utf8');
console.log('sitemap.xml written with ' + routes.length + ' URLs');