import { lazy, Suspense, useMemo } from 'react';
import subjects from '../data/subjects.json';
import SearchBar from '../components/SearchBar';
import SkeletonCard from '../components/SkeletonCard';
import { useBookmarks } from '../hooks/useBookmarks';
import { useSearch } from '../hooks/useSearch';

const SubjectCard = lazy(() => import('../components/SubjectCard'));

export default function HomePage() {
  const { bookmarks, toggle, isBookmarked } = useBookmarks();
  const { query, setQuery, filtered } = useSearch(subjects);

  const savedSubjects = useMemo(
    () => subjects.filter((s) => bookmarks.includes(s.name)),
    [bookmarks]
  );

  return (
    <div className="min-h-screen bg-gray-950 text-gray-100">
      {/* Header */}
      <header className="sticky top-0 z-10 bg-gray-950/90 backdrop-blur border-b border-gray-800 px-4 py-3">
        <div className="max-w-5xl mx-auto flex items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
            </svg>
            <span className="text-lg font-bold tracking-tight">GitClass</span>
          </div>
          <a
            href="https://github.com/sanket-sonwane/GitClass"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-400 hover:text-white transition-colors"
            aria-label="View GitClass on GitHub"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0 1 12 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
            </svg>
          </a>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-4 py-10 space-y-10">
        {/* Hero */}
        <section className="text-center space-y-4">
          <h1 className="text-4xl sm:text-5xl font-extrabold bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
            GitClass
          </h1>
          <p className="text-gray-400 text-lg max-w-xl mx-auto">
            Access all your lab subject repositories in one clean place.
          </p>
          <SearchBar query={query} onChange={setQuery} />
        </section>

        {/* Saved / Bookmarked */}
        {savedSubjects.length > 0 && !query && (
          <section>
            <h2 className="text-sm font-semibold text-yellow-400 uppercase tracking-widest mb-4 flex items-center gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
                <path d="M5 3a2 2 0 0 0-2 2v16l7-3 7 3V5a2 2 0 0 0-2-2H5z" />
              </svg>
              Saved
            </h2>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              <Suspense fallback={savedSubjects.map((_, i) => <SkeletonCard key={i} />)}>
                {savedSubjects.map((subject) => (
                  <SubjectCard
                    key={subject.name}
                    subject={subject}
                    isBookmarked={isBookmarked(subject.name)}
                    onToggleBookmark={toggle}
                  />
                ))}
              </Suspense>
            </div>
          </section>
        )}

        {/* All Subjects */}
        <section>
          <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-widest mb-4">
            {query ? `Results for "${query}"` : 'All Subjects'}
          </h2>
          {filtered.length === 0 ? (
            <div className="text-center py-16 text-gray-500">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto mb-3 opacity-30" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-4.35-4.35M17 11A6 6 0 1 1 5 11a6 6 0 0 1 12 0z" />
              </svg>
              <p className="text-lg font-medium">No subjects found</p>
              <p className="text-sm mt-1">Try a different search term.</p>
            </div>
          ) : (
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              <Suspense fallback={filtered.map((_, i) => <SkeletonCard key={i} />)}>
                {filtered.map((subject) => (
                  <SubjectCard
                    key={subject.name}
                    subject={subject}
                    isBookmarked={isBookmarked(subject.name)}
                    onToggleBookmark={toggle}
                  />
                ))}
              </Suspense>
            </div>
          )}
        </section>
      </main>

      <footer className="border-t border-gray-800 py-6 text-center text-sm text-gray-600">
        GitClass — Built for students, powered by GitHub API
      </footer>
    </div>
  );
}
