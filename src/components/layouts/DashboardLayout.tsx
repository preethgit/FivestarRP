import { useState } from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import {
  Home,
  CreditCard,
  FileText,
  Settings,
  LogOut,
  Bell,
  HelpCircle,
  Menu,
  User,
  ChevronDown,
  X
} from 'lucide-react';

const DashboardLayout = () => {
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const location = useLocation();
  
  const isActiveLink = (path: string) => {
    return location.pathname === path;
  };
  
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      {/* Top Header with Logo and User Profile */}
      <header className="bg-white border-b border-gray-200">
        <div className="px-4 py-2 flex justify-between items-center">
          {/* Logo */}
          <div className="flex items-center">
            <button 
              className="md:hidden p-2 mr-2 text-gray-600"
              onClick={() => setShowMobileMenu(!showMobileMenu)}
            >
              <Menu size={24} />
            </button>
            <Link to="/" className="h-12 flex items-center justify-center px-2">
              <img src="/static/images/fivestar_logo.png" alt="Fivestar Logo" className="h-8" />
            </Link>
          </div>
          
          {/* Right side controls */}
          <div className="flex items-center space-x-3">
            <button className="p-2 text-gray-600 hover:bg-gray-100 rounded-full relative">
              <Bell size={20} />
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-600 rounded-full"></span>
            </button>
            <button className="p-2 text-gray-600 hover:bg-gray-100 rounded-full">
              <HelpCircle size={20} />
            </button>
            
            {/* User Profile */}
            <div className="relative">
              <button 
                className="flex items-center space-x-2 p-1 hover:bg-gray-100 rounded-lg"
                onClick={() => setShowProfileMenu(!showProfileMenu)}
              >
                <div className="w-8 h-8 rounded-full bg-blue-900 flex items-center justify-center text-white font-medium">
                  SP
                </div>
                <div className="hidden md:block text-left">
                  <p className="text-sm font-medium">Suresh Patel</p>
                  <p className="text-xs text-gray-600">Finance Team</p>
                </div>
                <ChevronDown size={16} className="hidden md:block text-gray-500" />
              </button>
              
              {showProfileMenu && (
                <div className="absolute right-0 mt-1 w-48 bg-white rounded-lg shadow-lg border border-gray-200 z-10">
                  <div className="p-3 border-b border-gray-200">
                    <p className="font-medium">Suresh Patel</p>
                    <p className="text-sm text-gray-600">suresh.patel@fivestar.com</p>
                  </div>
                  <div className="p-2">
                    <button className="flex items-center w-full px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-lg">
                      <User size={16} className="mr-2" />
                      <span>My Profile</span>
                    </button>
                    <button className="flex items-center w-full px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-lg">
                      <Settings size={16} className="mr-2" />
                      <span>Settings</span>
                    </button>
                    <button className="flex items-center w-full px-3 py-2 text-sm text-red-600 hover:bg-red-50 rounded-lg">
                      <LogOut size={16} className="mr-2" />
                      <span>Sign Out</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </header>
      
      {/* Navigation and Content */}
      <div className="flex flex-1">
        {/* Sidebar Navigation - Desktop */}
        <aside className="hidden md:block w-64 bg-white border-r border-gray-200">
          <div className="p-4">
            <nav className="space-y-1">
              <Link 
                to="/" 
                className={`flex items-center px-3 py-2 rounded-lg ${
                  isActiveLink('/') 
                    ? 'text-blue-900 bg-blue-50' 
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                <Home size={20} className="mr-3" />
                <span>Dashboard</span>
              </Link>
              <Link 
                to="/digital-payments" 
                className={`flex items-center px-3 py-2 rounded-lg ${
                  isActiveLink('/digital-payments') 
                    ? 'text-blue-900 bg-blue-50' 
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                <CreditCard size={20} className="mr-3" />
                <span>Digital Payments</span>
              </Link>
              <Link
                to="/mandates"
                className={`flex items-center px-3 py-2 rounded-lg ${
                  isActiveLink('/mandates')
                    ? 'text-blue-900 bg-blue-50'
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                <CreditCard size={20} className="mr-3" />
                <span>Mandates</span>
              </Link>
              <Link
                to="/reports"
                className={`flex items-center px-3 py-2 rounded-lg ${
                  isActiveLink('/reports')
                    ? 'text-blue-900 bg-blue-50'
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                <FileText size={20} className="mr-3" />
                <span>Reports</span>
              </Link>
              <Link 
                to="/lms-downtime" 
                className={`flex items-center px-3 py-2 rounded-lg ${
                  isActiveLink('/lms-downtime') 
                    ? 'text-blue-900 bg-blue-50' 
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                <Settings size={20} className="mr-3" />
                <span>LMS Resilience</span>
              </Link>
              <Link 
                to="/transaction-queue" 
                className={`flex items-center px-3 py-2 rounded-lg ${
                  isActiveLink('/transaction-queue') 
                    ? 'text-blue-900 bg-blue-50' 
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                <Settings size={20} className="mr-3" />
                <span>Transaction Queue</span>
              </Link>
            </nav>
          </div>
        </aside>
        
        {/* Mobile Navigation Menu */}
        {showMobileMenu && (
          <div className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden">
            <div className="w-64 h-full bg-white">
              <div className="p-4 border-b border-gray-200 flex justify-between items-center">
                <Link to="/" className="h-8 flex items-center justify-center px-2">
                  <img src="/static/images/fivestar_logo.png" alt="Fivestar Logo" className="h-6" />
                </Link>
                <button 
                  className="p-2 text-gray-600"
                  onClick={() => setShowMobileMenu(false)}
                >
                  <X size={20} />
                </button>
              </div>
              <div className="p-4">
                <nav className="space-y-1">
                  <Link 
                    to="/" 
                    className={`flex items-center px-3 py-2 rounded-lg ${
                      isActiveLink('/') 
                        ? 'text-blue-900 bg-blue-50' 
                        : 'text-gray-700 hover:bg-gray-100'
                    }`}
                    onClick={() => setShowMobileMenu(false)}
                  >
                    <Home size={20} className="mr-3" />
                    <span>Dashboard</span>
                  </Link>
                  <Link 
                    to="/digital-payments" 
                    className={`flex items-center px-3 py-2 rounded-lg ${
                      isActiveLink('/digital-payments') 
                        ? 'text-blue-900 bg-blue-50' 
                        : 'text-gray-700 hover:bg-gray-100'
                    }`}
                    onClick={() => setShowMobileMenu(false)}
                  >
                    <CreditCard size={20} className="mr-3" />
                    <span>Digital Payments</span>
                  </Link>
                  <Link
                    to="/mandates"
                    className={`flex items-center px-3 py-2 rounded-lg ${
                      isActiveLink('/mandates')
                        ? 'text-blue-900 bg-blue-50'
                        : 'text-gray-700 hover:bg-gray-100'
                    }`}
                    onClick={() => setShowMobileMenu(false)}
                  >
                    <CreditCard size={20} className="mr-3" />
                    <span>Mandates</span>
                  </Link>
                  <Link
                    to="/reports"
                    className={`flex items-center px-3 py-2 rounded-lg ${
                      isActiveLink('/reports')
                        ? 'text-blue-900 bg-blue-50'
                        : 'text-gray-700 hover:bg-gray-100'
                    }`}
                    onClick={() => setShowMobileMenu(false)}
                  >
                    <FileText size={20} className="mr-3" />
                    <span>Reports</span>
                  </Link>
                  <Link 
                    to="/lms-downtime" 
                    className={`flex items-center px-3 py-2 rounded-lg ${
                      isActiveLink('/lms-downtime') 
                        ? 'text-blue-900 bg-blue-50' 
                        : 'text-gray-700 hover:bg-gray-100'
                    }`}
                    onClick={() => setShowMobileMenu(false)}
                  >
                    <Settings size={20} className="mr-3" />
                    <span>LMS Resilience</span>
                  </Link>
                  <Link 
                    to="/transaction-queue" 
                    className={`flex items-center px-3 py-2 rounded-lg ${
                      isActiveLink('/transaction-queue') 
                        ? 'text-blue-900 bg-blue-50' 
                        : 'text-gray-700 hover:bg-gray-100'
                    }`}
                    onClick={() => setShowMobileMenu(false)}
                  >
                    <Settings size={20} className="mr-3" />
                    <span>Transaction Queue</span>
                  </Link>
                </nav>
              </div>
            </div>
          </div>
        )}
        
        {/* Main Content */}
        <main className="flex-1 overflow-auto">
          <Outlet />
        </main>
      </div>
      
      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 py-4 px-6">
        <div className="flex flex-col md:flex-row md:justify-between items-center text-sm text-gray-600">
          <div className="mb-2 md:mb-0">
            © 2025 Five Star Business Finance Limited. All rights reserved.
          </div>
          <div className="flex space-x-4">
            <a href="#" className="hover:text-blue-900">Privacy Policy</a>
            <a href="#" className="hover:text-blue-900">Terms of Service</a>
            <a href="#" className="hover:text-blue-900">Help Center</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default DashboardLayout;