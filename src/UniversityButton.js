import React from 'react';

const UniversityButton = ({ label }) => {
  return (
    <button className="filter-button">
      <span>{label}</span>
    </button>
  );
};

export default UniversityButton;
