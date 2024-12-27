import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { FormDataPost, InitialStatePosts } from "./types/postsSliceTypes";
import postService from "../services/postService";
import tagService from "../services/tagService";
import { createPost, getPostById, getPosts, getTags, updatePost } from "./reducers/postReducers";

const initialState: InitialStatePosts = {
  posts: [],
  post: undefined,
  tags: [],
};


const postsSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(getPosts.fulfilled, (state, action) => {
      if (action.payload) {
        state.posts = action.payload;
      }
    });
    builder.addCase(getTags.fulfilled, (state, action) => {
      if (action.payload) {
        state.tags = action.payload;
      }
    });
    builder.addCase(createPost.fulfilled, (state, action) => {
      console.log(action);
    });
    builder.addCase(createPost.rejected, (state, action) => {
      console.log(action, "Error");
    });
    builder.addCase(getPostById.fulfilled, (state, action) => {
      console.log(action, "ById");
      state.post = action.payload;
    });
    builder.addCase(updatePost.fulfilled, (state, action) => {
      console.log(action, "updated");
    });
  },
});

export const postsActions = postsSlice.actions;

export default postsSlice.reducer;
