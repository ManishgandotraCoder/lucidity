import { RootState } from "./store";

export const selectAuthUser = (state: RootState) =>
  state.inventory.inventoryList;
export const selectAuthStatus = (state: RootState) => state.inventory.status;
export const selectAuthError = (state: RootState) => state.inventory.error;
