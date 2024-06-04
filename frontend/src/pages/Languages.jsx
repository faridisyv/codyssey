import React from 'react';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom
import styles from './Languages.module.css';
import Section from '../components/Section';
import Navbar from '../components/Navbar';


const Languages = () => {
  const languages = [
    {
      title: 'General Programming',
      imageUrl: 'https://apps.weber.edu/wsuimages/DOCE/badgeup/BasicProgrammingConceptsBanner-AdobeStock_348397404.jpg', // Replace with the actual URL of the JavaScript image
      link: '/generalprogramming', // Specify the destination URL for JavaScript
    },
    {
      title: 'Web Programming',
      imageUrl: 'https://www.mooc.org/hubfs/javascript-jpg.jpeg', // Replace with the actual URL of the Python image
      link: '/webprogramming', // Specify the destination URL for Python
    },
    {
      title: 'Mobile Programming',
      imageUrl: 'https://designli.co/hubfs/Imported_Blog_Media/chris-ried-ieic5Tq8YMk-unsplash.jpg', // Replace with the actual URL of the Java image
      link: '/java', // Specify the destination URL for Java
    },
    {
        title: 'Database Systems',
      imageUrl: 'https://cdn.corporatefinanceinstitute.com/assets/database-1024x703.jpeg', // Replace with the actual URL of the Java image
      link: '/java', // Specify the destination URL for Java
    }
    
  ];

  return (
    <>
    {/* <Section
      className="pt-[12rem] -mt-[5.25rem]"
      crosses
      crossesOffset="lg:translate-y-[5.25rem]"
      customPaddings
      id="hero"
    /> */}
    <br/> <br/> <br/>
    <div className={styles.languagesWrapper}>
      <h1 className={styles.mainTitle}>Catalogs</h1>
      {languages.map((language, index) => (
        <Link key={index} to={language.link} className={styles.languageItem}>
          <div className={styles.languageContainer}>
            <div className={styles.languageBackground} style={{ backgroundImage: `url(${language.imageUrl})` }} />
            <h3 className={styles.languageTitle}>{language.title}</h3>
          </div>
        </Link>
      ))}
    </div>
  </>);
};

export default Languages;
