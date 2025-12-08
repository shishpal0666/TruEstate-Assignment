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

  const cardClass = "bg-white p-4 rounded-xl border flex flex-col justify-between w-64 h-full";
  const labelClass = "text-gray-500 text-sm flex items-center gap-2";
  const valueClass = "text-2xl font-bold mt-2";
  const subTextClass = "text-lg font-normal text-gray-500 ml-1";


  return (
    <div className="flex gap-4 h-full items-center px-6">
      <div className={cardClass}>
        <div className={labelClass}>Total units sold <span className="text-gray-300">ⓘ</span></div>
        <div className={valueClass}>{data?.totalUnits ?? 10}</div>
      </div>
      <div className={cardClass}>
        <div className={labelClass}>Total Amount <span className="text-gray-300">ⓘ</span></div>
        <div className={valueClass}>
          ₹{(data?.totalAmount ?? 89000).toLocaleString()}
          <span className={subTextClass}>(19 SRs)</span>
        </div>
      </div>
      <div className={cardClass}>
        <div className={labelClass}>Total Discount <span className="text-gray-300">ⓘ</span></div>
        <div className={valueClass}>
          ₹{(data?.totalDiscount ?? 15000).toLocaleString()}
          <span className={subTextClass}>(45 SRs)</span>
        </div>
      </div>
    </div>
  );
}
