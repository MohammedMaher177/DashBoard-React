import { configureStore } from "@reduxjs/toolkit";
import productsReducer from "./slices/productsSlice/ProductsSlice";
import categoriesReducer from "./slices/categoriesSlice/CategoriesSlice"
import loginReducer from "./slices/loginSlice/LoginSlice"

const Store=configureStore({
  
  reducer:{
    products: productsReducer,
    categories: categoriesReducer,
    login: loginReducer 
  }
})

export default Store