import React from 'react';

export default function Pagination({ meta, onChange }) {
  if (!meta) return null;
  const { page, totalPages } = meta;

  const getPageNumbers = () => {
    const pages = [];
    const maxVisible = 7;

    if (totalPages <= maxVisible) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      pages.push(1);
      if (page > 3) pages.push('...');

      let start = Math.max(2, page - 1);
      let end = Math.min(totalPages - 1, page + 1);

      if (page < 4) {
        end = 4;
        start = 2;
      }
      if (page > totalPages - 3) {
        start = totalPages - 3;
        end = totalPages - 1;
      }

      for (let i = start; i <= end; i++) {
        pages.push(i);
      }

      if (page < totalPages - 2) pages.push('...');
      pages.push(totalPages);
    }
    return pages;
  };

  const pageNumbers = getPageNumbers();

  return (
    <div className="h-full flex items-center justify-center bg-white">
      <div className="flex gap-2 items-center">
        <button
          onClick={() => onChange(Math.max(1, page - 1))}
          disabled={page === 1}
          className="w-9 h-9 flex items-center justify-center rounded-lg border border-gray-100 bg-[#F9F8F6] text-gray-600 hover:bg-gray-200 hover:text-black disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-sm"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
        </button>

        {pageNumbers.map((p, idx) => (
          <button
            key={idx}
            onClick={() => typeof p === 'number' && onChange(p)}
            disabled={typeof p !== 'number'}
            className={`w-9 h-9 flex items-center justify-center rounded-lg border text-sm font-medium transition-all shadow-sm ${p === page
              ? 'bg-black text-white border-black ring-2 ring-gray-100'
              : typeof p === 'number'
                ? 'bg-[#F9F8F6] border-gray-100 text-gray-600 hover:bg-gray-200 hover:text-black hover:border-gray-300'
                : 'bg-transparent border-transparent cursor-default shadow-none text-gray-400'
              }`}
          >
            {p}
          </button>
        ))}

        <button
          onClick={() => onChange(Math.min(totalPages, page + 1))}
          disabled={page === totalPages}
          className="w-9 h-9 flex items-center justify-center rounded-lg border border-gray-100 bg-[#F9F8F6] text-gray-600 hover:bg-gray-200 hover:text-black disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-sm"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
        </button>
      </div>
    </div>
  );
}
