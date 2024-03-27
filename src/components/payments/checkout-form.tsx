import React, { useState } from 'react';
import Link from 'next/link';

const CheckoutForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    cardNumber: '',
    expirationMonth: '',
    expirationYear: '',
    cvc: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      // Send form data to Stripe Test API endpoint for processing
      const response = await fetch('https://api.stripe.com/v1/charges', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          // Add your Stripe Test API key here
          'Authorization': 'Bearer YOUR_STRIPE_TEST_API_KEY',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Failed to submit form');
      }

      // Form submitted successfully
      // You can handle success scenarios here, such as displaying a success message or redirecting the user
      console.log('Form submitted successfully');
    } catch (error) {
      // Handle form submission errors
      // You can display an error message to the user or log the error for debugging
      console.error('Error submitting form:', error.message);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="name">Name</label>
        <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} />
      </div>
      <div>
        <label htmlFor="cardNumber">Card Number</label>
        <input type="text" id="cardNumber" name="cardNumber" value={formData.cardNumber} onChange={handleChange} />
      </div>
      <div>
        <label htmlFor="expirationMonth">Expiration Month</label>
        <input type="text" id="expirationMonth" name="expirationMonth" value={formData.expirationMonth} onChange={handleChange} />
      </div>
      <div>
        <label htmlFor="expirationYear">Expiration Year</label>
        <input type="text" id="expirationYear" name="expirationYear" value={formData.expirationYear} onChange={handleChange} />
      </div>
      <div>
        <label htmlFor="cvc">CVC</label>
        <input type="text" id="cvc" name="cvc" value={formData.cvc} onChange={handleChange} />
      </div>
      <button type="submit">Submit</button>
    </form>
  );
};

export default CheckoutForm;
