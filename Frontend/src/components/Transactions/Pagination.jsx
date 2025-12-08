import React from 'react';

export default function Pagination({ meta, onChange }) {
  if (!meta) return null;
  const { page, totalPages } = meta;
  const maxShow = 6;
  const pages = Array.from({ length: Math.min(totalPages, maxShow) }, (_, i) => i + 1);

  return (
    <div className="h-full flex items-center justify-center border-t bg-white">
      <div className="flex gap-2">
        {pages.map((p) => (
          <button
            key={p}
            onClick={() => onChange(p)}
            className={`w-8 h-8 flex items-center justify-center rounded ${p === page ? 'bg-black text-white' : 'bg-gray-100 hover:bg-gray-200'}`}
          >
            {p}
          </button>
        ))}
      </div>
    </div>
  );
}
