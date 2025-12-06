const stripNonDigits = (s) => (s ? String(s).replace(/\D+/g, "") : "");

const parseNumber = (v) => {
  if (v === null || v === undefined || v === "") return null;
  const n = Number(v);
  return Number.isNaN(n) ? null : n;
};

const parseDate = (v) => {
  if (!v) return null;
  const d = new Date(v);
  return isNaN(d.getTime()) ? null : d;
};

const splitTags = (s) =>
  !s
    ? []
    : String(s)
        .split(",")
        .map((t) => t.trim())
        .filter(Boolean);

function normalizeRow(row) {

  const transactionId = row["Transaction ID"]
    ? String(row["Transaction ID"]).trim()
    : undefined;

  const date = parseDate(row["Date"]);

  const customerId = row["Customer ID"]
    ? String(row["Customer ID"]).trim()
    : undefined;

  const customerName = row["Customer Name"]
    ? String(row["Customer Name"]).trim()
    : undefined;

  const phone = row["Phone Number"]
    ? String(row["Phone Number"]).trim()
    : undefined;

  const phone_normalized = stripNonDigits(phone);

  const gender = row["Gender"] ? String(row["Gender"]).trim() : undefined;

  const age = parseNumber(row["Age"]);

  const region = row["Customer Region"]
    ? String(row["Customer Region"]).trim()
    : undefined;

  const customerType = row["Customer Type"]
    ? String(row["Customer Type"]).trim()
    : undefined;

  const productId = row["Product ID"]
    ? String(row["Product ID"]).trim()
    : undefined;

  const productName = row["Product Name"]
    ? String(row["Product Name"]).trim()
    : undefined;

  const brand = row["Brand"] ? String(row["Brand"]).trim() : undefined;

  const category = row["Product Category"]
    ? String(row["Product Category"]).trim()
    : undefined;

  const tags = splitTags(row["Tags"]);

  const quantity = parseNumber(row["Quantity"]) || 0;

  const pricePerUnit = parseNumber(row["Price per Unit"]) || 0;

  const discountPercentage = parseNumber(row["Discount Percentage"]) || 0;

  const totalAmount =
    parseNumber(row["Total Amount"]) || pricePerUnit * quantity;

  const finalAmount =
    parseNumber(row["Final Amount"]) ||
    totalAmount - (totalAmount * (discountPercentage || 0)) / 100;


  const paymentMethod = row["Payment Method"]
    ? String(row["Payment Method"]).trim()
    : undefined;

  const orderStatus = row["Order Status"]
    ? String(row["Order Status"]).trim()
    : undefined;

  const deliveryType = row["Delivery Type"]
    ? String(row["Delivery Type"]).trim()
    : undefined;

  const storeId = row["Store ID"] ? String(row["Store ID"]).trim() : undefined;

  const storeLocation = row["Store Location"]
    ? String(row["Store Location"]).trim()
    : undefined;

  const salespersonId = row["Salesperson ID"]
    ? String(row["Salesperson ID"]).trim()
    : undefined;
    
  const salespersonName = row["Employee Name"]
    ? String(row["Employee Name"]).trim()
    : undefined;

  return {
    transactionId,
    date,
    customer: {
      id: customerId,
      name: customerName,
      name_lower: customerName ? customerName.toLowerCase() : undefined,
      phone,
      phone_normalized,
      gender,
      age,
      region,
      type: customerType,
    },
    product: {
      id: productId,
      name: productName,
      brand,
      category,
      tags,
    },
    sales: {
      quantity,
      pricePerUnit,
      discountPercentage,
      totalAmount,
      finalAmount,
    },
    paymentMethod,
    orderStatus,
    deliveryType,
    store: {
      id: storeId,
      location: storeLocation,
    },
    salesperson: {
      id: salespersonId,
      name: salespersonName,
    },
  };
}

module.exports = { normalizeRow };
