import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosFetching from "../../../API/axiosFetching";
import { apiEndpoints } from "../../../constants/apiEndpoints";

export const fetchProducts = createAsyncThunk("products", async (productId) => {
  const endPoint = productId
    ? apiEndpoints.products.byId(productId)
    : apiEndpoints.products.all;
  const response = await axiosFetching.get(endPoint);
  return response.data.result;
});

export const fetchProductById = createAsyncThunk(
  "products/fetchProductById",
  async (productId) => {
    const endPoint = apiEndpoints.products.byId(productId);
    const response = await axiosFetching.get(endPoint);
    return response.data.data;
  }
);

export const deleteProduct = createAsyncThunk(
  "products/deleteProduct",
  async (productId) => {
    await axiosFetching.delete(apiEndpoints.products.byId(productId));
  }
);

export const updateProduct = createAsyncThunk(
  "products/updateProduct",
  async ({ id, updatedData }) => {
    const endPoint = apiEndpoints.products.byId(id);
    const response = await axiosFetching.put(endPoint, updatedData);
    return response.data.data;
  }
);

export const createProduct = createAsyncThunk(
  "products/createProduct",
  async (productData) => {
    const response = await axiosFetching.post(
      apiEndpoints.products.all,
      productData
    );
    return response.data.data;
  }
);
