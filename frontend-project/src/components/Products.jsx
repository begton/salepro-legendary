import { useState, useEffect } from 'react';
import axios from 'axios';

export default function Products() {
  const [products, setProducts] = useState([]);
  const [form, setForm] = useState({
    productCode: '', productName: '', quantitySold: '', unitPrice: '',
  });
  const [message, setMessage] = useState('');

  const token = localStorage.getItem('token');
  const config = { headers: { Authorization: `Bearer ${token}` } };

  useEffect(() => {
    fetchProducts();
  }, []);

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    try {
      await axios.post('/api/products', {
        ...form,
        quantitySold: Number(form.quantitySold),
        unitPrice: Number(form.unitPrice),
      }, config);
      setMessage('Product added successfully!');
      setForm({ productCode: '', productName: '', quantitySold: '', unitPrice: '' });
      fetchProducts();
    } catch (err) {
      setMessage(err.response?.data?.message || 'Error adding product');
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Product Management</h2>

      <div className="bg-white rounded-xl shadow-md p-6 mb-6">
        <h3 className="text-lg font-semibold text-gray-700 mb-4">Add New Product</h3>
        {message && (
          <div className={`px-4 py-3 rounded mb-4 ${message.includes('success') ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
            {message}
          </div>
        )}
        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">Product Code</label>
            <input type="text" name="productCode" value={form.productCode} onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500" required />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">Product Name</label>
            <input type="text" name="productName" value={form.productName} onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500" required />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">Quantity Sold</label>
            <input type="number" name="quantitySold" value={form.quantitySold} onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500" min="0" required />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">Unit Price</label>
            <input type="number" name="unitPrice" value={form.unitPrice} onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500" min="0" step="0.01" required />
          </div>
          <div className="flex items-end">
            <button type="submit" className="w-full bg-indigo-700 text-white py-2 rounded-lg hover:bg-indigo-800 transition font-semibold">
              Add Product
            </button>
          </div>
        </form>
      </div>

      <div className="bg-white rounded-xl shadow-md p-6">
        <h3 className="text-lg font-semibold text-gray-700 mb-4">Product List</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-gray-50 text-gray-600 text-sm">
                <th className="p-3 font-semibold">Product Code</th>
                <th className="p-3 font-semibold">Product Name</th>
                <th className="p-3 font-semibold">Quantity Sold</th>
                <th className="p-3 font-semibold">Unit Price</th>
                <th className="p-3 font-semibold">Total Value</th>
              </tr>
            </thead>
            <tbody>
              {products.length === 0 ? (
                <tr><td colSpan="5" className="p-3 text-center text-gray-500">No products found</td></tr>
              ) : (
                products.map((p) => (
                  <tr key={p._id} className="border-t border-gray-100 hover:bg-gray-50">
                    <td className="p-3">{p.productCode}</td>
                    <td className="p-3">{p.productName}</td>
                    <td className="p-3">{p.quantitySold}</td>
                    <td className="p-3">{Number(p.unitPrice).toFixed(2)} RWF</td>
                    <td className="p-3 font-medium">{(p.quantitySold * p.unitPrice).toFixed(2)} RWF</td>
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
