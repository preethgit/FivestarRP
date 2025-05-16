import { useState } from 'react';
import { 
  AlertTriangle, 
  Check, 
  X, 
  Clock, 
  RefreshCw, 
  Filter,
  Search,
  ChevronDown,
  ChevronRight,
  ChevronLeft,
  Play,
  MoreHorizontal,
  Info,
  CheckCircle,
  XCircle,
  AlertCircle,
  Upload,
  Eye
} from 'lucide-react';

const TransactionQueueManager = () => {
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterType, setFilterType] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTransaction, setSelectedTransaction] = useState(null);
  
  // Mock data
  const lmsStatus = {
    status: 'degraded', // 'online', 'degraded', 'offline'
    lastChecked: new Date(),
    responseTime: 1250, // ms
    message: 'LMS experiencing intermittent connectivity issues',
    downtime: {
      start: new Date(new Date().getTime() - 45 * 60000), // 45 minutes ago
      duration: '45 minutes'
    }
  };
  
  const queueSummary = {
    total: 78,
    pending: 32,
    retrying: 15,
    failed: 8,
    completed: 23,
    oldestTransaction: new Date(new Date().getTime() - 60 * 60000) // 1 hour ago
  };
  
  const queuedTransactions = [
    {
      id: 'TXN-123456',
      customerId: 'CUST-78901',
      customerName: 'Rajesh Kumar',
      loanNumber: 'LAP10012345',
      amount: 5680,
      type: 'receipt',
      source: 'field-collection',
      status: 'pending',
      createdAt: new Date(new Date().getTime() - 25 * 60000), // 25 minutes ago
      retryCount: 0,
      nextRetryAt: new Date(new Date().getTime() + 5 * 60000), // 5 minutes from now
      error: null
    },
    {
      id: 'TXN-123457',
      customerId: 'CUST-78902',
      customerName: 'Priya Sharma',
      loanNumber: 'LAP10012346',
      amount: 3980,
      type: 'receipt',
      source: 'razorpay',
      status: 'retrying',
      createdAt: new Date(new Date().getTime() - 55 * 60000), // 55 minutes ago
      retryCount: 2,
      nextRetryAt: new Date(new Date().getTime() + 15 * 60000), // 15 minutes from now
      error: 'Network timeout while connecting to LMS'
    },
    {
      id: 'TXN-123458',
      customerId: 'CUST-78903',
      customerName: 'Amit Singh',
      loanNumber: 'LAP10012347',
      amount: 7250,
      type: 'mandate-update',
      source: 'nach',
      status: 'failed',
      createdAt: new Date(new Date().getTime() - 120 * 60000), // 2 hours ago
      retryCount: 6,
      nextRetryAt: null,
      error: 'Maximum retry attempts reached'
    },
    {
      id: 'TXN-123459',
      customerId: 'CUST-78904',
      customerName: 'Neha Gupta',
      loanNumber: 'LAP10012348',
      amount: 4500,
      type: 'receipt',
      source: 'qr-payment',
      status: 'completed',
      createdAt: new Date(new Date().getTime() - 18 * 60000), // 18 minutes ago
      retryCount: 1,
      completedAt: new Date(new Date().getTime() - 3 * 60000), // 3 minutes ago
      error: null
    },
    {
      id: 'TXN-123460',
      customerId: 'CUST-78905',
      customerName: 'Suresh Patel',
      loanNumber: 'LAP10012349',
      amount: 6200,
      type: 'receipt',
      source: 'bbps',
      status: 'pending',
      createdAt: new Date(new Date().getTime() - 10 * 60000), // 10 minutes ago
      retryCount: 0,
      nextRetryAt: new Date(new Date().getTime() + 20 * 60000), // 20 minutes from now
      error: null
    }
  ];
  
  // Filter transactions based on selected filters and search query
  const filteredTransactions = queuedTransactions.filter(transaction => {
    const matchesStatus = filterStatus === 'all' || transaction.status === filterStatus;
    const matchesType = filterType === 'all' || transaction.type === filterType;
    const matchesSearch = 
      searchQuery === '' || 
      transaction.customerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      transaction.loanNumber.includes(searchQuery) ||
      transaction.id.includes(searchQuery);
    
    return matchesStatus && matchesType && matchesSearch;
  });

  // Format currency
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(amount);
  };
  
  // Format time
  const formatTime = (date) => {
    return new Date(date).toLocaleTimeString('en-IN', { 
      hour: '2-digit', 
      minute: '2-digit'
    });
  };
  
  // Calculate time ago
  const timeAgo = (date) => {
    const seconds = Math.floor((new Date() - new Date(date)) / 1000);
    
    let interval = Math.floor(seconds / 86400);
    if (interval >= 1) return `${interval} day${interval === 1 ? '' : 's'} ago`;
    
    interval = Math.floor(seconds / 3600);
    if (interval >= 1) return `${interval} hour${interval === 1 ? '' : 's'} ago`;
    
    interval = Math.floor(seconds / 60);
    if (interval >= 1) return `${interval} minute${interval === 1 ? '' : 's'} ago`;
    
    return 'Just now';
  };
  
  // Handle manual push
  const handleManualPush = (transaction) => {
    console.log('Manually pushing transaction:', transaction.id);
    // In a real app, this would trigger an API call
  };
  
  // Handle transaction retry
  const handleRetry = (transaction) => {
    console.log('Retrying transaction:', transaction.id);
    // In a real app, this would trigger an API call
  };

  return (
    <div>
      {/* Page Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="px-6 py-4">
          <h1 className="text-2xl font-bold text-gray-900">Transaction Queue Manager</h1>
          <p className="text-gray-600">Monitor and manage transactions during LMS downtime</p>
        </div>
        
        {/* Breadcrumb */}
        <div className="px-6 py-2 bg-gray-50 border-t border-b border-gray-200">
          <div className="flex items-center text-sm text-gray-600">
            <a href="#" className="hover:text-blue-900">Dashboard</a>
            <ChevronRight size={16} className="mx-2" />
            <a href="#" className="hover:text-blue-900">System</a>
            <ChevronRight size={16} className="mx-2" />
            <span className="text-gray-800 font-medium">Transaction Queue</span>
          </div>
        </div>
      </div>
      
      {/* Main content */}
      <div className="p-6">
        {/* Summary cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mb-6">
          <div className="bg-white rounded-lg shadow-sm p-4">
            <div className="flex justify-between items-center mb-2">
              <h3 className="text-gray-600">Total Transactions</h3>
              <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
                <Info size={16} className="text-blue-900" />
              </div>
            </div>
            <p className="text-2xl font-bold">{queueSummary.total}</p>
          </div>
          
          <div className="bg-white rounded-lg shadow-sm p-4">
            <div className="flex justify-between items-center mb-2">
              <h3 className="text-gray-600">Pending</h3>
              <div className="w-8 h-8 rounded-full bg-yellow-100 flex items-center justify-center">
                <Clock size={16} className="text-yellow-600" />
              </div>
            </div>
            <p className="text-2xl font-bold">{queueSummary.pending}</p>
          </div>
          
          <div className="bg-white rounded-lg shadow-sm p-4">
            <div className="flex justify-between items-center mb-2">
              <h3 className="text-gray-600">Retrying</h3>
              <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
                <RefreshCw size={16} className="text-blue-900" />
              </div>
            </div>
            <p className="text-2xl font-bold">{queueSummary.retrying}</p>
          </div>
          
          <div className="bg-white rounded-lg shadow-sm p-4">
            <div className="flex justify-between items-center mb-2">
              <h3 className="text-gray-600">Failed</h3>
              <div className="w-8 h-8 rounded-full bg-red-100 flex items-center justify-center">
                <X size={16} className="text-red-600" />
              </div>
            </div>
            <p className="text-2xl font-bold">{queueSummary.failed}</p>
          </div>
          
          <div className="bg-white rounded-lg shadow-sm p-4">
            <div className="flex justify-between items-center mb-2">
              <h3 className="text-gray-600">Completed</h3>
              <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center">
                <Check size={16} className="text-green-600" />
              </div>
            </div>
            <p className="text-2xl font-bold">{queueSummary.completed}</p>
          </div>
        </div>
        
        {queueSummary.pending > 0 && (
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
            <div className="flex items-center">
              <AlertTriangle size={20} className="text-yellow-700 mr-2" />
              <div>
                <span className="font-medium text-yellow-800">
                  {queueSummary.pending} transactions pending processing
                </span>
                <span className="text-yellow-700 ml-2">
                  Oldest transaction: {timeAgo(queueSummary.oldestTransaction)}
                </span>
              </div>
              
              <button className="ml-auto px-4 py-1.5 bg-blue-900 text-white rounded hover:bg-opacity-90 text-sm">
                Force Retry All
              </button>
            </div>
          </div>
        )}

        {/* LMS Status Banner */}
        <div className={`rounded-lg shadow-sm mb-6 px-4 py-3 flex items-center justify-between
          ${lmsStatus.status === 'online' ? 'bg-green-50 border border-green-200' : ''}
          ${lmsStatus.status === 'degraded' ? 'bg-yellow-50 border border-yellow-200' : ''}
          ${lmsStatus.status === 'offline' ? 'bg-red-50 border border-red-200' : ''}`}
        >
          <div className="flex items-center">
            {lmsStatus.status === 'online' && (
              <CheckCircle size={20} className="text-green-600 mr-2" />
            )}
            {lmsStatus.status === 'degraded' && (
              <AlertCircle size={20} className="text-yellow-600 mr-2" />
            )}
            {lmsStatus.status === 'offline' && (
              <XCircle size={20} className="text-red-600 mr-2" />
            )}
            
            <span className={`font-medium mr-2
              ${lmsStatus.status === 'online' ? 'text-green-800' : ''}
              ${lmsStatus.status === 'degraded' ? 'text-yellow-800' : ''}
              ${lmsStatus.status === 'offline' ? 'text-red-800' : ''}
            `}>
              LMS Status: {lmsStatus.status.charAt(0).toUpperCase() + lmsStatus.status.slice(1)}
            </span>
            
            {lmsStatus.status !== 'online' && (
              <>
                <span className="text-gray-600 mx-2">|</span>
                <span className="text-gray-600">Downtime: {lmsStatus.downtime.duration}</span>
              </>
            )}
            
            <span className="text-gray-600 mx-2">|</span>
            <span className="text-gray-600">Response Time: {lmsStatus.responseTime}ms</span>
            
            <span className="text-gray-600 mx-2">|</span>
            <span className="text-gray-600">Last Checked: {formatTime(lmsStatus.lastChecked)}</span>
            
            {lmsStatus.message && (
              <>
                <span className="text-gray-600 mx-2">|</span>
                <span className="text-gray-600">{lmsStatus.message}</span>
              </>
            )}
          </div>
          
          <div className="flex items-center">
            <button 
              className="p-1 hover:bg-gray-200 rounded mr-2" 
              onClick={() => console.log('Refresh LMS status')}
              title="Refresh Status"
            >
              <RefreshCw size={16} />
            </button>
          </div>
        </div>
        
        {/* Transaction Management */}
        <div className="bg-white rounded-lg shadow-sm overflow-hidden mb-6">
          {selectedTransaction ? (
            <div className="p-6">
              <button 
                className="flex items-center text-blue-900 hover:underline mb-6"
                onClick={() => setSelectedTransaction(null)}
              >
                <ChevronLeft size={16} className="mr-1" />
                <span>Back to transaction list</span>
              </button>
              
              <h2 className="text-lg font-semibold mb-4">Transaction Details</h2>
              
              <div className="flex justify-between mb-6">
                <div>
                  <span className="block text-sm text-gray-600">Transaction ID</span>
                  <span className="font-medium">{selectedTransaction.id}</span>
                </div>
                
                <div>
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium
                    ${selectedTransaction.status === 'pending' ? 'bg-yellow-100 text-yellow-800' : ''}
                    ${selectedTransaction.status === 'retrying' ? 'bg-blue-100 text-blue-800' : ''}
                    ${selectedTransaction.status === 'failed' ? 'bg-red-100 text-red-800' : ''}
                    ${selectedTransaction.status === 'completed' ? 'bg-green-100 text-green-800' : ''}
                  `}>
                    {selectedTransaction.status.charAt(0).toUpperCase() + selectedTransaction.status.slice(1)}
                  </span>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-6 mb-6">
                <div className="bg-gray-50 rounded-lg p-4">
                  <h3 className="font-medium mb-3">Customer Information</h3>
                  <div className="space-y-3 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Customer ID</span>
                      <span className="font-medium">{selectedTransaction.customerId}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Customer Name</span>
                      <span className="font-medium">{selectedTransaction.customerName}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Loan Number</span>
                      <span className="font-medium">{selectedTransaction.loanNumber}</span>
                    </div>
                  </div>
                </div>
                
                <div className="bg-gray-50 rounded-lg p-4">
                  <h3 className="font-medium mb-3">Transaction Information</h3>
                  <div className="space-y-3 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Amount</span>
                      <span className="font-medium">{formatCurrency(selectedTransaction.amount)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Type</span>
                      <span className="font-medium">{selectedTransaction.type.replace('-', ' ').charAt(0).toUpperCase() + selectedTransaction.type.replace('-', ' ').slice(1)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Source</span>
                      <span className="font-medium">{selectedTransaction.source.replace('-', ' ').charAt(0).toUpperCase() + selectedTransaction.source.replace('-', ' ').slice(1)}</span>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-6 mb-6">
                <div className="bg-gray-50 rounded-lg p-4">
                  <h3 className="font-medium mb-3">Processing Information</h3>
                  <div className="space-y-3 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Created At</span>
                      <span className="font-medium">{new Date(selectedTransaction.createdAt).toLocaleString('en-IN')}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Retry Count</span>
                      <span className="font-medium">{selectedTransaction.retryCount}</span>
                    </div>
                    {selectedTransaction.status === 'completed' && (
                      <div className="flex justify-between">
                        <span className="text-gray-600">Completed At</span>
                        <span className="font-medium">{new Date(selectedTransaction.completedAt).toLocaleString('en-IN')}</span>
                      </div>
                    )}
                    {(selectedTransaction.status === 'pending' || selectedTransaction.status === 'retrying') && selectedTransaction.nextRetryAt && (
                      <div className="flex justify-between">
                        <span className="text-gray-600">Next Retry At</span>
                        <span className="font-medium">{new Date(selectedTransaction.nextRetryAt).toLocaleString('en-IN')}</span>
                      </div>
                    )}
                  </div>
                </div>
                
                {selectedTransaction.error && (
                  <div className="bg-red-50 rounded-lg p-4">
                    <h3 className="font-medium mb-3 text-red-800">Error Information</h3>
                    <div className="text-sm text-red-700">
                      <p>{selectedTransaction.error}</p>
                    </div>
                  </div>
                )}
              </div>
              
              <div className="flex justify-end space-x-3">
                {selectedTransaction.status !== 'completed' && (
                  <>
                    <button 
                      className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
                      onClick={() => console.log('Skip transaction:', selectedTransaction.id)}
                    >
                      Skip Transaction
                    </button>
                    <button 
                      className="px-4 py-2 bg-blue-900 text-white rounded-lg hover:bg-opacity-90"
                      onClick={() => handleManualPush(selectedTransaction)}
                    >
                      Manual Push to LMS
                    </button>
                  </>
                )}
                {selectedTransaction.status === 'completed' && (
                  <button 
                    className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
                    onClick={() => console.log('View receipt:', selectedTransaction.id)}
                  >
                    View Receipt
                  </button>
                )}
              </div>
            </div>
          ) : (
            <>
              {/* Filters and Search */}
              <div className="p-4 flex flex-wrap justify-between items-center border-b">
                <div className="flex items-center space-x-4">
                  <div>
                    <label className="block text-sm text-gray-600 mb-1">Status</label>
                    <div className="relative">
                      <select
                        className="pl-3 pr-8 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-900 appearance-none bg-white"
                        value={filterStatus}
                        onChange={(e) => setFilterStatus(e.target.value)}
                      >
                        <option value="all">All Statuses</option>
                        <option value="pending">Pending</option>
                        <option value="retrying">Retrying</option>
                        <option value="failed">Failed</option>
                        <option value="completed">Completed</option>
                      </select>
                      <ChevronDown className="absolute right-3 top-3 text-gray-400" size={16} />
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm text-gray-600 mb-1">Transaction Type</label>
                    <div className="relative">
                      <select
                        className="pl-3 pr-8 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-900 appearance-none bg-white"
                        value={filterType}
                        onChange={(e) => setFilterType(e.target.value)}
                      >
                        <option value="all">All Types</option>
                        <option value="receipt">Receipt</option>
                        <option value="mandate-update">Mandate Update</option>
                        <option value="status-update">Status Update</option>
                      </select>
                      <ChevronDown className="absolute right-3 top-3 text-gray-400" size={16} />
                    </div>
                  </div>
                  
                  <button className="h-10 px-3 mt-6 border border-gray-300 rounded-lg flex items-center text-gray-700 hover:bg-gray-50">
                    <Filter size={16} className="mr-1" />
                    <span>More Filters</span>
                  </button>
                </div>
                
                <div className="flex-grow max-w-md">
                  <label className="block text-sm text-gray-600 mb-1">Search</label>
                  <div className="relative">
                    <input
                      type="text"
                      placeholder="Search by customer, loan or transaction ID"
                      className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-900"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                    <Search className="absolute left-3 top-3 text-gray-400" size={18} />
                  </div>
                </div>
              </div>

              {/* Transactions Table */}
              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead>
                    <tr className="bg-gray-50">
                      <th className="px-4 py-3 text-gray-600 font-medium">Transaction ID</th>
                      <th className="px-4 py-3 text-gray-600 font-medium">Customer</th>
                      <th className="px-4 py-3 text-gray-600 font-medium">Loan Number</th>
                      <th className="px-4 py-3 text-gray-600 font-medium">Amount</th>
                      <th className="px-4 py-3 text-gray-600 font-medium">Type</th>
                      <th className="px-4 py-3 text-gray-600 font-medium">Created</th>
                      <th className="px-4 py-3 text-gray-600 font-medium">Status</th>
                      <th className="px-4 py-3 text-gray-600 font-medium">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredTransactions.map(transaction => (
                      <tr
                        key={transaction.id}
                        className="border-t border-gray-100 hover:bg-gray-50 cursor-pointer"
                        onClick={() => setSelectedTransaction(transaction)}
                      >
                        <td className="px-4 py-3 font-medium">{transaction.id}</td>
                        <td className="px-4 py-3">{transaction.customerName}</td>
                        <td className="px-4 py-3">{transaction.loanNumber}</td>
                        <td className="px-4 py-3 font-medium">{formatCurrency(transaction.amount)}</td>
                        <td className="px-4 py-3">
                          {transaction.type.replace('-', ' ').charAt(0).toUpperCase() + transaction.type.replace('-', ' ').slice(1)}
                        </td>
                        <td className="px-4 py-3">
                          <div className="flex flex-col">
                            <span>{formatTime(transaction.createdAt)}</span>
                            <span className="text-xs text-gray-500">{timeAgo(transaction.createdAt)}</span>
                          </div>
                        </td>
                        <td className="px-4 py-3">
                          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium
                            ${transaction.status === 'pending' ? 'bg-yellow-100 text-yellow-800' : ''}
                            ${transaction.status === 'retrying' ? 'bg-blue-100 text-blue-800' : ''}
                            ${transaction.status === 'failed' ? 'bg-red-100 text-red-800' : ''}
                            ${transaction.status === 'completed' ? 'bg-green-100 text-green-800' : ''}
                          `}>
                            {transaction.status.charAt(0).toUpperCase() + transaction.status.slice(1)}
                          </span>
                        </td>
                        <td className="px-4 py-3">
                          {(transaction.status === 'pending' || transaction.status === 'retrying') && (
                            <button 
                              className="p-1 text-blue-900 hover:bg-blue-100 rounded"
                              onClick={(e) => {
                                e.stopPropagation();
                                handleManualPush(transaction);
                              }}
                              title="Manual Push to LMS"
                            >
                              <Play size={16} />
                            </button>
                          )}
                          {transaction.status === 'failed' && (
                            <button 
                              className="p-1 text-blue-900 hover:bg-blue-100 rounded"
                              onClick={(e) => {
                                e.stopPropagation();
                                handleRetry(transaction);
                              }}
                              title="Retry"
                            >
                              <RefreshCw size={16} />
                            </button>
                          )}
                          <button 
                            className="p-1 text-gray-500 hover:bg-gray-100 rounded ml-1"
                            onClick={(e) => {
                              e.stopPropagation();
                              setSelectedTransaction(transaction);
                            }}
                            title="More Options"
                          >
                            <MoreHorizontal size={16} />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              
              {filteredTransactions.length === 0 && (
                <div className="p-8 text-center text-gray-500">
                  No transactions found matching your filters.
                </div>
              )}
              
              {filteredTransactions.length > 0 && (
                <div className="px-4 py-3 border-t border-gray-100 flex justify-between items-center">
                  <div className="text-gray-600 text-sm">
                    Showing {filteredTransactions.length} of {queuedTransactions.length} transactions
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <button className="p-1 text-gray-500 hover:bg-gray-100 rounded">
                      <ChevronLeft size={16} />
                    </button>
                    <span className="px-3 py-1 bg-blue-900 text-white rounded">1</span>
                    <button className="p-1 text-gray-500 hover:bg-gray-100 rounded">
                      <ChevronRight size={16} />
                    </button>
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default TransactionQueueManager;