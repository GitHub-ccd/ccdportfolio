import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { marked } from "marked";
import hljs from "highlight.js";
import { getAssetPath } from "@/utils/basePath";

const postsDirectory = path.join(process.cwd(), "content/blog");

function slugify(text) {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, "")
    .replace(/[\s_-]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

/**
 * Configure marked renderer for styled headings & code blocks with copy metadata
 */
const customRenderer = {
  image(token) {
    const href = token.href || "";
    const title = token.title || "";
    const text = token.text || "";
    const assetUrl = getAssetPath(href);
    return `<figure class="my-8 space-y-2">
      <img src="${assetUrl}" alt="${text}" title="${title}" class="w-full rounded-2xl border border-slate-800 shadow-2xl" />
      ${text ? `<figcaption class="text-center text-xs text-slate-400 font-mono">${text}</figcaption>` : ""}
    </figure>`;
  },
  heading(token) {
    const text = this.parser.parseInline(token.tokens || []);
    const level = token.depth || 2;
    const cleanText = (token.text || "").replace(/<[^>]*>/g, "");
    const id = slugify(cleanText);
    const sizeClasses = level === 1 ? "text-3xl font-extrabold text-white mt-10 mb-5" :
                        level === 2 ? "text-2xl font-bold text-slate-100 mt-10 mb-4 pb-2 border-b border-slate-800/80" :
                        "text-xl font-semibold text-teal-300 mt-8 mb-3";
    return `<h${level} id="${id}" class="scroll-mt-24 ${sizeClasses}">${text}</h${level}>`;
  },
  code(token) {
    const code = token.text || "";
    const language = token.lang || "";
    const validLang = language && hljs.getLanguage(language) ? language : "plaintext";
    let highlighted;
    try {
      highlighted = hljs.highlight(code, { language: validLang }).value;
    } catch {
      highlighted = code;
    }
    
    // Store raw code encoded so Client CodeCopyButton can extract it
    const encodedCode = encodeURIComponent(code);

    return `<div class="relative group my-6 overflow-hidden rounded-xl border border-slate-800 bg-slate-950/90 shadow-2xl">
      <div class="flex items-center justify-between px-4 py-2 bg-slate-900/90 border-b border-slate-800/80 text-xs text-slate-400 font-mono">
        <span class="text-teal-400 font-medium uppercase tracking-wider">${validLang}</span>
        <button 
          type="button"
          class="blog-copy-btn px-2.5 py-1 text-xs rounded-md bg-slate-800 hover:bg-teal-500/20 hover:text-teal-300 border border-slate-700/60 text-slate-300 transition-all flex items-center gap-1.5" 
          data-code="${encodedCode}"
        >
          <span>Copy</span>
        </button>
      </div>
      <pre class="p-4 overflow-x-auto text-sm leading-relaxed font-mono text-slate-200"><code class="hljs language-${validLang}">${highlighted}</code></pre>
    </div>`;
  },
  paragraph(token) {
    const text = this.parser.parseInline(token.tokens || []);
    return `<p class="text-slate-300 leading-relaxed my-5 text-base sm:text-lg">${text}</p>`;
  },
  blockquote(token) {
    const quote = this.parser.parse(token.tokens || []);
    return `<blockquote class="my-6 pl-4 border-l-4 border-teal-500 bg-teal-500/5 py-3 pr-4 text-slate-200 italic rounded-r-lg">${quote}</blockquote>`;
  },
  list(token) {
    const type = token.ordered ? "ol" : "ul";
    const listClasses = token.ordered ? "list-decimal" : "list-disc";
    const body = token.items
      ? token.items
          .map((item) => `<li class="my-1">${this.parser.parse(item.tokens)}</li>`)
          .join("")
      : "";
    return `<${type} class="${listClasses} pl-6 my-5 space-y-2 text-slate-300 text-base sm:text-lg">${body}</${type}>`;
  },
  table(token) {
    const headerCells = (token.header || [])
      .map((cell) => `<th class="px-4 py-3 font-semibold">${this.parser.parseInline(cell.tokens || [])}</th>`)
      .join("");
    const headerRow = `<tr>${headerCells}</tr>`;

    const bodyRows = (token.rows || [])
      .map((row) => {
        const cells = row
          .map((cell) => `<td class="px-4 py-3">${this.parser.parseInline(cell.tokens || [])}</td>`)
          .join("");
        return `<tr>${cells}</tr>`;
      })
      .join("");

    return `<div class="my-6 overflow-x-auto rounded-xl border border-slate-800">
      <table class="w-full text-left text-sm text-slate-300">
        <thead class="bg-slate-900 text-xs uppercase text-teal-400 font-semibold border-b border-slate-800">${headerRow}</thead>
        <tbody class="divide-y divide-slate-800/60 bg-slate-950/50">${bodyRows}</tbody>
      </table>
    </div>`;
  }
};

marked.use({ renderer: customRenderer });

/**
 * Extract Table of Contents headings (h2, h3) from markdown raw content
 */
export function extractToc(markdownContent) {
  const headings = [];
  const lines = markdownContent.split("\n");
  let inCodeBlock = false;

  for (const line of lines) {
    if (line.trim().startsWith("```")) {
      inCodeBlock = !inCodeBlock;
      continue;
    }
    if (inCodeBlock) continue;

    const h2Match = line.match(/^##\s+(.+)$/);
    const h3Match = line.match(/^###\s+(.+)$/);

    if (h2Match) {
      const text = h2Match[1].trim().replace(/[*_~`]/g, "");
      headings.push({ id: slugify(text), text, level: 2 });
    } else if (h3Match) {
      const text = h3Match[1].trim().replace(/[*_~`]/g, "");
      headings.push({ id: slugify(text), text, level: 3 });
    }
  }

  return headings;
}

/**
 * Calculate reading time in minutes
 */
export function calculateReadingTime(text) {
  const words = text.trim().split(/\s+/).length;
  const minutes = Math.max(1, Math.ceil(words / 200));
  return `${minutes} min read`;
}

/**
 * Get all blog post metadata for listing page
 */
export function getAllPosts() {
  if (!fs.existsSync(postsDirectory)) {
    return [];
  }

  const fileNames = fs.readdirSync(postsDirectory);
  const allPostsData = fileNames
    .filter((fileName) => fileName.endsWith(".md") || fileName.endsWith(".mdx"))
    .map((fileName) => {
      const slug = fileName.replace(/\.mdx?$/, "");
      const fullPath = path.join(postsDirectory, fileName);
      const fileContents = fs.readFileSync(fullPath, "utf8");
      const { data, content } = matter(fileContents);

      return {
        slug,
        title: data.title || slug,
        date: data.date || "2026-08-01",
        summary: data.summary || "",
        tags: data.tags || [],
        coverImage: data.coverImage || "/img/projects/customer_churn_banner.png",
        author: data.author || "Chamila Dharmawardhana, Ph.D.",
        originalBloggerUrl: data.originalBloggerUrl || null,
        originalDate: data.originalDate || null,
        readingTime: calculateReadingTime(content),
      };
    });

  // Sort posts by date descending
  return allPostsData.sort((a, b) => (a.date < b.date ? 1 : -1));
}

/**
 * Get single blog post by slug
 */
export function getPostBySlug(slug) {
  const mdPath = path.join(postsDirectory, `${slug}.md`);
  const mdxPath = path.join(postsDirectory, `${slug}.mdx`);
  
  let fullPath = mdPath;
  if (!fs.existsSync(fullPath)) {
    fullPath = mdxPath;
  }
  
  if (!fs.existsSync(fullPath)) {
    return null;
  }

  const fileContents = fs.readFileSync(fullPath, "utf8");
  const { data, content } = matter(fileContents);
  const htmlContent = marked.parse(content);
  const toc = extractToc(content);
  const readingTime = calculateReadingTime(content);

  return {
    slug,
    title: data.title || slug,
    date: data.date || "2026-08-01",
    summary: data.summary || "",
    tags: data.tags || [],
    coverImage: data.coverImage || "/img/projects/customer_churn_banner.png",
    author: data.author || "Chamila Dharmawardhana, Ph.D.",
    originalBloggerUrl: data.originalBloggerUrl || null,
    originalDate: data.originalDate || null,
    readingTime,
    contentHtml: htmlContent,
    toc,
  };
}

/**
 * Get all available tags across all blog posts
 */
export function getAllTags() {
  const posts = getAllPosts();
  const tagSet = new Set();
  posts.forEach((post) => {
    (post.tags || []).forEach((t) => tagSet.add(t));
  });
  return Array.from(tagSet);
}
