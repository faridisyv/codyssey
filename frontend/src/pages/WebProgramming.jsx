import React from 'react';

import Container from '../components/Container';
import './WebProgramming.css'; // Make sure to create this CSS file

// Example data for the containers
const data = [
  {
    title: 'PHP',
    description: 'PHP is a server-side scripting language primarily used for web development. It is commonly embedded into HTML to add dynamic functionality to web pages. PHP code is executed on the server, generating HTML which is then sent to the clients web browser.',
    imageUrl: 'https://e7.pngegg.com/pngimages/320/790/png-clipart-web-development-php-programming-language-computer-programming-scripting-language-others-miscellaneous-blue.png', // Replace with actual image path
    link: '/php', // Replace with the actual link
  },
  {
    title: 'JavaScript Ecosystem',
    description: 'JavaScript is essential for web development, with numerous frameworks like React, Vue, and Angular.',
    imageUrl: 'https://static.vecteezy.com/system/resources/previews/012/697/298/original/3d-javascript-logo-design-free-png.png', // Replace with actual image path
    link: '/javascript', // Replace with the actual link
  },
  {
    title: 'C++ Programming',
    description: 'Renowned for its performance and flexibility, C++ is a versatile language used in diverse fields such as system programming, game development, high-frequency trading, embedded systems, and even some aspects of artificial intelligence and machine learning.',
    imageUrl: 'https://cdn3d.iconscout.com/3d/free/thumb/free-c-language-logo-6563484-5453029.png', // Replace with actual image path
    link: '/c++', // Replace with the actual link
  },
  {
    title: 'C# Programming',
    description: 'With its powerful features and seamless integration with the .NET framework, C# is a versatile language that excels in web development, desktop applications, game development, and enterprise software solutions.',
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/bd/Logo_C_sharp.svg/512px-Logo_C_sharp.svg.png?20221121173824', // Replace with actual image path
    link: '/python', // Replace with the actual link
  },
  {
    title: 'C Programming',
    description: 'Python is a versatile language used for web development, data analysis, artificial intelligence, and more.',
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/18/C_Programming_Language.svg/926px-C_Programming_Language.svg.png', // Replace with actual image path
    link: '/python', // Replace with the actual link
  },
  {
    title: 'Kotlin Programming',
    description: 'Kotlins concise syntax, interoperability with Java, and strong type system make it a versatile language suitable for developing Android apps,backend services, web applications, and even native applications through frameworks like Kotlin/Native. Its modern features and seamless integration with existing Java codebases make it a favorite among developers for a wide range of projects.',
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/74/Kotlin_Icon.png/1200px-Kotlin_Icon.png', // Replace with actual image path
    link: '/python', // Replace with the actual link
  },
];

const GeneralProgramming = () => {
  return (
    <>

      <h1 className="page-title">Languages</h1>
      <br></br>
      <hr />
      <div className="container-row">
        {data.map((item, index) => (
          <div key={index} className="column">
            <Container className="rectangular-container">
              <a href={item.link} className="title-link"><h2>{item.title}</h2></a>
              <img src={item.imageUrl} alt={item.title} className="container-image" />
              <hr />
              <p>{item.description}</p>
            </Container>
          </div>
        ))}
      </div>
    </>
  );
}

export default GeneralProgramming;
