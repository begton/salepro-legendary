const express = require('express');
const Sale = require('../models/Sale');
const Customer = require('../models/Customer');
const Product = require('../models/Product');
const { protect } = require('../middleware/auth');
const router = express.Router();

router.get('/daily', protect, async (req, res) => {
  try {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    const sales = await Sale.find({
      salesDate: { $gte: today, $lt: tomorrow },
    }).sort({ salesDate: -1 });

    const totalAmount = sales.reduce((sum, s) => sum + s.totalAmountPaid, 0);
    res.json({ sales, totalAmount, count: sales.length });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get('/weekly', protect, async (req, res) => {
  try {
    const today = new Date();
    const weekStart = new Date(today);
    weekStart.setDate(today.getDate() - today.getDay());
    weekStart.setHours(0, 0, 0, 0);
    const weekEnd = new Date(weekStart);
    weekEnd.setDate(weekStart.getDate() + 7);

    const sales = await Sale.find({
      salesDate: { $gte: weekStart, $lt: weekEnd },
    }).sort({ salesDate: -1 });

    const totalAmount = sales.reduce((sum, s) => sum + s.totalAmountPaid, 0);
    res.json({ sales, totalAmount, count: sales.length });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get('/monthly', protect, async (req, res) => {
  try {
    const today = new Date();
    const monthStart = new Date(today.getFullYear(), today.getMonth(), 1);
    const monthEnd = new Date(today.getFullYear(), today.getMonth() + 1, 0, 23, 59, 59, 999);

    const sales = await Sale.find({
      salesDate: { $gte: monthStart, $lt: monthEnd },
    }).sort({ salesDate: -1 });

    const totalAmount = sales.reduce((sum, s) => sum + s.totalAmountPaid, 0);
    res.json({ sales, totalAmount, count: sales.length });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get('/customers', protect, async (req, res) => {
  try {
    const customers = await Customer.find().sort({ createdAt: -1 });
    res.json({ customers, count: customers.length });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get('/products', protect, async (req, res) => {
  try {
    const products = await Product.find().sort({ createdAt: -1 });
    res.json({ products, count: products.length });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
