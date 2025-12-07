import React from 'react';
import Layout from '../Layout/Layout';
// import TransactionsView from '../Transactions/TransactionsView';

export default function Dashboard() {
  return (
    <Layout>
      <div className="p-6">
        <h1 className="text-xl font-semibold mb-4">Sales Management System</h1>
        {/* <TransactionsView /> */}
      </div>
    </Layout>
  );
}
