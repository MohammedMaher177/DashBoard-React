import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosFetching from "../../../API/axiosFetching";
import { apiEndpoints } from "../../../constants/apiEndpoints";

export const fetchOrders = createAsyncThunk(
  "orders/fetchOrders",
  async (orderId) => {
    const endPoint = orderId
      ? apiEndpoints.categories.byId(orderId)
      : apiEndpoints.categories.all;

    const response = await axiosFetching.get(endPoint);
    return response.data.result;
  }
);

export const fetchCategoryById = createAsyncThunk(
  "categories/fetchCategoryById",
  async (categoryId) => {
    const endPoint = apiEndpoints.categories.byId(categoryId);
    const response = await axiosFetching.get(endPoint);
    return response.data.result;
  }
);

export const deleteCategory = createAsyncThunk(
  "categories/deleteCategory",
  async (categoryId, { rejectWithValue }) => {
    return await axiosFetching
      .delete(apiEndpoints.categories.byId(categoryId))
      .then(({ data }) => data)
      .catch(({ response }) => rejectWithValue(response.data));
  }
);

export const updateCategory = createAsyncThunk(
  "categories/updateCategory",
  async ({ id, updatedData }) => {
    const endPoint = apiEndpoints.categories.byId(id);
    return await axiosFetching
      .put(endPoint, updatedData)
      .then(({ data }) => data)
      .catch(({ response }) => response.data);
    // return data;
  }
);

export const createCategory = createAsyncThunk(
  "categories/addCategory",
  async (categoryData) => {
    console.log(categoryData);
    const response = await axiosFetching.post(
      apiEndpoints.categories.all,
      categoryData
    );
    console.log(response);
    return response.data;
  }
);

export const getCategoryNames = createAsyncThunk(
  "categories/fetchCategoryNames",
  async () => {
    const endPoint = apiEndpoints.categories.names;
    const response = await axiosFetching.get(endPoint);
    return response.data.result;
  }
);
