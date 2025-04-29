import { useNavigate, useLocation } from 'react-router-dom';
import { useCallback } from 'react';

/**
 * Custom navigation hook that preserves the mockData parameter across route changes
 * @returns {Function} Enhanced navigate function
 */
export const useNavigateWithParams = () => {
  const navigate = useNavigate();
  const location = useLocation();
  
  return useCallback((to, options) => {
    const params = new URLSearchParams(location.search);
    const mockData = params.get('mockData');
    
    if (mockData) {
      // Check if destination is a string path or an object
      if (typeof to === 'string') {
        // Check if the path already has query parameters
        const hasParams = to.includes('?');
        const separator = hasParams ? '&' : '?';
        navigate(`${to}${separator}mockData=${mockData}`, options);
      } else {
        // Handle object-style navigation
        navigate({
          ...to,
          search: to.search 
            ? `${to.search}&mockData=${mockData}` 
            : `?mockData=${mockData}`
        }, options);
      }
    } else {
      navigate(to, options);
    }
  }, [navigate, location.search]);
};