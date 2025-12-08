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

  const cardClass = "bg-white px-4 py-3 rounded-xl border border-gray-200 flex flex-col justify-center min-w-[200px] shadow-sm hover:shadow-md transition-all duration-300";
  const labelClass = "text-gray-500 text-[10px] uppercase tracking-wider font-semibold flex items-center gap-1";
  const valueClass = "text-xl font-bold text-gray-900 mt-0.5 tracking-tight";
  const subTextClass = "text-xs font-medium text-gray-400 ml-1.5";


  return (
    <div className="flex gap-6 h-full items-center px-8">
      <div className={cardClass}>
        <div className={labelClass}>Total units sold <span className="text-gray-300">ⓘ</span></div>
        <div className={valueClass}>{data?.totalUnits ?? 0}</div>
      </div>
      <div className={cardClass}>
        <div className={labelClass}>Total Amount <span className="text-gray-300">ⓘ</span></div>
        <div className={valueClass}>
          ₹{(data?.totalAmount ?? 0).toLocaleString()}
          <span className={subTextClass}>(19 SRs)</span>
        </div>
      </div>
      <div className={cardClass}>
        <div className={labelClass}>Total Discount <span className="text-gray-300">ⓘ</span></div>
        <div className={valueClass}>
          ₹{(data?.totalDiscount ?? 0).toLocaleString()}
          <span className={subTextClass}>(45 SRs)</span>
        </div>
      </div>
    </div>
  );
}
