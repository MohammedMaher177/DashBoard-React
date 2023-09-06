import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosFetching from "../../../API/axiosFetching";
import { apiEndpoints } from "../../../constants/apiEndpoints";

export const fetchCategories=createAsyncThunk('categories/fetchCategories', 
    async(categoryId)=>{
      const endPoint=categoryId ? apiEndpoints.categories.byId(categoryId) : apiEndpoints.categories.all
     
      const response= await axiosFetching.get(endPoint);
      return response.data.data
});

export const fetchCategoryById=createAsyncThunk('categories/fetchCategoryById', async(categoryId)=>{
  const endPoint=apiEndpoints.categories.byId(categoryId);
  const response=await axiosFetching.get(endPoint)
  return response.data.data
})

export const deleteCategory=createAsyncThunk('categories/deleteCategory', async(categoryId)=>{
  // console.log(categoryId);

    await axiosFetching.delete(apiEndpoints.categories.byId(categoryId))
    
});

export const updateCategory = createAsyncThunk(
  "categories/updateCategory",
  async ({ id, updatedData }) => {
    const endPoint = apiEndpoints.categories.byId(id);
    const response = await axiosFetching.put(endPoint, updatedData);
    return response.data.data;
  }
);

export const createCategory = createAsyncThunk(
  'categories/createCategory',
  async (categoryData) => {
      const response = await axiosFetching.post(apiEndpoints.categories.all, categoryData);
      return response.data.data;
    
  }
);