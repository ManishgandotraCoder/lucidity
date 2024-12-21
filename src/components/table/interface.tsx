import { InventoryInterface } from "../../redux/authInterfaces";

export interface Column<InventoryType> {
  key: keyof InventoryType | "actions";
  header: string;
  render?: (
    value: InventoryType[keyof InventoryType],
    row: InventoryType
  ) => React.ReactNode;
  prefix?: string;
}

export interface TableInterface<InventoryType> {
  data: InventoryType[] | [];
  columns: Column<InventoryType>[];
  onEdit?: (row: InventoryType) => void;
  onView?: (row: InventoryType) => void;
  onDelete?: (row: InventoryType) => void;
}
export interface InventoryStatusInterface {
  status: boolean;
  row: InventoryInterface;
}
