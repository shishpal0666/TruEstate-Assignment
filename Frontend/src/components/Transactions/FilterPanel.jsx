import React, { useEffect, useState } from 'react';
import api from '../../services/api';

export default function FilterPanel({ filters, setFilters }) {
  const [meta, setMeta] = useState(null);

  useEffect(() => {
    let mounted = true;
    api.get('/api/transactions/filters')
      .then((r) => { if (mounted) setMeta(r.data); })
      .catch(() => {});
    return () => (mounted = false);
  }, []);

  const onMultiChange = (key, value) => {
    setFilters({ ...filters, [key]: value, page: 1 });
  };

  if (!meta) return <div className="p-4">Loading filters...</div>;

  return (
    <div className="flex flex-wrap gap-3 items-center">
      <select value={filters.regions || ''} onChange={(e) => onMultiChange('regions', e.target.value)} className="p-2 border rounded">
        <option value="">All Regions</option>
        {meta.regions.map((r) => <option key={r} value={r}>{r}</option>)}
      </select>

      <select value={filters.productCategories || ''} onChange={(e) => onMultiChange('productCategories', e.target.value)} className="p-2 border rounded">
        <option value="">All Categories</option>
        {meta.productCategories.map((c) => <option key={c} value={c}>{c}</option>)}
      </select>

      <select value={filters.paymentMethods || ''} onChange={(e) => onMultiChange('paymentMethods', e.target.value)} className="p-2 border rounded">
        <option value="">All Payments</option>
        {meta.paymentMethods.map((p) => <option key={p} value={p}>{p}</option>)}
      </select>

      <input type="date" value={filters.dateFrom || ''} onChange={(e) => setFilters({ ...filters, dateFrom: e.target.value })} className="p-2 border rounded" />
      <input type="date" value={filters.dateTo || ''} onChange={(e) => setFilters({ ...filters, dateTo: e.target.value })} className="p-2 border rounded" />

      <button onClick={() => setFilters({ page:1, pageSize:10 })} className="p-2 bg-gray-100 rounded">Reset</button>
    </div>
  );
}
