import React, { useState } from 'react';

const Mpesa = ({ totalAmount, onSuccess, onFailure }) => {
    const [phoneNumber, setPhoneNumber] = useState('');

    const handlePayment = async () => {
        try {
            // Make API request to initiate Mpesa payment
            const response = await fetch('http://mpesa-api.com/initiatePayment', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    phoneNumber,
                    amount: totalAmount
                })
            });

            const data = await response.json();
            
            // Check if payment was successful
            if (response.ok) {
                onSuccess(data); // Call onSuccess callback
            } else {
                onFailure(data); // Call onFailure callback
            }
        } catch (error) {
            console.error('Error initiating payment:', error);
            onFailure({ error: 'Failed to initiate payment' });
        }
    };

    return (
        <div>
            <h3>Mpesa Payment</h3>
            <label htmlFor="phone">Phone Number:</label>
            <input
                type="tel"
                id="phone"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                required
            />
            <button onClick={handlePayment}>Pay with Mpesa</button>
        </div>
    );
};

export default Mpesa;
