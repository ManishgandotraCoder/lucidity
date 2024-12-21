export interface InventoryInterface {
  name: string;
  price: string;
  value: string;
  category: string;
  quantity: number;
  enabled: boolean;
}

export interface AuthState {
  inventoryList: InventoryInterface[] | null;
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}
