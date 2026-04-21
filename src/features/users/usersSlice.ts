import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { User } from '../../types/User';
import { getUsers } from '../../api/users';

type UsersState = {
  users: User[];
  isLoading: boolean;
  error: boolean;
};

const initialState: UsersState = {
  users: [],
  isLoading: false,
  error: false,
};

export const loadUsers = createAsyncThunk('users/fetch', () => getUsers());

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(loadUsers.pending, state => {
      state.isLoading = true;
      state.error = false;
    });
    builder.addCase(loadUsers.fulfilled, (state, action) => {
      state.isLoading = false;
      state.users = action.payload;
    });
    builder.addCase(loadUsers.rejected, state => {
      state.isLoading = false;
      state.error = true;
    });
  },
});

export default usersSlice.reducer;
// export const {} = usersSlice.actions;
