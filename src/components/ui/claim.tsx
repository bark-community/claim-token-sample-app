import React, { useState } from 'react';
import { Button, Spinner, Input, Alert } from '@/components/ui';
import { copyToClipboard } from '@/utils';
import { useWallet } from '@solana/wallet-adapter-react';
import { Connection, PublicKey, Transaction, TransactionInstruction } from '@solana/web3.js';

const Claim = () => {
    const [loading, setLoading] = useState(false);
    const [walletAddress, setWalletAddress] = useState('');
    const [claimSuccess, setClaimSuccess] = useState(false);
    const [error, setError] = useState('');
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
            const tokenProgramId = new PublicKey('Your-Token-Program-ID');

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
                <Spinner />
            ) : (
                <>
                    <Input
                        type="text"
                        placeholder="Enter your Solana wallet address"
                        value={walletAddress}
                        onChange={(e) => setWalletAddress(e.target.value)}
                    />
                    <div className="flex space-x-2">
                        <Button onClick={handleClaim} disabled={loading}>
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

export default Claim;
