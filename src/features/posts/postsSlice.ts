import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { Post } from '../../types/Post';
import { getUserPosts } from '../../api/posts';

type PostState = {
  items: Post[];
  isLoading: boolean;
  hasError: boolean;
};

const initialState: PostState = {
  items: [],
  isLoading: false,
  hasError: false,
};

export const loadPostsByUser = createAsyncThunk(
  'posts/loadPostsByUser',
  (userId: number) => getUserPosts(userId),
);

const postSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    clearPosts: state => {
      state.items = [];
      state.isLoading = false;
      state.hasError = false;
    },
  },
  extraReducers: builder => {
    builder.addCase(loadPostsByUser.pending, state => {
      state.isLoading = true;
      state.hasError = false;
    });
    builder.addCase(loadPostsByUser.fulfilled, (state, action) => {
      state.isLoading = false;
      state.items = action.payload;
    });
    builder.addCase(loadPostsByUser.rejected, state => {
      state.isLoading = false;
      state.hasError = true;
    });
  },
});

export default postSlice.reducer;
export const { clearPosts } = postSlice.actions;
