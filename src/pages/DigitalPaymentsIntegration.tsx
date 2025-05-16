import { useState } from 'react';
import { Bell, ChevronDown, ChevronRight, HelpCircle, Search, Plus, RefreshCw, Download, Filter, Eye } from 'lucide-react';

const DigitalPaymentsIntegration = () => {
  const [activeTab, setActiveTab] = useState('razorpay');
  const [dateRange, setDateRange] = useState('today');
  const [statusFilter, setStatusFilter] = useState('all');
  
  // Mock data for transactions
  const transactions = [
    {
      id: 'W-RZP98765432',
      customer: 'Rahul Sharma',
      amount: 12500,
      channel: 'Web',
      date: '16 May 2025, 10:32 AM',
      status: 'success',
      lmsStatus: 'posted'
    },
    {
      id: 'M-RZP98765431',
      customer: 'Priya Patel',
      amount: 5200,
      channel: 'Mobile',
      date: '16 May 2025, 09:45 AM',
      status: 'success',
      lmsStatus: 'posted'
    },
    {
      id: 'Q-RZP98765430',
      customer: 'Vikram Singh',
      amount: 8750,
      channel: 'QR',
      date: '16 May 2025, 09:12 AM',
      status: 'success',
      lmsStatus: 'posted'
    },
    {
      id: 'B-RZP98765429',
      customer: 'Neha Gupta',
      amount: 15000,
      channel: 'BBPS',
      date: '16 May 2025, 08:55 AM',
      status: 'pending',
      lmsStatus: 'queued'
    },
    {
      id: 'W-RZP98765428',
      customer: 'Amit Kumar',
      amount: 6800,
      channel: 'Web',
      date: '16 May 2025, 08:32 AM',
      status: 'failed',
      lmsStatus: 'n/a'
    }
  ];

  // Filter transactions based on selected filters
  const filteredTransactions = transactions.filter(transaction => {
    if (statusFilter !== 'all' && transaction.status !== statusFilter) {
      return false;
    }
    return true;
  });

  // Format currency
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(amount);
  };

  // Calculate statistics
  const stats = {
    totalTransactions: transactions.length,
    transactionAmount: transactions.reduce((sum, t) => sum + t.amount, 0),
    successRate: (transactions.filter(t => t.status === 'success').length / transactions.length * 100).toFixed(1),
    failedTransactions: transactions.filter(t => t.status === 'failed').length
  };
  
  return (
    <div>
      {/* Page Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="px-6 py-4">
          <h1 className="text-2xl font-bold text-gray-900">Digital Payments Integration</h1>
          <p className="text-gray-600">Monitor and manage payment transactions across digital channels</p>
        </div>
        
        {/* Breadcrumb */}
        <div className="px-6 py-2 bg-gray-50 border-t border-b border-gray-200">
          <div className="flex items-center text-sm text-gray-600">
            <a href="#" className="hover:text-blue-900">Dashboard</a>
            <ChevronRight size={16} className="mx-2" />
            <a href="#" className="hover:text-blue-900">Payments</a>
            <ChevronRight size={16} className="mx-2" />
            <span className="text-gray-800 font-medium">Digital Payments</span>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="p-6">
        {/* Tabs */}
        <div className="bg-white rounded-lg shadow overflow-hidden mb-6">
          <div className="flex border-b">
            <button 
              className={`px-6 py-4 text-sm font-medium ${activeTab === 'razorpay' ? 'text-blue-800 border-b-2 border-blue-800' : 'text-gray-600'}`}
              onClick={() => setActiveTab('razorpay')}
            >
              RazorPay
            </button>
            <button 
              className={`px-6 py-4 text-sm font-medium ${activeTab === 'qr' ? 'text-blue-800 border-b-2 border-blue-800' : 'text-gray-600'}`}
              onClick={() => setActiveTab('qr')}
            >
              QR Payments
            </button>
            <button 
              className={`px-6 py-4 text-sm font-medium ${activeTab === 'bbps' ? 'text-blue-800 border-b-2 border-blue-800' : 'text-gray-600'}`}
              onClick={() => setActiveTab('bbps')}
            >
              BBPS
            </button>
            <button 
              className={`px-6 py-4 text-sm font-medium ${activeTab === 'reconciliation' ? 'text-blue-800 border-b-2 border-blue-800' : 'text-gray-600'}`}
              onClick={() => setActiveTab('reconciliation')}
            >
              Reconciliation
            </button>
          </div>

          {/* Filter and Search */}
          <div className="p-4 flex flex-wrap justify-between items-center border-b">
            <div className="flex items-center space-x-4">
              <div className="relative">
                <select 
                  className="appearance-none bg-gray-100 border border-gray-200 rounded-md py-2 pl-3 pr-10 text-sm leading-5 text-gray-900 focus:outline-none focus:ring-1 focus:ring-blue-800 focus:border-blue-800"
                  value={dateRange}
                  onChange={(e) => setDateRange(e.target.value)}
                >
                  <option value="today">Today</option>
                  <option value="yesterday">Yesterday</option>
                  <option value="this_week">This Week</option>
                  <option value="last_week">Last Week</option>
                  <option value="custom">Custom Range</option>
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                  <ChevronDown size={16} className="text-gray-400" />
                </div>
              </div>
              <div className="relative">
                <select 
                  className="appearance-none bg-gray-100 border border-gray-200 rounded-md py-2 pl-3 pr-10 text-sm leading-5 text-gray-900 focus:outline-none focus:ring-1 focus:ring-blue-800 focus:border-blue-800"
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                >
                  <option value="all">All Status</option>
                  <option value="success">Success</option>
                  <option value="failed">Failed</option>
                  <option value="pending">Pending</option>
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                  <ChevronDown size={16} className="text-gray-400" />
                </div>
              </div>
              <button className="inline-flex items-center px-3 py-2 border border-gray-300 text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-1 focus:ring-blue-800 focus:border-blue-800">
                <Filter size={16} className="mr-2" />
                More Filters
              </button>
            </div>
            <div className="flex items-center space-x-4 mt-4 sm:mt-0">
              <div className="relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Search size={16} className="text-gray-400" />
                </div>
                <input
                  type="text"
                  placeholder="Search by name or ID"
                  className="focus:ring-blue-800 focus:border-blue-800 block w-full pl-10 pr-4 py-2 sm:text-sm border-gray-300 rounded-md"
                />
              </div>
              <button className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-blue-800 hover:bg-blue-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-800">
                <RefreshCw size={16} className="mr-2" />
                Refresh
              </button>
              <button className="inline-flex items-center px-3 py-2 border border-gray-300 text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-1 focus:ring-blue-800 focus:border-blue-800">
                <Download size={16} className="mr-2" />
                Export
              </button>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 p-4">
            <div className="bg-white p-4 rounded-lg border border-gray-200">
              <div className="text-sm font-medium text-gray-500 mb-1">Total Transactions</div>
              <div className="text-2xl font-bold text-gray-900">{stats.totalTransactions}</div>
              <div className="text-xs text-green-600 mt-1 flex items-center">
                <svg className="w-3 h-3 mr-1" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M6 2.5V9.5M6 2.5L2.5 6M6 2.5L9.5 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                <span>12.5% from yesterday</span>
              </div>
            </div>
            <div className="bg-white p-4 rounded-lg border border-gray-200">
              <div className="text-sm font-medium text-gray-500 mb-1">Transaction Amount</div>
              <div className="text-2xl font-bold text-gray-900">{formatCurrency(stats.transactionAmount)}</div>
              <div className="text-xs text-green-600 mt-1 flex items-center">
                <svg className="w-3 h-3 mr-1" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M6 2.5V9.5M6 2.5L2.5 6M6 2.5L9.5 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                <span>8.3% from yesterday</span>
              </div>
            </div>
            <div className="bg-white p-4 rounded-lg border border-gray-200">
              <div className="text-sm font-medium text-gray-500 mb-1">Success Rate</div>
              <div className="text-2xl font-bold text-gray-900">{stats.successRate}%</div>
              <div className="text-xs text-green-600 mt-1 flex items-center">
                <svg className="w-3 h-3 mr-1" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M6 2.5V9.5M6 2.5L2.5 6M6 2.5L9.5 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                <span>1.2% from yesterday</span>
              </div>
            </div>
            <div className="bg-white p-4 rounded-lg border border-gray-200">
              <div className="text-sm font-medium text-gray-500 mb-1">Failed Transactions</div>
              <div className="text-2xl font-bold text-gray-900">{stats.failedTransactions}</div>
              <div className="text-xs text-red-600 mt-1 flex items-center">
                <svg className="w-3 h-3 mr-1 transform rotate-180" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M6 2.5V9.5M6 2.5L2.5 6M6 2.5L9.5 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                <span>3.2% from yesterday</span>
              </div>
            </div>
          </div>

          {/* Transactions Table */}
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Transaction ID
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Customer
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Amount
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Channel
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Date & Time
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    LMS Status
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredTransactions.map((transaction) => (
                  <tr key={transaction.id}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-blue-800">{transaction.id}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{transaction.customer}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{formatCurrency(transaction.amount)}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                        ${transaction.channel === 'Web' ? 'bg-blue-100 text-blue-800' : ''}
                        ${transaction.channel === 'Mobile' ? 'bg-purple-100 text-purple-800' : ''}
                        ${transaction.channel === 'QR' ? 'bg-yellow-100 text-yellow-800' : ''}
                        ${transaction.channel === 'BBPS' ? 'bg-green-100 text-green-800' : ''}
                      `}>
                        {transaction.channel}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{transaction.date}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                        ${transaction.status === 'success' ? 'bg-green-100 text-green-800' : ''}
                        ${transaction.status === 'pending' ? 'bg-yellow-100 text-yellow-800' : ''}
                        ${transaction.status === 'failed' ? 'bg-red-100 text-red-800' : ''}
                      `}>
                        {transaction.status.charAt(0).toUpperCase() + transaction.status.slice(1)}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                        ${transaction.lmsStatus === 'posted' ? 'bg-green-100 text-green-800' : ''}
                        ${transaction.lmsStatus === 'queued' ? 'bg-yellow-100 text-yellow-800' : ''}
                        ${transaction.lmsStatus === 'n/a' ? 'bg-gray-100 text-gray-800' : ''}
                      `}>
                        {transaction.lmsStatus === 'n/a' ? 'N/A' : transaction.lmsStatus.charAt(0).toUpperCase() + transaction.lmsStatus.slice(1)}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      <button className="text-blue-800 hover:text-blue-900">
                        <Eye size={16} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6">
            <div className="flex-1 flex justify-between sm:hidden">
              <a href="#" className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">
                Previous
              </a>
              <a href="#" className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">
                Next
              </a>
            </div>
            <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
              <div>
                <p className="text-sm text-gray-700">
                  Showing <span className="font-medium">1</span> to <span className="font-medium">{filteredTransactions.length}</span> of <span className="font-medium">{filteredTransactions.length}</span> results
                </p>
              </div>
              <div>
                <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
                  <a href="#" className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
                    <span className="sr-only">Previous</span>
                    <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                      <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </a>
                  <a href="#" aria-current="page" className="z-10 bg-blue-800 border-blue-800 text-white relative inline-flex items-center px-4 py-2 border text-sm font-medium">
                    1
                  </a>
                  <span className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700">
                    ...
                  </span>
                  <a href="#" className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
                    <span className="sr-only">Next</span>
                    <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                      <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                    </svg>
                  </a>
                </nav>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DigitalPaymentsIntegration;