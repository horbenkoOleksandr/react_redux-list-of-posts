import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { Post } from '../../types/Post';
import { getUserPosts } from '../../api/posts';

type PostState = {
  items: Post[];
  loaded: boolean;
  hasError: boolean;
};

const initialState: PostState = {
  items: [],
  loaded: false,
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
      state.loaded = true;
      state.hasError = false;
    });
    builder.addCase(loadPostsByUser.fulfilled, (state, action) => {
      state.loaded = false;
      state.items = action.payload;
    });
    builder.addCase(loadPostsByUser.rejected, state => {
      state.loaded = false;
      state.hasError = true;
    });
  },
});

export default postSlice.reducer;
// export const {} = postSlice.actions;
