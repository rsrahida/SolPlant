import React, { useEffect, useState } from "react";
import { supabase } from "../../lib/client";
import styles from "./Products.module.css";
import { Range } from "react-range";
import Popup from "../../components/ProductsPopup/Popup";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [search, setSearch] = useState("");
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedSunlight, setSelectedSunlight] = useState([]);
  const [selectedSizes, setSelectedSizes] = useState([]);
  const [priceRange, setPriceRange] = useState([1, 100]);
  const [showPopup, setShowPopup] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const fetchProducts = async () => {
    const { data, error } = await supabase.from("products").select("*");
    if (error) {
      console.error("Error fetching products:", error.message);
    } else {
      setProducts(data);
      setFiltered(data);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  useEffect(() => {
    let result = [...products];

    if (search) {
      result = result.filter((p) =>
        p.title.toLowerCase().includes(search.toLowerCase())
      );
    }

    if (selectedCategories.length > 0) {
      result = result.filter((p) => selectedCategories.includes(p.category));
    }

    if (selectedSunlight.length > 0) {
      result = result.filter((p) => selectedSunlight.includes(p.sunlight));
    }

    if (selectedSizes.length > 0) {
      result = result.filter((p) => selectedSizes.includes(p.size));
    }

    result = result.filter(
      (p) => p.price >= priceRange[0] && p.price <= priceRange[1]
    );

    setFiltered(result);
  }, [
    search,
    selectedCategories,
    selectedSunlight,
    selectedSizes,
    priceRange,
    products,
  ]);

  const handleCheckboxChange = (value, stateArray, setState) => {
    if (stateArray.includes(value)) {
      setState(stateArray.filter((v) => v !== value));
    } else {
      setState([...stateArray, value]);
    }
  };

  const handleShowPopup = (product) => {
    setSelectedProduct(product);
    setShowPopup(true);
  };

  const handleClosePopup = () => {
    setShowPopup(false);
  };

  return (
    <div className={styles.container}>
      <div className={styles.sidebar}>
        <div className={styles.filterSection}>
          <h3>🍃 Search</h3>
          <input
            type="text"
            placeholder="Search by name"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className={styles.input}
          />
        </div>

        <div className={styles.filterSection}>
          <h3>🍃 Category</h3>
          {["succulent", "houseplant", "tropical", "flowering"].map((cat) => (
            <label key={cat} className={styles.checkboxLabel}>
              <input
                type="checkbox"
                checked={selectedCategories.includes(cat)}
                onChange={() =>
                  handleCheckboxChange(
                    cat,
                    selectedCategories,
                    setSelectedCategories
                  )
                }
              />
              <span className={styles.customCheckbox}></span>
              {cat}
            </label>
          ))}
        </div>

        <div className={styles.filterSection}>
          <h3>🍃 Sunlight</h3>
          {["low", "medium", "bright"].map((light) => (
            <label key={light} className={styles.checkboxLabel}>
              <input
                type="checkbox"
                checked={selectedSunlight.includes(light)}
                onChange={() =>
                  handleCheckboxChange(
                    light,
                    selectedSunlight,
                    setSelectedSunlight
                  )
                }
              />
              <span className={styles.customCheckbox}></span>
              {light}
            </label>
          ))}
        </div>

        <div className={styles.filterSection}>
          <h3>🍃 Size</h3>
          {["small", "medium", "large"].map((s) => (
            <label key={s} className={styles.checkboxLabel}>
              <input
                type="checkbox"
                checked={selectedSizes.includes(s)}
                onChange={() =>
                  handleCheckboxChange(s, selectedSizes, setSelectedSizes)
                }
              />
              <span className={styles.customCheckbox}></span>
              {s}
            </label>
          ))}
        </div>

        <div className={styles.filterSection}>
          <h3>🍃 Price Range</h3>
          <label>
            ${priceRange[0]} - ${priceRange[1]}
          </label>
          <div className={styles.rangeSlider}>
            <Range
              step={1}
              min={1}
              max={100}
              values={priceRange}
              onChange={(values) => setPriceRange(values)}
              renderTrack={({ props, children }) => (
                <div {...props} className={styles.rangeTrack}>
                  {children}
                </div>
              )}
              renderThumb={({ props, index }) => (
                <div {...props} className={styles.rangeThumb} />
              )}
            />
          </div>
        </div>
      </div>
      <div className={styles.productGrid}>
        {filtered.length > 0 ? (
          filtered.map((p) => (
            <div
              key={p.id}
              className={styles.productCard}
              onClick={() => handleShowPopup(p)}
            >
              <img
                src={p.image}
                alt={p.title}
                className={styles.productImage}
              />
              <h3>{p.title}</h3>
              <p>{p.price} $</p>
              <p>
                {p.category} | {p.sunlight} | {p.size}
              </p>
            </div>
          ))
        ) : (
          <p className={styles.notFoundText}>Product not found...</p>
        )}
      </div>
      {showPopup && selectedProduct && (
        <Popup product={selectedProduct} onClose={handleClosePopup} />
      )}
    </div>
  );
};

export default Products;
