import React from 'react';
import Sidebar from '../Layout/Sidebar';
import Topbar from '../Layout/Topbar';
import FilterPanel from '../Transactions/FilterPanel';
import SummaryCards from '../Transactions/SummaryCards';
import TransactionTable from '../Transactions/TransactionTable';
import Pagination from '../Transactions/Pagination';
import { useFiltersContext } from '../../utils/FiltersContext';
import { useTransactions } from '../../hooks/useTransactions';

export default function Dashboard() {
  const { filters, setFilters } = useFiltersContext();
  const { data, isLoading } = useTransactions(filters);

  return (
    <div className="h-screen w-screen bg-white">
      <div
        className="parent h-full w-full"
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(24, 1fr)',
          gridTemplateRows: 'repeat(16, 1fr)',
          gridColumnGap: '0px',
          gridRowGap: '0px',
        }}
      >
        <div style={{ gridArea: '1 / 1 / 17 / 5' }}>
          <Sidebar />
        </div>

        <div style={{ gridArea: '1 / 5 / 2 / 25' }}>
          <Topbar />
        </div>

        <div style={{ gridArea: '2 / 5 / 3 / 25' }}>
          <FilterPanel filters={filters} setFilters={setFilters} />
        </div>

        <div style={{ gridArea: '3 / 5 / 5 / 25' }} className="bg-gray-50 flex items-center">
          <SummaryCards filters={filters} />
        </div>

        <div style={{ gridArea: '5 / 5 / 16 / 25' }} className="overflow-hidden">
          {isLoading ? <div className="p-10">Loading transactions...</div> : (
            <TransactionTable items={data?.data || []} />
          )}
        </div>

        <div style={{ gridArea: '16 / 5 / 17 / 25' }}>
          <Pagination meta={data?.meta} onChange={(p) => setFilters({ ...filters, page: p })} />
        </div>
      </div>
    </div>
  );
}
