import { useState } from 'react';

function FileIcon({ type, name }) {
  if (type === 'dir') {
    return (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-yellow-400 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 7a2 2 0 0 1 2-2h4l2 2h8a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V7z" />
      </svg>
    );
  }
  const ext = name.split('.').pop().toLowerCase();
  const isImage = ['png', 'jpg', 'jpeg', 'gif', 'svg', 'webp'].includes(ext);
  const isCode = ['js', 'jsx', 'ts', 'tsx', 'py', 'java', 'c', 'cpp', 'cs', 'go', 'rs', 'sh', 'sql'].includes(ext);
  
  if (isImage) {
    return (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-green-400 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M4 16l4.586-4.586a2 2 0 0 1 2.828 0L16 16m-2-2 1.586-1.586a2 2 0 0 1 2.828 0L20 14m-6-6h.01M6 20h12a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2z" />
      </svg>
    );
  }
  if (isCode) {
    return (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-blue-400 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M10 20l4-16m4 4 4 4-4 4M6 16l-4-4 4-4" />
      </svg>
    );
  }
  return (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-400 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5.586a1 1 0 0 1 .707.293l5.414 5.414a1 1 0 0 1 .293.707V19a2 2 0 0 1-2 2z" />
    </svg>
  );
}

export default function FileTree({ contents, onFileClick }) {
  const [expanded, setExpanded] = useState({});

  if (!contents || contents.length === 0) {
    return <p className="text-gray-500 text-sm">No files found.</p>;
  }

  const sorted = [...contents].sort((a, b) => {
    if (a.type === b.type) return a.name.localeCompare(b.name);
    return a.type === 'dir' ? -1 : 1;
  });

  return (
    <ul className="space-y-1">
      {sorted.map((item) => (
        <li key={item.sha} className="flex items-center gap-2">
          <FileIcon type={item.type} name={item.name} />
          {item.type === 'dir' ? (
            <button
              onClick={() => setExpanded((e) => ({ ...e, [item.name]: !e[item.name] }))}
              className="text-sm text-gray-300 hover:text-white transition-colors text-left"
            >
              {item.name}/
            </button>
          ) : (
            <button
              onClick={() => onFileClick && onFileClick(item)}
              className="text-sm text-gray-300 hover:text-indigo-400 transition-colors text-left"
            >
              {item.name}
            </button>
          )}
        </li>
      ))}
    </ul>
  );
}
