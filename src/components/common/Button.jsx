// src/components/common/Button.jsx
import React from 'react';

const Button = ({ children, onClick, type = 'button', variant = 'primary', className = '', ...props }) => {
  const baseStyle = 'px-6 py-3 rounded-lg font-semibold focus:outline-none focus:ring-2 focus:ring-opacity-50 transition-all duration-200 ease-in-out';
  const variants = {
    // brand-primary is now your theme-accent
    primary: 'bg-brand-primary hover:opacity-80 text-white focus:ring-brand-primary',
    secondary: 'bg-brand-secondary hover:opacity-80 text-gray-800 focus:ring-brand-secondary', // Keep or update brand-secondary
    ghost: 'bg-transparent hover:bg-theme-border text-theme-text-secondary border border-theme-border focus:ring-brand-primary',
  };

  return (
    <button
      type={type}
      onClick={onClick}
      className={`${baseStyle} ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;