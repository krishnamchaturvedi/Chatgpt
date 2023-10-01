import React from 'react';
import SearchResult from './searchResult';

const SERP = ({ searchResults }) => {
  return (
    <div className="serp-container">
      <h2>Search Results</h2>
      {searchResults.length > 0 ? (
        searchResults.map((result) => (
          <SearchResult key={result.id} result={result} />
        ))
      ) : (
        <p>No results found.</p>
      )}
    </div>
  );
};

export default SERP;
