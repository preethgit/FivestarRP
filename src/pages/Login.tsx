import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Eye, EyeOff, AlertCircle } from 'lucide-react';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  const navigate = useNavigate();
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!username.trim() || !password.trim()) {
      setError('Please enter both username and password.');
      return;
    }
    
    setIsLoading(true);
    setError('');
    
    // Simulate login - in a real app this would call an API
    setTimeout(() => {
      setIsLoading(false);
      
      // For demo purposes, hardcode a success condition
      if (username === 'demo' && password === 'password') {
        // Redirect to MFA verification
        navigate('/auth/mfa');
      } else {
        setError('Invalid username or password. Please try again.');
      }
    }, 1000);
  };
  
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      {/* Header with logo */}
      <header className="bg-white py-4 px-6 border-b border-gray-200">
        <div className="max-w-7xl mx-auto">
          <div className="h-12 flex items-center justify-center px-4">
            <img src="/static/images/fivestar_logo.png" alt="Fivestar Logo" className="h-8" />
          </div>
        </div>
      </header>
      
      {/* Main content */}
      <div className="flex-1 flex items-center justify-center p-6">
        <div className="bg-white rounded-lg shadow-lg max-w-md w-full overflow-hidden">
          <div className="bg-blue-900 p-4 text-center">
            <h1 className="text-white text-xl font-bold">Payments Engine Login</h1>
          </div>
          
          <div className="p-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Sign in to your account</h2>
            
            {error && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-3 mb-6 flex items-start">
                <AlertCircle size={18} className="text-red-600 mt-0.5 mr-2 flex-shrink-0" />
                <span className="text-red-800 text-sm">{error}</span>
              </div>
            )}
            
            <form onSubmit={handleSubmit}>
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Username
                </label>
                <input
                  type="text"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-900"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="Enter your username"
                  disabled={isLoading}
                />
              </div>
              
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Password
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-900"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter your password"
                    disabled={isLoading}
                  />
                  <button
                    type="button"
                    className="absolute right-3 top-2 text-gray-500"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>
              </div>
              
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center">
                  <input
                    id="remember-me"
                    type="checkbox"
                    className="h-4 w-4 text-blue-900 focus:ring-blue-500 border-gray-300 rounded"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    disabled={isLoading}
                  />
                  <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-700">
                    Remember me
                  </label>
                </div>
                
                <a href="#" className="text-sm text-blue-900 hover:underline">
                  Forgot password?
                </a>
              </div>
              
              <button
                type="submit"
                className="w-full bg-blue-900 text-white py-3 rounded-lg hover:bg-opacity-90 disabled:opacity-70 disabled:cursor-not-allowed"
                disabled={isLoading}
              >
                {isLoading ? "Signing in..." : "Sign in"}
              </button>
            </form>
            
            <div className="mt-6 text-center">
              <p className="text-gray-600 text-sm">
                Need help? Contact your system administrator or call support at +91 44-4351-5000
              </p>
            </div>
          </div>
        </div>
      </div>
      
      {/* Footer */}
      <footer className="bg-white py-4 px-6 border-t border-gray-200">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center text-sm text-gray-600">
            <div className="mb-2 md:mb-0">
              © 2025 Five Star Business Finance Limited. All rights reserved.
            </div>
            <div className="flex space-x-4">
              <a href="#" className="hover:text-blue-900">Privacy Policy</a>
              <a href="#" className="hover:text-blue-900">Terms of Service</a>
              <a href="#" className="hover:text-blue-900">Help Center</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Login;