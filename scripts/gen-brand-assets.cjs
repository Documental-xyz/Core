/* eslint-disable */
/**
 * Generates branded SVG assets (favicon + Sveltia CMS logo) from the
 * Documental source logo at src/assets/logo.svg.
 *
 * Run: `node scripts/gen-brand-assets.cjs`
 *
 * Output:
 *   - public/favicon.svg   (128×128, rounded square, dark navy bg)
 *   - public/admin/logo.svg (256×256, same design)
 *
 * The source logo paths are preserved verbatim (fill #3CAEE9), only
 * re-transformed to center the visible content inside the target canvas.
 */
'use strict';

const fs = require('fs');
const path = require('path');

const root = path.resolve(__dirname, '..');
const srcLogoPath = path.join(root, 'src/assets/logo.svg');
const faviconPath = path.join(root, 'public/favicon.svg');
const adminLogoPath = path.join(root, 'public/admin/logo.svg');

// --- 1. Pull the <path> elements verbatim from the source logo -------------
const src = fs.readFileSync(srcLogoPath, 'utf8');
const pathEls = [...src.matchAll(/<path\b[^>]*?\/>/g)].map((m) => m[0]);
if (pathEls.length === 0) {
  throw new Error('No <path> elements found in source logo');
}

// --- 2. Compute the rendered bbox of the content (after the source scale) --
const SRC_SCALE = 0.533417;
let minX = Infinity;
let minY = Infinity;
let maxX = -Infinity;
let maxY = -Infinity;
for (const p of pathEls) {
  const dMatch = p.match(/d="([^"]+)"/);
  if (!dMatch) continue;
  const nums = [...dMatch[1].matchAll(/-?\d+(?:\.\d+)?/g)].map((m) =>
    parseFloat(m[0]),
  );
  for (let i = 0; i + 1 < nums.length; i += 2) {
    const x = nums[i] * SRC_SCALE;
    const y = nums[i + 1] * SRC_SCALE;
    if (x < minX) minX = x;
    if (y < minY) minY = y;
    if (x > maxX) maxX = x;
    if (y > maxY) maxY = y;
  }
}
const contentW = maxX - minX;
const contentH = maxY - minY;
const contentCX = (minX + maxX) / 2;
const contentCY = (minY + maxY) / 2;

// --- 3. Brand constants ----------------------------------------------------
const NAVY = '#1a1a2e'; // background
const BLUE = '#3CAEE9'; // logo fill (kept verbatim from source anyway)

/**
 * Build an SVG that places the logo centered inside a rounded square.
 *
 * Strategy:
 *   - Canvas is SIZE×SIZE with a <rect rx=RADIUS> background.
 *   - The source logo paths are in a coordinate system where the visible
 *     content spans [minX..maxX] × [minY..maxY] (post SRC_SCALE). We strip
 *     the per-path `transform` and instead wrap them in a single <g> that:
 *       a) pre-scales by SRC_SCALE (to honor the source scaling),
 *       b) translates so content center sits at the origin,
 *       c) uniformly scales to fit ~FIT of the canvas,
 *       d) translates to the canvas center.
 *
 * @param {object} opts
 * @param {number} opts.size      Canvas dimension (px).
 * @param {number} opts.radius    Corner radius (px).
 * @param {number} opts.fit       Fraction of the canvas the logo fills (0..1).
 * @param {string} opts.padAfter  Optional extra transform applied last.
 */
function buildSvg({ size, radius, fit }) {
  // Target inner size in px
  const targetInner = size * fit;
  // Uniform scale so the longest content dimension fits targetInner
  const fitScale = targetInner / Math.max(contentW, contentH);

  // Composite transform (right-to-left when read in SVG, but we build it
  // left-to-right as: translate(center) scale(fit) translate(-c) scale(srcScale))
  // The per-path transforms from the source are removed.
  const transform = [
    `translate(${size / 2} ${size / 2})`, // d) move to canvas center
    `scale(${fitScale.toFixed(6)})`, // c) fit to targetInner
    `translate(${-contentCX} ${-contentCY})`, // b) center content on origin
  ].join(' ');

  // Rewrite each path: drop its per-path transform (the outer <g> applies
  // SRC_SCALE so the raw coords land correctly), keep fill + d verbatim.
  const rewrittenPaths = pathEls
    .map((p) => {
      const dMatch = p.match(/d="([^"]+)"/);
      if (!dMatch) return '';
      return `<path fill="${BLUE}" d="${dMatch[1]}"/>`;
    })
    .join('\n      ');

  return [
    `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 ${size} ${size}">`,
    `  <rect width="${size}" height="${size}" rx="${radius}" fill="${NAVY}"/>`,
    `  <g transform="${transform}">`,
    `    <g transform="scale(${SRC_SCALE})">`,
    `      ${rewrittenPaths}`,
    `    </g>`,
    `  </g>`,
    `</svg>`,
    '',
  ].join('\n');
}

// --- 4. Write the two files ------------------------------------------------
const faviconSvg = buildSvg({ size: 128, radius: 28, fit: 0.62 });
const adminSvg = buildSvg({ size: 256, radius: 56, fit: 0.62 });

fs.mkdirSync(path.dirname(adminLogoPath), { recursive: true });
fs.writeFileSync(faviconPath, faviconSvg, 'utf8');
fs.writeFileSync(adminLogoPath, adminSvg, 'utf8');

console.log('✓ Wrote', path.relative(root, faviconPath), `(${faviconSvg.length} bytes)`);
console.log('✓ Wrote', path.relative(root, adminLogoPath), `(${adminSvg.length} bytes)`);
console.log(
  `  content bbox: ${contentW.toFixed(1)}×${contentH.toFixed(1)} centered on (${contentCX.toFixed(1)}, ${contentCY.toFixed(1)})`,
);
