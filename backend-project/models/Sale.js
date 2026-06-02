const mongoose = require('mongoose');

const saleSchema = new mongoose.Schema({
  invoiceNumber: {
    type: String,
    required: true,
    unique: true,
  },
  salesDate: {
    type: Date,
    required: true,
    default: Date.now,
  },
  paymentMethod: {
    type: String,
    required: true,
    enum: ['Cash', 'Card', 'Mobile Money', 'Bank Transfer'],
  },
  totalAmountPaid: {
    type: Number,
    required: true,
    min: 0,
  },
  customerNumber: {
    type: String,
    required: true,
  },
  productCode: {
    type: String,
    required: true,
  },
}, { timestamps: true });

module.exports = mongoose.model('Sale', saleSchema);
