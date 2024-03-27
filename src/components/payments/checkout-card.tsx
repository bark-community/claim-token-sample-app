import React, { useState } from 'react';

const CheckoutCard = () => {
  const [name, setName] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [expiryMonth, setExpiryMonth] = useState('');
  const [expiryYear, setExpiryYear] = useState('');
  const [cvc, setCVC] = useState('');
  const [walletAddress, setWalletAddress] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('card'); // Default to card payment method

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add logic to handle form submission
    console.log('Form submitted');
  };

  return (
    <div className="max-w-md mx-auto bg-white p-8 rounded-md shadow-md">
      <h2 className="text-2xl font-semibold mb-6">Add a new payment method to your account</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="name" className="block font-medium">Name</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="border border-gray-300 rounded-md px-3 py-2 w-full"
            required
          />
        </div>
        <div>
          <label htmlFor="paymentMethod" className="block font-medium">Payment Method</label>
          <select
            id="paymentMethod"
            value={paymentMethod}
            onChange={(e) => setPaymentMethod(e.target.value)}
            className="border border-gray-300 rounded-md px-3 py-2 w-full"
          >
            <option value="card">Card</option>
            <option value="applePay">Apple Pay</option>
            <option value="stripe">Stripe</option>
            <option value="solanaPay">Solana Pay</option>
            <option value="paypal">PayPal</option>
          </select>
        </div>
        {paymentMethod === 'card' && (
          <>
            <div>
              <label htmlFor="cardNumber" className="block font-medium">Card number</label>
              <input
                type="text"
                id="cardNumber"
                value={cardNumber}
                onChange={(e) => setCardNumber(e.target.value)}
                className="border border-gray-300 rounded-md px-3 py-2 w-full"
                required
              />
            </div>
            <div className="grid grid-cols-3 gap-4">
              <div>
                <label htmlFor="expiryMonth" className="block font-medium">Expires</label>
                <input
                  type="text"
                  id="expiryMonth"
                  value={expiryMonth}
                  onChange={(e) => setExpiryMonth(e.target.value)}
                  className="border border-gray-300 rounded-md px-3 py-2 w-full"
                  placeholder="Month"
                  required
                />
              </div>
              <div>
                <label htmlFor="expiryYear" className="block font-medium">Year</label>
                <input
                  type="text"
                  id="expiryYear"
                  value={expiryYear}
                  onChange={(e) => setExpiryYear(e.target.value)}
                  className="border border-gray-300 rounded-md px-3 py-2 w-full"
                  placeholder="Year"
                  required
                />
              </div>
              <div>
                <label htmlFor="cvc" className="block font-medium">CVC</label>
                <input
                  type="text"
                  id="cvc"
                  value={cvc}
                  onChange={(e) => setCVC(e.target.value)}
                  className="border border-gray-300 rounded-md px-3 py-2 w-full"
                  placeholder="CVC"
                  required
                />
              </div>
            </div>
          </>
        )}
        {paymentMethod === 'solanaPay' && (
          <div>
            <label htmlFor="walletAddress" className="block font-medium">Solana Wallet Address</label>
            <input
              type="text"
              id="walletAddress"
              value={walletAddress}
              onChange={(e) => setWalletAddress(e.target.value)}
              className="border border-gray-300 rounded-md px-3 py-2 w-full"
              required
            />
          </div>
        )}
        <button type="submit" className="bg-primary text-white py-2 px-4 rounded-md hover:bg-secondary transition duration-300 ease-in-out">Continue</button>
      </form>
    </div>
  );
};

export default CheckoutCard;
