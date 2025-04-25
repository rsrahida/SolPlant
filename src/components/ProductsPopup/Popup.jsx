import React from "react";
import styles from "./Popup.module.css";
import { useDispatch } from "react-redux";
import { addToWishlist } from "../../features/wishlist/wishlistSlice";
import { addToBasket } from "../../features/basket/basketSlice";
import Swal from "sweetalert2";

const Popup = ({ product, onClose }) => {
  const dispatch = useDispatch();

  const handleAddToWishlist = () => {
    dispatch(addToWishlist(product));
    onClose();
    Swal.fire({
      icon: "success",
      title: "Added to Wishlist",
      text: `${product.title} has been added to your wishlist!`,
      confirmButtonText: "Great!",
      timer: 1000,
      showConfirmButton: true,
      timerProgressBar: true,
    });
  };

  const handleAddToBasket = () => {
    dispatch(addToBasket(product)); 
    onClose();
    Swal.fire({
      icon: "success",
      title: "Added to Basket",
      text: `${product.title} has been added to your basket!`,
      confirmButtonText: "Great!",
      timer: 1000,
      showConfirmButton: true,
      timerProgressBar: true,
    });
  };

  return (
    <div className={styles.popupOverlay} onClick={onClose}>
      <div className={styles.popup} onClick={(e) => e.stopPropagation()}>
        <button onClick={onClose} className={styles.closeButton}>
          ×
        </button>
        <img
          src={product.image}
          alt={product.title || "Product"}
          className={styles.popupImage}
        />
        <h3 className={styles.popupProductName}>{product.title}</h3>
        <p className={styles.popupProductDescription}>
          {product.description || "No description available."}
        </p>
        <p className={styles.popupProductPrice}>Price: ${product.price}</p>
        <p className={styles.popupProductInfo}>
          Category: {product.category} | Sunlight: {product.sunlight} | Size:{" "}
          {product.size}
        </p>
        <button
          type="submit"
          className={styles.basketButton}
          onClick={handleAddToBasket} 
        >
          Add to Basket
        </button>
        <button
          type="submit"
          className={styles.wishButton}
          onClick={handleAddToWishlist}
        >
          Add to Wishlist
        </button>
      </div>
    </div>
  );
};

export default Popup;
