const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const TransactionSchema = new Schema(
  {
    transactionId: { type: String, index: true },
    date: { type: Date, index: true },

    customer: {
      id: { type: String, index: true },
      name: { type: String },
      name_lower: { type: String, index: true },
      phone: { type: String },
      phone_normalized: { type: String },
      gender: { type: String, index: true },
      age: { type: Number, index: true },
      region: { type: String, index: true },
      type: { type: String },
    },

    product: {
      id: { type: String, index: true },
      name: { type: String },
      brand: { type: String },
      category: { type: String, index: true },
      tags: [{ type: String, index: true }],
    },

    sales: {
      quantity: { type: Number, index: true },
      pricePerUnit: { type: Number },
      discountPercentage: { type: Number },
      totalAmount: { type: Number },
      finalAmount: { type: Number },
    },

    paymentMethod: { type: String, index: true },
    orderStatus: { type: String, index: true },
    deliveryType: { type: String },
    store: {
      id: { type: String },
      location: { type: String, index: true },
    },

    salesperson: {
      id: { type: String },
      name: { type: String, index: true },
    },
  },
  { timestamps: true }
);

TransactionSchema.index(
  { "customer.name": "text", "customer.phone_normalized": "text" },
  {
    weights: { "customer.name": 5, "customer.phone_normalized": 2 },
    name: "CustomerTextIdx",
  }
);

module.exports = mongoose.model("Transaction", TransactionSchema);
