import React from 'react';

const Footer = () => {
  return (
    <footer className="footer-container">
      <p>&copy; {new Date().getFullYear()} FlyHigh. All Rights Reserved.</p>
      <div>
        <a href="https://www.flyhigh.ai/" target="_blank" rel="noopener noreferrer">Privacy Policy</a>
        <span>|</span>
        <a href="https://www.flyhigh.ai/" target="_blank" rel="noopener noreferrer">Terms of Service</a>
      </div>
    </footer>
  );
};

export default Footer;
