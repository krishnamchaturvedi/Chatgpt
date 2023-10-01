import React from 'react';

const SchoolButton = ({ label }) => {
  return (
    <button className="filter-button">
      <span>{label}</span>
    </button>
  );
};

export default SchoolButton;
