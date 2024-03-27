import React, { createContext, useContext, useEffect, useState } from 'react';
import { Connection, clusterApiUrl, PublicKey } from '@solana/web3.js';

interface SolanaDevnetWalletProviderProps {
  children: React.ReactNode;
}

interface SolanaDevnetWalletContextInterface {
  connection: Connection | null;
  publicKey: PublicKey | null;
  error: Error | null;
}

const SolanaDevnetWalletContext = createContext<SolanaDevnetWalletContextInterface | null>(null);

export const useSolanaDevnetWallet = () => {
  const context = useContext(SolanaDevnetWalletContext);
  if (!context) {
    throw new Error('useSolanaDevnetWallet must be used within a SolanaDevnetWalletProvider');
  }
  return context;
};

const SolanaDevnetWalletProvider: React.FC<SolanaDevnetWalletProviderProps> = ({ children }) => {
  const [connection, setConnection] = useState<Connection | null>(null);
  const [publicKey, setPublicKey] = useState<PublicKey | null>(null);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    try {
      // Establish connection to Solana Devnet
      const solanaDevnetConnection = new Connection(clusterApiUrl('devnet'));
      setConnection(solanaDevnetConnection);

      // Load user's public key if available
      const storedPublicKeyStr = localStorage.getItem('SOLANA_DEVNET_PUBLIC_KEY');
      if (storedPublicKeyStr) {
        const storedPublicKey = new PublicKey(storedPublicKeyStr);
        setPublicKey(storedPublicKey);
      }
    } catch (err) {
      setError(err);
    }
  }, []);

  return (
    <SolanaDevnetWalletContext.Provider value={{ connection, publicKey, error }}>
      {children}
    </SolanaDevnetWalletContext.Provider>
  );
};

export default SolanaDevnetWalletProvider;
