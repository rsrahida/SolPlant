import React, { useState } from "react";
import styles from "./CheckoutPopup.module.css";
import Swal from "sweetalert2";

const CheckoutPopup = ({ totalPrice, onClose }) => {
  const [cardNumber, setCardNumber] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [cvv, setCvv] = useState("");
  const [isPaymentSuccessful, setIsPaymentSuccessful] = useState(false);

  const handlePayment = () => {
    if (cardNumber && expiryDate && cvv) {
      setIsPaymentSuccessful(true);
      Swal.fire({
        icon: "success",
        title: "Payment Successful",
        text: "Your payment has been confirmed.",
        confirmButtonColor: "#28a745",
      });
    } else {
      Swal.fire({
        icon: "warning",
        title: "Missing Information",
        text: "Please fill in all the fields.",
        confirmButtonColor: "#ffc107",
      });
    }
  };

  return (
    <div className={styles.popupOverlay}>
      <div className={styles.popupContent}>
        <h3>Payment Information</h3>
        <form className={styles.paymentForm}>
          <div>
            <label htmlFor="cardNumber">Card Number:</label>
            <input
              type="text"
              id="cardNumber"
              value={cardNumber}
              onChange={(e) => setCardNumber(e.target.value)}
              placeholder="**** **** **** ****"
            />
          </div>
          <div>
            <label htmlFor="expiryDate">Expiry Date:</label>
            <input
              type="text"
              id="expiryDate"
              value={expiryDate}
              onChange={(e) => setExpiryDate(e.target.value)}
              placeholder="MM/YY"
            />
          </div>
          <div>
            <label htmlFor="cvv">CVV:</label>
            <input
              type="text"
              id="cvv"
              value={cvv}
              onChange={(e) => setCvv(e.target.value)}
              placeholder="***"
            />
          </div>
        </form>

        {isPaymentSuccessful ? (
          <div className={styles.successMessage}>
            <h4>Payment Confirmed!</h4>
            <button onClick={onClose}>Close</button>
          </div>
        ) : (
          <div className={styles.paymentButtonContainer}>
            <button onClick={handlePayment}>Confirm Payment</button>
            <button onClick={onClose}>Close</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default CheckoutPopup;
