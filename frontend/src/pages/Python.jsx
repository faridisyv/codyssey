import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash, faSearch } from '@fortawesome/free-solid-svg-icons';
import { pythonData } from '../assets/data'; // Importing the data from data.js
import './Python.css'; // Importing CSS file for styling

function Python() {
  const [sidebarVisible, setSidebarVisible] = useState(true);
  const [pageNumber, setPageNumber] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredPythonData, setFilteredPythonData] = useState(pythonData);
  const itemsPerPage = 3; // Number of items to display per page

  const toggleSidebar = () => {
    setSidebarVisible(!sidebarVisible);
  };

  const nextPage = () => {
    setPageNumber(pageNumber + 1);
  };

  const prevPage = () => {
    setPageNumber(pageNumber - 1);
  };

  const handleSearch = () => {
    if (searchQuery.trim() === '') {
      // If the search query is empty, reset the filtered data without any highlights
      setFilteredPythonData(pythonData);
    } else {
      const regex = new RegExp(searchQuery, 'gi');
      const filteredData = pythonData.map(section => {
        let title = section.title;
        let content = section.content;
        if (title.toLowerCase().includes(searchQuery.toLowerCase())) {
          title = title.replace(regex, match => `<span class="highlight">${match}</span>`);
        }
        if (content.toLowerCase().includes(searchQuery.toLowerCase())) {
          content = content.replace(regex, match => `<span class="highlight">${match}</span>`);
        }
        return { ...section, title, content };
      });
      setFilteredPythonData(filteredData);
    }
    setPageNumber(1); // Reset page number when performing a new search
  };
  
  
  

  const startItemIndex = (pageNumber - 1) * itemsPerPage;
  const endItemIndex = pageNumber * itemsPerPage;

  return (
    <div className="python-page">
      <button className="toggle-sidebar-button" onClick={toggleSidebar}>
        {sidebarVisible ? <FontAwesomeIcon icon={faEyeSlash} /> : <FontAwesomeIcon icon={faEye} />}
      </button> 
      <div className={`python-sidebar ${sidebarVisible ? 'visible' : 'hidden'}`}> <br />
        <h3>Contents</h3> <hr />
        <ul className="sidebar-list">
          {filteredPythonData.map((section, index) => (
            <li key={index}><a href={`#/python#${section.title.toLowerCase().replace(/\s+/g, '-')}`}>{section.title}</a></li>
          ))}
        </ul>
      </div>
      <div className="python-content">
        <h1 className="title">Python</h1>
        <input
          type="text"
          className="search-input"
          placeholder="Search..."
          value={searchQuery}
          onChange={e => setSearchQuery(e.target.value)}
        />
        <button className="search-button" onClick={handleSearch}>
  <FontAwesomeIcon icon={faSearch} />
</button>
        <div className="content-pages">
          {filteredPythonData.slice(startItemIndex, endItemIndex).map((section, index) => (
            <div key={index} className="python-container" id={section.title.toLowerCase().replace(/\s+/g, '-')}><br></br>
              <h2>{section.title}</h2> <hr />
              <div dangerouslySetInnerHTML={{ __html: section.content }} />
            </div>
          ))}
        </div>
        <div className="pagination-buttons">
          {pageNumber > 1 && (
            <button className="prev-button" onClick={prevPage}>Previous</button>
          )}
          {endItemIndex < filteredPythonData.length && (
            <button className="next-button" onClick={nextPage}>Next</button>
          )}
        </div>
        <footer className="python-footer">
          <p>If you've read all contents, you can join our quiz!</p>
          <a href="/pythonquizes" className="take-quiz-button">Take Quiz</a>
          <a href='/'>Home</a>
        </footer>
      </div>
    </div>
  );
}

export default Python;
