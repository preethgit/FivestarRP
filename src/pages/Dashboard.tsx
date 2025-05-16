import { Link } from 'react-router-dom';
import { CreditCard, Settings, RefreshCw, ExternalLink } from 'lucide-react';

const Dashboard = () => {
  return (
    <div className="p-6">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Payments Engine Dashboard</h1>
        <p className="text-gray-600">Welcome to the Fivestar Payments Engine</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-medium">Digital Payments</h2>
            <CreditCard className="text-blue-900" size={24} />
          </div>
          <p className="text-gray-600 mb-4">Manage and monitor payments through RazorPay, QR, and BBPS channels.</p>
          <div className="flex justify-between">
            <div>
              <div className="text-2xl font-bold">1,245</div>
              <div className="text-sm text-gray-600">Transactions today</div>
            </div>
            <div>
              <div className="text-2xl font-bold">₹82,456</div>
              <div className="text-sm text-gray-600">Amount collected</div>
            </div>
          </div>
          <div className="mt-4">
            <Link to="/digital-payments" className="text-blue-900 font-medium hover:underline flex items-center">
              <span>View details</span>
              <ExternalLink size={16} className="ml-1" />
            </Link>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-medium">LMS Resilience</h2>
            <Settings className="text-blue-900" size={24} />
          </div>
          <p className="text-gray-600 mb-4">Monitor LMS status and manage transaction queue during downtime.</p>
          <div className="flex items-center mb-4">
            <div className="w-3 h-3 rounded-full bg-yellow-500 mr-2"></div>
            <span className="text-yellow-700 font-medium">Degraded Performance</span>
          </div>
          <div className="flex justify-between">
            <div>
              <div className="text-2xl font-bold">47</div>
              <div className="text-sm text-gray-600">Pending transactions</div>
            </div>
            <div>
              <div className="text-2xl font-bold">842ms</div>
              <div className="text-sm text-gray-600">Response time</div>
            </div>
          </div>
          <div className="mt-4">
            <Link to="/lms-downtime" className="text-blue-900 font-medium hover:underline flex items-center">
              <span>View details</span>
              <ExternalLink size={16} className="ml-1" />
            </Link>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-medium">Transaction Queue</h2>
            <RefreshCw className="text-blue-900" size={24} />
          </div>
          <p className="text-gray-600 mb-4">Manage queued transactions and process manual interventions.</p>
          <div className="flex justify-between">
            <div>
              <div className="text-2xl font-bold">78</div>
              <div className="text-sm text-gray-600">Total transactions</div>
            </div>
            <div>
              <div className="text-2xl font-bold">12</div>
              <div className="text-sm text-gray-600">Require manual push</div>
            </div>
          </div>
          <div className="mt-4">
            <Link to="/transaction-queue" className="text-blue-900 font-medium hover:underline flex items-center">
              <span>View details</span>
              <ExternalLink size={16} className="ml-1" />
            </Link>
          </div>
        </div>
      </div>
      
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h2 className="text-lg font-medium mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Link to="/digital-payments" className="bg-gray-50 hover:bg-gray-100 p-4 rounded-lg border border-gray-200 flex flex-col items-center text-center">
            <CreditCard className="text-blue-900 mb-2" size={24} />
            <span className="font-medium">Digital Payments</span>
            <span className="text-sm text-gray-600">Monitor and manage payments</span>
          </Link>
          
          <Link to="/lms-downtime" className="bg-gray-50 hover:bg-gray-100 p-4 rounded-lg border border-gray-200 flex flex-col items-center text-center">
            <Settings className="text-blue-900 mb-2" size={24} />
            <span className="font-medium">LMS Resilience</span>
            <span className="text-sm text-gray-600">Check system status</span>
          </Link>
          
          <Link to="/transaction-queue" className="bg-gray-50 hover:bg-gray-100 p-4 rounded-lg border border-gray-200 flex flex-col items-center text-center">
            <RefreshCw className="text-blue-900 mb-2" size={24} />
            <span className="font-medium">Transaction Queue</span>
            <span className="text-sm text-gray-600">Manage queued transactions</span>
          </Link>
          
          <div className="bg-gray-50 hover:bg-gray-100 p-4 rounded-lg border border-gray-200 flex flex-col items-center text-center cursor-pointer">
            <ExternalLink className="text-blue-900 mb-2" size={24} />
            <span className="font-medium">Reports</span>
            <span className="text-sm text-gray-600">View payment reports</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;