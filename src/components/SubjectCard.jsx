import { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { getReadme } from '../services/github';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

export default function SubjectCard({ subject, isBookmarked, onToggleBookmark }) {
  const navigate = useNavigate();
  const [preview, setPreview] = useState(null);
  const [previewLoading, setPreviewLoading] = useState(false);
  const [showPreview, setShowPreview] = useState(false);

  const loadPreview = useCallback(async () => {
    if (preview !== null) {
      setShowPreview(true);
      return;
    }
    setPreviewLoading(true);
    try {
      const readme = await getReadme(subject.repo);
      setPreview(readme || '_No README found._');
    } catch {
      setPreview('_Could not load preview._');
    } finally {
      setPreviewLoading(false);
      setShowPreview(true);
    }
  }, [preview, subject.repo]);

  return (
    <div className="group bg-gray-800 border border-gray-700 hover:border-indigo-500 rounded-2xl p-5 flex flex-col gap-3 transition-all duration-200 hover:shadow-lg hover:shadow-indigo-900/20">
      <div className="flex items-start justify-between gap-2">
        <div>
          <h2 className="text-lg font-bold text-white group-hover:text-indigo-400 transition-colors">
            {subject.name}
          </h2>
          <p className="text-sm text-gray-400 mt-1 line-clamp-2">{subject.description}</p>
        </div>
        <button
          onClick={() => onToggleBookmark(subject.name)}
          aria-label={isBookmarked ? 'Remove bookmark' : 'Bookmark subject'}
          className="shrink-0 text-gray-500 hover:text-yellow-400 transition-colors mt-0.5"
        >
          {isBookmarked ? (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-yellow-400" viewBox="0 0 24 24" fill="currentColor">
              <path d="M5 3a2 2 0 0 0-2 2v16l7-3 7 3V5a2 2 0 0 0-2-2H5z" />
            </svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 3a2 2 0 0 0-2 2v16l7-3 7 3V5a2 2 0 0 0-2-2H5z" />
            </svg>
          )}
        </button>
      </div>

      <div className="flex gap-2 mt-auto flex-wrap">
        <button
          onClick={() => navigate(`/subject/${encodeURIComponent(subject.repo)}`)}
          className="flex-1 min-w-0 px-4 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-400"
        >
          View Repo
        </button>
        <button
          onClick={loadPreview}
          aria-label="Quick README preview"
          className="px-3 py-2 rounded-lg bg-gray-700 hover:bg-gray-600 text-gray-300 text-sm transition-colors focus:outline-none focus:ring-2 focus:ring-gray-500"
        >
          {previewLoading ? (
            <svg className="animate-spin h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
            </svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
            </svg>
          )}
        </button>
      </div>

      {showPreview && (
        <div className="mt-2 border-t border-gray-700 pt-3">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-semibold text-gray-500 uppercase tracking-wide">README Preview</span>
            <button
              onClick={() => setShowPreview(false)}
              aria-label="Close preview"
              className="text-gray-500 hover:text-gray-300 text-xs"
            >
              ✕
            </button>
          </div>
          <div className="prose prose-sm prose-invert max-h-40 overflow-y-auto text-gray-300 text-xs">
            <ReactMarkdown remarkPlugins={[remarkGfm]}>
              {preview?.slice(0, 800) + (preview?.length > 800 ? '\n\n_...preview truncated_' : '')}
            </ReactMarkdown>
          </div>
        </div>
      )}
    </div>
  );
}
