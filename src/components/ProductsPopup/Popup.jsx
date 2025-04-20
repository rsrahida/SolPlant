import React from "react";
import styles from "./Popup.module.css";

const Popup = ({ product, onClose }) => {
  if (!product) return null;

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
      </div>
    </div>
  );
};

export default Popup;
