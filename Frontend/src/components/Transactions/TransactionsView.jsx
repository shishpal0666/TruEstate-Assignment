import React from 'react';
import { useFiltersContext } from '../../utils/FiltersContext';
import { useTransactions } from '../../hooks/useTransactions';
import FilterPanel from './FilterPanel';
import SummaryCards from './SummaryCards';
import TransactionTable from './TransactionTable';
import Pagination from './Pagination';

export default function TransactionsView() {
  const { filters, setFilters } = useFiltersContext();
  const { data, isLoading } = useTransactions(filters);

  return (
    <>
      <div className="mb-4">
        <FilterPanel filters={filters} setFilters={setFilters} />
      </div>

      <SummaryCards filters={filters} />

      <div className="bg-white rounded shadow overflow-hidden">
        {isLoading ? <div className="p-6">Loading...</div> : (
          <>
            <TransactionTable items={data?.data || []} />
            <Pagination meta={data?.meta} onChange={(p) => setFilters({ ...filters, page: p })} />
          </>
        )}
      </div>
    </>
  );
}
