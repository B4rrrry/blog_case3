import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { FormDataPost, InitialStatePosts } from "./types/postsSliceTypes";
import postService from "../services/postService";
import tagService from "../services/tagService";

const initialState: InitialStatePosts = {
  posts: [],
  post: undefined,
  tags: [],
};

export const getTags = createAsyncThunk("/tags", async () => {
  try {
    const tags = await tagService.getAll();
    return tags;
  } catch (e) {}
});

export const createPost = createAsyncThunk(
  "/posts/create",
  async (data: FormDataPost) => {
    const { title, description, preview, tags, userId, type } = data;
    try {
      console.log(preview, "{Ppew");
      const post = await postService.createPost(
        title,
        description,
        userId,
        type,
        tags,
        preview
      );
      console.log(post);
      return post;
    } catch (e) {
      return e;
    }
  }
);

export const getPosts = createAsyncThunk("/posts", async () => {
  try {
    const posts = await postService.getPosts();
    return posts;
  } catch (e) {}
});

export const getPostById = createAsyncThunk("/posts/id", async (id: string) => {
  try {
    const post = await postService.getOnePost(id);
    return post;
  } catch (e) {
    console.log(e, "REO");
  }
});

export const updatePost = createAsyncThunk(
  "/posts/update",
  async (data: {
    title: string;
    description: string;
    postId: string;
    tags: string[];
  }) => {
    const { title, description, tags, postId } = data;
    try {
      const tagsStr = tags.join(",");
      const newPost = await postService.updatePost(
        title,
        description,
        tagsStr,
        postId
      );
      return newPost;
    } catch (e) {
      return e;
    }
  }
);

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
