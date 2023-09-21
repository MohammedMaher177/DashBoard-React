import { createSlice, isAnyOf, isAllOf } from "@reduxjs/toolkit";
import { getRequestNameFromActionType } from "../../../utils";
import { fetchCategories, fetchCategoryById, updateCategory, createCategory, deleteCategory } from "./CategoriesActions";

const initialState={
    categories:[],
    categoryById:{},
    loading:{},
    error:{},
    msg:null
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
      .addCase(deleteCategory.pending, (state, actions) => {
        state.loading['categories/deleteCategory'] = true
        state.msg = null
      })
      .addCase(deleteCategory.fulfilled, (state, {payload}) => {
        const {message, result} = payload
        state.loading['categories/deleteCategory'] = false
        state.error['categories/deleteCategory'] = null
        state.msg = message
        state.categories= state.categories.filter(el => el._id !== result._id)
      })
      .addCase(deleteCategory.rejected, (state, actions) => {
        console.log(actions.payload);
        state.loading['categories/deleteCategory'] = false
        state.error['categories/deleteCategory'] = actions.payload.error
        state.msg = actions.payload.message
      })
      .addCase(updateCategory.pending, (state, action) => {
        state.loading['categories/updateCategory'] = true;
        state.msg = null
        state.error['categories/updateCategory'] = null
      })
      .addCase(updateCategory.fulfilled, (state, action) => {
        const {result, message , error} = action.payload
        state.msg = message
        state.loading['categories/updateCategory'] = false;
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