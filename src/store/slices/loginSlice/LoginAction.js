import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosFetching from '../../../API/axiosFetching';
import Cookies from 'js-cookie';

export const loginUser = createAsyncThunk('login/loginUser', async ({ email, password }, { rejectWithValue }) => {
    try {
      const response = await axiosFetching.post('/auth/signin', {
        email,
        password,
      });
      if (response.status === 200) {
        const { data } = response;
        Cookies.set('token', data.token); 
        return data;
      } else {
        return rejectWithValue('status error');
      }
    } catch (error) {
      console.log(error);
      return rejectWithValue('invalid email or password');
    }
  });