import React, { useEffect, useState } from 'react';
import api from '../../services/api';

export default function FilterPanel({ filters, setFilters }) {
  const [meta, setMeta] = useState(null);

  useEffect(() => {
    let mounted = true;
    api.get('/api/transactions/filters')
      .then((r) => { if (mounted) setMeta(r.data); })
      .catch(() => { });
    return () => (mounted = false);
  }, []);

  const onMultiChange = (key, value) => {
    setFilters({ ...filters, [key]: value, page: 1 });
  };

  if (!meta) return <div className="p-4">Loading filters...</div>;

  const selectClass = "appearance-none bg-gray-100 border-none px-4 py-2 rounded-full text-sm font-medium text-gray-700 focus:ring-2 focus:ring-black cursor-pointer bg-[url('data:image/svg+xml;charset=US-ASCII,%3Csvg%20width%3D%2220%22%20height%3D%2220%22%20viewBox%3D%220%200%2020%2020%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Cpath%20d%3D%22M5%207L10%2012L15%207%22%20stroke%3D%22%236B7280%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%2F%3E%3C%2Fsvg%3E')] bg-[length:1.25em_1.25em] bg-no-repeat bg-[right_0.5rem_center] pr-8";

  return (
    <div className="flex justify-between items-center w-full h-full px-6 bg-white border-b">
      <div className="flex gap-3 items-center flex-wrap">
        <button className="w-8 h-8 rounded-full border flex items-center justify-center hover:bg-gray-50">↻</button>

        <select value={filters.regions || ''} onChange={(e) => onMultiChange('regions', e.target.value)} className={selectClass}>
          <option value="">Customer Region</option>
          {meta.regions.map((r) => <option key={r} value={r}>{r}</option>)}
        </select>

        <select value={filters.productCategories || ''} onChange={(e) => onMultiChange('productCategories', e.target.value)} className={selectClass}>
          <option value="">Product Category</option>
          {meta.productCategories.map((c) => <option key={c} value={c}>{c}</option>)}
        </select>

        <select value={filters.paymentMethods || ''} onChange={(e) => onMultiChange('paymentMethods', e.target.value)} className={selectClass}>
          <option value="">Payment Method</option>
          {meta.paymentMethods.map((p) => <option key={p} value={p}>{p}</option>)}
        </select>

        <div className="flex items-center gap-1 bg-gray-100 rounded-full px-3 py-1">
          <span className="text-sm text-gray-600">Date</span>
          <input type="date" value={filters.dateFrom || ''} onChange={(e) => setFilters({ ...filters, dateFrom: e.target.value })} className="bg-transparent border-none text-sm p-1 focus:ring-0" />
        </div>
        {(filters.regions || filters.productCategories || filters.paymentMethods || filters.dateFrom) && (
          <button onClick={() => setFilters({ page: 1, pageSize: 10 })} className="text-red-500 text-sm hover:underline">Reset</button>
        )}
      </div>

      <div>
        <select className={selectClass}>
          <option>Sort by: Customer Name (A-Z)</option>
          <option>Sort by: Date (Newest)</option>
          <option>Sort by: Amount (High-Low)</option>
        </select>
      </div>
    </div>
  );
}
