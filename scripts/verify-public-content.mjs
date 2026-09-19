import assert from 'node:assert/strict';
import { existsSync, readFileSync, readdirSync } from 'node:fs';
import { join, relative } from 'node:path';
import sharp from 'sharp';

const root = process.cwd();
const dist = join(root, 'dist');

assert.ok(existsSync(dist), 'dist/ must exist; run npm run build first');

const walk = (directory, extension) => readdirSync(directory, { withFileTypes: true })
  .flatMap((entry) => {
    const path = join(directory, entry.name);
    if (entry.isDirectory()) return walk(path, extension);
    return path.endsWith(extension) ? [path] : [];
  });

const htmlFiles = walk(dist, '.html');
const publicText = htmlFiles.map((file) => {
  const html = readFileSync(file, 'utf8');
  assert.match(html, /<html lang="en"/, `${relative(root, file)} must use lang="en"`);

  if (!file.endsWith('404.html')) {
    const canonicalMatch = html.match(/<link rel="canonical" href="([^"]+)"/);
    assert.ok(canonicalMatch, `${relative(root, file)} must define a canonical URL`);

    const canonical = new URL(canonicalMatch[1]);
    const outputPath = relative(dist, file).replaceAll('\\', '/');
    const expectedPath = outputPath === 'index.html'
      ? '/'
      : `/${outputPath.replace(/index\.html$/, '')}`;

    assert.equal(canonical.origin, 'https://wesleycoutinhodev.me', `${relative(root, file)} must use the production canonical host`);
    assert.equal(canonical.pathname, expectedPath, `${relative(root, file)} canonical must match its public route`);
  }

  assert.doesNotMatch(html, /SearchAction/, `${relative(root, file)} must not advertise a search action`);

  const internalLinks = [...html.matchAll(/<a\b[^>]*href="([^"]+)"/gi)]
    .map((match) => match[1])
    .filter((href) => href.startsWith('/'));

  for (const href of internalLinks) {
    const pathname = new URL(href, 'https://wesleycoutinhodev.me').pathname;
    const target = pathname === '/'
      ? join(dist, 'index.html')
      : join(dist, pathname.replace(/^\//, ''), 'index.html');
    assert.ok(existsSync(target), `${relative(root, file)} links to missing route ${pathname}`);
  }

  return html
    .replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi, ' ')
    .replace(/<style\b[^>]*>[\s\S]*?<\/style>/gi, ' ')
    .replace(/<!--([\s\S]*?)-->/g, ' ')
    .replace(/<[^>]+>/g, ' ')
    .replace(/&(?:nbsp|amp|quot|#39);/g, ' ')
    .replace(/\s+/g, ' ');
}).join(' ');

const forbiddenRoutes = ['writing', 'decisions', 'journey', 'speaking'];
for (const route of forbiddenRoutes) {
  assert.ok(!existsSync(join(dist, route)), `/${route} must not be generated`);
}

const sitemapFiles = walk(dist, '.xml');
const sitemap = sitemapFiles.map((file) => readFileSync(file, 'utf8')).join('\n');
const sitemapLocations = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((match) => match[1]);
assert.ok(sitemapLocations.length > 0, 'sitemap must contain public URLs');
for (const location of sitemapLocations) {
  assert.equal(new URL(location).origin, 'https://wesleycoutinhodev.me', `sitemap URL ${location} must use the production host`);
}

for (const route of forbiddenRoutes) {
  assert.doesNotMatch(sitemap, new RegExp(`/${route}(?:/|<)`), `/${route} must not appear in the sitemap`);
}

const projectSlugs = [
  'notebook-lm-plataforma-inteligente',
  'sistema-monitoramento-distribuido',
  'my-simple-uploads',
];
for (const slug of projectSlugs) {
  assert.ok(existsSync(join(dist, 'projects', slug, 'index.html')), `project slug ${slug} must be preserved`);
  assert.match(sitemap, new RegExp(`/projects/${slug}/`), `project slug ${slug} must remain in the sitemap`);
}

const homepage = readFileSync(join(dist, 'index.html'), 'utf8');
assert.match(homepage, /BACKEND SOFTWARE ENGINEER/);
assert.match(homepage, /I build backend systems that stay reliable beyond the happy path\./);
assert.match(homepage, /IT Intern (?:—|&mdash;|&#x2014;) Software Engineering &amp; Computer Vision/);
assert.match(homepage, /STRANS - Superintendência Municipal de Transportes e Trânsito/);
assert.match(homepage, /Digzen Automações B2B/);
assert.match(homepage, /View Case Studies/);
assert.match(homepage, /<title>Wesley Coutinho - Backend Software Engineer \| Python &amp; Distributed Systems<\/title>/);
assert.match(homepage, /Backend Software Engineer focused on Python, FastAPI, distributed systems, reliability and applied AI\./);
assert.match(homepage, /https:\/\/github\.com\/wesleycoutinhodev/);
assert.match(homepage, /https:\/\/linkedin\.com\/in\/wesleycoutinhodev/);

const forbiddenPortuguese = [
  /\bVer projetos\b/i,
  /\bContato\b/i,
  /\bFerramentas\b/i,
  /\bArtigos\b/i,
  /\bProblemas que gosto\b/i,
  /\bVamos trabalhar\b/i,
  /\bDesenvolvedor(?:a)?\b/i,
  /\bArquitetura de software\b/i,
  /\bNenhum item documentado\b/i,
  /\bSou Wesley\b/i,
];
for (const pattern of forbiddenPortuguese) {
  assert.doesNotMatch(publicText, pattern, `public HTML still contains Portuguese matching ${pattern}`);
}

const unsupportedClaims = [
  /\d+(?:\.\d+)?\s*%/,
  /\bproduction[- ]ready\b/i,
  /\bhigh availability\b/i,
  /\bscal(?:e|able|ability)\b/i,
  /\bmicroservices?\b/i,
  /\bSystems Architect\b/i,
  /\bSenior Software Engineer\b/i,
  /\bAI Engineer\b/i,
  /\bMachine Learning Engineer\b/i,
  /\bLaunchDarkly\b/i,
  /\bBlack Friday\b/i,
  /\bcheckout success rate\b/i,
];
for (const pattern of unsupportedClaims) {
  assert.doesNotMatch(publicText, pattern, `public HTML contains unsupported claim matching ${pattern}`);
}

for (const directory of ['writing', 'decisions']) {
  assert.ok(!existsSync(join(root, 'src', 'content', directory)), `src/content/${directory} must be outside the publication pipeline`);
}

for (const path of [
  'src/pages/writing',
  'src/pages/decisions',
  'src/pages/journey.astro',
  'src/pages/speaking.astro',
]) {
  assert.ok(!existsSync(join(root, path)), `${path} must not define a public route`);
}

const contentConfig = readFileSync(join(root, 'src', 'content.config.ts'), 'utf8');
for (const collection of ['writing', 'decisions', 'journey', 'speaking']) {
  assert.doesNotMatch(contentConfig, new RegExp(`\\b${collection}:\\s*${collection}Collection\\b`), `${collection} must not be registered as a public collection`);
}

const readme = readFileSync(join(root, 'README.md'), 'utf8');
assert.match(readme, /Backend Software Engineer/);
assert.match(readme, /Distributed Systems/);
assert.match(readme, /Applied AI/);
assert.doesNotMatch(readme, /Portf[oó]lio pessoal|Este reposit[oó]rio|Rodando localmente|Licen[cç]a/i);

const manifest = JSON.parse(readFileSync(join(root, 'public', 'site.webmanifest'), 'utf8'));
assert.equal(manifest.lang, 'en', 'web app manifest must declare English');
for (const icon of manifest.icons) {
  assert.ok(existsSync(join(root, 'public', icon.src.replace(/^\//, ''))), `manifest icon ${icon.src} must exist`);
}

const ogMetadata = await sharp(join(root, 'public', 'og-image.png')).metadata();
assert.equal(ogMetadata.width, 1200, 'Open Graph image must be 1200px wide');
assert.equal(ogMetadata.height, 630, 'Open Graph image must be 630px tall');

console.log(`Verified ${htmlFiles.length} public HTML files and ${sitemapFiles.length} sitemap files.`);
