import React from 'react';

const SearchResult = ({ searchResults }) => {
  return (
    <div className="search-results">
      {searchResults && searchResults.length > 0 ? (
        // Display all search results if there are no filtered results
        searchResults.map((result) => (
          // Display individual search result data here
          <div key={result.title} className="search-result">
            <p className="result-title">{result.title}</p>
            <p className="result-description">{result.description}</p>
            <p className="result-url">{result.url}</p>
          </div>
        ))
      ) : (
        // Display a message if there are no results
        <p>No results found.</p>
      )}
    </div>
  );
};

export default SearchResult;
