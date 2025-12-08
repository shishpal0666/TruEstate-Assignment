import React from 'react';
import dayjs from 'dayjs';

export default function TransactionTable({ items }) {
  return (
    <div className="overflow-auto h-full w-full bg-white px-6 no-scrollbar">
      <style>{`
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .no-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
      <table className="w-full text-left whitespace-nowrap border-collapse">
        <thead className="bg-[#f3f3f3] sticky top-0 z-10 text-gray-500 text-xs uppercase tracking-wider font-semibold border-b border-gray-100">
          <tr>
            <th className="px-6 py-4">Transaction ID</th>
            <th className="px-6 py-4">Date</th>
            <th className="px-6 py-4">Customer ID</th>
            <th className="px-6 py-4">Customer name</th>
            <th className="px-6 py-4">Phone Number</th>
            <th className="px-6 py-4">Gender</th>
            <th className="px-6 py-4">Age</th>
            <th className="px-6 py-4">Product Category</th>
            <th className="px-6 py-4">Quantity</th>
            <th className="px-6 py-4">Total Amount</th>
            <th className="px-6 py-4">Customer region</th>
            <th className="px-6 py-4">Product ID</th>
            <th className="px-6 py-4">Employee name</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100 text-sm bg-white">
          {items.map((it) => (
            <tr key={it._id} className="hover:bg-gray-50 transition-colors duration-150 group">
              <td className="px-6 py-4 text-gray-500 font-medium">{it.transactionId ?? it.TransactionID ?? it.TransactionId ?? '1234567'}</td>
              <td className="px-6 py-4 text-gray-700">{it.date ? dayjs(it.date).format('YYYY-MM-DD') : (it.Date || '2023-09-26')}</td>
              <td className="px-6 py-4 text-gray-900 font-medium">{it.customer?.id ?? it['Customer ID'] ?? 'CUST12016'}</td>
              <td className="px-6 py-4 text-gray-900 font-medium group-hover:text-black transition-colors">{it.customer?.name ?? it['Customer Name'] ?? 'Neha Yadav'}</td>
              <td className="px-6 py-4 text-gray-500 flex items-center gap-2">
                {`+91 ${it.customer?.phone}` ?? it['Phone Number'] ?? '+91 9123456789'}
                <button
                  onClick={() => {
                    const text = it.customer?.phone ?? it['Phone Number'] ?? '+91 9123456789';
                    navigator.clipboard.writeText(text);
                  }}
                  className="text-gray-400 hover:text-gray-600 transition-colors p-1 rounded hover:bg-gray-100"
                  title="Copy Phone Number"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" /></svg>
                </button>
              </td>
              <td className="px-6 py-4 text-gray-500">{it.customer?.gender ?? it.Gender ?? 'Female'}</td>
              <td className="px-6 py-4 text-gray-500">{it.customer?.age ?? it.Age ?? '25'}</td>
              <td className="px-6 py-4 text-gray-900 font-medium">{it.product?.category ?? it['Product Category'] ?? 'Clothing'}</td>
              <td className="px-6 py-4 text-gray-900">{it.sales?.quantity ?? it.Quantity ?? '01'}</td>
              <td className="px-6 py-4 text-gray-900 font-medium">₹{(it.sales?.totalAmount ?? it['Total Amount'] ?? 1000).toLocaleString()}</td>
              <td className="px-6 py-4 text-gray-900 font-medium">{it.customer?.region ?? it['Customer Region'] ?? 'South'}</td>
              <td className="px-6 py-4 text-gray-900 font-medium">{it.product?.id ?? it['Product ID'] ?? 'PROD0001'}</td>
              <td className="px-6 py-4 text-gray-900 font-bold">{it.employee?.name ?? it['Employee name'] ?? it.salesperson?.name ?? 'Harsh Agrawal'}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
