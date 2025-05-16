import { useState } from 'react';
import { 
  Calendar, 
  Download, 
  Filter, 
  ChevronDown, 
  FileText, 
  RefreshCw, 
  CreditCard, 
  BarChart4,
  PieChart as PieChartIcon,
  Clock,
  AlertTriangle,
  CircleDollarSign,
  CalendarClock,
  ArrowUpRight,
  ArrowDownRight
} from 'lucide-react';
import { BarChart, PieChart } from '../components/charts';

// Report type definitions
type TimeRange = 'today' | 'yesterday' | 'this_week' | 'last_week' | 'this_month' | 'last_month' | 'custom';
type ReportCategory = 'all' | 'dcr_dbs' | 'digital_payments' | 'mandates' | 'exceptions' | 'system_performance';

const Reports = () => {
  // State for active tab, date range, and filters
  const [activeTab, setActiveTab] = useState<ReportCategory>('all');
  const [timeRange, setTimeRange] = useState<TimeRange>('this_month');
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  const [startDate, setStartDate] = useState<string>('');
  const [endDate, setEndDate] = useState<string>('');
  
  // Get formatted date range for display
  const getFormattedDateRange = () => {
    switch (timeRange) {
      case 'today':
        return 'Today';
      case 'yesterday':
        return 'Yesterday';
      case 'this_week':
        return 'This Week';
      case 'last_week':
        return 'Last Week';
      case 'this_month':
        return 'This Month';
      case 'last_month':
        return 'Last Month';
      case 'custom':
        return `${startDate} - ${endDate}`;
      default:
        return 'This Month';
    }
  };

  // Generate mock data for channel distribution
  const channelData = [
    { name: 'Cash', value: 42, color: '#003366' },
    { name: 'RazorPay', value: 28, color: '#FFC107' },
    { name: 'QR Code', value: 18, color: '#4CAF50' },
    { name: 'BBPS', value: 12, color: '#2196F3' },
  ];

  // Generate mock data for success rates
  const successRateData = [
    { name: 'Success', value: 92, color: '#4CAF50' },
    { name: 'Failed', value: 8, color: '#D32F2F' },
  ];

  // Generate mock data for daily trend
  const dailyTrendData = [
    { date: 'Mon', amount: 120000 },
    { date: 'Tue', amount: 135000 },
    { date: 'Wed', amount: 110000 },
    { date: 'Thu', amount: 180000 },
    { date: 'Fri', amount: 160000 },
    { date: 'Sat', amount: 90000 },
    { date: 'Sun', amount: 70000 },
  ];

  return (
    <div className="p-6">
      {/* Header */}
      <div className="mb-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Reports</h1>
            <p className="text-gray-600">View and export payment transaction reports</p>
          </div>
          
          <div className="mt-4 md:mt-0 flex flex-col sm:flex-row gap-3">
            {/* Date Range Selector */}
            <div className="relative">
              <button 
                className="flex items-center justify-between w-full sm:w-auto px-4 py-2 bg-white border border-gray-300 rounded-lg text-sm"
                onClick={() => setShowDatePicker(!showDatePicker)}
              >
                <Calendar size={16} className="text-gray-500 mr-2" />
                <span>{getFormattedDateRange()}</span>
                <ChevronDown size={16} className="text-gray-500 ml-2" />
              </button>
              
              {/* Date Range Dropdown */}
              {showDatePicker && (
                <div className="absolute right-0 mt-2 w-64 bg-white rounded-lg shadow-lg border border-gray-200 z-20">
                  <div className="p-3 border-b border-gray-200">
                    <p className="font-medium text-sm">Select Date Range</p>
                  </div>
                  <div className="p-2">
                    {['today', 'yesterday', 'this_week', 'last_week', 'this_month', 'last_month'].map((range) => (
                      <button 
                        key={range}
                        className={`flex items-center w-full px-3 py-2 text-sm rounded-lg ${
                          timeRange === range ? 'bg-blue-50 text-deep-blue' : 'text-gray-700 hover:bg-gray-100'
                        }`}
                        onClick={() => {
                          setTimeRange(range as TimeRange);
                          setShowDatePicker(false);
                        }}
                      >
                        <span className="capitalize">{range.replace('_', ' ')}</span>
                      </button>
                    ))}
                    <div className="border-t border-gray-200 my-2"></div>
                    <button 
                      className={`flex items-center w-full px-3 py-2 text-sm rounded-lg ${
                        timeRange === 'custom' ? 'bg-blue-50 text-deep-blue' : 'text-gray-700 hover:bg-gray-100'
                      }`}
                      onClick={() => {
                        setTimeRange('custom');
                        // Here you would show the custom date picker component
                      }}
                    >
                      <span>Custom Range</span>
                    </button>
                    {timeRange === 'custom' && (
                      <div className="p-2 space-y-2">
                        <div>
                          <label className="block text-xs text-gray-600 mb-1">Start Date</label>
                          <input 
                            type="date" 
                            className="w-full border border-gray-300 rounded-md px-3 py-1 text-sm"
                            value={startDate}
                            onChange={(e) => setStartDate(e.target.value)}
                          />
                        </div>
                        <div>
                          <label className="block text-xs text-gray-600 mb-1">End Date</label>
                          <input 
                            type="date" 
                            className="w-full border border-gray-300 rounded-md px-3 py-1 text-sm"
                            value={endDate}
                            onChange={(e) => setEndDate(e.target.value)}
                          />
                        </div>
                        <button 
                          className="w-full bg-deep-blue text-white rounded-md py-1 text-sm"
                          onClick={() => setShowDatePicker(false)}
                        >
                          Apply
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
            
            {/* Filters Button */}
            <div className="relative">
              <button 
                className="flex items-center justify-center px-4 py-2 bg-white border border-gray-300 rounded-lg text-sm"
                onClick={() => setShowFilters(!showFilters)}
              >
                <Filter size={16} className="text-gray-500 mr-2" />
                <span>Filters</span>
                <ChevronDown size={16} className="text-gray-500 ml-2" />
              </button>
              
              {/* Filters Dropdown */}
              {showFilters && (
                <div className="absolute right-0 mt-2 w-72 bg-white rounded-lg shadow-lg border border-gray-200 z-20">
                  <div className="p-3 border-b border-gray-200">
                    <p className="font-medium text-sm">Filter Reports</p>
                  </div>
                  <div className="p-3 space-y-3">
                    <div>
                      <label className="block text-xs text-gray-600 mb-1">Payment Channel</label>
                      <select className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm">
                        <option value="all">All Channels</option>
                        <option value="cash">Cash</option>
                        <option value="razorpay">RazorPay</option>
                        <option value="qr">QR Code</option>
                        <option value="bbps">BBPS</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-xs text-gray-600 mb-1">Branch</label>
                      <select className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm">
                        <option value="all">All Branches</option>
                        <option value="chennai">Chennai</option>
                        <option value="bangalore">Bangalore</option>
                        <option value="hyderabad">Hyderabad</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-xs text-gray-600 mb-1">Status</label>
                      <select className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm">
                        <option value="all">All Status</option>
                        <option value="success">Success</option>
                        <option value="failed">Failed</option>
                        <option value="pending">Pending</option>
                      </select>
                    </div>
                    <div className="flex items-center pt-2 space-x-2">
                      <button 
                        className="flex-1 bg-deep-blue text-white rounded-md py-2 text-sm"
                        onClick={() => setShowFilters(false)}
                      >
                        Apply Filters
                      </button>
                      <button 
                        className="flex-1 bg-white border border-gray-300 text-gray-700 rounded-md py-2 text-sm"
                        onClick={() => setShowFilters(false)}
                      >
                        Reset
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
            
            {/* Export Button */}
            <button className="flex items-center justify-center px-4 py-2 bg-deep-blue text-white rounded-lg text-sm">
              <Download size={16} className="mr-2" />
              <span>Export</span>
            </button>
          </div>
        </div>
        
        {/* Tabs */}
        <div className="mt-6 border-b border-gray-200">
          <div className="flex flex-nowrap overflow-x-auto hide-scrollbar">
            <button
              className={`px-4 py-2 font-medium text-sm whitespace-nowrap ${
                activeTab === 'all'
                  ? 'text-deep-blue border-b-2 border-deep-blue'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
              onClick={() => setActiveTab('all')}
            >
              All Reports
            </button>
            <button
              className={`px-4 py-2 font-medium text-sm whitespace-nowrap ${
                activeTab === 'dcr_dbs'
                  ? 'text-deep-blue border-b-2 border-deep-blue'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
              onClick={() => setActiveTab('dcr_dbs')}
            >
              DCR & DBS Reports
            </button>
            <button
              className={`px-4 py-2 font-medium text-sm whitespace-nowrap ${
                activeTab === 'digital_payments'
                  ? 'text-deep-blue border-b-2 border-deep-blue'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
              onClick={() => setActiveTab('digital_payments')}
            >
              Digital Payment Reports
            </button>
            <button
              className={`px-4 py-2 font-medium text-sm whitespace-nowrap ${
                activeTab === 'mandates'
                  ? 'text-deep-blue border-b-2 border-deep-blue'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
              onClick={() => setActiveTab('mandates')}
            >
              Mandate Reports
            </button>
            <button
              className={`px-4 py-2 font-medium text-sm whitespace-nowrap ${
                activeTab === 'exceptions'
                  ? 'text-deep-blue border-b-2 border-deep-blue'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
              onClick={() => setActiveTab('exceptions')}
            >
              Exception Reports
            </button>
            <button
              className={`px-4 py-2 font-medium text-sm whitespace-nowrap ${
                activeTab === 'system_performance'
                  ? 'text-deep-blue border-b-2 border-deep-blue'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
              onClick={() => setActiveTab('system_performance')}
            >
              System Performance
            </button>
          </div>
        </div>
      </div>
      
      {/* Dashboard Overview */}
      <div className="mb-8">
        <h2 className="text-lg font-medium mb-4">Dashboard Overview</h2>
        
        {/* Summary Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <div className="bg-white rounded-lg shadow-sm p-4">
            <div className="flex items-center justify-between mb-2">
              <div className="text-gray-600 text-sm">Total Collections</div>
              <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
                <CircleDollarSign size={18} className="text-deep-blue" />
              </div>
            </div>
            <div className="flex items-baseline">
              <div className="text-2xl font-bold mr-2">₹24,35,678</div>
              <div className="text-xs px-2 py-0.5 rounded bg-green-100 text-green-800 flex items-center">
                <ArrowUpRight size={12} className="mr-1" />
                <span>12%</span>
              </div>
            </div>
            <div className="text-xs text-gray-600 mt-1">vs. Previous Period</div>
          </div>
          
          <div className="bg-white rounded-lg shadow-sm p-4">
            <div className="flex items-center justify-between mb-2">
              <div className="text-gray-600 text-sm">Transaction Count</div>
              <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center">
                <BarChart4 size={18} className="text-green-600" />
              </div>
            </div>
            <div className="flex items-baseline">
              <div className="text-2xl font-bold mr-2">3,457</div>
              <div className="text-xs px-2 py-0.5 rounded bg-green-100 text-green-800 flex items-center">
                <ArrowUpRight size={12} className="mr-1" />
                <span>8%</span>
              </div>
            </div>
            <div className="text-xs text-gray-600 mt-1">vs. Previous Period</div>
          </div>
          
          <div className="bg-white rounded-lg shadow-sm p-4">
            <div className="flex items-center justify-between mb-2">
              <div className="text-gray-600 text-sm">Success Rate</div>
              <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center">
                <PieChartIcon size={18} className="text-green-600" />
              </div>
            </div>
            <div className="flex items-baseline">
              <div className="text-2xl font-bold mr-2">92.4%</div>
              <div className="text-xs px-2 py-0.5 rounded bg-green-100 text-green-800 flex items-center">
                <ArrowUpRight size={12} className="mr-1" />
                <span>1.2%</span>
              </div>
            </div>
            <div className="text-xs text-gray-600 mt-1">vs. Previous Period</div>
          </div>
          
          <div className="bg-white rounded-lg shadow-sm p-4">
            <div className="flex items-center justify-between mb-2">
              <div className="text-gray-600 text-sm">Average Amount</div>
              <div className="w-8 h-8 rounded-full bg-amber-100 flex items-center justify-center">
                <CircleDollarSign size={18} className="text-amber-600" />
              </div>
            </div>
            <div className="flex items-baseline">
              <div className="text-2xl font-bold mr-2">₹7,045</div>
              <div className="text-xs px-2 py-0.5 rounded bg-red-100 text-red-800 flex items-center">
                <ArrowDownRight size={12} className="mr-1" />
                <span>3.5%</span>
              </div>
            </div>
            <div className="text-xs text-gray-600 mt-1">vs. Previous Period</div>
          </div>
        </div>
        
        {/* Charts Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Daily Transaction Trend */}
          <div className="bg-white rounded-lg shadow-sm p-4">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-medium">Daily Transaction Trend</h3>
              <div className="flex items-center">
                <select className="text-xs border border-gray-200 rounded px-2 py-1">
                  <option value="amount">Amount</option>
                  <option value="count">Count</option>
                </select>
              </div>
            </div>
            
            {/* Real chart implementation */}
            <div className="h-64">
              <BarChart 
                data={dailyTrendData.map(item => ({ 
                  name: item.date, 
                  value: item.amount 
                }))} 
                dataKey="value"
                grid={true}
              />
            </div>
          </div>
          
          {/* Payment Channel Distribution */}
          <div className="bg-white rounded-lg shadow-sm p-4">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-medium">Payment Channel Distribution</h3>
              <div className="flex items-center">
                <select className="text-xs border border-gray-200 rounded px-2 py-1">
                  <option value="amount">Amount</option>
                  <option value="count">Count</option>
                </select>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              {/* Real pie chart implementation */}
              <div className="h-40">
                <PieChart 
                  data={channelData} 
                  legend={false}
                  innerRadius={30}
                  outerRadius={70}
                />
              </div>
              
              {/* Legend */}
              <div className="space-y-2">
                {channelData.map((item, index) => (
                  <div key={index} className="flex items-center">
                    <div className="w-3 h-3 rounded-sm mr-2" style={{ backgroundColor: item.color }}></div>
                    <div className="text-sm text-gray-700">{item.name}</div>
                    <div className="text-sm font-medium ml-auto">{item.value}%</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Recent Reports */}
      <div>
        <h2 className="text-lg font-medium mb-4">Recent Reports</h2>
        
        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Report Name</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date Range</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Generated On</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <FileText size={16} className="text-gray-500 mr-2" />
                      <div className="text-sm font-medium text-gray-900">Daily Collection Report</div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">DCR & DBS</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">May 1 - May 31, 2023</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">Jun 1, 2023</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                      Completed
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <button className="text-deep-blue hover:text-blue-800 mr-3">View</button>
                    <button className="text-deep-blue hover:text-blue-800">Download</button>
                  </td>
                </tr>
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <FileText size={16} className="text-gray-500 mr-2" />
                      <div className="text-sm font-medium text-gray-900">Digital Payments Summary</div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">Digital Payments</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">May 15 - May 31, 2023</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">Jun 1, 2023</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                      Completed
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <button className="text-deep-blue hover:text-blue-800 mr-3">View</button>
                    <button className="text-deep-blue hover:text-blue-800">Download</button>
                  </td>
                </tr>
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <FileText size={16} className="text-gray-500 mr-2" />
                      <div className="text-sm font-medium text-gray-900">UPI AutoPay Mandates</div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">Mandates</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">Apr 1 - Apr 30, 2023</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">May 2, 2023</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                      Completed
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <button className="text-deep-blue hover:text-blue-800 mr-3">View</button>
                    <button className="text-deep-blue hover:text-blue-800">Download</button>
                  </td>
                </tr>
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <RefreshCw size={16} className="text-gray-500 mr-2" />
                      <div className="text-sm font-medium text-gray-900">Failed Transactions Report</div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">Exceptions</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">May 25 - May 31, 2023</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">Jun 1, 2023</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">
                      In Progress
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <button className="text-gray-400 cursor-not-allowed mr-3">View</button>
                    <button className="text-gray-400 cursor-not-allowed">Download</button>
                  </td>
                </tr>
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <Clock size={16} className="text-gray-500 mr-2" />
                      <div className="text-sm font-medium text-gray-900">System Performance Report</div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">System Performance</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">May 1 - May 31, 2023</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">Jun 1, 2023</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-amber-100 text-amber-800">
                      Scheduled
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <button className="text-gray-400 cursor-not-allowed mr-3">View</button>
                    <button className="text-gray-400 cursor-not-allowed">Download</button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="px-6 py-3 bg-gray-50 border-t border-gray-200 flex items-center justify-between">
            <div className="text-sm text-gray-700">
              Showing <span className="font-medium">1</span> to <span className="font-medium">5</span> of <span className="font-medium">24</span> results
            </div>
            <div className="flex items-center space-x-2">
              <button className="px-3 py-1 border border-gray-300 rounded-md text-sm text-gray-700 bg-white">
                Previous
              </button>
              <button className="px-3 py-1 border border-gray-300 rounded-md text-sm bg-deep-blue text-white">
                1
              </button>
              <button className="px-3 py-1 border border-gray-300 rounded-md text-sm text-gray-700 bg-white">
                2
              </button>
              <button className="px-3 py-1 border border-gray-300 rounded-md text-sm text-gray-700 bg-white">
                3
              </button>
              <button className="px-3 py-1 border border-gray-300 rounded-md text-sm text-gray-700 bg-white">
                Next
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Reports; 