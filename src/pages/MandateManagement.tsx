import { useState } from 'react';
import { ChevronRight, Search, Filter, Download, Upload, Check, AlertTriangle, X, RefreshCw, Eye, Edit, Trash2, MoreHorizontal, Calendar, CreditCard, FileText, User, DollarSign, Clock, CheckCircle, XCircle } from 'lucide-react';

// Mock data for the mandates table
const mockMandates = [
  {
    id: 'MAN2023001',
    customerName: 'Rajesh Kumar',
    loanId: 'L00045678',
    mandateType: 'UPI',
    bankAccount: '',
    upiId: 'rajesh@okhdfcbank',
    amount: 5000,
    frequency: 'Monthly',
    nextDebitDate: '2025-06-01',
    status: 'Active',
    registeredOn: '2025-01-15'
  },
  {
    id: 'MAN2023002',
    customerName: 'Sunita Patel',
    loanId: 'L00045712',
    mandateType: 'UPI',
    bankAccount: '',
    upiId: 'sunita@icici',
    amount: 7500,
    frequency: 'Monthly',
    nextDebitDate: '2025-06-05',
    status: 'Active',
    registeredOn: '2025-01-20'
  },
  {
    id: 'MAN2023003',
    customerName: 'Vijay Singh',
    loanId: 'L00045892',
    mandateType: 'NACH',
    bankAccount: 'XXXX6789',
    upiId: '',
    amount: 12000,
    frequency: 'Monthly',
    nextDebitDate: '2025-06-10',
    status: 'Pending Approval',
    registeredOn: '2025-05-22'
  },
  {
    id: 'MAN2023004',
    customerName: 'Manisha Gupta',
    loanId: 'L00045923',
    mandateType: 'NACH',
    bankAccount: 'XXXX4567',
    upiId: '',
    amount: 9000,
    frequency: 'Monthly',
    nextDebitDate: '2025-06-15',
    status: 'Failed',
    registeredOn: '2025-05-20'
  },
  {
    id: 'MAN2023005',
    customerName: 'Amit Sharma',
    loanId: 'L00046001',
    mandateType: 'UPI',
    bankAccount: '',
    upiId: 'amit@ybl',
    amount: 6500,
    frequency: 'Monthly',
    nextDebitDate: '2025-06-10',
    status: 'Active',
    registeredOn: '2025-02-05'
  }
];

// Registration Form Modal Component
const MandateRegistrationForm = ({ isOpen, onClose, mandateType }: { isOpen: boolean, onClose: () => void, mandateType: 'upi' | 'nach' }) => {
  const [step, setStep] = useState(1);
  const [loanId, setLoanId] = useState('');
  const [customerInfo, setCustomerInfo] = useState<any>(null);
  const [nameMatch, setNameMatch] = useState(0);
  const [upiId, setUpiId] = useState('');
  const [accountNumber, setAccountNumber] = useState('');
  const [ifscCode, setIfscCode] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [isVerified, setIsVerified] = useState(false);
  
  const searchCustomer = () => {
    setIsProcessing(true);
    // Simulate API call
    setTimeout(() => {
      setCustomerInfo({
        name: 'Prakash Mehta',
        loanId: loanId,
        amount: 8500,
        frequency: 'Monthly',
        startDate: '2025-06-01'
      });
      setIsProcessing(false);
      setStep(2);
    }, 1000);
  };
  
  const verifyDetails = () => {
    setIsProcessing(true);
    // Simulate penny drop and verification
    setTimeout(() => {
      setNameMatch(85);
      setIsProcessing(false);
      setStep(3);
    }, 1500);
  };
  
  const finalizeMandate = () => {
    setIsProcessing(true);
    // Simulate mandate creation
    setTimeout(() => {
      setIsVerified(true);
      setIsProcessing(false);
      setStep(4);
    }, 1500);
  };
  
  if (!isOpen) return null;
  
  return (
    <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center">
      <div className="fixed inset-0 bg-black bg-opacity-50 transition-opacity" onClick={onClose}></div>
      
      <div className="relative bg-white rounded-lg max-w-2xl w-full mx-4 shadow-xl">
        {/* Header */}
        <div className="px-6 py-4 border-b border-gray-200">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-medium text-gray-900">
              Register New {mandateType === 'upi' ? 'UPI AutoPay' : 'NACH'} Mandate
            </h3>
            <button
              type="button"
              className="text-gray-400 hover:text-gray-500"
              onClick={onClose}
            >
              <X size={20} />
            </button>
          </div>
        </div>
        
        {/* Progress Steps */}
        <div className="px-6 py-4 border-b border-gray-200">
          <div className="flex justify-between">
            <div className={`flex flex-col items-center ${step >= 1 ? 'text-blue-900' : 'text-gray-400'}`}>
              <div className={`h-8 w-8 rounded-full flex items-center justify-center ${step >= 1 ? 'bg-blue-100' : 'bg-gray-100'}`}>
                <User size={16} className={step >= 1 ? 'text-blue-900' : 'text-gray-400'} />
              </div>
              <span className="text-xs mt-1">Customer</span>
            </div>
            <div className="flex-1 flex items-center">
              <div className={`h-1 w-full ${step >= 2 ? 'bg-blue-900' : 'bg-gray-200'}`}></div>
            </div>
            <div className={`flex flex-col items-center ${step >= 2 ? 'text-blue-900' : 'text-gray-400'}`}>
              <div className={`h-8 w-8 rounded-full flex items-center justify-center ${step >= 2 ? 'bg-blue-100' : 'bg-gray-100'}`}>
                <CreditCard size={16} className={step >= 2 ? 'text-blue-900' : 'text-gray-400'} />
              </div>
              <span className="text-xs mt-1">Details</span>
            </div>
            <div className="flex-1 flex items-center">
              <div className={`h-1 w-full ${step >= 3 ? 'bg-blue-900' : 'bg-gray-200'}`}></div>
            </div>
            <div className={`flex flex-col items-center ${step >= 3 ? 'text-blue-900' : 'text-gray-400'}`}>
              <div className={`h-8 w-8 rounded-full flex items-center justify-center ${step >= 3 ? 'bg-blue-100' : 'bg-gray-100'}`}>
                <Check size={16} className={step >= 3 ? 'text-blue-900' : 'text-gray-400'} />
              </div>
              <span className="text-xs mt-1">Verification</span>
            </div>
            <div className="flex-1 flex items-center">
              <div className={`h-1 w-full ${step >= 4 ? 'bg-blue-900' : 'bg-gray-200'}`}></div>
            </div>
            <div className={`flex flex-col items-center ${step >= 4 ? 'text-blue-900' : 'text-gray-400'}`}>
              <div className={`h-8 w-8 rounded-full flex items-center justify-center ${step >= 4 ? 'bg-blue-100' : 'bg-gray-100'}`}>
                <CheckCircle size={16} className={step >= 4 ? 'text-blue-900' : 'text-gray-400'} />
              </div>
              <span className="text-xs mt-1">Complete</span>
            </div>
          </div>
        </div>
        
        {/* Content */}
        <div className="px-6 py-6">
          {/* Step 1: Customer Search */}
          {step === 1 && (
            <div>
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Enter Loan ID
                </label>
                <div className="flex">
                  <input
                    type="text"
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-900"
                    placeholder="e.g. L00045678"
                    value={loanId}
                    onChange={(e) => setLoanId(e.target.value)}
                    disabled={isProcessing}
                  />
                  <button
                    className="ml-2 px-4 py-2 bg-blue-900 text-white rounded-lg hover:bg-opacity-90 disabled:opacity-50"
                    onClick={searchCustomer}
                    disabled={!loanId || isProcessing}
                  >
                    {isProcessing ? 'Searching...' : 'Search'}
                  </button>
                </div>
                <p className="text-xs text-gray-500 mt-2">
                  Enter the loan ID to fetch customer details
                </p>
              </div>
            </div>
          )}
          
          {/* Step 2: Mandate Details */}
          {step === 2 && customerInfo && (
            <div>
              <div className="bg-gray-50 p-4 rounded-lg mb-6">
                <h4 className="text-sm font-medium text-gray-700 mb-2">Customer Details</h4>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-xs text-gray-500">Name</p>
                    <p className="text-sm font-medium">{customerInfo.name}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Loan ID</p>
                    <p className="text-sm font-medium">{customerInfo.loanId}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">EMI Amount</p>
                    <p className="text-sm font-medium">₹{customerInfo.amount.toLocaleString()}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Frequency</p>
                    <p className="text-sm font-medium">{customerInfo.frequency}</p>
                  </div>
                </div>
              </div>
              
              <div className="mb-6">
                <h4 className="text-sm font-medium text-gray-700 mb-4">Payment Details</h4>
                
                {mandateType === 'upi' ? (
                  <div className="mb-6">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      UPI ID
                    </label>
                    <input
                      type="text"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-900"
                      placeholder="e.g. name@upi"
                      value={upiId}
                      onChange={(e) => setUpiId(e.target.value)}
                      disabled={isProcessing}
                    />
                    <p className="text-xs text-gray-500 mt-2">
                      Enter customer's UPI ID for auto-debit
                    </p>
                  </div>
                ) : (
                  <>
                    <div className="mb-4">
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Account Number
                      </label>
                      <input
                        type="text"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-900"
                        placeholder="Enter bank account number"
                        value={accountNumber}
                        onChange={(e) => setAccountNumber(e.target.value)}
                        disabled={isProcessing}
                      />
                    </div>
                    <div className="mb-4">
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        IFSC Code
                      </label>
                      <input
                        type="text"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-900"
                        placeholder="Enter IFSC code"
                        value={ifscCode}
                        onChange={(e) => setIfscCode(e.target.value)}
                        disabled={isProcessing}
                      />
                    </div>
                  </>
                )}
              </div>
              
              <div className="flex justify-end space-x-2">
                <button
                  className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300"
                  onClick={() => setStep(1)}
                  disabled={isProcessing}
                >
                  Back
                </button>
                <button
                  className="px-4 py-2 bg-blue-900 text-white rounded-lg hover:bg-opacity-90 disabled:opacity-50"
                  onClick={verifyDetails}
                  disabled={(mandateType === 'upi' && !upiId) || 
                            (mandateType === 'nach' && (!accountNumber || !ifscCode)) || 
                            isProcessing}
                >
                  {isProcessing ? 'Processing...' : 'Verify & Proceed'}
                </button>
              </div>
            </div>
          )}
          
          {/* Step 3: Verification */}
          {step === 3 && (
            <div>
              <div className="bg-blue-50 p-4 rounded-lg mb-6">
                <h4 className="text-sm font-medium text-blue-900 mb-2">Penny Drop Verification</h4>
                <p className="text-sm text-blue-800">
                  A test transaction of ₹1 was sent to the account to verify its validity. The amount will be refunded.
                </p>
              </div>
              
              <div className="mb-6">
                <h4 className="text-sm font-medium text-gray-700 mb-4">Name Matching</h4>
                
                <div className="flex items-center justify-between mb-2">
                  <div>
                    <p className="text-xs text-gray-500">Loan Account Name</p>
                    <p className="text-sm font-medium">Prakash Mehta</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 text-right">Bank Account Name</p>
                    <p className="text-sm font-medium">Prakash S Mehta</p>
                  </div>
                </div>
                
                <div className="relative pt-1 mb-2">
                  <div className="flex justify-between mb-1">
                    <span className="text-xs font-medium text-blue-900">Match Score: {nameMatch}%</span>
                    <span className="text-xs font-medium text-blue-900">
                      {nameMatch >= 70 ? 'Acceptable' : 'Needs Review'}
                    </span>
                  </div>
                  <div className="overflow-hidden h-2 text-xs flex rounded bg-gray-200">
                    <div 
                      style={{ width: `${nameMatch}%` }} 
                      className={`shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center ${
                        nameMatch >= 70 ? 'bg-green-500' : 'bg-amber-500'
                      }`}>
                    </div>
                  </div>
                  <div className="absolute h-full w-px bg-red-500 top-0" style={{ left: '70%' }}></div>
                </div>
                
                <p className="text-xs text-gray-500 mt-2">
                  A match score of 70% or above is required for automated approval.
                </p>
              </div>
              
              <div className="flex justify-end space-x-2">
                <button
                  className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300"
                  onClick={() => setStep(2)}
                  disabled={isProcessing}
                >
                  Back
                </button>
                <button
                  className="px-4 py-2 bg-blue-900 text-white rounded-lg hover:bg-opacity-90 disabled:opacity-50"
                  onClick={finalizeMandate}
                  disabled={isProcessing}
                >
                  {isProcessing ? 'Processing...' : 'Finalize Mandate'}
                </button>
              </div>
            </div>
          )}
          
          {/* Step 4: Completion */}
          {step === 4 && (
            <div className="text-center">
              <div className="rounded-full h-16 w-16 bg-green-100 flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="h-10 w-10 text-green-600" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">Mandate Created Successfully</h3>
              <p className="text-sm text-gray-600 mb-6">
                The {mandateType === 'upi' ? 'UPI AutoPay' : 'NACH'} mandate has been created and is pending approval.
              </p>
              
              <div className="bg-gray-50 p-4 rounded-lg text-left mb-6">
                <h4 className="text-sm font-medium text-gray-700 mb-2">Mandate Details</h4>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-xs text-gray-500">Mandate ID</p>
                    <p className="text-sm font-medium">MAN2023006</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Status</p>
                    <p className="text-sm font-medium">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-amber-100 text-amber-800">
                        Pending Approval
                      </span>
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Customer</p>
                    <p className="text-sm font-medium">Prakash Mehta</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Amount</p>
                    <p className="text-sm font-medium">₹8,500</p>
                  </div>
                </div>
              </div>
              
              <div className="flex justify-end">
                <button
                  className="px-4 py-2 bg-blue-900 text-white rounded-lg hover:bg-opacity-90"
                  onClick={onClose}
                >
                  Close
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const MandateManagement = () => {
  // State management
  const [activeTab, setActiveTab] = useState<'upi' | 'nach'>('upi');
  const [searchQuery, setSearchQuery] = useState('');
  const [showRegisterForm, setShowRegisterForm] = useState(false);
  const [selectedMandate, setSelectedMandate] = useState<string | null>(null);
  
  // Filtered mandates based on active tab and search query
  const filteredMandates = mockMandates.filter(mandate => {
    // Filter by tab
    if (activeTab === 'upi' && mandate.mandateType !== 'UPI') return false;
    if (activeTab === 'nach' && mandate.mandateType !== 'NACH') return false;
    
    // Filter by search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      return (
        mandate.customerName.toLowerCase().includes(query) ||
        mandate.loanId.toLowerCase().includes(query) ||
        mandate.id.toLowerCase().includes(query)
      );
    }
    
    return true;
  });
  
  // Status color mapping
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Active':
        return 'bg-green-100 text-green-800';
      case 'Pending Approval':
        return 'bg-amber-100 text-amber-800';
      case 'Failed':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };
  
  return (
    <div className="h-full flex flex-col">
      {/* Page Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="px-6 py-4">
          <h1 className="text-2xl font-bold text-gray-900">AutoPay Mandate Management</h1>
          <p className="text-gray-600">Register and manage UPI AutoPay and NACH mandates for loan repayments</p>
        </div>
        
        {/* Breadcrumb */}
        <div className="px-6 py-2 bg-gray-50 border-t border-b border-gray-200">
          <div className="flex items-center text-sm text-gray-600">
            <a href="#" className="hover:text-blue-900">Dashboard</a>
            <ChevronRight size={16} className="mx-2" />
            <span className="text-gray-800 font-medium">Mandate Management</span>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-6 bg-gray-50 overflow-auto">
        {/* Tabs and Actions */}
        <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-6">
          {/* Tabs */}
          <div className="flex border-b border-gray-200 mb-4 md:mb-0">
            <button
              className={`px-4 py-2 text-sm font-medium ${
                activeTab === 'upi'
                  ? 'text-blue-900 border-b-2 border-blue-900'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
              onClick={() => setActiveTab('upi')}
            >
              UPI AutoPay
            </button>
            <button
              className={`px-4 py-2 text-sm font-medium ${
                activeTab === 'nach'
                  ? 'text-blue-900 border-b-2 border-blue-900'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
              onClick={() => setActiveTab('nach')}
            >
              NACH Mandates
            </button>
          </div>
          
          {/* Action Buttons */}
          <div className="flex space-x-2">
            <button
              className="px-4 py-2 text-sm bg-blue-900 text-white rounded-lg hover:bg-opacity-90 flex items-center"
              onClick={() => setShowRegisterForm(true)}
            >
              <Upload size={16} className="mr-2" />
              Register New Mandate
            </button>
            <button
              className="px-4 py-2 text-sm bg-white border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 flex items-center"
            >
              <Download size={16} className="mr-2" />
              Export
            </button>
          </div>
        </div>
        
        {/* Summary Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          {/* Total Active Mandates */}
          <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm text-gray-500 font-medium">Total Active Mandates</p>
                <p className="text-2xl font-bold text-gray-900 mt-1">1,245</p>
                <p className="text-xs text-green-600 mt-1 flex items-center">
                  <span className="inline-block mr-1">↑</span> 12% from last month
                </p>
              </div>
              <div className="p-2 rounded-full bg-blue-50">
                <Check className="h-5 w-5 text-blue-900" />
              </div>
            </div>
          </div>
          
          {/* Pending Approvals */}
          <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm text-gray-500 font-medium">Pending Approvals</p>
                <p className="text-2xl font-bold text-gray-900 mt-1">36</p>
                <p className="text-xs text-amber-600 mt-1 flex items-center">
                  <span className="inline-block mr-1">↑</span> 4% from yesterday
                </p>
              </div>
              <div className="p-2 rounded-full bg-amber-50">
                <AlertTriangle className="h-5 w-5 text-amber-600" />
              </div>
            </div>
          </div>
          
          {/* Failed Mandates */}
          <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm text-gray-500 font-medium">Failed Mandates</p>
                <p className="text-2xl font-bold text-gray-900 mt-1">18</p>
                <p className="text-xs text-red-600 mt-1 flex items-center">
                  <span className="inline-block mr-1">↓</span> 2% from last month
                </p>
              </div>
              <div className="p-2 rounded-full bg-red-50">
                <X className="h-5 w-5 text-red-600" />
              </div>
            </div>
          </div>
          
          {/* Upcoming Auto-Debits */}
          <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm text-gray-500 font-medium">Upcoming Auto-Debits</p>
                <p className="text-2xl font-bold text-gray-900 mt-1">87</p>
                <p className="text-xs text-gray-600 mt-1">Next 7 days</p>
              </div>
              <div className="p-2 rounded-full bg-purple-50">
                <Calendar className="h-5 w-5 text-purple-600" />
              </div>
            </div>
          </div>
        </div>
        
        {/* Search and Filters */}
        <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200 mb-6">
          <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-4">
            <div className="relative flex-1">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search size={18} className="text-gray-400" />
              </div>
              <input
                type="text"
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-900"
                placeholder="Search by customer name, loan ID or mandate ID"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <div className="flex space-x-2">
              <button className="px-4 py-2 text-sm bg-white border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 flex items-center">
                <Filter size={16} className="mr-2" />
                Filters
              </button>
              <button 
                className="px-4 py-2 text-sm bg-white border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 flex items-center"
                onClick={() => setSearchQuery('')}
              >
                <RefreshCw size={16} className="mr-2" />
                Reset
              </button>
            </div>
          </div>
        </div>
        
        {/* Mandates Table */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Mandate ID
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Customer Name
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Loan ID
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    {activeTab === 'upi' ? 'UPI ID' : 'Bank Account'}
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Amount
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Next Debit
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
                {filteredMandates.map((mandate) => (
                  <tr key={mandate.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {mandate.id}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                      {mandate.customerName}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                      {mandate.loanId}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                      {activeTab === 'upi' ? mandate.upiId : mandate.bankAccount}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                      ₹{mandate.amount.toLocaleString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                      {new Date(mandate.nextDebitDate).toLocaleDateString('en-IN', {
                        day: 'numeric',
                        month: 'short',
                        year: 'numeric'
                      })}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(mandate.status)}`}>
                        {mandate.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                      <div className="flex items-center space-x-2">
                        <button 
                          className="text-blue-600 hover:text-blue-900"
                          onClick={() => setSelectedMandate(mandate.id)}
                        >
                          <Eye size={18} />
                        </button>
                        <button className="text-gray-500 hover:text-gray-700">
                          <Edit size={18} />
                        </button>
                        <button className="text-red-500 hover:text-red-700">
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          {/* Pagination */}
          <div className="px-6 py-3 border-t border-gray-200 flex items-center justify-between">
            <div className="text-sm text-gray-700">
              Showing <span className="font-medium">1</span> to <span className="font-medium">5</span> of <span className="font-medium">25</span> results
            </div>
            <div className="flex items-center space-x-2">
              <button className="px-2 py-1 border border-gray-300 rounded-md text-sm text-gray-700 hover:bg-gray-50 disabled:opacity-50" disabled>
                Previous
              </button>
              <button className="px-2 py-1 border border-gray-300 rounded-md text-sm text-gray-700 hover:bg-gray-50">
                Next
              </button>
            </div>
          </div>
        </div>
        
        {/* Registration Form Modal */}
        {showRegisterForm && (
          <MandateRegistrationForm 
            isOpen={showRegisterForm} 
            onClose={() => setShowRegisterForm(false)} 
            mandateType={activeTab}
          />
        )}
      </div>
    </div>
  );
};

export default MandateManagement; 