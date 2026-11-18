// Builds the portfolio from content/projects.mjs. No dependencies: `node build.mjs`.
//
//   1. Rewrites the project list (and the filter counts) inside index.html.
//   2. Writes one case page per project to work/<slug>/index.html.
//   3. Makes the 640px thumbnail of an image that does not have one yet (needs cwebp).
//
// To add a project: put its 1600x1200 image in assets/work/<slug>.png,
// add it to content/projects.mjs and run this again.

import { execFileSync } from "node:child_process";
import { existsSync, mkdirSync, readFileSync, readdirSync, rmSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { PROJECTS, REVIEWS } from "./content/projects.mjs";

const ROOT = dirname(fileURLToPath(import.meta.url));
const SITE = "https://pablovgdev.github.io";
const CATS = { claude: "Claude", automation: "Automation", product: "AI product", chatbot: "Chatbot" };
const SECTIONS = [["context", "Context"], ["built", "What I built"], ["method", "How I worked"], ["result", "Result"]];

const esc = (s) => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
const ext = (url) => `href="${esc(url)}" target="_blank" rel="noopener"`;
const LINKEDIN_ICON = '<svg viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>';

// --- checks -----------------------------------------------------------------

const slugs = new Set();
for (const p of PROJECTS) {
  if (slugs.has(p.slug)) throw new Error(`Duplicate slug: ${p.slug}`);
  slugs.add(p.slug);
  if (!CATS[p.cat]) throw new Error(`${p.slug}: unknown cat "${p.cat}"`);
  if (p.review && !REVIEWS[p.review]) throw new Error(`${p.slug}: unknown review "${p.review}"`);
  const png = join(ROOT, "assets/work", `${p.slug}.png`);
  if (!existsSync(png)) throw new Error(`${p.slug}: missing image assets/work/${p.slug}.png`);
  const thumb = join(ROOT, "assets/work", `${p.slug}-640.webp`);
  if (!existsSync(thumb)) execFileSync("cwebp", ["-quiet", "-lossless", "-resize", "640", "480", png, "-o", thumb]);
}

// --- home page --------------------------------------------------------------

const row = (p) => {
  const client = p.clientUrl ? `<a ${ext(p.clientUrl)}>${esc(p.client)}</a>` : `<b>${esc(p.client)}</b>`;
  return `        <li class="project" data-cat="${p.cat}">
          <img class="thumb" src="assets/work/${p.slug}-640.webp" alt="" width="640" height="480" loading="lazy" decoding="async">
          <div>
            <p class="meta">${client}<span class="yr">${esc(p.year)}</span></p>
            <h3><a href="work/${p.slug}/">${esc(p.title)}</a></h3>
            <p class="body">${esc(p.summary)}</p>
            <p class="go" aria-hidden="true">case study →</p>
          </div>
          <ul class="tags" aria-label="Tech">${p.tags.map((t) => `<li>${esc(t)}</li>`).join("")}</ul>
        </li>`;
};

const indexPath = join(ROOT, "index.html");
let index = readFileSync(indexPath, "utf8");
const list = /(<ol class="projects">\n)[\s\S]*?(\n {6}<\/ol>)/;
if (!list.test(index)) throw new Error("index.html: project list not found");
index = index.replace(list, (_, open, close) => open + PROJECTS.map(row).join("\n") + close);
for (const cat of ["all", ...Object.keys(CATS)]) {
  const n = cat === "all" ? PROJECTS.length : PROJECTS.filter((p) => p.cat === cat).length;
  index = index.replace(new RegExp(`(data-filter="${cat}">[^<]*<span>)\\d+(</span>)`), `$1${n}$2`);
}
index = index.replace(/Show all \d+ projects/, `Show all ${PROJECTS.length} projects`);
writeFileSync(indexPath, index);

// The case pages carry the same favicon as the home page.
const favicon = index.match(/<link rel="icon"[^>]*>/)[0];

// --- case pages -------------------------------------------------------------

const blocks = (items) => items.map((b) => Array.isArray(b)
  ? `<ul class="list">\n${b.map((li) => `            <li><span>${esc(li)}</span></li>`).join("\n")}\n          </ul>`
  : `<p>${esc(b)}</p>`).join("\n          ");

const page = (p, i) => {
  const prev = PROJECTS[(i - 1 + PROJECTS.length) % PROJECTS.length];
  const next = PROJECTS[(i + 1) % PROJECTS.length];
  const url = `${SITE}/work/${p.slug}/`;
  const image = `${SITE}/assets/work/${p.slug}.png`;
  const r = p.review && REVIEWS[p.review];
  const client = p.clientUrl ? `<a ${ext(p.clientUrl)}>${esc(p.client)}</a>` : esc(p.client);
  const facts = [["Client", client], ["Year", esc(p.year)], ["Type", CATS[p.cat]], ...(p.role ? [["Role", esc(p.role)]] : [])];
  const rows = SECTIONS.filter(([key]) => p[key]?.length).map(([key, title]) => `        <section class="row">
          <h2>${title}</h2>
          <div class="prose${key === "result" ? " result" : ""}">
          ${blocks(p[key])}
          </div>
        </section>`);
  rows.push(`        <section class="row">
          <h2>Stack</h2>
          <dl class="tech">
${p.stack.map(([name, what]) => `            <div><dt>${esc(name)}</dt><dd>${esc(what)}</dd></div>`).join("\n")}
          </dl>
        </section>`);

  return `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>${esc(p.title)} · Pablo Verdugo</title>
<meta name="description" content="${esc(p.summary)}">
<link rel="canonical" href="${url}">
<meta property="og:type" content="article">
<meta property="og:title" content="${esc(p.title)}">
<meta property="og:description" content="${esc(p.summary)}">
<meta property="og:url" content="${url}">
<meta property="og:image" content="${image}">
<meta property="og:image:width" content="1600">
<meta property="og:image:height" content="1200">
<meta name="twitter:card" content="summary_large_image">
<meta name="theme-color" content="#0E0E0E">
${favicon}
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;700&family=Inter:wght@400;500;600&display=swap">
<link rel="stylesheet" href="../../assets/case.css">
</head>
<body>
<a class="skip" href="#case">Skip to the case</a>

<header class="top">
  <div class="container">
    <a class="logo" href="../../">pablo<span>_</span>verdugo</a>
    <nav>
      <a href="../../#projects">projects</a>
      <a class="hide-sm" href="../../#reviews">reviews</a>
      <a class="btn sm" href="../../#contact">contact</a>
    </nav>
  </div>
</header>

<main id="case">
  <article>
    <header class="case-hero">
      <div class="container">
        <a class="link back" href="../../#projects">← all projects</a>
        <div class="case-grid">
          <div>
            <p class="label">Case study · ${CATS[p.cat]}</p>
            <h1>${esc(p.title)}</h1>
            <p class="lead">${esc(p.summary)}</p>
          </div>
          <img class="shot" src="../../assets/work/${p.slug}.png" alt="" width="1600" height="1200">
        </div>
        <dl class="case-facts">
${facts.map(([k, v]) => `          <div><dt>${k}</dt><dd>${v}</dd></div>`).join("\n")}
        </dl>
      </div>
    </header>

    <div class="section rows">
      <div class="container">
${rows.join("\n")}
      </div>
    </div>
${r ? `
    <section class="section alt" aria-label="What the client says">
      <div class="container">
        <figure class="quote">
          <blockquote>${esc(r.quote)}</blockquote>
          <figcaption>
            <img src="../../assets/people/${r.avatar}" alt="" width="48" height="48" loading="lazy">
            <span><strong>${esc(r.name)}</strong>${esc(r.role)}<i> · </i><a ${ext(r.url)}>${esc(r.company)}</a></span>
          </figcaption>
        </figure>
      </div>
    </section>
` : ""}  </article>

  <nav class="section pn" aria-label="More projects">
    <div class="container">
      <a href="../${prev.slug}/"><span>← previous</span><strong>${esc(prev.title)}</strong></a>
      <a href="../${next.slug}/"><span>next →</span><strong>${esc(next.title)}</strong></a>
    </div>
  </nav>

  <section class="section cta">
    <div class="container">
      <h2>Contact me</h2>
      <p class="lead">Message me on LinkedIn with what you need. I'll tell you if I can help, and how.</p>
      <div class="actions">
        <a class="btn" href="https://www.linkedin.com/in/pablovgdev/" target="_blank" rel="noopener">${LINKEDIN_ICON}LinkedIn</a>
        <a class="btn secondary" href="../../#projects">All projects</a>
      </div>
    </div>
  </section>
</main>

<footer>
  <div class="container">
    <span>pablo_verdugo</span>
    <span>Madrid · <a href="https://www.linkedin.com/in/pablovgdev/" target="_blank" rel="noopener">linkedin</a> · <a href="https://github.com/pablovgdev" target="_blank" rel="noopener">github</a></span>
  </div>
</footer>
</body>
</html>
`;
};

// A project that is no longer in the list loses its page.
const work = join(ROOT, "work");
mkdirSync(work, { recursive: true });
for (const dir of readdirSync(work, { withFileTypes: true })) {
  if (dir.isDirectory() && !slugs.has(dir.name)) rmSync(join(work, dir.name), { recursive: true });
}
PROJECTS.forEach((p, i) => {
  mkdirSync(join(work, p.slug), { recursive: true });
  writeFileSync(join(work, p.slug, "index.html"), page(p, i));
});

console.log(`${PROJECTS.length} projects: index.html and work/*/index.html written.`);
