import { createAsyncThunk } from "@reduxjs/toolkit";
import tagService from "../../services/tagService";
import { FormDataPost } from "../types/postsSliceTypes";
import postService from "../../services/postService";


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