import { $host } from "../config/httpConfig";

export class PostService {
  async getPosts() {
    const { data } = await $host.get("/posts");
    return data;
  }

  async getOnePost(id: string) {
    console.log(id, "IDDD");
    const { data } = await $host.get(`/posts/${id}`);
    console.log("postOne:", data);

    return data;
  }

  async updatePost(
    title: string,
    description: string,
    tags: string,
    postId: string
  ) {
    const { data } = await $host.post(`/posts/update`, {
      title,
      description,
      tags,
      id:postId,
    });
    console.log("postOne:", data);

    return data;
  }

  async createPost(
    title: string,
    description: string,
    userId: string,
    type: string,
    tags: string[],
    preview: File
  ) {
    console.log(preview, "dfldffld");
    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("preview", preview);
    formData.append("tags", tags.join(","));
    formData.append("type", type);
    formData.append("userId", userId);
    formData.forEach((item) => console.log(item));
    const { data } = await $host.post("/posts/", formData);

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
