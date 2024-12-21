import React from "react";
import { ConfirmationPromptInterface } from "../interface";

const ConfirmationPrompt: React.FC<ConfirmationPromptInterface> = ({
  onConfirm,
  onCancel,
}) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-modalBg bg-opacity-50 z-50">
      <div className="bg-modalBg rounded-lg shadow-lg w-80 p-6">
        {/* Title */}
        <h2 className="text-lg font-semibold text-gray-100">Are you sure?</h2>

        {/* Description */}
        <p className="mt-2 text-sm text-gray-200">
          Do you really want to delete this item? This action cannot be undone.
        </p>

        {/* Action Buttons */}
        <div className="mt-4 flex justify-end space-x-3">
          <button
            onClick={onCancel}
            className="px-4 py-2 text-lightGreen hover:text-lightGreen focus:outline-none"
          >
            Cancel
          </button>
          <button
            className="px-3 py-1 bg-red-500 text-gray-100 rounded-md hover: focus:outline-none focus:ring-2 "
            onClick={onConfirm}
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationPrompt;
