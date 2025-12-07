import React, { useState, useEffect } from 'react';
import { useAuth } from '../../hooks/useAuth';
import { logout } from '../../services/auth';
import { useNavigate } from 'react-router';
import { useFiltersContext } from '../../utils/FiltersContext';
import useDebounce from '../../hooks/useDebounce';

export default function Topbar() {
  const { user, setUser } = useAuth();
  const navigate = useNavigate();
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

  const doLogout = async () => {
    await logout();
    setUser(null);
    navigate('/login');
  };

  return (
    <header className="bg-white p-4 border-b flex items-center justify-between">
      <div className="flex items-center gap-3">
        <button className="p-2 rounded bg-gray-100">⟳</button>
        <input
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
          placeholder="Name, Phone no."
          className="p-2 border rounded w-96"
        />
      </div>

      <div className="flex items-center gap-4">
        <div className="text-sm text-gray-600">{user?.name}</div>
        <button onClick={doLogout} className="py-1 px-3 bg-red-50 text-red-600 rounded">Logout</button>
      </div>
    </header>
  );
}
