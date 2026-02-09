// frontend/src/components/TokenExpiryNotifier.jsx

import { useState, useEffect } from 'react';
import TokenManager from '../lib/token_manager';

const TokenExpiryNotifier = ({ onExpiryWarning, onExpiry }) => {
  const [timeLeft, setTimeLeft] = useState(null);
  const [showWarning, setShowWarning] = useState(false);
  
  // Check token expiry every minute
  useEffect(() => {
    let intervalId;

    const checkTokenExpiry = () => {
      const timeUntilExpiry = TokenManager.getTimeUntilExpiry();
      
      if (timeUntilExpiry <= 0) {
        // Token is already expired
        if (onExpiry) {
          onExpiry();
        }
        return;
      }
      
      // Show warning if token expires in less than 5 minutes
      if (timeUntilExpiry <= 300) { // 300 seconds = 5 minutes
        setShowWarning(true);
        
        if (onExpiryWarning) {
          onExpiryWarning(timeUntilExpiry);
        }
      } else {
        setShowWarning(false);
      }
      
      setTimeLeft(timeUntilExpiry);
    };

    // Check immediately
    checkTokenExpiry();

    // Then check every minute
    intervalId = setInterval(checkTokenExpiry, 60000); // 60000 ms = 1 minute

    return () => {
      if (intervalId) {
        clearInterval(intervalId);
      }
    };
  }, [onExpiry, onExpiryWarning]);

  if (!showWarning || timeLeft === null) {
    return null;
  }

  const minutesLeft = Math.floor(timeLeft / 60);
  const secondsLeft = timeLeft % 60;

  return (
    <div className="fixed bottom-4 right-4 bg-yellow-500 text-white p-4 rounded-lg shadow-lg z-50">
      <div className="flex items-center">
        <svg 
          className="w-6 h-6 mr-2" 
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24" 
          xmlns="http://www.w3.org/2000/svg"
        >
          <path 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            strokeWidth={2} 
            d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" 
          />
        </svg>
        <div>
          <p className="font-bold">Session Expiring Soon</p>
          <p>Your session will expire in {minutesLeft}m {secondsLeft}s</p>
        </div>
      </div>
    </div>
  );
};

export default TokenExpiryNotifier;