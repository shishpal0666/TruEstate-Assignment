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
    <div className="h-full flex items-center justify-between px-6 bg-white border-b">
      <h1 className="text-xl font-bold text-gray-800">Sales Management System</h1>

      <div className="relative">
        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">🔍</span>
        <input
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
          placeholder="Name, Phone no."
          className="pl-10 pr-4 py-2 border rounded-full bg-gray-50 w-80 focus:outline-none focus:ring-1 focus:ring-gray-300"
        />
      </div>
    </div>
  );
}
