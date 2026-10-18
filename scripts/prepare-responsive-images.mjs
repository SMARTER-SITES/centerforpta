import { readdir, readFile, mkdir, writeFile } from 'node:fs/promises';
import { resolve, relative, join } from 'node:path';
import { createHash } from 'node:crypto';
import sharp from 'sharp';

const root = resolve(import.meta.dirname, '..');
async function files(dir) {
  const entries = await readdir(dir, {withFileTypes: true});
  return (await Promise.all(entries.map(e => e.isDirectory() ? files(join(dir, e.name)) : [join(dir, e.name)]))).flat();
}
const sourceFiles = (await files(join(root, 'src'))).filter(p => /\.(astro|md)$/.test(p));
const source = (await Promise.all(sourceFiles.map(p => readFile(p, 'utf8')))).join('\n');
const publicDir = join(root, 'public');
const imageFiles = (await files(join(publicDir, 'images'))).filter(p => !p.includes('/responsive/') && /\.(png|jpe?g|webp)$/i.test(p));
const outputDir = join(publicDir, 'images/responsive');
await mkdir(outputDir, {recursive: true});
const manifest = {};
for (const path of imageFiles.sort()) {
  const url = '/' + relative(publicDir, path);
  if (!source.includes(url)) continue;
  const bytes = await readFile(path);
  const meta = await sharp(bytes).metadata();
  if (!meta.width || !meta.height) throw new Error(`Missing dimensions: ${url}`);
  const rotated = [5, 6, 7, 8].includes(meta.orientation);
  const width = rotated ? meta.height : meta.width;
  const height = rotated ? meta.width : meta.height;
  const hash = createHash('sha256').update(bytes).update('responsive-v1-q76').digest('hex').slice(0, 12);
  const widths = [...new Set([480, 800, 1200, 1600].map(w => Math.min(w, width)))].sort((a,b) => a-b);
  const variants = [];
  for (const w of widths) {
    const filename = `${hash}-${w}.webp`;
    await sharp(bytes).rotate().resize({width: w, withoutEnlargement: true}).webp({quality: 76}).toFile(join(outputDir, filename));
    variants.push({src: `/images/responsive/${filename}`, width: w});
  }
  manifest[url] = {width, height, src: variants.find(v => v.width >= 800)?.src || variants.at(-1).src,
    srcset: variants.map(v => `${v.src} ${v.width}w`).join(', ')};
}
await mkdir(join(root, 'src/generated'), {recursive: true});
await writeFile(join(root, 'src/generated/responsive-images.json'), JSON.stringify(manifest, null, 2) + '\n');
console.log(`Prepared responsive variants for ${Object.keys(manifest).length} local images.`);
