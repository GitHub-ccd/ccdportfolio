import React from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import Navbar from "@/components/Navbar";
import TableOfContents from "@/components/blog/TableOfContents";
import CodeCopyButton from "@/components/blog/CodeCopyButton";
import GiscusComments from "@/components/blog/GiscusComments";
import { getAllPosts, getPostBySlug } from "@/lib/blog";
import { getAssetPath } from "@/utils/basePath";

export async function generateStaticParams() {
  const posts = getAllPosts();
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({ params }) {
  const resolvedParams = await params;
  const post = getPostBySlug(resolvedParams.slug);
  if (!post) return { title: "Article Not Found" };

  return {
    title: `${post.title} | Chamila Dharmawardhana, Ph.D.`,
    description: post.summary,
  };
}

export default async function BlogPostPage({ params }) {
  const resolvedParams = await params;
  const post = getPostBySlug(resolvedParams.slug);

  if (!post) {
    notFound();
  }

  const allPosts = getAllPosts();
  const currentIndex = allPosts.findIndex((p) => p.slug === post.slug);
  const nextPost = currentIndex > 0 ? allPosts[currentIndex - 1] : null;
  const prevPost = currentIndex < allPosts.length - 1 ? allPosts[currentIndex + 1] : null;

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-teal-500 selection:text-slate-950">
      <Navbar />

      {/* Main Content Area */}
      <main className="flex-1 max-w-6xl w-full mx-auto px-6 py-8 space-y-8">
        {/* Back Button Navigation */}
        <div>
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-800 text-xs font-semibold text-slate-300 hover:text-teal-300 hover:border-teal-500/40 transition-all"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back to All Articles
          </Link>
        </div>

        {/* Hero Article Header */}
        <header className="relative rounded-3xl bg-slate-900/80 border border-slate-800/80 overflow-hidden shadow-2xl">
          <div className="relative h-64 sm:h-96 w-full bg-slate-950">
            <img
              src={getAssetPath(post.coverImage)}
              alt={post.title}
              className="w-full h-full object-cover opacity-80"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/60 to-transparent" />
            
            <div className="absolute bottom-6 left-6 right-6 space-y-3">
              <div className="flex flex-wrap items-center gap-2">
                {post.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1 rounded-full text-xs font-semibold bg-teal-500/20 text-teal-300 border border-teal-500/40 backdrop-blur-md"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              <h1 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight leading-tight">
                {post.title}
              </h1>

              <div className="flex flex-wrap items-center gap-4 text-xs font-medium text-slate-300 pt-2 border-t border-slate-800/60">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-full bg-teal-500/20 border border-teal-500/40 flex items-center justify-center font-bold text-teal-400 text-xs">
                    CD
                  </div>
                  <span>{post.author}</span>
                </div>
                <span>•</span>
                <span className="flex items-center gap-1">
                  <svg className="w-3.5 h-3.5 text-teal-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  {post.date}
                </span>
                <span>•</span>
                <span className="font-mono text-teal-300">{post.readingTime}</span>
              </div>
            </div>
          </div>
        </header>

        {/* Historical Blogger Attribution Alert Callout */}
        {post.originalBloggerUrl && (
          <div className="p-5 rounded-2xl bg-amber-500/10 border border-amber-500/30 backdrop-blur-md space-y-2 text-amber-200 text-sm">
            <div className="flex items-center gap-2 font-bold text-amber-400">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M19.16 3H4.84C3.82 3 3 3.82 3 4.84v14.32C3 20.18 3.82 21 4.84 21h14.32c1.02 0 1.84-.82 1.84-1.84V4.84C21 3.82 20.18 3 19.16 3zM12 17H8v-2h4v2zm4-4H8v-2h8v2zm0-4H8V7h8v2z" />
              </svg>
              <span>Historical Origin & Technical Evolution</span>
            </div>
            <p className="leading-relaxed">
              This article builds upon my early Data Science Bootcamp exploration originally published on Blogger:{" "}
              <a
                href={post.originalBloggerUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="underline font-semibold hover:text-white transition-colors"
              >
                Read Original {post.originalDate || "2020"} Post on findingdata.blogspot.com ↗
              </a>
              . This version has been fully rewritten with modern 2026 machine learning architectures, updated codebases, Optuna hyperparameter optimization, and interactive diagnostic micro-apps.
            </p>
          </div>
        )}

        {/* Article Grid Layout (Content + Sticky ToC Sidebar) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Main Article Column */}
          <article className="lg:col-span-8 space-y-6">
            <div
              className="prose prose-invert max-w-none prose-headings:scroll-mt-24 prose-a:text-teal-400 prose-a:underline hover:prose-a:text-teal-300"
              dangerouslySetInnerHTML={{ __html: post.contentHtml }}
            />

            {/* Client Copy Code Component */}
            <CodeCopyButton />

            {/* Giscus Comments Section */}
            <GiscusComments slug={post.slug} />
          </article>

          {/* Sidebar */}
          <aside className="lg:col-span-4 space-y-6 lg:sticky lg:top-24">
            {/* Table of Contents */}
            <TableOfContents toc={post.toc} />

            {/* Author Profile Card */}
            <div className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800/80 backdrop-blur-md space-y-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-teal-500/20 border border-teal-500/40 flex items-center justify-center font-bold text-teal-400 text-sm">
                  CD
                </div>
                <div>
                  <h4 className="text-sm font-bold text-slate-100">{post.author}</h4>
                  <p className="text-xs text-slate-400">Healthcare Data Scientist & Full-Stack AI Engineer</p>
                </div>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                Ph.D. in Computational Sciences. Specializing in explainable AI, machine learning pipelines, computational biology, and full-stack web applications.
              </p>
              <div className="pt-2 border-t border-slate-800/60 flex items-center gap-3 text-xs">
                <a
                  href="https://scholar.google.com/citations?hl=en&user=4g3-eUwAAAAJ"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-teal-400 hover:text-teal-300 transition-colors font-semibold"
                >
                  Google Scholar ↗
                </a>
                <span>•</span>
                <a
                  href="https://github.com/GitHub-ccd"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-teal-400 hover:text-teal-300 transition-colors font-semibold"
                >
                  GitHub ↗
                </a>
              </div>
            </div>
          </aside>
        </div>

        {/* Prev / Next Article Links */}
        <nav className="pt-8 border-t border-slate-800/80 grid grid-cols-1 sm:grid-cols-2 gap-4">
          {prevPost ? (
            <Link
              href={`/blog/${prevPost.slug}`}
              className="p-4 rounded-xl bg-slate-900/50 border border-slate-800/80 hover:border-teal-500/40 transition-all text-left space-y-1 group"
            >
              <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">← Previous Article</span>
              <p className="text-sm font-bold text-slate-200 group-hover:text-teal-300 transition-colors line-clamp-1">
                {prevPost.title}
              </p>
            </Link>
          ) : <div />}

          {nextPost ? (
            <Link
              href={`/blog/${nextPost.slug}`}
              className="p-4 rounded-xl bg-slate-900/50 border border-slate-800/80 hover:border-teal-500/40 transition-all text-right space-y-1 group"
            >
              <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">Next Article →</span>
              <p className="text-sm font-bold text-slate-200 group-hover:text-teal-300 transition-colors line-clamp-1">
                {nextPost.title}
              </p>
            </Link>
          ) : <div />}
        </nav>
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-800/80 py-8 bg-slate-950 text-center text-xs text-slate-500 mt-12">
        <div className="max-w-6xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p>© 2026 Chamila Dharmawardhana, Ph.D. All rights reserved.</p>
          <Link href="/blog" className="text-teal-400 hover:underline">
            Back to Technical Writing Index
          </Link>
        </div>
      </footer>
    </div>
  );
}
