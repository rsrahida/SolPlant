import React from "react";
import styles from "./WishList.module.css";
import { useSelector, useDispatch } from "react-redux";
import { removeFromWishlist } from "../../features/wishlist/wishlistSlice";

const WishList = () => {
  const wishlist = useSelector((state) => state.wishlist.items);
  const dispatch = useDispatch();

  return (
    <div className={styles.wishlistContainer}>
      <h2>My Wishlist 💚</h2>
      {wishlist.length === 0 ? (
        <p className={styles.notFoundText}>No products in wishlist yet.</p>
      ) : (
        <div className={styles.grid}>
          {wishlist.map((p) => (
            <div key={p.id} className={styles.card}>
              <img src={p.image} alt={p.title} className={styles.image} />
              <h3>{p.title}</h3>
              <p>{p.price} $</p>
              <button
                className={styles.removeBtn}
                onClick={() => dispatch(removeFromWishlist(p.id))}
              >
                Remove
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default WishList;

