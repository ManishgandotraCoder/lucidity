import { InventoryInterface } from "../../redux/authInterfaces";

export interface FormModalInterface {
  isOpen: {
    status: boolean;
    row: InventoryInterface;
  };
  onClose: () => void;
  onSave: (updatedRow: InventoryInterface) => void;
  title: string;
}
export interface ConfirmationPromptInterface {
  onConfirm: () => void;
  onCancel: () => void;
}
