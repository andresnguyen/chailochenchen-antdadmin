import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import userAPI from '../../api/userAPI';
import { authStorageKeys } from '../../constants';

export const login = createAsyncThunk('user/login', async (payload) => {
  const { token, user } = await userAPI.login(payload);

  // save data to local storage
  localStorage.setItem(authStorageKeys.TOKEN, token);
  localStorage.setItem(authStorageKeys.USER, JSON.stringify(user));

  return data.user;
});

const userSlice = createSlice({
  name: 'user',
  initialState: {
    current: JSON.parse(localStorage.getItem(authStorageKeys.USER)) || {},
    settings: {},
  },
  reducers: {
    logout(state) {
      // clear local storage
      localStorage.removeItem(authStorageKeys.USER);
      localStorage.removeItem(authStorageKeys.TOKEN);

      state.current = {};
    },
  },
  extraReducers: {
    [login.fulfilled]: (state, action) => {
      state.current = action.payload;
    },
  },
});

const { actions, reducer } = userSlice;
export const { logout } = actions;
export default reducer;