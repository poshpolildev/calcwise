import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-black text-center py-6 fixed bottom-0 left-0 right-0 z-40">
      <p className="text-sm text-gray-400">
        © {new Date().getFullYear()} PoshpoProduction
      </p>
    </footer>
  );
};

export default Footer;
