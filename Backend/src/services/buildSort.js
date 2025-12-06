function buildSort({ sortBy, sortOrder }) {
  const order = sortOrder === "asc" ? 1 : -1;

  switch (sortBy) {
    case "quantity":
      return { "sales.quantity": order, _id: 1 };
    case "customerName":
      return { "customer.name_lower": order, _id: 1 };
    case "date":
    default:
      return { date: order, _id: 1 };
  }
}

module.export = { buildSort };