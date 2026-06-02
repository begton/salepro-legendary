import { useState, useEffect } from 'react';
import axios from 'axios';

export default function Sales() {
  const [sales, setSales] = useState([]);
  const [customers, setCustomers] = useState([]);
  const [products, setProducts] = useState([]);
  const [form, setForm] = useState({
    invoiceNumber: '', salesDate: '', paymentMethod: 'Cash',
    totalAmountPaid: '', customerNumber: '', productCode: '',
  });
  const [editingId, setEditingId] = useState(null);
  const [message, setMessage] = useState('');

  const token = localStorage.getItem('token');
  const config = { headers: { Authorization: `Bearer ${token}` } };

  useEffect(() => {
    fetchSales();
    fetchCustomers();
    fetchProducts();
  }, []);

  const fetchSales = async () => {
    try {
      const res = await axios.get('/api/sales', config);
      setSales(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const fetchCustomers = async () => {
    try {
      const res = await axios.get('/api/customers', config);
      setCustomers(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const fetchProducts = async () => {
    try {
      const res = await axios.get('/api/products', config);
      setProducts(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const resetForm = () => {
    setForm({
      invoiceNumber: '', salesDate: '', paymentMethod: 'Cash',
      totalAmountPaid: '', customerNumber: '', productCode: '',
    });
    setEditingId(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    try {
      const data = {
        ...form,
        totalAmountPaid: Number(form.totalAmountPaid),
        salesDate: form.salesDate || new Date().toISOString(),
      };
      if (editingId) {
        await axios.put(`/api/sales/${editingId}`, data, config);
        setMessage('Sale updated successfully!');
      } else {
        await axios.post('/api/sales', data, config);
        setMessage('Sale added successfully!');
      }
      resetForm();
      fetchSales();
    } catch (err) {
      setMessage(err.response?.data?.message || 'Error saving sale');
    }
  };

  const handleEdit = (sale) => {
    setForm({
      invoiceNumber: sale.invoiceNumber,
      salesDate: sale.salesDate ? sale.salesDate.split('T')[0] : '',
      paymentMethod: sale.paymentMethod,
      totalAmountPaid: sale.totalAmountPaid,
      customerNumber: sale.customerNumber,
      productCode: sale.productCode,
    });
    setEditingId(sale._id);
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this sale?')) return;
    try {
      await axios.delete(`/api/sales/${id}`, config);
      setMessage('Sale deleted successfully!');
      fetchSales();
    } catch (err) {
      setMessage('Error deleting sale');
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Sales Management</h2>

      <div className="bg-white rounded-xl shadow-md p-6 mb-6">
        <h3 className="text-lg font-semibold text-gray-700 mb-4">
          {editingId ? 'Edit Sale' : 'Add New Sale'}
        </h3>
        {message && (
          <div className={`px-4 py-3 rounded mb-4 ${message.includes('success') ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
            {message}
          </div>
        )}
        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">Invoice Number</label>
            <input type="text" name="invoiceNumber" value={form.invoiceNumber} onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500" required />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">Sales Date</label>
            <input type="date" name="salesDate" value={form.salesDate} onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500" required />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">Payment Method</label>
            <select name="paymentMethod" value={form.paymentMethod} onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500">
              <option value="Cash">Cash</option>
              <option value="Card">Card</option>
              <option value="Mobile Money">Mobile Money</option>
              <option value="Bank Transfer">Bank Transfer</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">Total Amount Paid</label>
            <input type="number" name="totalAmountPaid" value={form.totalAmountPaid} onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500" min="0" step="0.01" required />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">Customer Number</label>
            <select name="customerNumber" value={form.customerNumber} onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500" required>
              <option value="">Select Customer</option>
              {customers.map((c) => (
                <option key={c._id} value={c.customerNumber}>{c.customerNumber} - {c.firstName} {c.lastName}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">Product Code</label>
            <select name="productCode" value={form.productCode} onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500" required>
              <option value="">Select Product</option>
              {products.map((p) => (
                <option key={p._id} value={p.productCode}>{p.productCode} - {p.productName}</option>
              ))}
            </select>
          </div>
          <div className="flex items-end space-x-2">
            <button type="submit" className="w-full bg-indigo-700 text-white py-2 rounded-lg hover:bg-indigo-800 transition font-semibold">
              {editingId ? 'Update Sale' : 'Add Sale'}
            </button>
            {editingId && (
              <button type="button" onClick={resetForm}
                className="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 transition font-semibold">
                Cancel
              </button>
            )}
          </div>
        </form>
      </div>

      <div className="bg-white rounded-xl shadow-md p-6">
        <h3 className="text-lg font-semibold text-gray-700 mb-4">Sales List</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-gray-50 text-gray-600 text-sm">
                <th className="p-3 font-semibold">Invoice #</th>
                <th className="p-3 font-semibold">Date</th>
                <th className="p-3 font-semibold">Customer</th>
                <th className="p-3 font-semibold">Product</th>
                <th className="p-3 font-semibold">Payment</th>
                <th className="p-3 font-semibold">Amount</th>
                <th className="p-3 font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody>
              {sales.length === 0 ? (
                <tr><td colSpan="7" className="p-3 text-center text-gray-500">No sales found</td></tr>
              ) : (
                sales.map((s) => (
                  <tr key={s._id} className="border-t border-gray-100 hover:bg-gray-50">
                    <td className="p-3">{s.invoiceNumber}</td>
                    <td className="p-3">{new Date(s.salesDate).toLocaleDateString()}</td>
                    <td className="p-3">{s.customerNumber}</td>
                    <td className="p-3">{s.productCode}</td>
                    <td className="p-3">{s.paymentMethod}</td>
                    <td className="p-3 font-medium">{Number(s.totalAmountPaid).toFixed(2)} RWF</td>
                    <td className="p-3">
                      <button onClick={() => handleEdit(s)}
                        className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700 text-sm mr-2">
                        Edit
                      </button>
                      <button onClick={() => handleDelete(s._id)}
                        className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700 text-sm">
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
