require('dotenv').config();
const mongoose = require('mongoose');
const User = require('./models/User');
const Customer = require('./models/Customer');
const Product = require('./models/Product');
const Sale = require('./models/Sale');
const connectDB = require('./config/db');

const seedDatabase = async () => {
  await connectDB();

  const userExists = await User.findOne({ username: 'admin' });
  if (!userExists) {
    await User.create({ username: 'admin', password: 'admin123' });
    console.log('Default user created: admin / admin123');
  } else {
    console.log('Default user already exists');
  }

  const customerCount = await Customer.countDocuments();
  if (customerCount === 0) {
    await Customer.insertMany([
      { customerNumber: 'C001', firstName: 'Jean', lastName: 'Pierre', telephone: '0788123456', address: 'Kigali, Rwanda' },
      { customerNumber: 'C002', firstName: 'Alice', lastName: 'Mukamana', telephone: '0788234567', address: 'Huye, Rwanda' },
      { customerNumber: 'C003', firstName: 'David', lastName: 'Habimana', telephone: '0788345678', address: 'Musanze, Rwanda' },
      { customerNumber: 'C004', firstName: 'Grace', lastName: 'Uwimana', telephone: '0788456789', address: 'Rubavu, Rwanda' },
      { customerNumber: 'C005', firstName: 'Peter', lastName: 'Niyonzima', telephone: '0788567890', address: 'Nyagatare, Rwanda' },
    ]);
    console.log('Sample customers created');
  } else {
    console.log('Customers already exist');
  }

  const productCount = await Product.countDocuments();
  if (productCount === 0) {
    await Product.insertMany([
      { productCode: 'P001', productName: 'Laptop Dell Inspiron', quantitySold: 15, unitPrice: 850000 },
      { productCode: 'P002', productName: 'HP Printer LaserJet', quantitySold: 10, unitPrice: 250000 },
      { productCode: 'P003', productName: 'Samsung Monitor 24"', quantitySold: 20, unitPrice: 180000 },
      { productCode: 'P004', productName: 'Logitech Keyboard', quantitySold: 30, unitPrice: 35000 },
      { productCode: 'P005', productName: 'Wireless Mouse', quantitySold: 25, unitPrice: 15000 },
    ]);
    console.log('Sample products created');
  } else {
    console.log('Products already exist');
  }

  const saleCount = await Sale.countDocuments();
  if (saleCount === 0) {
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);
    const lastWeek = new Date(today);
    lastWeek.setDate(lastWeek.getDate() - 5);
    const lastMonth = new Date(today);
    lastMonth.setMonth(lastMonth.getMonth() - 1);

    await Sale.insertMany([
      { invoiceNumber: 'INV-001', salesDate: today, paymentMethod: 'Cash', totalAmountPaid: 850000, customerNumber: 'C001', productCode: 'P001' },
      { invoiceNumber: 'INV-002', salesDate: today, paymentMethod: 'Mobile Money', totalAmountPaid: 250000, customerNumber: 'C002', productCode: 'P002' },
      { invoiceNumber: 'INV-003', salesDate: yesterday, paymentMethod: 'Card', totalAmountPaid: 360000, customerNumber: 'C003', productCode: 'P003' },
      { invoiceNumber: 'INV-004', salesDate: yesterday, paymentMethod: 'Bank Transfer', totalAmountPaid: 70000, customerNumber: 'C004', productCode: 'P004' },
      { invoiceNumber: 'INV-005', salesDate: lastWeek, paymentMethod: 'Cash', totalAmountPaid: 15000, customerNumber: 'C005', productCode: 'P005' },
      { invoiceNumber: 'INV-006', salesDate: lastWeek, paymentMethod: 'Mobile Money', totalAmountPaid: 850000, customerNumber: 'C001', productCode: 'P001' },
      { invoiceNumber: 'INV-007', salesDate: lastMonth, paymentMethod: 'Card', totalAmountPaid: 250000, customerNumber: 'C002', productCode: 'P002' },
      { invoiceNumber: 'INV-008', salesDate: lastMonth, paymentMethod: 'Cash', totalAmountPaid: 180000, customerNumber: 'C003', productCode: 'P003' },
    ]);
    console.log('Sample sales created');
  } else {
    console.log('Sales already exist');
  }

  console.log('Database seeded successfully!');
  process.exit(0);
};

seedDatabase().catch((err) => {
  console.error(err);
  process.exit(1);
});
