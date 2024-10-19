import { createContext, useContext, useCallback } from 'react';
import { Toaster as ReactHotToast, toast } from 'react-hot-toast';

// Create a context for the toaster
const ToasterContext = createContext(null);

// Toaster Provider component
export const ToasterProvider = ({ children }) => {
  const showToast = useCallback((message, options) => {
    toast(message, options);
  }, []);

  return (
    <ToasterContext.Provider value={showToast}>
      <ReactHotToast />
      {children}
    </ToasterContext.Provider>
  );
};

// Custom hook for using the toaster
export const useToaster = () => {
  const context = useContext(ToasterContext);
  if (!context) {
    throw new Error('useToaster must be used within a ToasterProvider');
  }
  return context;
};
