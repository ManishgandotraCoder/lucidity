import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import React from "react";
const ToggleSwitch = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialRole = searchParams.get("role") === "admin";
  const [isAdmin, setIsAdmin] = useState(initialRole);

  const handleToggle = () => {
    const newRole = isAdmin ? "user" : "admin";
    setIsAdmin(!isAdmin);
    searchParams.set("role", newRole);
    setSearchParams(searchParams);
  };

  return (
    <div className="flex items-center space-x-4">
      {/* Admin Label */}
      <span
        className={`text-sm ${
          isAdmin ? "font-medium text-lightGreen" : "text-white"
        }`}
      >
        Admin
      </span>

      {/* Toggle Button */}
      <button
        onClick={handleToggle}
        className={`relative inline-flex items-center h-6 w-11 rounded-full transition-colors duration-300 
          ${isAdmin ? "bg-lightGreen" : "bg-gray-400"}
        `}
      >
        <span
          className={`absolute w-4 h-4 rounded-full bg-white border transition-transform transform
            ${isAdmin ? "translate-x-5" : "translate-x-0"}
          `}
        ></span>
      </button>

      {/* User Label */}
      <span
        className={`text-sm ${
          isAdmin ? "text-white" : "font-medium text-lightGreen"
        }`}
      >
        User
      </span>
    </div>
  );
};

export default ToggleSwitch;
