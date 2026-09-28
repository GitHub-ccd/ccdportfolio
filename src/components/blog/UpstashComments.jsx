import React, { useEffect, useState } from 'react';
import useSWR from 'swr';

// Simple fetcher for SWR
const fetcher = (url) => fetch(url).then((res) => res.json());

/**
 * UpstashComments component – lightweight comment system.
 * Props:
 *   slug: string – the blog post identifier used as Redis key.
 */
export default function UpstashComments({ slug }) {
  const { data: comments, mutate, error } = useSWR(`/api/comments?slug=${slug}`, fetcher);
  const [author, setAuthor] = useState('Anonymous');
  const [text, setText] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!text.trim()) return;
    setSubmitting(true);
    try {
      await fetch('/api/comments', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ slug, author, text }),
      });
      setText('');
      // Optimistically update UI
      await mutate();
    } catch (err) {
      console.error('Failed to post comment', err);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section className="mt-12 space-y-6">
      <h3 className="text-xl font-bold text-slate-100">Comments</h3>

      {/* Comment List */}
      {error && <p className="text-red-400">Failed to load comments.</p>}
      {comments && comments.length > 0 ? (
        <ul className="space-y-4">
          {comments.map((c) => (
            <li key={c.id} className="p-4 rounded-xl bg-slate-900/60 border border-slate-800/80">
              <div className="flex items-center gap-2 text-sm">
                <span className="font-medium text-teal-400">{c.author || 'Anonymous'}</span>
                <span className="text-slate-400">· {new Date(c.createdAt).toLocaleString()}</span>
              </div>
              <p className="mt-2 text-slate-300 whitespace-pre-wrap">{c.text}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-slate-400">No comments yet. Be the first to comment!</p>
      )}

      {/* New Comment Form */}
      <form onSubmit={handleSubmit} className="mt-6 space-y-3">
        <div className="flex items-center gap-2">
          <label htmlFor="author" className="text-sm text-slate-400">Name</label>
          <input
            id="author"
            type="text"
            placeholder="Anonymous"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            className="px-3 py-1 bg-slate-800 border border-slate-700 rounded text-sm text-slate-200 focus:outline-none focus:ring-1 focus:ring-teal-500"
          />
        </div>
        <textarea
          rows={4}
          placeholder="Leave a comment..."
          value={text}
          onChange={(e) => setText(e.target.value)}
          className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded text-sm text-slate-200 focus:outline-none focus:ring-1 focus:ring-teal-500"
        />
        <button
          type="submit"
          disabled={submitting}
          className="px-4 py-2 bg-teal-500 text-slate-950 rounded hover:bg-teal-600 disabled:opacity-50"
        >
          {submitting ? 'Posting...' : 'Post Comment'}
        </button>
      </form>
    </section>
  );
}
