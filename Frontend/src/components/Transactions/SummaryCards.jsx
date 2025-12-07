import React from 'react';
import { useQuery } from '@tanstack/react-query';
import api from '../../services/api';

function buildParams(filters) {
  const params = {};
  Object.entries(filters || {}).forEach(([k, v]) => {
    if (v === undefined || v === null) return;
    if (typeof v === 'string' && v.trim() === '') return;
    params[k] = v;
  });
  return params;
}

export default function SummaryCards({ filters }) {
  const params = buildParams(filters);

  const { data } = useQuery({
    queryKey: ['summary', params],
    queryFn: async () => {
      const res = await api.get('/api/transactions/summary', { params });
      return res.data;
    },
    keepPreviousData: true
  });

  return (
    <div className="flex gap-4 mb-4">
      <div className="bg-white p-4 rounded shadow w-48">
        <div className="text-sm text-gray-500">Total units sold</div>
        <div className="text-2xl font-bold">{data?.totalUnits ?? 0}</div>
      </div>
      <div className="bg-white p-4 rounded shadow w-48">
        <div className="text-sm text-gray-500">Total Amount</div>
        <div className="text-2xl font-bold">₹{data?.totalAmount?.toLocaleString() ?? 0}</div>
      </div>
      <div className="bg-white p-4 rounded shadow w-48">
        <div className="text-sm text-gray-500">Total Discount</div>
        <div className="text-2xl font-bold">₹{data?.totalDiscount?.toLocaleString() ?? 0}</div>
      </div>
    </div>
  );
}
