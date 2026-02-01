import { useEffect, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

export const useBackHandler = (onExitAttempt) => {
  const navigate = useNavigate();
  const location = useLocation();
  const lastBackPress = useRef(0);

  useEffect(() => {
    const handlePopState = (event) => {
      // Only handle this logic on the Home Screen (Dashboard)
      if (location.pathname === '/home') {
        const now = Date.now();
        if (now - lastBackPress.current < 2000) {
          // Allowed to exit (browser default behavior triggers close/minimize)
          // We don't prevent default here to let history pop
        } else {
          // Prevent exit, show toast
          event.preventDefault(); // Try to stop browser (history.pushState helps here)
          window.history.pushState(null, '', window.location.pathname); // Push state back to prevent navigation
          lastBackPress.current = now;
          if (onExitAttempt) onExitAttempt();
        }
      }
    };

    // Push initial state to trap back button
    window.history.pushState(null, '', window.location.pathname);
    window.addEventListener('popstate', handlePopState);

    return () => {
      window.removeEventListener('popstate', handlePopState);
    };
  }, [location.pathname, onExitAttempt]);
};
