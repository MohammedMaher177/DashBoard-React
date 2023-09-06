import { createSlice, isAnyOf, isAllOf } from "@reduxjs/toolkit";
import { getRequestNameFromActionType } from "../../../utils";
import { fetchCategories, fetchCategoryById, updateCategory, createCategory } from "./CategoriesActions";

const initialState={
    categories:[],
    categoryById:{},
    loading:{},
    error:{}
}

const CategoriesSlice=createSlice({
    name:"categories",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
      builder
      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.loading[getRequestNameFromActionType(action?.type)] = false
        state.categories = action.payload;
      })
      .addCase(fetchCategoryById.fulfilled, (state, action) => {
        state.loading[getRequestNameFromActionType(action?.type)] = false;
        state.categoryById = action.payload;
      })
      .addCase(updateCategory.fulfilled, (state, action) => {
        state.loading['categories/updateCategory'] = false;
        state.categoryById = action.payload; 
      })
      .addCase(createCategory.fulfilled, (state, action) => {
        state.loading[getRequestNameFromActionType(action?.type)] = false;
        state.categories.push(action.payload);
      })
        .addMatcher(
          isAllOf(
            '/categories/fetchPending',
          ),
          (state, action) => {
           if(action.type.includes("pending")){
            const requestName =  getRequestNameFromActionType(action?.type,'/pending') 
            if(requestName){
              state.loading[requestName] = true
              state.error[requestName] = null;
            }
           }
          }
        )
        .addMatcher(
          isAnyOf(
            '/categories/fetchRejected'
            ),
          (state, action) => {
              if(action.type.includes("rejected")){
                state.loading[getRequestNameFromActionType(action?.type,'rejected')] = false
                state.error[getRequestNameFromActionType(action?.type,'rejected')] = null
              }
           
          }
        )
       
    },
});

export const {
    fetchCategoriesStart,
    fetchCategoriesSuccess,
    fetchCategoriesFailure,
  } = CategoriesSlice.actions;
  
  export default CategoriesSlice.reducer;