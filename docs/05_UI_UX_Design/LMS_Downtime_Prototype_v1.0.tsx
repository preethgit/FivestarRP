import React, { useState } from 'react';
import { 
  Bell, 
  ChevronDown, 
  ChevronRight, 
  HelpCircle, 
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

/**
 * LMS Downtime Handling & Resiliency Component
 * 
 * This React component demonstrates the UX design for handling
 * LMS downtime scenarios in the Fivestar Payments Engine.
 * 
 * Features:
 * - Transaction queue management
 * - Retry configuration
 * - System status monitoring
 * - Manual intervention capabilities
 * - Comprehensive logging and tracking
 * 
 * @version 1.0
 * @author 1CloudHub UX Team
 * @client Fivestar Business Finance
 */
const LMSDowntimeResiliency = () => {
  const [activeTab, setActiveTab] = useState('queue');
  const [statusFilter, setStatusFilter] = useState('all');
  const [lmsStatus, setLmsStatus] = useState('online'); // online, offline, degraded
  
  // Simulate LMS status change after 5 seconds for demo purposes
  React.useEffect(() => {
    const timer = setTimeout(() => {
      setLmsStatus('degraded');
    }, 5000);
    
    return () => clearTimeout(timer);
  }, []);
  
  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      {/* Header with Fivestar Branding */}
      <header className="bg-white shadow px-6 py-4 flex justify-between items-center">
        <div className="flex items-center space-x-4">
          <button className="text-gray-600">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M3 18H21M3 12H21M3 6H21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
          <div className="w-36 h-12 bg-gray-200 flex items-center justify-center">
            <div className="text-xs text-gray-500">FIVESTAR LOGO</div>
          </div>
        </div>
        <div className="flex items-center space-x-4">
          <button className="text-gray-600 relative">
            <Bell size={20} />
            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">3</span>
          </button>
          <button className="text-gray-600">
            <HelpCircle size={20} />
          </button>
          <div className="w-8 h-8 bg-blue-800 rounded-full flex items-center justify-center text-white">
            SP
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 p-6">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900">LMS Downtime Handling & Resiliency</h1>
          <p className="text-gray-600">Manage transaction resilience during LMS downtime and ensure data integrity</p>
        </div>

        {/* Breadcrumb */}
        <div className="flex items-center space-x-2 text-sm mb-6">
          <a href="#" className="text-gray-600">Dashboard</a>
          <ChevronRight size={16} className="text-gray-400" />
          <a href="#" className="text-gray-600">System</a>
          <ChevronRight size={16} className="text-gray-400" />
          <span className="text-gray-900 font-medium">Downtime Resilience</span>
        </div>

        {/* Status Banner */}
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
              <div className="text-3xl font-bold text-gray-900 mr-2">47</div>
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

        {/* Main Interface continues with tabs, tables, and controls... */}
        {/* [Additional UI components would continue here] */}
        
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 py-4 text-center text-gray-600 text-sm">
        <p>© 2025 Five Star Business Finance Limited. All rights reserved.</p>
        <div className="flex justify-center space-x-4 mt-2">
          <a href="#" className="hover:text-gray-900">Privacy Policy</a>
          <a href="#" className="hover:text-gray-900">Terms of Service</a>
          <a href="#" className="hover:text-gray-900">Help Center</a>
        </div>
      </footer>
    </div>
  );
};

export default LMSDowntimeResiliency;