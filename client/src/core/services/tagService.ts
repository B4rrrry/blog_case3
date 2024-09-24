import { $host } from "../config/httpConfig";

class TagService {
  async create(title: string) {
    const { data } = await $host.post("/tags/", { title });
    console.log("new tag:", data);

    return data;
  }

  async getAll() {
    const { data } = await $host.get("/tags/");
    console.log("tags:", data);

    return data;
  }
}

export default new TagService();
