import { useState, useEffect } from 'react';
import axios from 'axios';

export default function Customers() {
  const [customers, setCustomers] = useState([]);
  const [form, setForm] = useState({
    customerNumber: '', firstName: '', lastName: '', telephone: '', address: '',
  });
  const [message, setMessage] = useState('');

  const token = localStorage.getItem('token');
  const config = { headers: { Authorization: `Bearer ${token}` } };

  useEffect(() => {
    fetchCustomers();
  }, []);

  const fetchCustomers = async () => {
    try {
      const res = await axios.get('/api/customers', config);
      setCustomers(res.data);
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
      await axios.post('/api/customers', form, config);
      setMessage('Customer added successfully!');
      setForm({ customerNumber: '', firstName: '', lastName: '', telephone: '', address: '' });
      fetchCustomers();
    } catch (err) {
      setMessage(err.response?.data?.message || 'Error adding customer');
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Customer Management</h2>

      <div className="bg-white rounded-xl shadow-md p-6 mb-6">
        <h3 className="text-lg font-semibold text-gray-700 mb-4">Add New Customer</h3>
        {message && (
          <div className={`px-4 py-3 rounded mb-4 ${message.includes('success') ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
            {message}
          </div>
        )}
        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">Customer Number</label>
            <input type="text" name="customerNumber" value={form.customerNumber} onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500" required />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">First Name</label>
            <input type="text" name="firstName" value={form.firstName} onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500" required />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">Last Name</label>
            <input type="text" name="lastName" value={form.lastName} onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500" required />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">Telephone</label>
            <input type="text" name="telephone" value={form.telephone} onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500" required />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">Address</label>
            <input type="text" name="address" value={form.address} onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500" required />
          </div>
          <div className="flex items-end">
            <button type="submit" className="w-full bg-indigo-700 text-white py-2 rounded-lg hover:bg-indigo-800 transition font-semibold">
              Add Customer
            </button>
          </div>
        </form>
      </div>

      <div className="bg-white rounded-xl shadow-md p-6">
        <h3 className="text-lg font-semibold text-gray-700 mb-4">Customer List</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-gray-50 text-gray-600 text-sm">
                <th className="p-3 font-semibold">Customer #</th>
                <th className="p-3 font-semibold">First Name</th>
                <th className="p-3 font-semibold">Last Name</th>
                <th className="p-3 font-semibold">Telephone</th>
                <th className="p-3 font-semibold">Address</th>
              </tr>
            </thead>
            <tbody>
              {customers.length === 0 ? (
                <tr><td colSpan="5" className="p-3 text-center text-gray-500">No customers found</td></tr>
              ) : (
                customers.map((c) => (
                  <tr key={c._id} className="border-t border-gray-100 hover:bg-gray-50">
                    <td className="p-3">{c.customerNumber}</td>
                    <td className="p-3">{c.firstName}</td>
                    <td className="p-3">{c.lastName}</td>
                    <td className="p-3">{c.telephone}</td>
                    <td className="p-3">{c.address}</td>
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
