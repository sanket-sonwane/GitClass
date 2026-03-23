import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

export default function ReadmeViewer({ content }) {
  if (!content) {
    return (
      <div className="text-center py-10 text-gray-500">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto mb-3 opacity-30" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5.586a1 1 0 0 1 .707.293l5.414 5.414a1 1 0 0 1 .293.707V19a2 2 0 0 1-2 2z" />
        </svg>
        <p>No README available for this repository.</p>
      </div>
    );
  }

  return (
    <div className="prose prose-invert prose-sm sm:prose-base max-w-none
      prose-headings:text-white prose-headings:font-bold
      prose-p:text-gray-300
      prose-a:text-indigo-400 prose-a:no-underline hover:prose-a:underline
      prose-code:bg-gray-800 prose-code:text-green-400 prose-code:px-1 prose-code:rounded
      prose-pre:bg-gray-900 prose-pre:border prose-pre:border-gray-700
      prose-blockquote:border-indigo-500 prose-blockquote:text-gray-400
      prose-strong:text-white
      prose-ul:text-gray-300 prose-ol:text-gray-300
      prose-li:marker:text-indigo-400
      prose-table:text-gray-300
      prose-th:text-white prose-th:bg-gray-800
      prose-td:border-gray-700">
      <ReactMarkdown remarkPlugins={[remarkGfm]}>
        {content}
      </ReactMarkdown>
    </div>
  );
}
