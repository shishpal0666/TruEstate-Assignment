import React from 'react';
import dayjs from 'dayjs';

export default function TransactionTable({ items }) {
  return (
    <div className="overflow-auto h-full w-full bg-white px-6">
      <table className="w-full text-left whitespace-nowrap">
        <thead className="bg-gray-50 sticky top-0 z-10 text-gray-500 text-sm">
          <tr>
            <th className="p-4 font-medium">Transaction ID</th>
            <th className="p-4 font-medium">Date</th>
            <th className="p-4 font-medium">Customer ID</th>
            <th className="p-4 font-medium">Customer name</th>
            <th className="p-4 font-medium">Phone Number</th>
            <th className="p-4 font-medium">Gender</th>
            <th className="p-4 font-medium">Age</th>
            <th className="p-4 font-medium">Product Category</th>
            <th className="p-4 font-medium">Quantity</th>
            <th className="p-4 font-medium">Total Amount</th>
            <th className="p-4 font-medium">Customer region</th>
            <th className="p-4 font-medium">Product ID</th>
            <th className="p-4 font-medium">Employee name</th>
          </tr>
        </thead>
        <tbody className="divide-y text-sm">
          {items.map((it) => (
            <tr key={it._id} className="hover:bg-gray-50">
              <td className="p-4 text-gray-500">{it.transactionId ?? it.TransactionID ?? it.TransactionId ?? it.Transaction_ID ?? it._id ?? '1234567'}</td>
              <td className="p-4 text-gray-700">{it.date ? dayjs(it.date).format('YYYY-MM-DD') : (it.Date || '2023-09-26')}</td>
              <td className="p-4 text-gray-900 font-medium">{it.customer?.id ?? it['Customer ID'] ?? it.customerId ?? it.customerId ?? 'CUST12016'}</td>
              <td className="p-4 text-gray-900 font-medium">{it.customer?.name ?? it['Customer Name'] ?? it.customerName ?? 'Neha Yadav'}</td>
              <td className="p-4 text-gray-500">{it.customer?.phone ?? it['Phone Number'] ?? it.phone ?? '+91 9123456789'}</td>
              <td className="p-4 text-gray-500">{it.customer?.gender ?? it.Gender ?? 'Female'}</td>
              <td className="p-4 text-gray-500">{it.customer?.age ?? it.Age ?? '25'}</td>
              <td className="p-4 text-gray-900 font-medium">{it.product?.category ?? it['Product Category'] ?? it.productCategory ?? 'Clothing'}</td>
              <td className="p-4 text-gray-900">{it.sales?.quantity ?? it.Quantity ?? '01'}</td>
              <td className="p-4 text-gray-900 font-medium">₹{(it.sales?.totalAmount ?? it['Total Amount'] ?? it.Total_Amount ?? 1000).toLocaleString()}</td>
              <td className="p-4 text-gray-900 font-medium">{it.customer?.region ?? it['Customer Region'] ?? it.CustomerRegion ?? 'South'}</td>
              <td className="p-4 text-gray-900 font-medium">{it.product?.id ?? it['Product ID'] ?? it.ProductID ?? 'PROD0001'}</td>
              <td className="p-4 text-gray-900 font-bold">{it.employee?.name ?? it['Employee name'] ?? it.salesperson?.name ?? 'Harsh Agrawal'}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
