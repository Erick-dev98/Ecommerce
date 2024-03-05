import React, { useState, useContext } from 'react';
import './Checkout.css'; // Import Checkout.css for styling
import { ShopContext } from '../../Context/ShopContext';

const Checkout = ({ onClose }) => {
    const { getTotalCartAmount } = useContext(ShopContext);
    
    // State to store form data
    const [formData, setFormData] = useState({
        email: '',
        address: '',
        phone: '', // Added phone field
        paymentMethod: 'Mpesa', // Default payment method
    });

    // State to track whether the order has been submitted
    const [submittingOrder, setSubmittingOrder] = useState(false);

    // Handle form input changes
    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleCheckout = async (event) => {
        event.preventDefault();
    
        // Prevent multiple submissions
        if (submittingOrder) {
            return;
        }
    
        try {
            // Set submittingOrder to true to prevent multiple submissions
            setSubmittingOrder(true);
    
            // Send order details to backend
            const response = await fetch('http://localhost:4000/placeorder', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    email: formData.email,
                    address: formData.address,
                    phone: formData.phone,
                    paymentMethod: formData.paymentMethod,
                    products: [], // Add products data here if needed
                    totalAmount: getTotalCartAmount(), // Assuming this function returns the total amount
                })
            });
    
            if (response.ok) {
                // Order successfully placed
                const responseData = await response.json();
                console.log('Order placed successfully:', responseData);
                onClose(); // Close the checkout modal
    
                // Clear the form after successful submission
                setFormData({
                    email: '',
                    address: '',
                    phone: '',
                    paymentMethod: 'Mpesa',
                });
    
                // Reset submittingOrder to false
                setSubmittingOrder(false);
            } else {
                // Handle error response
                console.error('Failed to place order:', response.statusText);
                // Reset submittingOrder to false
                setSubmittingOrder(false);
            }
        } catch (error) {
            console.error('Error placing order:', error);
            // Reset submittingOrder to false
            setSubmittingOrder(false);
        }
    };
    
    
    
    return (
        <div className="checkout-overlay">
            <div className="checkout-modal">
                <div className="checkout-header">
                    <h2>Checkout</h2>
                </div>
                <div className="checkout-content">                    
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
                                <label htmlFor="phone">Phone Number</label>
                                <input
                                    type="tel"
                                    id="phone"
                                    name="phone"
                                    value={formData.phone}
                                    onChange={handleChange}
                                    pattern="[0-9]{10}"
                                    maxLength="10"
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
                    <p><strong>Total Amount: ${getTotalCartAmount()}</strong></p>
                    {/* Add further checkout related information */}
                </div>
            </div>
        </div>
    );
}

export default Checkout;
