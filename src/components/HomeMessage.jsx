import React from 'react';
import { motion } from 'framer-motion';

const HomeMessage = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, ease: "easeOut" }}
      className="flex flex-col items-center justify-center text-center h-full px-4"
    >
      <motion.h1
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, delay: 0.2, ease: "easeOut" }}
        className="text-4xl sm:text-5xl md:text-6xl font-bold text-gray-100 mb-6"
      >
        Welcome to <span className="text-brand-primary">Calc Wise</span>
      </motion.h1>
      <motion.h2
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, delay: 0.4, ease: "easeOut" }}
        className="text-xl sm:text-2xl text-gray-300 mb-8"
      >
        Your Smart Financial Toolkit
      </motion.h2>
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.6 }}
        className="text-lg text-gray-400"
      >
        Choose a tool from the left panel to begin your calculation.
      </motion.p>
    </motion.div>
  );
};

export default HomeMessage;
