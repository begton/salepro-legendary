import { useState } from 'react';
import axios from 'axios';

export default function Reports() {
  const [activeTab, setActiveTab] = useState('daily');
  const [reportData, setReportData] = useState(null);
  const [loading, setLoading] = useState(false);

  const token = localStorage.getItem('token');
  const config = { headers: { Authorization: `Bearer ${token}` } };

  const fetchReport = async (type) => {
    setLoading(true);
    setActiveTab(type);
    try {
      let endpoint = '';
      switch (type) {
        case 'daily': endpoint = '/api/reports/daily'; break;
        case 'weekly': endpoint = '/api/reports/weekly'; break;
        case 'monthly': endpoint = '/api/reports/monthly'; break;
        case 'customers': endpoint = '/api/reports/customers'; break;
        case 'products': endpoint = '/api/reports/products'; break;
        default: endpoint = '/api/reports/daily';
      }
      const res = await axios.get(endpoint, config);
      setReportData(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const tabs = [
    { key: 'daily', label: 'Daily Sales' },
    { key: 'weekly', label: 'Weekly Sales' },
    { key: 'monthly', label: 'Monthly Sales' },
    { key: 'customers', label: 'Customers Report' },
    { key: 'products', label: 'Products Report' },
  ];

  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Reports</h2>

      <div className="mb-6 flex flex-wrap gap-2">
        {tabs.map((tab) => (
          <button
            key={tab.key}
            onClick={() => fetchReport(tab.key)}
            className={`px-5 py-2 rounded-lg font-medium transition duration-200 ${
              activeTab === tab.key
                ? 'bg-indigo-700 text-white shadow-md'
                : 'bg-white text-gray-600 hover:bg-indigo-100 border border-gray-200'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {loading && (
        <div className="text-center py-10 text-gray-500 text-lg">Loading report...</div>
      )}

      {!loading && !reportData && (
        <div className="bg-white rounded-xl shadow-md p-10 text-center text-gray-400">
          Click a report button above to generate data
        </div>
      )}

      {!loading && reportData && (
        <div className="bg-white rounded-xl shadow-md p-6">
          {(activeTab === 'daily' || activeTab === 'weekly' || activeTab === 'monthly') && (
            <>
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold text-gray-700 capitalize">{activeTab} Sales Report</h3>
                <div className="text-right">
                  <p className="text-sm text-gray-500">Total Sales</p>
                  <p className="text-2xl font-bold text-indigo-700">
                    {Number(reportData.totalAmount || 0).toFixed(2)} RWF
                  </p>
                  <p className="text-sm text-gray-500">{reportData.count || 0} transactions</p>
                </div>
              </div>
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
                    </tr>
                  </thead>
                  <tbody>
                    {reportData.sales && reportData.sales.length === 0 ? (
                      <tr><td colSpan="6" className="p-3 text-center text-gray-500">No sales found</td></tr>
                    ) : (
                      reportData.sales?.map((s) => (
                        <tr key={s._id} className="border-t border-gray-100 hover:bg-gray-50">
                          <td className="p-3">{s.invoiceNumber}</td>
                          <td className="p-3">{new Date(s.salesDate).toLocaleDateString()}</td>
                          <td className="p-3">{s.customerNumber}</td>
                          <td className="p-3">{s.productCode}</td>
                          <td className="p-3">{s.paymentMethod}</td>
                          <td className="p-3 font-medium">{Number(s.totalAmountPaid).toFixed(2)} RWF</td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </>
          )}

          {activeTab === 'customers' && (
            <>
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold text-gray-700">Customers Report</h3>
                <p className="text-lg font-bold text-indigo-700">{reportData.count || 0} Customers</p>
              </div>
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
                    {reportData.customers?.length === 0 ? (
                      <tr><td colSpan="5" className="p-3 text-center text-gray-500">No customers found</td></tr>
                    ) : (
                      reportData.customers?.map((c) => (
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
            </>
          )}

          {activeTab === 'products' && (
            <>
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold text-gray-700">Products Report</h3>
                <p className="text-lg font-bold text-indigo-700">{reportData.count || 0} Products</p>
              </div>
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
                    {reportData.products?.length === 0 ? (
                      <tr><td colSpan="5" className="p-3 text-center text-gray-500">No products found</td></tr>
                    ) : (
                      reportData.products?.map((p) => (
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
            </>
          )}
        </div>
      )}
    </div>
  );
}
