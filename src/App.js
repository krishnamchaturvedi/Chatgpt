import React, { useState } from 'react';
import Header from './Header';
import SearchBar from './SearchBar';
import SearchResult from './searchResult';
import Footer from './Footer';
import SERP from './SERP';
import Chatbox from './Chatbox';
import SchoolButton from './SchoolButton';
import CollegeButton from './CollegeButton';
import UniversityButton from './UniversityButton';
import CoursesButton from './CoursesButton';

import './App.css';

const App = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  const handleSearchs = (event) => {
    const query = event.detail.source;
    setSearchQuery(query);
    getData(query);
  };

  const getData = async (query) => {
    if (query === '') {
      setSearchResults([]);
      return;
    }

    const specialCharactersRegex = /[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/;
    if (specialCharactersRegex.test(query)) {
      setSearchResults([]);
      return;
    }

    try {
      const response = await fetch(`http://localhost:8081/api/search?query=${query}`);
      if (!response.ok) {
        throw new Error('Failed to fetch search results');
      }

      const data = await response.json();
      setSearchResults(data);
    } catch (error) {
      console.error(error);
      setSearchResults([]);
    }
  };

  return (
    <div>
      <Header />
      <div className="app-container">
        {searchQuery === "" ? (
          <div style={{ marginBottom: "90px" }}></div>
        ) : (
          <img
            src="https://cdn.discordapp.com/attachments/1123095896989642854/1134747170969505812/bird.png"
            alt="Logo"
            className="logo"
          />
        )}
        {searchQuery === "" ? (
          <img
            src="https://cdn.discordapp.com/attachments/1123095896989642854/1134726176246616094/descr.png"
            alt="Description"
            className="Description"
          />
        ) : (
          <div className="search-bar-container">
            <SearchBar searchQuery={searchQuery} onSearch={handleSearchs} />
            <div style={{ display: "flex", marginTop: "10px" }}>
              <SchoolButton label="Schools" />
              <div style={{ width: "20px" }}></div>
              <CollegeButton label="Colleges" />
              <div style={{ width: "20px" }}></div>
              <UniversityButton label="Universities" />
              <div style={{ width: "20px" }}></div>
              <CoursesButton label="Courses" />
            </div>
          </div>
        )}
        {searchQuery === "" ? (
          <SearchResult searchResults={searchResults} />
        ) : (
          <SERP searchResults={searchResults} />
        )}
      </div>
      <Chatbox />
      <Footer />
    </div>
  );
};

export default App;
