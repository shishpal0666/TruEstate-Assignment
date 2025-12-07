import React from 'react';

export default function Pagination({ meta, onChange }) {
  if (!meta) return null;
  const { page, totalPages } = meta;
  const maxShow = 6;
  const pages = Array.from({ length: Math.min(totalPages, maxShow) }, (_, i) => i + 1);

  return (
    <div className="p-4 flex items-center justify-center gap-2">
      <button onClick={() => onChange(Math.max(1, page - 1))} disabled={page === 1} className="px-3 py-1 border rounded">Prev</button>
      {pages.map((p) => (
        <button key={p} onClick={() => onChange(p)} className={`px-3 py-1 border rounded ${p === page ? 'bg-gray-800 text-white' : ''}`}>{p}</button>
      ))}
      <button onClick={() => onChange(Math.min(totalPages, page + 1))} disabled={page === totalPages} className="px-3 py-1 border rounded">Next</button>
    </div>
  );
}
