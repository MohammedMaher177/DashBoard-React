import { createSlice } from "@reduxjs/toolkit";
import { getRequestNameFromActionType } from "../../../utils";
import { fetchCategories, fetchCategoryById, updateCategory, createCategory, deleteCategory, getCategoryNames } from "./OrderActions";

const initialState={
    categories:[],
    categoryById:{},
    orders:[],
    orderById:{},
    loading:{},
    error:{},
    msg:null,
    names:[]
}

const CategoriesSlice=createSlice({
    name:"orders",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
      builder
      .addCase(fetchCategories.pending, (state, action) => {
        state.loading["orders/fetchCategories"] = true
      })
      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.loading["orders/fetchCategories"] = false
        state.categories = action.payload;
      })
      .addCase(fetchCategoryById.fulfilled, (state, action) => {
        state.loading[getRequestNameFromActionType(action?.type)] = false;
        state.categoryById = action.payload;
      })
      .addCase(deleteCategory.pending, (state, actions) => {
        state.loading['orders/deleteCategory'] = true
        state.msg = null
      })
      .addCase(deleteCategory.fulfilled, (state, {payload}) => {
        const {message, result} = payload
        state.loading['orders/deleteCategory'] = false
        state.error['orders/deleteCategory'] = null
        state.msg = message
        state.categories= state.categories.filter(el => el._id !== result._id)
      })
      .addCase(deleteCategory.rejected, (state, actions) => {
        console.log(actions.payload);
        state.loading['orders/deleteCategory'] = false
        state.error['orders/deleteCategory'] = actions.payload.error
        state.msg = actions.payload.message
      })
      .addCase(updateCategory.pending, (state, action) => {
        state.loading['orders/updateCategory'] = true;
        state.msg = null
        state.error['orders/updateCategory'] = null
      })
      .addCase(updateCategory.fulfilled, (state, action) => {
        const {result, message , error} = action.payload
        state.msg = message
        state.loading['orders/updateCategory'] = false;
        if(message === "success"){
          state.categories.forEach((cat, i) => {
            if(cat?._id === result?._id){
              state.categories[i] = result
            }
          })
        }else {
          state.error['categories/updateCategory'] = error
        }
      })
      .addCase(updateCategory.rejected, (state, action) => {
        const { message } = action.payload
        state.msg = message
        state.loading['categories/updateCategory'] = false;
        state.error['categories/updateCategory'] = action.payload; 
      })
      .addCase(createCategory.pending, (state, action) => {
        state.loading["categories/addCategory"] = true
      })
      .addCase(createCategory.fulfilled, (state, action) => {
        state.loading["categories/addCategory"] = false
        state.categories = action.payload
      })
      .addCase(createCategory.rejected, (state, action) => {
        state.loading["categories/addCategory"] = false
        console.log(action.payload);
        state.error["categories/addCategory"] = action.payload
      })
      .addCase(getCategoryNames.pending, (state, actions) => {
        state.loading["categories/names"] = true
      })
      .addCase(getCategoryNames.fulfilled, (state, actions) => {
        state.loading["categories/names"] = false
        state.names = actions.payload
      })
       
    },
});

export const {
    fetchCategoriesStart,
    fetchCategoriesSuccess,
    fetchCategoriesFailure,
  } = CategoriesSlice.actions;
  
  export default CategoriesSlice.reducer;




  // .addCase(createCategory.fulfilled, (state, action) => {
  //   state.loading["categories/addCategory"] = false;
  //   state.categories.push(action.payload);
  // })
  //   .addMatcher(
  //     isAllOf(
  //       '/categories/fetchPending',
  //     ),
  //     (state, action) => {
  //      if(action.type.includes("pending")){
  //       const requestName =  getRequestNameFromActionType(action?.type,'/pending') 
  //       if(requestName){
  //         state.loading[requestName] = true
  //         state.error[requestName] = null;
  //       }
  //      }
  //     }
  //   )
  //   .addMatcher(
  //     isAnyOf(
  //       '/categories/fetchRejected'
  //       ),
  //     (state, action) => {
  //         if(action.type.includes("rejected")){
  //           state.loading[getRequestNameFromActionType(action?.type,'rejected')] = false
  //           state.error[getRequestNameFromActionType(action?.type,'rejected')] = null
  //         }
       
  //     }
  //   )