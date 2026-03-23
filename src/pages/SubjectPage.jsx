import { useState, useEffect, useCallback } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getRepoMetadata, getRepoContents, getReadme } from '../services/github';
import ReadmeViewer from '../components/ReadmeViewer';
import FileTree from '../components/FileTree';
import SkeletonDetail from '../components/SkeletonDetail';

function StatBadge({ icon, value, label }) {
  return (
    <span className="flex items-center gap-1.5 text-sm text-gray-400 bg-gray-800 px-3 py-1.5 rounded-full">
      {icon}
      <span className="font-medium text-gray-200">{value}</span>
      <span>{label}</span>
    </span>
  );
}

function isImportant(file) {
  if (!file || file.type === 'dir') return false;
  const name = file.name.toLowerCase();
  const ext = name.split('.').pop();
  const imageExts = ['png', 'jpg', 'jpeg', 'gif', 'svg', 'webp'];
  const codeExts = ['js', 'jsx', 'ts', 'tsx', 'py', 'java', 'c', 'cpp', 'cs', 'go', 'rs', 'sh', 'sql', 'html', 'css'];
  return (
    name === 'readme.md' ||
    name === 'readme' ||
    imageExts.includes(ext) ||
    codeExts.includes(ext)
  );
}

export default function SubjectPage() {
  const { repo } = useParams();
  const decodedRepo = decodeURIComponent(repo);

  const [meta, setMeta] = useState(null);
  const [contents, setContents] = useState(null);
  const [readme, setReadme] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showImportant, setShowImportant] = useState(false);
  const [activeTab, setActiveTab] = useState('readme');

  const load = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const [metaData, contentsData, readmeData] = await Promise.all([
        getRepoMetadata(decodedRepo),
        getRepoContents(decodedRepo),
        getReadme(decodedRepo),
      ]);
      setMeta(metaData);
      setContents(Array.isArray(contentsData) ? contentsData : []);
      setReadme(readmeData);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [decodedRepo]);

  useEffect(() => {
    load();
  }, [load]);

  const importantFiles = contents?.filter(isImportant) ?? [];

  return (
    <div className="min-h-screen bg-gray-950 text-gray-100">
      {/* Header */}
      <header className="sticky top-0 z-10 bg-gray-950/90 backdrop-blur border-b border-gray-800 px-4 py-3">
        <div className="max-w-5xl mx-auto flex items-center gap-3">
          <Link
            to="/"
            className="flex items-center gap-1.5 text-gray-400 hover:text-white transition-colors text-sm"
            aria-label="Back to home"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0 7-7m-7 7h18" />
            </svg>
            Back
          </Link>
          <span className="text-gray-600">/</span>
          <span className="text-sm font-semibold text-gray-200 truncate">{decodedRepo}</span>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-4 py-8">
        {loading && <SkeletonDetail />}

        {error && (
          <div className="text-center py-16 space-y-4">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-14 w-14 mx-auto text-red-400 opacity-60" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 9v2m0 4h.01M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0z" />
            </svg>
            <p className="text-lg font-semibold text-red-400">Failed to load repository</p>
            <p className="text-gray-500 text-sm max-w-md mx-auto">{error}</p>
            <button
              onClick={load}
              className="mt-2 px-5 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-medium transition-colors"
            >
              Retry
            </button>
          </div>
        )}

        {!loading && !error && meta && (
          <div className="space-y-8">
            {/* Repo Header */}
            <div className="space-y-3">
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <h1 className="text-2xl sm:text-3xl font-bold text-white">{meta.name}</h1>
                  {meta.description && (
                    <p className="text-gray-400 mt-1">{meta.description}</p>
                  )}
                </div>
                <a
                  href={meta.html_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gray-800 hover:bg-gray-700 border border-gray-700 text-sm text-gray-200 transition-colors"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0 1 12 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
                  </svg>
                  Open in GitHub
                </a>
              </div>

              <div className="flex flex-wrap gap-2">
                <StatBadge
                  icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-yellow-400" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87L18.18 21 12 17.77 5.82 21 7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>}
                  value={meta.stargazers_count}
                  label="stars"
                />
                <StatBadge
                  icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 1 1 0-2.684m0 2.684 6.632 3.316m-6.632-6 6.632-3.316m0 0a3 3 0 1 0 5.367-2.684 3 3 0 0 0-5.367 2.684zm0 9.316a3 3 0 1 0 5.367 2.684 3 3 0 0 0-5.367-2.684z"/></svg>}
                  value={meta.forks_count}
                  label="forks"
                />
                {meta.language && (
                  <span className="flex items-center gap-1.5 text-sm text-gray-400 bg-gray-800 px-3 py-1.5 rounded-full">
                    <span className="h-2.5 w-2.5 rounded-full bg-indigo-400 inline-block" />
                    {meta.language}
                  </span>
                )}
              </div>
            </div>

            {/* Important Files Toggle */}
            {importantFiles.length > 0 && (
              <div>
                <button
                  onClick={() => setShowImportant((v) => !v)}
                  className="flex items-center gap-2 px-4 py-2 rounded-lg bg-amber-900/30 border border-amber-700/40 hover:bg-amber-900/50 text-amber-300 text-sm font-medium transition-colors"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 0 0 .95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 0 0-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 0 0-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 0 0-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 0 0 .951-.69l1.519-4.674z" />
                  </svg>
                  {showImportant ? 'Hide' : 'Open'} Important Files ({importantFiles.length})
                </button>

                {showImportant && (
                  <div className="mt-3 bg-gray-800/50 border border-gray-700 rounded-xl p-4">
                    <ul className="space-y-2">
                      {importantFiles.map((file) => (
                        <li key={file.sha} className="flex items-center gap-2">
                          <span className="text-xs px-2 py-0.5 rounded bg-gray-700 text-gray-400 uppercase font-mono">
                            {file.name.split('.').pop()}
                          </span>
                          <a
                            href={file.html_url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-sm text-indigo-400 hover:underline"
                          >
                            {file.name}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            )}

            {/* Tabs */}
            <div className="border-b border-gray-800">
              <div className="flex gap-1">
                {['readme', 'files'].map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`px-4 py-2 text-sm font-medium capitalize transition-colors border-b-2 -mb-px ${
                      activeTab === tab
                        ? 'border-indigo-500 text-indigo-400'
                        : 'border-transparent text-gray-500 hover:text-gray-300'
                    }`}
                  >
                    {tab === 'readme' ? 'README' : 'Files'}
                  </button>
                ))}
              </div>
            </div>

            {/* Tab Content */}
            <div>
              {activeTab === 'readme' ? (
                <div className="bg-gray-900 border border-gray-800 rounded-xl p-6">
                  <ReadmeViewer content={readme} />
                </div>
              ) : (
                <div className="bg-gray-900 border border-gray-800 rounded-xl p-6">
                  <FileTree
                    contents={contents}
                    onFileClick={(file) => window.open(file.html_url, '_blank')}
                  />
                </div>
              )}
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
