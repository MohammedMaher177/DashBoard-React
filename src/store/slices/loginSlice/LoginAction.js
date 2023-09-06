import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosFetching from '../../../API/axiosFetching';
import Cookies from 'js-cookie';

export const loginUser = createAsyncThunk('login/loginUser', async ({ email, password }, { reject }) => {
    try {
      const response = await axiosFetching.post('/auth/login', {
        email,
        password,
      });
  
      if (response.status === 200) {
        const { data } = response;
        Cookies.set('token', data.token, { expires: 7 }); 
        return data.user;
      } else {
        return reject('status error');
      }
    } catch (error) {
      return reject('invalid email or password');
    }
  });