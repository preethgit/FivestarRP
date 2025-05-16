import { useState, useEffect } from 'react';
import { 
  Bell, 
  ChevronDown, 
  ChevronRight, 
  Search, 
  AlertCircle, 
  CheckCircle, 
  XCircle, 
  RefreshCw, 
  Play, 
  Clock, 
  Upload,
  Download,
  Filter,
  Eye,
  BarChart2,
  Activity,
  Settings,
  Sliders
} from 'lucide-react';

const LMSDowntimeResiliency = () => {
  const [activeTab, setActiveTab] = useState('queue');
  const [statusFilter, setStatusFilter] = useState('all');
  const [lmsStatus, setLmsStatus] = useState('online'); // online, offline, degraded
  const [showLmsStatus, setShowLmsStatus] = useState(true);
  
  // Simulate LMS status change after 5 seconds for demo purposes
  useEffect(() => {
    const timer = setTimeout(() => {
      setLmsStatus('degraded');
    }, 5000);
    
    return () => clearTimeout(timer);
  }, []);
  
  // Mock data
  const queueSummary = {
    pending: 32,
    retrying: 15,
    failed: 8,
    completed: 23,
    total: 32 + 15 + 8 + 23,
  };
  
  return (
    <div>
      {/* Page Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="px-6 py-4">
          <h1 className="text-2xl font-bold text-gray-900">LMS Downtime Handling & Resiliency</h1>
          <p className="text-gray-600">Manage transaction resilience during LMS downtime and ensure data integrity</p>
        </div>
        
        {/* Breadcrumb */}
        <div className="px-6 py-2 bg-gray-50 border-t border-b border-gray-200">
          <div className="flex items-center text-sm text-gray-600">
            <a href="#" className="hover:text-blue-900">Dashboard</a>
            <ChevronRight size={16} className="mx-2" />
            <a href="#" className="hover:text-blue-900">System</a>
            <ChevronRight size={16} className="mx-2" />
            <span className="text-gray-800 font-medium">Downtime Resilience</span>
          </div>
        </div>
      </div>
      
      {/* Main content */}
      <div className="p-6">
        {/* Status Banner */}
        {showLmsStatus && (
          <div className={`rounded-lg shadow p-4 mb-6 flex items-center justify-between ${
            lmsStatus === 'online' ? 'bg-green-50 border border-green-200' : 
            lmsStatus === 'offline' ? 'bg-red-50 border border-red-200' : 
            'bg-yellow-50 border border-yellow-200'
          }`}>
            <div className="flex items-center">
              {lmsStatus === 'online' && (
                <CheckCircle size={20} className="text-green-600 mr-3" />
              )}
              {lmsStatus === 'offline' && (
                <XCircle size={20} className="text-red-600 mr-3" />
              )}
              {lmsStatus === 'degraded' && (
                <AlertCircle size={20} className="text-yellow-600 mr-3" />
              )}
              <div>
                <h3 className={`font-medium ${
                  lmsStatus === 'online' ? 'text-green-800' : 
                  lmsStatus === 'offline' ? 'text-red-800' : 
                  'text-yellow-800'
                }`}>
                  {lmsStatus === 'online' ? 'LMS System: Online' : 
                  lmsStatus === 'offline' ? 'LMS System: Offline' : 
                  'LMS System: Degraded Performance'}
                </h3>
                <p className="text-sm">
                  {lmsStatus === 'online' ? 'All services are operating normally.' : 
                  lmsStatus === 'offline' ? 'LMS is currently unavailable. Transactions are being queued.' : 
                  'LMS is experiencing slow response times. Some transactions may be delayed.'}
                </p>
              </div>
            </div>
            <div>
              <button className="px-4 py-2 bg-white border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 flex items-center">
                <RefreshCw size={16} className="mr-2" />
                Refresh Status
              </button>
            </div>
          </div>
        )}

        {/* System Health & Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-medium text-gray-900">Transaction Queue</h3>
              <div className="flex items-center space-x-1 text-blue-800">
                <BarChart2 size={16} />
                <span className="text-sm">View Details</span>
              </div>
            </div>
            <div className="flex items-end">
              <div className="text-3xl font-bold text-gray-900 mr-2">{queueSummary.pending}</div>
              <div className="text-sm text-gray-500 pb-1">pending transactions</div>
            </div>
            <div className="mt-4 space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Cash Collections</span>
                <span className="font-medium text-gray-900">12</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Digital Payments</span>
                <span className="font-medium text-gray-900">28</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Auto-Debits</span>
                <span className="font-medium text-gray-900">7</span>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-medium text-gray-900">Retry Metrics</h3>
              <div className="flex items-center space-x-1 text-blue-800">
                <Activity size={16} />
                <span className="text-sm">View Details</span>
              </div>
            </div>
            <div className="flex items-end">
              <div className="text-3xl font-bold text-gray-900 mr-2">93.5%</div>
              <div className="text-sm text-gray-500 pb-1">first-attempt success</div>
            </div>
            <div className="mt-4 space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Retry Attempts Today</span>
                <span className="font-medium text-gray-900">124</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Avg. Attempts per Success</span>
                <span className="font-medium text-gray-900">1.4</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Manual Interventions</span>
                <span className="font-medium text-gray-900">8</span>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-medium text-gray-900">System Response</h3>
              <div className="flex items-center space-x-1 text-blue-800">
                <Activity size={16} />
                <span className="text-sm">View Details</span>
              </div>
            </div>
            <div className="flex items-end">
              <div className="text-3xl font-bold text-gray-900 mr-2">842ms</div>
              <div className="text-sm text-gray-500 pb-1">avg. response time</div>
            </div>
            <div className="mt-4 space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">LMS Availability (24h)</span>
                <span className="font-medium text-gray-900">99.7%</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Last Downtime</span>
                <span className="font-medium text-gray-900">May 14, 03:21 AM</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Downtime Duration</span>
                <span className="font-medium text-gray-900">17min</span>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-lg shadow overflow-hidden mb-6">
          <div className="flex border-b">
            <button 
              className={`px-6 py-4 text-sm font-medium ${activeTab === 'queue' ? 'text-blue-800 border-b-2 border-blue-800' : 'text-gray-600'}`}
              onClick={() => setActiveTab('queue')}
            >
              Transaction Queue
            </button>
            <button 
              className={`px-6 py-4 text-sm font-medium ${activeTab === 'retry' ? 'text-blue-800 border-b-2 border-blue-800' : 'text-gray-600'}`}
              onClick={() => setActiveTab('retry')}
            >
              Retry Status
            </button>
            <button 
              className={`px-6 py-4 text-sm font-medium ${activeTab === 'manual' ? 'text-blue-800 border-b-2 border-blue-800' : 'text-gray-600'}`}
              onClick={() => setActiveTab('manual')}
            >
              Manual Push
            </button>
            <button 
              className={`px-6 py-4 text-sm font-medium ${activeTab === 'config' ? 'text-blue-800 border-b-2 border-blue-800' : 'text-gray-600'}`}
              onClick={() => setActiveTab('config')}
            >
              Configuration
            </button>
          </div>

          {/* Filter and Search */}
          <div className="p-4 flex flex-wrap justify-between items-center border-b">
            <div className="flex items-center space-x-4">
              <div className="relative">
                <select 
                  className="appearance-none bg-gray-100 border border-gray-200 rounded-md py-2 pl-3 pr-10 text-sm leading-5 text-gray-900 focus:outline-none focus:ring-1 focus:ring-blue-800 focus:border-blue-800"
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                >
                  <option value="all">All Status</option>
                  <option value="pending">Pending</option>
                  <option value="retrying">Retrying</option>
                  <option value="failed">Failed</option>
                  <option value="manual">Requires Manual</option>
                  <option value="completed">Completed</option>
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                  <ChevronDown size={16} className="text-gray-400" />
                </div>
              </div>
              <div className="relative">
                <select className="appearance-none bg-gray-100 border border-gray-200 rounded-md py-2 pl-3 pr-10 text-sm leading-5 text-gray-900 focus:outline-none focus:ring-1 focus:ring-blue-800 focus:border-blue-800">
                  <option value="all">All Transaction Types</option>
                  <option value="cash">Cash Collection</option>
                  <option value="digital">Digital Payment</option>
                  <option value="upi">UPI Auto-Debit</option>
                  <option value="nach">NACH Mandate</option>
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
                  placeholder="Search by reference ID"
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

          {/* Transaction Queue Table */}
          {activeTab === 'queue' && (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Reference ID
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Timestamp
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Customer
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Transaction Type
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Amount
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Retry Count
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Next Retry
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-blue-800">TXN-8745623954</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      <div className="flex items-center">
                        <Clock size={14} className="text-gray-400 mr-1" />
                        <span>16 May 2025, 10:32 AM</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">Rakesh Mehta</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">Digital Payment</span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">₹13,500</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">2</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">16 May 2025, 11:32 AM</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-yellow-100 text-yellow-800">Retrying</span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      <div className="flex space-x-2">
                        <button className="text-blue-800 hover:text-blue-900">
                          <Eye size={16} />
                        </button>
                        <button className="text-blue-800 hover:text-blue-900">
                          <Play size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-blue-800">TXN-8745623953</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      <div className="flex items-center">
                        <Clock size={14} className="text-gray-400 mr-1" />
                        <span>16 May 2025, 10:28 AM</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">Sunita Reddy</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-purple-100 text-purple-800">Cash Collection</span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">₹9,750</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">1</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">16 May 2025, 10:58 AM</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-yellow-100 text-yellow-800">Pending</span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      <div className="flex space-x-2">
                        <button className="text-blue-800 hover:text-blue-900">
                          <Eye size={16} />
                        </button>
                        <button className="text-blue-800 hover:text-blue-900">
                          <Play size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-blue-800">TXN-8745623952</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      <div className="flex items-center">
                        <Clock size={14} className="text-gray-400 mr-1" />
                        <span>16 May 2025, 10:15 AM</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">Harish Gopal</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-indigo-100 text-indigo-800">UPI Auto-Debit</span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">₹17,200</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">5</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">-</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 text-red-800">Requires Manual</span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      <div className="flex space-x-2">
                        <button className="text-blue-800 hover:text-blue-900">
                          <Eye size={16} />
                        </button>
                        <button className="text-blue-800 hover:text-blue-900">
                          <Upload size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-blue-800">TXN-8745623951</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      <div className="flex items-center">
                        <Clock size={14} className="text-gray-400 mr-1" />
                        <span>16 May 2025, 10:02 AM</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">Divya Patel</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">BBPS Payment</span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">₹10,450</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">0</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">16 May 2025, 10:17 AM</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-yellow-100 text-yellow-800">Pending</span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      <div className="flex space-x-2">
                        <button className="text-blue-800 hover:text-blue-900">
                          <Eye size={16} />
                        </button>
                        <button className="text-blue-800 hover:text-blue-900">
                          <Play size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-blue-800">TXN-8745623950</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      <div className="flex items-center">
                        <Clock size={14} className="text-gray-400 mr-1" />
                        <span>16 May 2025, 09:55 AM</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">Manoj Singh</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">Digital Payment</span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">₹8,900</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">3</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">16 May 2025, 12:55 PM</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-yellow-100 text-yellow-800">Retrying</span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      <div className="flex space-x-2">
                        <button className="text-blue-800 hover:text-blue-900">
                          <Eye size={16} />
                        </button>
                        <button className="text-blue-800 hover:text-blue-900">
                          <Play size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          )}

          {/* Configuration Tab */}
          {activeTab === 'config' && (
            <div className="p-6">
              <div className="mb-6">
                <h3 className="text-lg font-medium text-gray-900 mb-4">Retry Configuration</h3>
                <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Retry Interval (Minutes)
                      </label>
                      <div className="flex items-center">
                        <input 
                          type="number" 
                          className="shadow-sm focus:ring-blue-800 focus:border-blue-800 block w-full sm:text-sm border-gray-300 rounded-md"
                          defaultValue="15"
                        />
                        <div className="ml-2 text-gray-500">
                          <Sliders size={18} />
                        </div>
                      </div>
                      <p className="mt-1 text-xs text-gray-500">Initial wait time before first retry</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Backoff Multiplier
                      </label>
                      <div className="flex items-center">
                        <input 
                          type="number" 
                          className="shadow-sm focus:ring-blue-800 focus:border-blue-800 block w-full sm:text-sm border-gray-300 rounded-md"
                          defaultValue="2"
                          step="0.5"
                        />
                        <div className="ml-2 text-gray-500">
                          <Sliders size={18} />
                        </div>
                      </div>
                      <p className="mt-1 text-xs text-gray-500">Exponential backoff factor for subsequent retries</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Maximum Retry Attempts
                      </label>
                      <div className="flex items-center">
                        <input 
                          type="number" 
                          className="shadow-sm focus:ring-blue-800 focus:border-blue-800 block w-full sm:text-sm border-gray-300 rounded-md"
                          defaultValue="6"
                        />
                        <div className="ml-2 text-gray-500">
                          <Sliders size={18} />
                        </div>
                      </div>
                      <p className="mt-1 text-xs text-gray-500">Maximum number of automatic retry attempts</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Manual Intervention Threshold
                      </label>
                      <div className="flex items-center">
                        <input 
                          type="number" 
                          className="shadow-sm focus:ring-blue-800 focus:border-blue-800 block w-full sm:text-sm border-gray-300 rounded-md"
                          defaultValue="6"
                        />
                        <div className="ml-2 text-gray-500">
                          <Sliders size={18} />
                        </div>
                      </div>
                      <p className="mt-1 text-xs text-gray-500">Retry attempts before requiring manual intervention</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mb-6">
                <h3 className="text-lg font-medium text-gray-900 mb-4">Alert Configuration</h3>
                <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        LMS Outage Alert Threshold (Minutes)
                      </label>
                      <div className="flex items-center">
                        <input 
                          type="number" 
                          className="shadow-sm focus:ring-blue-800 focus:border-blue-800 block w-full sm:text-sm border-gray-300 rounded-md"
                          defaultValue="5"
                        />
                        <div className="ml-2 text-gray-500">
                          <Sliders size={18} />
                        </div>
                      </div>
                      <p className="mt-1 text-xs text-gray-500">Trigger alert after X minutes of LMS downtime</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Queue Size Alert Threshold
                      </label>
                      <div className="flex items-center">
                        <input 
                          type="number" 
                          className="shadow-sm focus:ring-blue-800 focus:border-blue-800 block w-full sm:text-sm border-gray-300 rounded-md"
                          defaultValue="100"
                        />
                        <div className="ml-2 text-gray-500">
                          <Sliders size={18} />
                        </div>
                      </div>
                      <p className="mt-1 text-xs text-gray-500">Alert when queue size exceeds this value</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Retry Failure Rate Threshold (%)
                      </label>
                      <div className="flex items-center">
                        <input 
                          type="number" 
                          className="shadow-sm focus:ring-blue-800 focus:border-blue-800 block w-full sm:text-sm border-gray-300 rounded-md"
                          defaultValue="20"
                        />
                        <div className="ml-2 text-gray-500">
                          <Sliders size={18} />
                        </div>
                      </div>
                      <p className="mt-1 text-xs text-gray-500">Alert when retry failure rate exceeds percentage</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Alert Recipients
                      </label>
                      <select className="shadow-sm focus:ring-blue-800 focus:border-blue-800 block w-full sm:text-sm border-gray-300 rounded-md">
                        <option>DevOps Team</option>
                        <option>Finance Team</option>
                        <option>System Administrators</option>
                        <option>All Teams</option>
                      </select>
                      <p className="mt-1 text-xs text-gray-500">Teams to receive system alerts</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex justify-end space-x-4">
                <button className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-800">
                  Reset to Defaults
                </button>
                <button className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-800 hover:bg-blue-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-800">
                  <Settings size={16} className="mr-2" />
                  Save Configuration
                </button>
              </div>
            </div>
          )}

          {/* Manual Push Tab */}
          {activeTab === 'manual' && (
            <div className="p-6">
              <div className="bg-yellow-50 border border-yellow-200 p-4 rounded-md mb-6">
                <div className="flex">
                  <div className="flex-shrink-0">
                    <AlertCircle className="h-5 w-5 text-yellow-600" />
                  </div>
                  <div className="ml-3">
                    <h3 className="text-sm font-medium text-yellow-800">Manual intervention required</h3>
                    <div className="mt-2 text-sm text-yellow-700">
                      <p>
                        8 transactions have failed automatic retry and require manual review. Please review and determine appropriate action.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        <div className="flex items-center">
                          <input
                            type="checkbox"
                            className="h-4 w-4 text-blue-800 focus:ring-blue-800 border-gray-300 rounded"
                          />
                          <span className="ml-2">Select</span>
                        </div>
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Reference ID
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Customer
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Transaction Type
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Amount
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Failed Attempts
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Last Error
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Age
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    <tr>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <input
                          type="checkbox"
                          className="h-4 w-4 text-blue-800 focus:ring-blue-800 border-gray-300 rounded"
                        />
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-blue-800">TXN-8745623952</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">Harish Gopal</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-indigo-100 text-indigo-800">UPI Auto-Debit</span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">₹17,200</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">6</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">LMS_CONNECTION_TIMEOUT</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">5h 23m</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        <div className="flex space-x-2">
                          <button className="text-blue-800 hover:text-blue-900">
                            <Eye size={16} />
                          </button>
                          <button className="text-blue-800 hover:text-blue-900">
                            <Upload size={16} />
                          </button>
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <input
                          type="checkbox"
                          className="h-4 w-4 text-blue-800 focus:ring-blue-800 border-gray-300 rounded"
                        />
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-blue-800">TXN-8745623931</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">Jyoti Desai</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">Digital Payment</span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">₹22,450</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">6</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">LMS_VALIDATION_ERROR</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">4h 15m</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        <div className="flex space-x-2">
                          <button className="text-blue-800 hover:text-blue-900">
                            <Eye size={16} />
                          </button>
                          <button className="text-blue-800 hover:text-blue-900">
                            <Upload size={16} />
                          </button>
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <input
                          type="checkbox"
                          className="h-4 w-4 text-blue-800 focus:ring-blue-800 border-gray-300 rounded"
                        />
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-blue-800">TXN-8745623928</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">Rajat Sharma</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-purple-100 text-purple-800">Cash Collection</span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">₹8,300</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">6</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">DUPLICATE_RECEIPT_ERROR</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">3h 42m</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        <div className="flex space-x-2">
                          <button className="text-blue-800 hover:text-blue-900">
                            <Eye size={16} />
                          </button>
                          <button className="text-blue-800 hover:text-blue-900">
                            <Upload size={16} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div className="mt-6 flex justify-between items-center">
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    className="h-4 w-4 text-blue-800 focus:ring-blue-800 border-gray-300 rounded"
                  />
                  <span className="ml-2 text-sm text-gray-700">Select All</span>
                </div>
                <div className="flex space-x-4">
                  <button className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-800">
                    Skip Selected
                  </button>
                  <button className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-800 hover:bg-blue-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-800">
                    <Upload size={16} className="mr-2" />
                    Force Push Selected
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Retry Tab */}
          {activeTab === 'retry' && (
            <div className="p-6">
              <div className="bg-white p-4 rounded-lg border border-gray-200 mb-6">
                <h3 className="text-lg font-medium text-gray-900 mb-2">Retry Status Summary</h3>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <div>
                    <div className="text-sm text-gray-500">Total Retries Today</div>
                    <div className="text-2xl font-bold">124</div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-500">Successful Retries</div>
                    <div className="text-2xl font-bold text-green-600">86</div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-500">Failed Retries</div>
                    <div className="text-2xl font-bold text-red-600">38</div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-500">Success Rate</div>
                    <div className="text-2xl font-bold">69.4%</div>
                  </div>
                </div>
              </div>
              
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Reference ID
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Customer
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Transaction Type
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Amount
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Attempts
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Last Retry
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Next Retry
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Status
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Action
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    <tr>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-blue-800">TXN-8745623954</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">Rakesh Mehta</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">Digital Payment</span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">₹13,500</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">2 / 6</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        <div className="flex flex-col">
                          <span>16 May 2025, 10:32 AM</span>
                          <span className="text-xs text-red-600">Failed - Timeout</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">16 May 2025, 11:32 AM</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-yellow-100 text-yellow-800">In Progress</span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        <div className="flex space-x-2">
                          <button className="text-blue-800 hover:text-blue-900">
                            <Eye size={16} />
                          </button>
                          <button className="text-blue-800 hover:text-blue-900">
                            <Play size={16} />
                          </button>
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-blue-800">TXN-8745623950</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">Manoj Singh</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">Digital Payment</span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">₹8,900</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">3 / 6</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        <div className="flex flex-col">
                          <span>16 May 2025, 11:15 AM</span>
                          <span className="text-xs text-red-600">Failed - Error 500</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">16 May 2025, 12:55 PM</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-yellow-100 text-yellow-800">Scheduled</span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        <div className="flex space-x-2">
                          <button className="text-blue-800 hover:text-blue-900">
                            <Eye size={16} />
                          </button>
                          <button className="text-blue-800 hover:text-blue-900">
                            <Play size={16} />
                          </button>
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-blue-800">TXN-8745623943</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">Leela Nair</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">BBPS Payment</span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">₹12,100</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">2 / 6</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        <div className="flex flex-col">
                          <span>16 May 2025, 09:45 AM</span>
                          <span className="text-xs text-green-600">Success</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">-</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">Complete</span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        <div className="flex space-x-2">
                          <button className="text-blue-800 hover:text-blue-900">
                            <Eye size={16} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          )}

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
                  Showing <span className="font-medium">1</span> to <span className="font-medium">5</span> of <span className="font-medium">{queueSummary.total}</span> results
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
                  <a href="#" className="bg-white border-gray-300 text-gray-500 hover:bg-gray-50 relative inline-flex items-center px-4 py-2 border text-sm font-medium">
                    2
                  </a>
                  <a href="#" className="bg-white border-gray-300 text-gray-500 hover:bg-gray-50 relative inline-flex items-center px-4 py-2 border text-sm font-medium">
                    3
                  </a>
                  <span className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700">
                    ...
                  </span>
                  <a href="#" className="bg-white border-gray-300 text-gray-500 hover:bg-gray-50 relative inline-flex items-center px-4 py-2 border text-sm font-medium">
                    10
                  </a>
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

export default LMSDowntimeResiliency;