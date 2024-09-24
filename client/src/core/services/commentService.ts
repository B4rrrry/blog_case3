import { $host } from "../config/httpConfig";

class CommentService {
  async create(userId: string, postId: string, text: string) {
    const { data } = await $host.post("/comments/", { userId, postId, text });
    console.log("new comment", data);

    return data;
  }

  async getComments(id: string) {
    const { data } = await $host.get(`/comments/${id}`);
    console.log('comments:', data);

    return data;
  }
}

export default new CommentService();
