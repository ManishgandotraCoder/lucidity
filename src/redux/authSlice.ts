import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AuthState, InventoryInterface } from "./authInterfaces";
import { getInventory } from "./authThunks";

const getStoredUser = (): InventoryInterface[] | null => {
  try {
    if (typeof window === "undefined") return null;
    return JSON.parse(localStorage.getItem("user") || "null");
  } catch {
    return null;
  }
};

const initialState: AuthState = {
  inventoryList: getStoredUser(),
  status: "idle",
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getInventory.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(
        getInventory.fulfilled,
        (state, action: PayloadAction<InventoryInterface[]>) => {
          state.status = "succeeded";
          state.inventoryList = action.payload;
        }
      )
      .addCase(getInventory.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || "Getting Inventory failed";
      });
  },
});

export default authSlice.reducer;
