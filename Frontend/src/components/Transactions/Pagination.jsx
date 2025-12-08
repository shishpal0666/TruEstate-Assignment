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
    <div className="h-full flex items-center justify-center border-t bg-white">
      <div className="flex gap-2 items-center">
        <button
          onClick={() => onChange(Math.max(1, page - 1))}
          disabled={page === 1}
          className="w-8 h-8 flex items-center justify-center rounded bg-gray-100 hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          &lt;
        </button>

        {pageNumbers.map((p, idx) => (
          <button
            key={idx}
            onClick={() => typeof p === 'number' && onChange(p)}
            disabled={typeof p !== 'number'}
            className={`w-8 h-8 flex items-center justify-center rounded ${p === page
              ? 'bg-black text-white'
              : typeof p === 'number'
                ? 'bg-gray-100 hover:bg-gray-200'
                : 'bg-transparent cursor-default'
              }`}
          >
            {p}
          </button>
        ))}

        <button
          onClick={() => onChange(Math.min(totalPages, page + 1))}
          disabled={page === totalPages}
          className="w-8 h-8 flex items-center justify-center rounded bg-gray-100 hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          &gt;
        </button>
      </div>
    </div>
  );
}
