import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Shield, ArrowLeft, AlertCircle } from 'lucide-react';

const MultiFactorAuth = () => {
  const [otpValues, setOtpValues] = useState(['', '', '', '', '', '']);
  const [timeRemaining, setTimeRemaining] = useState(180); // 3 minutes in seconds
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const inputRefs = Array(6).fill(0).map(() => useRef<HTMLInputElement>(null));
  const navigate = useNavigate();

  // Format remaining time as MM:SS
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60).toString().padStart(2, '0');
    const secs = (seconds % 60).toString().padStart(2, '0');
    return `${mins}:${secs}`;
  };

  // Timer countdown effect
  useEffect(() => {
    if (timeRemaining <= 0) return;
    
    const timer = setTimeout(() => {
      setTimeRemaining(timeRemaining - 1);
    }, 1000);
    
    return () => clearTimeout(timer);
  }, [timeRemaining]);

  // Handle OTP input change
  const handleOtpChange = (index: number, value: string) => {
    // Only allow numbers
    if (!/^\\d*$/.test(value)) return;
    
    const newOtpValues = [...otpValues];
    newOtpValues[index] = value;
    setOtpValues(newOtpValues);
    
    // Auto focus to next input
    if (value && index < 5 && inputRefs[index + 1].current) {
      inputRefs[index + 1].current?.focus();
    }
  };

  // Handle key press for backspace
  const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === 'Backspace' && !otpValues[index] && index > 0 && inputRefs[index - 1].current) {
      inputRefs[index - 1].current?.focus();
    }
  };

  // Handle paste event for OTP
  const handlePaste = (e: React.ClipboardEvent) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData('text');
    if (!/^\\d+$/.test(pastedData)) return;
    
    const digits = pastedData.slice(0, 6).split('');
    const newOtpValues = [...otpValues];
    
    digits.forEach((digit, index) => {
      if (index < 6) newOtpValues[index] = digit;
    });
    
    setOtpValues(newOtpValues);
    
    if (digits.length > 0 && digits.length < 6 && inputRefs[digits.length].current) {
      inputRefs[digits.length].current?.focus();
    }
  };

  // Verify OTP
  const verifyOtp = () => {
    const otp = otpValues.join('');
    if (otp.length !== 6) {
      setError('Please enter all 6 digits');
      return;
    }
    
    setLoading(true);
    setError('');
    
    // Simulate verification process
    setTimeout(() => {
      setLoading(false);
      
      // Simulating successful verification
      if (otp === '123456') {
        console.log('OTP verification successful');
        // Redirect to dashboard
        navigate('/');
      } else {
        setError('Invalid verification code. Please try again.');
      }
    }, 1000);
  };

  // Request a new OTP
  const requestNewOtp = () => {
    setTimeRemaining(180);
    setOtpValues(['', '', '', '', '', '']);
    setError('');
    
    // Simulate sending a new OTP
    setTimeout(() => {
      console.log('New OTP sent');
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      {/* Header with logo */}
      <header className="bg-white py-4 px-6 border-b border-gray-200">
        <div className="max-w-7xl mx-auto">
          <div className="h-12 flex items-center justify-center bg-gray-200 px-4">
            <span className="text-gray-700 font-bold">FIVESTAR</span>
          </div>
        </div>
      </header>
      
      {/* Main content */}
      <div className="flex-1 flex items-center justify-center p-6">
        <div className="bg-white rounded-lg shadow-lg max-w-md w-full overflow-hidden">
          <div className="bg-blue-900 p-4 text-center">
            <h1 className="text-white text-xl font-bold">Two-Factor Authentication</h1>
          </div>
          
          <div className="p-8">
            <button 
              className="flex items-center text-blue-900 mb-6 hover:underline"
              onClick={() => navigate('/login')}
            >
              <ArrowLeft size={16} className="mr-1" />
              <span>Back to login</span>
            </button>
            
            <div className="mb-8 text-center">
              <div className="inline-flex justify-center items-center w-16 h-16 bg-blue-100 rounded-full mb-4">
                <Shield size={32} className="text-blue-900" />
              </div>
              <h2 className="text-2xl font-bold text-gray-800 mb-2">Verification Required</h2>
              <p className="text-gray-600">
                We've sent a 6-digit verification code to your registered mobile number ending in ****7890
              </p>
            </div>
            
            {error && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-3 mb-6 flex items-start">
                <AlertCircle size={18} className="text-red-600 mt-0.5 mr-2 flex-shrink-0" />
                <span className="text-red-800 text-sm">{error}</span>
              </div>
            )}
            
            <div className="mb-8">
              <label className="block text-sm font-medium text-gray-700 mb-3">Enter Verification Code</label>
              <div className="flex justify-between gap-2">
                {otpValues.map((value, index) => (
                  <input
                    key={index}
                    ref={inputRefs[index]}
                    type="text"
                    maxLength={1}
                    className="w-12 h-12 text-center text-xl font-bold border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-900"
                    value={value}
                    onChange={(e) => handleOtpChange(index, e.target.value)}
                    onKeyDown={(e) => handleKeyDown(index, e)}
                    onPaste={index === 0 ? handlePaste : undefined}
                  />
                ))}
              </div>
              <div className="mt-4 text-center text-sm">
                <span className="text-gray-600">Code expires in: </span>
                <span className={`font-medium ${timeRemaining < 30 ? 'text-red-600' : 'text-gray-800'}`}>
                  {formatTime(timeRemaining)}
                </span>
              </div>
            </div>
            
            <button
              type="button"
              className={`w-full bg-blue-900 text-white py-3 rounded-lg hover:bg-opacity-90 mb-4 ${
                (loading || otpValues.join('').length !== 6) ? 'opacity-70 cursor-not-allowed' : ''
              }`}
              disabled={loading || otpValues.join('').length !== 6}
              onClick={verifyOtp}
            >
              {loading ? 'Verifying...' : 'Verify & Continue'}
            </button>
            
            <div className="text-center">
              <p className="text-gray-600 text-sm">
                Didn't receive the code? 
                {timeRemaining <= 0 ? (
                  <button
                    className="text-blue-900 font-medium ml-1 hover:underline"
                    onClick={requestNewOtp}
                  >
                    Resend Code
                  </button>
                ) : (
                  <span className="text-gray-400 ml-1">Resend available when timer expires</span>
                )}
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

export default MultiFactorAuth;