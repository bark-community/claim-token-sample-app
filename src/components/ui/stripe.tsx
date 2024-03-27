"use client";

import React, { useState } from 'react';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import CheckoutForm from './CheckoutForm';

const stripePromise = loadStripe('YOUR_STRIPE_PUBLIC_KEY');

const Claim = () => {
  const [paymentComplete, setPaymentComplete] = useState(false);

  const handlePaymentSuccess = () => {
    setPaymentComplete(true);
    // Add logic to handle successful payment (e.g., update database, send confirmation email)
  };

  return (
    <div>
      <h1>Claim Your BARK Tokens</h1>
      {paymentComplete ? (
        <div>
          <p>Payment successful! Your BARK tokens have been claimed.</p>
          {/* Add any additional confirmation or success message */}
        </div>
      ) : (
        <Elements stripe={stripePromise}>
          <CheckoutForm onSuccess={handlePaymentSuccess} />
        </Elements>
      )}
    </div>
  );
}

export default Claim;
