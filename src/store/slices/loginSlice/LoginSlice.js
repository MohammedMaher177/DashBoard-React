import { createSlice } from "@reduxjs/toolkit";
import { loginUser } from "./LoginAction";

const initialState={
  message:null,
    loading:false,
    error:null
};
  
  const LoginSlice = createSlice({
    name: 'login',
    initialState,
    reducers: {
      logout : (state)=>{
        state.message = null
      }
    },
    extraReducers: (builder) => {
      builder
        .addCase(loginUser.pending, (state) => {
          state.loading = true;
          state.error = null;
        })
        .addCase(loginUser.fulfilled, (state, action) => {
          console.log(action.payload);
          state.loading = false;
          state.message = action.payload.message;
        })
        .addCase(loginUser.rejected, (state, action) => {
          state.loading = false;
          state.error = action.payload;
        });
    },
  });
  
  export const {logout} = LoginSlice.actions


  export default LoginSlice.reducer;