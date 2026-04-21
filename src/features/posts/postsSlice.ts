import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { Post } from '../../types/Post';
import { getUserPosts } from '../../api/posts';

type PostState = {
  posts: Post[];
  isLoading: boolean;
  hasError: boolean;
};

const initialState: PostState = {
  posts: [],
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
  reducers: {},
  extraReducers: builder => {
    builder.addCase(loadPostsByUser.pending, state => {
      state.isLoading = true;
      state.hasError = false;
    });
    builder.addCase(loadPostsByUser.fulfilled, (state, action) => {
      state.isLoading = false;
      state.posts = action.payload;
    });
    builder.addCase(loadPostsByUser.rejected, state => {
      state.isLoading = false;
      state.hasError = true;
    });
  },
});

export default postSlice.reducer;
// export const {} = postSlice.actions;
