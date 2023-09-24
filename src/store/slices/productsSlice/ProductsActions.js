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
  async (productId, { rejectWithValue }) => {
    console.log(productId);
    return await axiosFetching
      .delete(apiEndpoints.products.byId(productId))
      .then(({data}) => {
        console.log(data);
        return data;
      })
      .catch(({response}) => {
        console.log(response);
        return rejectWithValue(response);
      });
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
  "products/addProduct",
  async (productData, { rejectWithValue }) => {
    console.log(productData);
    // axiosFetching.headers = "multipart/form-data"
    return await axiosFetching
      .post(apiEndpoints.products.all, productData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then(({ data }) => data)
      .catch(({ response }) => {
        console.log(response);
        return rejectWithValue(response.data);
      });
  }
);
