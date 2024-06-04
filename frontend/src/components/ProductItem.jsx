// ProductItem.jsx
import React from 'react';
import styles from './ProductItem.module.css'; // Make sure to create a corresponding CSS module for styling

const ProductItem = ({ title, originalPrice, salePrice, imageUrl }) => {
  return (
    <div className={styles.productItem}>
      <img src={imageUrl} alt={title} className={styles.productImage} />
      <div className={styles.productDetails}>
        <h3 className={styles.productTitle}>{title}</h3>
        <p className={styles.originalPrice}>{originalPrice}</p>
        <p className={styles.salePrice}>{salePrice}</p>
        {/* Add other details like rating stars, cart icon, etc. */}
      </div>
    </div>
  );
};

export default ProductItem;
