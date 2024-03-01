import React, { useState, useContext } from 'react';
import './Checkout.css'; // Import Checkout.css for styling
import { ShopContext } from '../../Context/ShopContext';

const Checkout = ({ onClose }) => {
    const { getTotalCartAmount } = useContext(ShopContext);
    
    // State to store form data
    const [formData, setFormData] = useState({
        email: '',
        address: '',
        paymentMethod: 'Mpesa', // Default payment method
    });

    // Handle form input changes
    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    // Handle submission of checkout form
    const handleCheckout = (event) => {
        event.preventDefault();
        // Implement your checkout logic here, such as submitting user data, processing payment, etc.
        // You can access form data from the formData state
        console.log('Form Data:', formData);
        // Reset form fields after submission if needed
        setFormData({
            email: '',
            address: '',
            paymentMethod: 'Mpesa',
        });
        // Close the checkout modal
        onClose();
    };

    return (
        <div className="checkout-overlay">
            <div className="checkout-modal">
                <div className="checkout-header">
                    <h2>Checkout</h2>
                </div>
                <div className="checkout-content">
                    {/* Form for collecting user information */}
                    <form onSubmit={handleCheckout}>
                        <div className="form-group">
                            <label htmlFor="email">Email</label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="address">Delivery Address</label>
                            <textarea
                                id="address"
                                name="address"
                                value={formData.address}
                                onChange={handleChange}
                                required
                            ></textarea>
                        </div>
                        <div className="form-group">
                            <label htmlFor="paymentMethod">Payment Method</label>
                            <select
                                id="paymentMethod"
                                name="paymentMethod"
                                value={formData.paymentMethod}
                                onChange={handleChange}
                                required
                            >
                                <option value="Mpesa">Mpesa</option>
                                <option value="Pay on Delivery">Pay on Delivery</option>
                            </select>
                        </div>
                        <button type="submit">Place Order</button>
                    </form>
                    {/* Display total amount */}
                    <p>Total Amount: ${getTotalCartAmount()}</p>
                    {/* Add further checkout related information */}
                </div>
            </div>
        </div>
    );
}

export default Checkout;
