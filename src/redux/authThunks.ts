import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { InventoryInterface } from "./authInterfaces";

const API_BASE_URL = "https://dev-0tf0hinghgjl39z.api.raw-labs.com/"; // Replace with your API URL

export const getInventory = createAsyncThunk<
  InventoryInterface[],
  void,
  { rejectValue: any }
>("inventory", async (_, { rejectWithValue }) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/inventory`);
    return response.data as InventoryInterface[];
  } catch (error: any) {
    return rejectWithValue(
      error.response?.data?.message || "Failed to fetch inventory"
    );
  }
});
