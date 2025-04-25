import React, { useState } from "react";
import styles from "./Basket.module.css";
import { useDispatch, useSelector } from "react-redux";
import {
  removeFromBasket,
  updateQuantity,
} from "../../features/basket/basketSlice";
import CheckoutPopup from "../../components/CkeckoutPopup/CheckoutPopup";
import Swal from "sweetalert2";

const Basket = () => {
  const dispatch = useDispatch();
  const basketItems = useSelector((state) => state.basket.items);
  const user = useSelector((state) => state.auth.user);

  const [showCheckout, setShowCheckout] = useState(false);
  const [discountCode, setDiscountCode] = useState("");
  const [discountApplied, setDiscountApplied] = useState(false);

  const rawTotal = basketItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  const discountedTotal = discountApplied
    ? (rawTotal * 0.9).toFixed(2)
    : rawTotal.toFixed(2);

  const handleCheckout = () => {
    if (user) {
      setShowCheckout(true);
    } else {
      Swal.fire({
        icon: "warning",
        title: "Please log in",
        text: "You need to be logged in to complete your order.",
        confirmButtonColor: "#3085d6",
      });
    }
  };

  const handleApplyDiscount = () => {
    if (discountCode.trim().toUpperCase() === "SPRING10") {
      setDiscountApplied(true);
      Swal.fire({
        icon: "success",
        title: "Discount applied!",
        text: "A 10% discount has been applied to your total.",
        confirmButtonColor: "#28a745",
      });
    } else {
      setDiscountApplied(false);
      Swal.fire({
        icon: "error",
        title: "Invalid code",
        text: "The discount code you entered is not valid.",
        confirmButtonColor: "#dc3545",
      });
    }
  };

  const handleQuantityChange = (itemId, newQuantity) => {
    if (newQuantity > 0) {
      dispatch(updateQuantity({ id: itemId, quantity: newQuantity }));
    }
  };

  return (
    <div className={styles.basketContainer}>
      <h2>Your Basket</h2>
      {basketItems.length === 0 ? (
        <p className={styles.notFoundText}>Your basket is empty!</p>
      ) : (
        <div className={styles.basketItems}>
          {basketItems.map((item) => (
            <div key={item.id} className={styles.basketItem}>
              <img
                src={item.image}
                alt={item.title}
                className={styles.basketImage}
              />
              <div className={styles.basketInfo}>
                <h3>{item.title}</h3>
                <p>${item.price}</p>
                <div>
                  <input
                    type="number"
                    value={item.quantity}
                    onChange={(e) =>
                      handleQuantityChange(item.id, parseInt(e.target.value))
                    }
                    className={styles.quantityInput}
                  />
                </div>
                <button
                  className={styles.removeBtn}
                  onClick={() => dispatch(removeFromBasket(item.id))}
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      <div className={styles.total}>
        <h3>
          Total: <span>${discountedTotal}</span>
          {discountApplied && (
            <span style={{ color: "lightgreen" }}> (10% discount applied)</span>
          )}
        </h3>
      </div>

      <div className={styles.discount}>
        <input
          type="text"
          placeholder="Enter discount code"
          value={discountCode}
          onChange={(e) => setDiscountCode(e.target.value)}
          className={styles.discountInput}
        />
        <button className={styles.discountBtn} onClick={handleApplyDiscount}>
          Apply
        </button>
      </div>

      <div className={styles.checkoutSection}>
        <button className={styles.checkoutBtn} onClick={handleCheckout}>
          Complete Order
        </button>
      </div>

      {showCheckout && (
        <CheckoutPopup
          totalPrice={discountedTotal}
          onClose={() => setShowCheckout(false)}
        />
      )}
    </div>
  );
};

export default Basket;
