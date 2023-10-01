import React from 'react';

const CollegeButton = ({ label }) => {
  return (
    <button className="filter-button">
      <span>{label}</span>
    </button>
  );
};

export default CollegeButton;
