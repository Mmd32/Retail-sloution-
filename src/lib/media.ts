import fs from 'node:fs';
import path from 'node:path';

/**
 * Finds media dropped into /public/media by file name, at build time.
 * Video wins over still when both exist.
 */

export type Media = { kind: 'video' | 'image'; src: string; poster?: string };

const VIDEO = ['mp4', 'webm'];
const IMAGE = ['webp', 'jpg', 'jpeg', 'png', 'avif', 'svg'];
const root = path.join(process.cwd(), 'public', 'media');

function first(dir: string, base: string, exts: string[]): string | undefined {
  for (const ext of exts) {
    if (fs.existsSync(path.join(root, dir, `${base}.${ext}`))) return `/media/${dir}/${base}.${ext}`;
  }
  return undefined;
}

export function findMedia(dir: string, base: string): Media | null {
  const video = first(dir, base, VIDEO);
  const still = first(dir, base, IMAGE) ?? first(dir, `${base}-poster`, IMAGE);
  if (video) return { kind: 'video', src: video, poster: still };
  if (still) return { kind: 'image', src: still };
  return null;
}

export function findImage(dir: string, base: string): string | undefined {
  return first(dir, base, IMAGE);
}

/** Every image in a folder, sorted by name (prefix with 01-, 02- to order). */
export function listImages(dir: string): string[] {
  try {
    return fs
      .readdirSync(path.join(root, dir))
      .filter((f) => IMAGE.includes(f.split('.').pop()!.toLowerCase()))
      .sort()
      .map((f) => `/media/${dir}/${f}`);
  } catch {
    return [];
  }
}

/**
 * The logo artwork, when supplied: /public/brand/logo.svg (on light) and,
 * optionally, /public/brand/logo-white.svg (on the dark reel).
 */
export function findBrandLogo(name: 'logo' | 'logo-white'): string | undefined {
  const file = path.join(process.cwd(), 'public', 'brand', `${name}.svg`);
  return fs.existsSync(file) ? `/brand/${name}.svg` : undefined;
}
