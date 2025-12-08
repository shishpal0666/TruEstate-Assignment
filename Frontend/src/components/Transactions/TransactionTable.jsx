import React from 'react';
import dayjs from 'dayjs';

export default function TransactionTable({ items }) {
  return (
    <div className="overflow-auto h-full w-full bg-white px-6">
      <table className="w-full text-left whitespace-nowrap border-collapse">
        <thead className="bg-[#F9F8F6] sticky top-0 z-10 text-gray-500 text-xs uppercase tracking-wider font-semibold border-b border-gray-100">
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
              <td className="px-6 py-4 text-gray-500">{it.customer?.phone ?? it['Phone Number'] ?? '+91 9123456789'}</td>
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
