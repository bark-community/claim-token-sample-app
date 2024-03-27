"use client";
import React, { useState, useEffect } from 'react';
import SolanaWalletProvider from '@/components/providers/wallet-connect';
import ClaimUI from '@components/ui/claim';
import { useClient } from 'next/data-client';

const ClaimPage = () => {
    const client = useClient(); // Use useClient hook to mark the component as a client component
    const [tokenPrice, setTokenPrice] = useState(null);
    const [transactionData, setTransactionData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const price = await fetchTokenPrice();
                setTokenPrice(price);
            } catch (error) {
                setError('Error fetching token price: ' + error.message);
            }

            try {
                const data = await fetchTransactionData();
                setTransactionData(data);
            } catch (error) {
                setError('Error fetching transaction data: ' + error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [client]); // Ensure useEffect runs only client-side

    return (
        <SolanaWalletProvider network="devnet">
            <div className="container mx-auto px-4">
                <h1 className="text-3xl font-bold text-center my-8">Claim Your BARK Tokens</h1>
                {loading && <div className="text-center my-4">Loading...</div>}
                {error && <div className="text-red-500">{error}</div>}
                {!loading && !error && (
                    <>
                        {tokenPrice && <p>BARK Token Price: ${tokenPrice}</p>}
                        {transactionData && <p>SolScan Transaction Data: {transactionData}</p>}
                        <ClaimUI />
                    </>
                )}
            </div>
        </SolanaWalletProvider>
    );
};

export default ClaimPage;
