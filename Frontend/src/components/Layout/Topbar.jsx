import React, { useState, useEffect } from 'react';
import { useAuth } from '../../hooks/useAuth';
import { logout } from '../../services/auth';
import { useNavigate } from 'react-router';
import { useFiltersContext } from '../../utils/FiltersContext';
import useDebounce from '../../hooks/useDebounce';

export default function Topbar() {
  const { filters, setFilters } = useFiltersContext();
  const [searchInput, setSearchInput] = useState(filters.q || '');
  const debouncedSearch = useDebounce(searchInput, 350);

  useEffect(() => {
    if (debouncedSearch !== (filters.q || '')) {
      setFilters({ ...filters, q: debouncedSearch, page: 1 });
    }
  }, [debouncedSearch]);

  useEffect(() => {
    setSearchInput(filters.q || '');
  }, [filters.q]);

  return (
    <div className="h-full flex items-center justify-between px-8 bg-white">
      <h1 className="text-xl font-bold text-gray-800">Sales Management System</h1>

      <div className="relative">
        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </span>
        <input
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
          placeholder="Name, Phone no."
          className="pl-10 pr-4 py-2 border border-gray-200 rounded-lg bg-[#f3f3f3] w-96 focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent text-sm transition-shadow placeholder-gray-400"
        />
      </div>
    </div>
  );
}
