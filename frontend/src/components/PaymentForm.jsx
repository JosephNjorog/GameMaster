import React, { useState } from 'react';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import Button from '../components/ui/button';

const PaymentForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const [paymentMethod, setPaymentMethod] = useState('card');

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    const cardElement = elements.getElement(CardElement);

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: 'card',
      card: cardElement,
    });

    if (error) {
      console.error(error);
    } else {
      console.log(paymentMethod);
      // Process payment method ID with backend to complete the payment
    }
  };

  return (
    <div className="max-w-md mx-auto my-8 p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-bold mb-6">Deposit Funds</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700">Select Payment Method:</label>
          <select 
            value={paymentMethod} 
            onChange={(e) => setPaymentMethod(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded mt-2"
          >
            <option value="card">Credit/Debit Card</option>
            <option value="mpesa">Mpesa</option>
            <option value="bank">Bank Transfer</option>
            <option value="metamask">Metamask</option>
          </select>
        </div>
        {paymentMethod === 'card' && <CardElement />}
        {paymentMethod === 'mpesa' && (
          <div className="mb-4">
            <label className="block text-gray-700">Mpesa Phone Number:</label>
            <input type="text" className="w-full p-2 border border-gray-300 rounded mt-2" />
          </div>
        )}
        {paymentMethod === 'bank' && (
          <div className="mb-4">
            <label className="block text-gray-700">Bank Account Number:</label>
            <input type="text" className="w-full p-2 border border-gray-300 rounded mt-2" />
            <label className="block text-gray-700">Bank Routing Number:</label>
            <input type="text" className="w-full p-2 border border-gray-300 rounded mt-2" />
          </div>
        )}
        {paymentMethod === 'metamask' && (
          <div className="mb-4">
            <label className="block text-gray-700">Metamask Wallet Address:</label>
            <input type="text" className="w-full p-2 border border-gray-300 rounded mt-2" />
          </div>
        )}
        <Button type="submit" disabled={!stripe}>
          Pay
        </Button>
      </form>
    </div>
  );
};

export default PaymentForm;
