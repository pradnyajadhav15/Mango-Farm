import sharp from 'sharp';
import { mkdirSync, existsSync } from 'node:fs';

const CANDIDATES = ['public/images/logo.png', 'public/logo.png', 'public/share-image.jpg'];
const SRC = CANDIDATES.find((f) => existsSync(f));
const BG = '#FFF8E7';

if (!SRC) {
  console.error('No source image found. Tried: ' + CANDIDATES.join(', '));
  process.exit(1);
}
console.log('Using source: ' + SRC);
mkdirSync('public/icons', { recursive: true });

const isLogo = SRC.includes('logo');
const fit = isLogo ? 'contain' : 'cover';

const base = (size) =>
  sharp(SRC).resize(size, size, { fit, background: BG }).flatten({ background: BG }).png();

await base(192).toFile('public/icons/pwa-192.png');
await base(512).toFile('public/icons/pwa-512.png');
await base(180).toFile('public/apple-touch-icon.png');

await sharp(SRC)
  .resize(320, 320, { fit, background: BG })
  .extend({ top: 96, bottom: 96, left: 96, right: 96, background: BG })
  .flatten({ background: BG })
  .png()
  .toFile('public/icons/maskable-512.png');

console.log('Icons written to public/icons/');