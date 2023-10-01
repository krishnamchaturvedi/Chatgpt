import React from 'react';

const CoursesButton = ({ label }) => {
  return (
    <button className="filter-button">
      <span>{label}</span>
    </button>
  );
};

export default CoursesButton;
