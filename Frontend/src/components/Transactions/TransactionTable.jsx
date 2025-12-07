import React from 'react';
import dayjs from 'dayjs';

export default function TransactionTable({ items }) {
  const tableMinWidth = 1400; 
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-left" style={{ minWidth: tableMinWidth }}>
        <thead className="bg-gray-50 whitespace-nowrap">
          <tr>
            <th className="p-3">Transaction ID</th>
            <th className="p-3">Date</th>
            <th className="p-3">Customer ID</th>
            <th className="p-3">Customer name</th>
            <th className="p-3">Phone Number</th>
            <th className="p-3">Gender</th>
            <th className="p-3">Age</th>
            <th className="p-3">Product Category</th>
            <th className="p-3">Quantity</th>
            <th className="p-3">Total Amount</th>
            <th className="p-3">Customer region</th>
            <th className="p-3">Product ID</th>
            <th className="p-3">Employee name</th>
          </tr>
        </thead>
        <tbody className="whitespace-nowrap">
          {items.map((it) => (
            <tr key={it._id} className="border-b">
              <td className="p-3">{it.transactionId ?? it.TransactionID ?? it.TransactionId ?? it.Transaction_ID ?? it._id}</td>
              <td className="p-3">{it.date ? dayjs(it.date).format('YYYY-MM-DD') : (it.Date || '-')}</td>
              <td className="p-3">{it.customer?.id ?? it['Customer ID'] ?? it.customerId ?? it.customerId}</td>
              <td className="p-3">{it.customer?.name ?? it['Customer Name'] ?? it.customerName}</td>
              <td className="p-3">{it.customer?.phone ?? it['Phone Number'] ?? it.phone}</td>
              <td className="p-3">{it.customer?.gender ?? it.Gender}</td>
              <td className="p-3">{it.customer?.age ?? it.Age}</td>
              <td className="p-3">{it.product?.category ?? it['Product Category'] ?? it.productCategory}</td>
              <td className="p-3">{it.sales?.quantity ?? it.Quantity}</td>
              <td className="p-3">₹{(it.sales?.totalAmount ?? it['Total Amount'] ?? it.Total_Amount ?? 0).toLocaleString()}</td>
              <td className="p-3">{it.customer?.region ?? it['Customer Region'] ?? it.CustomerRegion}</td>
              <td className="p-3">{it.product?.id ?? it['Product ID'] ?? it.ProductID}</td>
              <td className="p-3">{it.employee?.name ?? it['Employee name'] ?? it.salesperson.name}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
