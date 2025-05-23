import React from 'react';
import { motion } from 'framer-motion';

const CalculatorInfoBox = ({ toolName, explanation }) => {
  if (!toolName || !explanation) {
    return null; // Don't render if essential info is missing
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="mb-8 p-6 bg-theme-panel-dark border border-theme-border rounded-xl shadow-xl text-center"
    >
      <h2 className="text-3xl lg:text-4xl font-semibold text-theme-text-primary mb-3">
        {toolName}
      </h2>
      <p className="text-sm text-theme-text-secondary max-w-2xl mx-auto leading-relaxed">
        {explanation}
      </p>
    </motion.div>
  );
};

export default CalculatorInfoBox;
