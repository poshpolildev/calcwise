// src/components/layout/Header.jsx
import React from 'react';
import { FiGithub } from 'react-icons/fi'; // Assuming you kept this

const Header = ({ onHomeClick }) => {
  const contactLink = "https://github.com/poshpolildev";

  return (
    <header
      className="bg-theme-panel-dark shadow-md py-4 fixed top-0 left-0 right-0 z-40 border-b border-theme-border 
                 pr-6 md:px-6 pl-16 sm:pl-16" // Ensure sufficient left padding on small screens
    >
      <div className="container mx-auto flex justify-between items-center">
        <h1
          className="text-2xl font-bold text-brand-primary cursor-pointer"
          onClick={onHomeClick}
        >
          Calc Wise
        </h1>
        <nav className="flex items-center">
          <a
            href={contactLink}
            target="_blank"
            rel="noopener noreferrer"
            className="text-theme-text-secondary hover:text-brand-primary px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 ml-2 flex items-center"
            title="Contact me on GitHub"
          >
            <FiGithub className="mr-1.5 h-4 w-4" />
            Contact Me
          </a>
          <a
            href="https://paypal.me/yourlink" // Replace with your actual PayPal link
            target="_blank"
            rel="noopener noreferrer"
            className="text-theme-text-secondary hover:text-brand-primary px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 ml-2"
          >
            Donate Me
          </a>
        </nav>
      </div>
    </header>
  );
};

export default Header;
