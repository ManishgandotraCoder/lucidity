import React from "react";
import { InputInterface } from "./interface";

const InputComponent: React.FC<InputInterface> = ({
  label,
  value,
  onChange,
  prefixIcon,
  disabled,
}) => {
  return (
    <div className="max-w-md mx-auto">
      {/* Label */}
      {label && (
        <label
          htmlFor={label}
          className="block text-sm font-medium text-gray-300 mb-2"
        >
          {label}
        </label>
      )}

      {/* Input Wrapper */}
      <div className="relative flex items-center">
        {/* Prefix Icon */}
        {prefixIcon && (
          <span className="absolute left-3 text-gray-400">{prefixIcon}</span>
        )}
        {/* Input Field */}
        <input
          id={label}
          type="text"
          placeholder={`Enter ${label}`}
          value={value}
          disabled={disabled}
          onChange={onChange}
          className={`w-full ${
            prefixIcon ? "pl-10" : "pl-3"
          } py-2 rounded-lg shadow-sm bg-customGray text-white placeholder-gray-400 focus:outline-none focus:ring-2 transition duration-150`}
        />
      </div>
    </div>
  );
};

export default InputComponent;
