// src/components/layout/Header.jsx
import React from 'react';

const Header = ({ onHomeClick }) => {
  return (
    <header 
      className="bg-theme-panel-dark shadow-md py-4 px-6 fixed top-0 left-0 right-0 z-40 border-b border-theme-border 
                 md:px-6 sm:pl-16 pl-16 pr-6" // MODIFIED LINE
    >
      <div className="container mx-auto flex justify-between items-center">
        <h1 
          className="text-2xl font-bold text-brand-primary cursor-pointer" 
          onClick={onHomeClick}
        >
          Calc Wise
        </h1>
        <nav>
          <a
            href="https://paypal.me" // Replace with your actual PayPal link
            target="_blank"
            rel="noopener noreferrer"
            className="text-theme-text-secondary hover:text-brand-primary px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 ml-2"
          >
            Donate Us
          </a>
        </nav>
      </div>
    </header>
  );
};

export default Header;
