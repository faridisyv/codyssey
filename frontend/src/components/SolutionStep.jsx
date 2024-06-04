import React from "react";
import styles from "../pages/About.module.css";

const SolutionStep = ({ title, description, className }) => {
  return (
    <div className={`${styles['solution-step']} ${className}`}>
      <h5 className={styles['solution-step-title']}>{title}</h5>
      <p className={styles['solution-step-description']}>{description}</p>
    </div>
  );
};

export default SolutionStep;

