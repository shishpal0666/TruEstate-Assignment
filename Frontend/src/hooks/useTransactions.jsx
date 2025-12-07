import { useQuery } from '@tanstack/react-query';
import api from '../services/api';

export function useTransactions(filters) {
  return useQuery({
    queryKey: ['transactions', filters],
    queryFn: async () => {
      const params = {};
      Object.keys(filters || {}).forEach((k) => {
        const v = filters[k];
        if (v === '' || v === undefined || v === null) return;
        params[k] = v;
      });
      const res = await api.get('/api/transactions', { params });
      return res.data;
    },
    keepPreviousData: true
  });
}
