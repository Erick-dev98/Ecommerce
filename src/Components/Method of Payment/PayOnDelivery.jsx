import React, { useState } from 'react';
import './PayOnDelivery.css'; // Import PayOnDelivery.css for styling

const PayOnDelivery = ({ onClose }) => {
    const [formData, setFormData] = useState({
        name: '',
        address: '',
        phone: '',
    });

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handlePayment = () => {
        // Implement payment logic for pay on delivery
        console.log('Processing payment on delivery:', formData);
        onClose(); // Close the payment modal
    };

    return (
        <div className="pay-on-delivery-container">
            <div className="pay-on-delivery-header">
                <h2>Pay on Delivery</h2>
            </div>
            <div className="pay-on-delivery-content">
                <form>
                    <div className="form-group">
                        <label htmlFor="name">Full Name</label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            value={formData.name}
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
                    <button type="button" onClick={handlePayment}>Proceed to Payment</button>
                </form>
            </div>
        </div>
    );
};

export default PayOnDelivery;
