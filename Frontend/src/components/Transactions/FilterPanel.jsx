import React, { useEffect, useState } from 'react';
import api from '../../services/api';

export default function FilterPanel({ filters, setFilters }) {
  const [meta, setMeta] = useState(null);
  const [showDatePicker, setShowDatePicker] = useState(false);

  useEffect(() => {
    let mounted = true;
    api.get('/api/transactions/filters')
      .then((r) => { if (mounted) setMeta(r.data); })
      .catch(() => { });
    return () => (mounted = false);
  }, []);

  const handleFilterChange = (key, value) => {
    setFilters(prev => ({ ...prev, [key]: value, page: 1 }));
  };

  const handleAgeChange = (val) => {
    let ageMin = null;
    let ageMax = null;
    if (val === '18-25') { ageMin = 18; ageMax = 25; }
    else if (val === '26-40') { ageMin = 26; ageMax = 40; }
    else if (val === '40+') { ageMin = 40; }

    setFilters(prev => ({ ...prev, ageMin, ageMax, ageRangeLabel: val, page: 1 }));
  };

  const handleSortChange = (val) => {
    const [sortBy, sortOrder] = val.split('-');
    setFilters(prev => ({ ...prev, sortBy, sortOrder, sortLabel: val, page: 1 }));
  };

  const resetFilters = () => {
    setFilters({
      page: 1,
      pageSize: 10,
      sortBy: 'date',
      sortOrder: 'desc'
    });
  };

  if (!meta) return <div className="p-4">Loading filters...</div>;

  const selectClass = "appearance-none bg-[#f3f3f3] border border-gray-200 px-3 py-1.5 rounded-lg text-xs font-medium text-gray-600 hover:border-gray-300 focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent cursor-pointer transition-all shadow-sm bg-[url('data:image/svg+xml;charset=US-ASCII,%3Csvg%20width%3D%2220%22%20height%3D%2220%22%20viewBox%3D%220%200%2020%2020%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Cpath%20d%3D%22M5%207L10%2012L15%207%22%20stroke%3D%22%236B7280%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%2F%3E%3C%2Fsvg%3E')] bg-[length:1em_1em] bg-no-repeat bg-[right_0.4rem_center] pr-8";

  return (
    <div className="flex justify-between items-center w-full h-full px-8 bg-white">
      <div className="flex gap-2 items-center flex-wrap">
        <button
          onClick={resetFilters}
          className="w-8 h-8 rounded-lg bg-[#f3f3f3] border border-gray-200 flex items-center justify-center hover:bg-gray-50 hover:border-gray-300 text-gray-500 hover:text-black transition-all shadow-sm"
          title="Reset Filters"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" /></svg>
        </button>

        <select value={filters.regions || ''} onChange={(e) => handleFilterChange('regions', e.target.value)} className={selectClass}>
          <option value="">Customer Region</option>
          {meta.regions.map((r) => <option key={r} value={r}>{r}</option>)}
        </select>

        <select value={filters.genders || ''} onChange={(e) => handleFilterChange('genders', e.target.value)} className={selectClass}>
          <option value="">Gender</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
        </select>

        <select value={filters.ageRangeLabel || ''} onChange={(e) => handleAgeChange(e.target.value)} className={selectClass}>
          <option value="">Age Range</option>
          <option value="18-25">18-25</option>
          <option value="26-40">26-40</option>
          <option value="40+">40+</option>
        </select>

        <select value={filters.productCategories || ''} onChange={(e) => handleFilterChange('productCategories', e.target.value)} className={selectClass}>
          <option value="">Product Category</option>
          {meta.productCategories.map((c) => <option key={c} value={c}>{c}</option>)}
        </select>

        <select value={filters.tags || ''} onChange={(e) => handleFilterChange('tags', e.target.value)} className={selectClass}>
          <option value="">Tags</option>
          <option value="VIP">VIP</option>
          <option value="New">New</option>
          <option value="Regular">Regular</option>
        </select>

        <select value={filters.paymentMethods || ''} onChange={(e) => handleFilterChange('paymentMethods', e.target.value)} className={selectClass}>
          <option value="">Payment Method</option>
          {meta.paymentMethods.map((p) => <option key={p} value={p}>{p}</option>)}
        </select>

        <div className="relative">
          <button
            onClick={() => setShowDatePicker(!showDatePicker)}
            className={selectClass + " text-left w-auto min-w-[100px]"}
          >
            {filters.dateFrom ? 'Date Active' : 'Date'}
          </button>

          {showDatePicker && (
            <div className="absolute top-12 left-0 bg-white border p-4 rounded shadow-lg z-50 flex flex-col gap-2 min-w-[250px]">
              <div className="flex flex-col gap-1">
                <label className="text-xs text-gray-500">From:</label>
                <input
                  type="date"
                  value={filters.dateFrom || ''}
                  onChange={(e) => handleFilterChange('dateFrom', e.target.value)}
                  className="border rounded px-2 py-1 text-sm"
                />
              </div>
              <div className="flex flex-col gap-1">
                <label className="text-xs text-gray-500">To:</label>
                <input
                  type="date"
                  value={filters.dateTo || ''}
                  onChange={(e) => handleFilterChange('dateTo', e.target.value)}
                  className="border rounded px-2 py-1 text-sm"
                />
              </div>
              <div className="flex justify-end mt-2">
                <button onClick={() => setShowDatePicker(false)} className="text-xs text-blue-600 font-medium hover:underline">Done</button>
              </div>
            </div>
          )}
        </div>
      </div>

      <div>
        <select
          value={filters.sortLabel || 'date-desc'}
          onChange={(e) => handleSortChange(e.target.value)}
          className={selectClass}
        >
          <option value="customerName-asc">Sort by: Customer Name (A-Z)</option>
          <option value="date-desc">Sort by: Date (Newest)</option>
          <option value="quantity-desc">Sort by: Quantity (High-Low)</option>
        </select>
      </div>
    </div>
  );
}
