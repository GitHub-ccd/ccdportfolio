"use client";


/**
 * Reusable fullscreen media modal used by both Publications and Blog posts.
 * Props:
 *   activeMedia: { type: 'image' | 'video', src: string, title?: string }
 *   onClose: () => void
 */
export default function MediaModal({ activeMedia, onClose }) {
  if (!activeMedia) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/95 backdrop-blur-md"
      onClick={onClose}
    >
      <div
        className="relative max-w-5xl w-full bg-slate-900 border border-slate-800 rounded-xl p-4 sm:p-6 space-y-4 shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between">
          <h4 className="text-sm font-bold text-slate-200 line-clamp-1">
            {activeMedia.title}
          </h4>
          <button
            onClick={onClose}
            className="px-3 py-1 text-xs font-semibold rounded bg-slate-800 hover:bg-slate-700 text-slate-300"
          >
            ✕ Close
          </button>
        </div>
        <div className="flex items-center justify-center bg-slate-950 rounded-lg p-2 max-h-[80vh] overflow-hidden">
          {activeMedia.type === 'video' ? (
            <video
              src={activeMedia.src}
              controls
              autoPlay
              loop
              className="max-h-[75vh] w-auto max-w-full rounded"
            />
          ) : (
            <img
              src={activeMedia.src}
              alt={activeMedia.title}
              className="max-h-[75vh] w-auto max-w-full object-contain rounded"
            />
          )}
        </div>
      </div>
    </div>
  );
}
