"use client";

import React from 'react';
import { Button, LoadingSpinner, Input, Alert } from '@/components/ui';
import { copyToClipboard } from '@/utils/copy-to-clipboard';
import { useWallet } from '@solana/wallet-adapter-react';
import { Connection, PublicKey, Transaction, TransactionInstruction } from '@solana/web3.js';

const ClaimFeatures = () => {
    const [loading, setLoading] = React.useState(false);
    const [walletAddress, setWalletAddress] = React.useState('');
    const [claimSuccess, setClaimSuccess] = React.useState(false);
    const [error, setError] = React.useState('');

    const { publicKey, signTransaction } = useWallet();

    const handleClaim = async () => {
        if (!publicKey) {
            setError('Please connect your Solana wallet');
            return;
        }

        if (!walletAddress) {
            setError('Please enter your Solana wallet address');
            return;
        }

        setLoading(true);
        try {
            const connection = new Connection('https://api.devnet.solana.com');
            const tokenProgramId = new PublicKey('BARKtwgaaR4tn1vaBpUGbmMNSq3Wt7qzfDsSPSBv4orS');

            const instruction = new TransactionInstruction({
                keys: [{ pubkey: publicKey, isSigner: true, isWritable: true }],
                programId: tokenProgramId,
                data: Buffer.from([1]),
            });

            const transaction = new Transaction().add(instruction);
            const signedTransaction = await signTransaction(transaction);
            const txid = await connection.sendRawTransaction(signedTransaction.serialize());

            setClaimSuccess(true);
            setWalletAddress('');
        } catch (err) {
            setError('Failed to claim BARK tokens. Please try again later.');
        } finally {
            setLoading(false);
        }
    };

    const handleCopyAddress = () => {
        copyToClipboard(walletAddress);
    };

    return (
        <div className="flex flex-col items-center space-y-4">
            {loading ? (
                <LoadingSpinner />
            ) : (
                <>
                    <Input
                        type="text"
                        placeholder="Enter your Solana wallet address"
                        value={walletAddress}
                        onChange={(e) => setWalletAddress(e.target.value)}
                    />
                    <div className="flex space-x-2">
                        <Button onClick={handleClaim} disabled={loading || claimSuccess}>
                            {claimSuccess ? 'Tokens Claimed!' : 'Claim Tokens'}
                        </Button>
                        <Button onClick={handleCopyAddress} disabled={!walletAddress}>
                            Copy Address
                        </Button>
                    </div>
                    {error && <Alert type="error">{error}</Alert>}
                </>
            )}
        </div>
    );
};

export default ClaimFeatures;
