import React, { useState, useEffect } from "react";
import styles from "./Home.module.css";
import FirstImage from "../../assets/images/1.jpg";
import SecondImage from "../../assets/images/2.jpg";
import { Link } from "react-router-dom";

const Home = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const images = [FirstImage, SecondImage];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className={styles.home}>
      <div className={styles.slider}>
        <img
          src={images[currentIndex]}
          alt="Slider"
          className={`${styles.sliderImage} ${styles.active}`}
        />
        <div className={styles.overlay}>
          <h2>Explore the Magic of Plants</h2>
          <p>Plants bring the beauty of nature into our lives.</p>
        </div>
      </div>
      <button className={styles.plantButton}>
        <Link to="/products">Products</Link>
      </button>
    </div>
  );
};

export default Home;
