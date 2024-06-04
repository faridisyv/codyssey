import React from "react";
import Doctor from "../assets/hero/logomain.png";
import SolutionStep from "../components/SolutionStep";
import styles from "./About.module.css";
import Footer from "../components/Footer";

function About() {
  return (
    <div className={styles['about-section']} id="about">
      <div className={styles['about-image-content']}>
        <img src={Doctor} alt="Doctor Group" className={styles['about-image1']} />
      </div>

      <div className={styles['about-text-content']}>
        <h3 className={styles['about-title']}>
          <span>About Us</span><hr/>
        </h3>
        <p className={styles['about-description']}>
        Welcome to Codyssey, your trusted partner for accessible and personalized programming education. Our expert instructors offer online courses and specialized resources, prioritizing your learning journey. Join us on this path to becoming a proficient coder.
        </p>

        <div className={styles.solution}><h4 className={styles['about-text-title']}>Your Solutions</h4><hr/>
</div>
        <SolutionStep
          title="Choose a Course"
          description=" Find the perfect course for your learning needs and enroll with ease at Codyssey. Expert instructors provide tailored education, focusing on your programming goals.
          "
          className={styles['solution-step']}
        />

        <SolutionStep
          title="Make a Schedule"
          description="Choose the date and time that suits you best, and let our dedicated team of programming professionals guide you with personalized learning plans."
          className={styles['solution-step']}
        />

        <SolutionStep
          title="Get Your Solutions"
          description="Our experienced instructors and mentors are here to offer expert guidance and customized learning paths, helping you achieve your full potential as a programmer."
          className={styles['solution-step']}
        />
      </div>
    </div>
  );
}

export default About;
