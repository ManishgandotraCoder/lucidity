import { InventoryInterface } from "../../redux/authInterfaces";

export interface columnsInterface {
  key: keyof InventoryInterface | "actions";
  header: string;
  prefix?: string;
}

export interface handleActionInterface {
  action: "Delete" | "Edit" | "View"; // Limit to specific action InventoryInterfaces
  row: InventoryInterface;
}
export interface dashboardInterface {
  inventoryList: InventoryInterface[];
  handleAction: (action: string, row: InventoryInterface) => void;
  columns: columnsInterface[];
}
