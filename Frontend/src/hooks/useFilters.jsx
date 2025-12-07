import { useState } from 'react';

export function useFilters() {
  const [filters, setFilters] = useState({
    page: 1,
    pageSize: 10,
    q: '',
    regions: '',
    productCategories: '',
    paymentMethods: '',
    dateFrom: '',
    dateTo: '',
    sortBy: 'date',
    sortOrder: 'desc'
  });

  return { filters, setFilters };
}
