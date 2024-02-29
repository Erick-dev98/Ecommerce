import React, { useContext } from 'react';
import './Checkout.css'; // Import Checkout.css for styling
import { ShopContext } from '../../Context/ShopContext';

const Checkout = ({ onClose }) => {
    const { getTotalCartAmount } = useContext(ShopContext);

    // You can add further functionality for the checkout process

    return (
        <div className="checkout-overlay">
            <div className="checkout-modal">
                <div className="checkout-header">
                    <h2>Checkout</h2>
                    <button className="close-button" onClick={onClose}>Close</button>
                </div>
                <div className="checkout-content">
                    {/* Add content for checkout, like shipping address, payment options, etc. */}
                    <p>Total Amount: ${getTotalCartAmount()}</p>
                    {/* Add further checkout related information */}
                </div>
            </div>
        </div>
    );
}

export default Checkout;
