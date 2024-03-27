import React, { createContext, useContext, useEffect, useState } from 'react';

// Create a context for the wallet connection
const WalletConnectContext = createContext(null);

// Custom hook to access the wallet connection context
export const useWalletConnect = () => {
  const context = useContext(WalletConnectContext);
  if (!context) {
    throw new Error('Use Wallet Connect must be used within a Claiming Process');
  }
  return context;
};

// WalletConnect component
const WalletConnect = ({ children }) => {
  const [walletConnected, setWalletConnected] = useState(false);
  const [walletAddress, setWalletAddress] = useState(null);

  // Dummy function to simulate connecting to a wallet
  const connectWallet = async () => {
    // Simulate connecting to wallet
    setWalletConnected(true);
    // Simulate getting wallet address
    setWalletAddress('BARK1234...');
  };

  useEffect(() => {
    // Simulate checking if wallet is already connected
    const isWalletConnected = true; // For example purposes
    if (isWalletConnected) {
      setWalletConnected(true);
      setWalletAddress('0x123abc...');
    }
  }, []);

  // Memoize the value to prevent unnecessary re-renders
  const value = React.useMemo(() => ({ walletConnected, walletAddress, connectWallet }), [walletConnected, walletAddress]);

  return (
    <WalletConnectContext.Provider value={value}>
      {children}
    </WalletConnectContext.Provider>
  );
};

export default WalletConnect;
