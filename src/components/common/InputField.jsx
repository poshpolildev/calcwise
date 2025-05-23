// src/components/common/InputField.jsx
import React from 'react';

const InputField = ({ label, id, type = 'text', value, onChange, placeholder, error, unit, tooltip }) => {
  return (
    <div className="mb-4">
      <label htmlFor={id} className="block text-sm font-medium text-theme-text-secondary mb-1">
        {label} {unit && <span className="text-xs text-theme-text-secondary">({unit})</span>}
      </label>
      <input
        type={type}
        id={id}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className={`w-full px-4 py-2 bg-theme-input-bg border ${error ? 'border-red-500' : 'border-theme-border'} rounded-md shadow-sm focus:ring-brand-primary focus:border-brand-primary transition-colors duration-200 text-theme-text-primary placeholder-theme-text-secondary`}
      />
      {tooltip && <p className="mt-1 text-xs text-theme-text-secondary">{tooltip}</p>}
      {error && <p className="mt-1 text-xs text-red-400">{error}</p>}
    </div>
  );
};

export default InputField;