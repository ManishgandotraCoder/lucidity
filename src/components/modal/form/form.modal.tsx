import React, { useState } from "react";
import InputComponent from "../../input";
import { InventoryInterface } from "../../../redux/authInterfaces";
import { FormModalInterface } from "../interface";

const FormModalComponent: React.FC<FormModalInterface> = ({
  isOpen,
  onClose,
  onSave,
  title,
}) => {
  if (!isOpen.status) return null;

  // Initialize form state
  const [formData, setFormData] = useState<InventoryInterface>({
    name: isOpen.row?.name || "",
    price: isOpen.row?.price || "",
    quantity: isOpen.row?.quantity || 0,
    value: isOpen.row?.value || "",
    category: isOpen.row?.category || "",
    enabled: isOpen.row?.enabled || false,
  });

  // Handle form input changes
  const handleInputChange = (
    field: keyof InventoryInterface,
    value: string | number
  ) => {
    const updatedFormData = { ...formData, [field]: value };
    const price = parseFloat(updatedFormData.price as unknown as string) || 0;
    const quantity =
      parseInt(updatedFormData.quantity as unknown as string) || 0;
    updatedFormData.value = (price * quantity).toString();
    setFormData(updatedFormData);
  };

  // Handle save button click
  const handleSave = () => {
    onSave(formData);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      {/* Modal Content */}
      <div
        className="bg-modalBg rounded-lg shadow-lg p-4 animate-fade-in"
        role="dialog"
        aria-labelledby="modal-title"
        aria-modal="true"
      >
        {/* Modal Header */}
        <div className="flex justify-between items-center  pb-2">
          <h3 className="text-xl font-semibold text-light">{title}</h3>
          <button
            onClick={onClose}
            className="text-lightGreen  hover:text-gray-700 focus:outline-none"
            aria-label="Close modal"
          >
            ✕
          </button>
        </div>
        <h1>{formData.name}</h1>
        {/* Modal Body */}
        <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Category Input */}
          <InputComponent
            label="Category"
            value={formData.category}
            onChange={(e) => handleInputChange("category", e.target.value)}
          />

          {/* Price Input */}
          <InputComponent
            label="Price"
            prefixIcon="$"
            value={formData.price}
            onChange={(e) =>
              handleInputChange("price", parseFloat(e.target.value) || 0)
            }
          />

          {/* Quantity Input */}
          <InputComponent
            label="Quantity"
            value={formData.quantity}
            onChange={(e) =>
              handleInputChange("quantity", parseInt(e.target.value) || 0)
            }
          />

          {/* Value Input */}
          <InputComponent
            label="Value"
            prefixIcon="$"
            value={formData.value}
            disabled
            onChange={(e) =>
              handleInputChange("value", parseFloat(e.target.value) || 0)
            }
          />
        </div>

        {/* Modal Footer */}
        <div className="mt-6 flex justify-end space-x-4">
          <button
            onClick={onClose}
            className="px-4 py-2 text-lightGreen hover:text-lightGreen focus:outline-none"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="px-4 py-2 bg-customGray text-gray-100 rounded-md hover: focus:outline-none focus:ring-2 "
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default FormModalComponent;
