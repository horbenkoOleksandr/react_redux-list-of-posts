import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { Comment, CommentData } from '../../types/Comment';
import {
  createComment,
  deleteComment,
  getPostComments,
} from '../../api/comments';

type CommentsState = {
  comments: Comment[];
  isLoading: boolean;
  hasError: boolean;
};

const initialState: CommentsState = {
  comments: [],
  isLoading: false,
  hasError: false,
};

export const loadCommentsByPost = createAsyncThunk(
  'comments/loadCommentsByPost',
  (postId: number) => getPostComments(postId),
);

export const addComment = createAsyncThunk(
  'comments/addComment',
  ({ data, postId }: { data: CommentData; postId: number }) => {
    return createComment({
      ...data,
      postId,
    });
  },
);

export const deleteComments = createAsyncThunk(
  'comments/deleteComments',
  async (commentId: number) => {
    await deleteComment(commentId);

    return commentId;
  },
);

const commentsSlice = createSlice({
  name: 'comments',
  initialState,
  reducers: {
    clearComments: state => {
      state.comments = [];
      state.hasError = false;
      state.isLoading = false;
    },
  },
  extraReducers: builder => {
    builder.addCase(loadCommentsByPost.pending, state => {
      state.isLoading = true;
      state.hasError = false;
    });
    builder.addCase(loadCommentsByPost.fulfilled, (state, action) => {
      state.isLoading = false;
      state.comments = action.payload;
    });
    builder.addCase(loadCommentsByPost.rejected, state => {
      state.isLoading = false;
      state.hasError = true;
    });
    builder.addCase(addComment.fulfilled, (state, action) => {
      state.comments.push(action.payload);
    });
    builder.addCase(addComment.rejected, state => {
      state.hasError = true;
    });
    builder.addCase(deleteComments.fulfilled, (state, action) => {
      state.comments = state.comments.filter(
        comment => comment.id !== action.payload,
      );
    });
  },
});

export default commentsSlice.reducer;
export const { clearComments } = commentsSlice.actions;
