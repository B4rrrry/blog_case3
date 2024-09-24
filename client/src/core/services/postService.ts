import { $host } from "../config/httpConfig";

export class PostService {
  async getPosts() {
    const { data } = await $host.get("/posts");
    console.log("posts:", data);

    return data;
  }

  async getOnePost(id: string) {
    const { data } = await $host.get(`/posts/${id}`);
    console.log("postOne:", data);

    return data;
  }

  async createPost(
    title: string,
    description: string,
    userId: string,
    type: string
  ) {
    const { data } = await $host.post("/posts/", {
      title,
      description,
      userId,
      type,
    });

    console.log("New post:", data);

    return data;
  }

  async deletePost(id: string) {
    const { data } = await $host.put("/posts/", { id });
    console.log("delete post");

    return data;
  }
}

export default new PostService();
