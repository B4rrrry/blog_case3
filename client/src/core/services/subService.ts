import { $host } from "../config/httpConfig";

class SubService {
  async createSubUser(id: string) {
    const { data } = await $host.post("/subs/", { id });
    console.log("create sub", data);

    return data;
  }

  async createSubscription(subUserId: string, userId: string) {
    const { data } = await $host.post("/subscriptions/", { subUserId, userId });
    console.log("subscriptions:", data);

    return data;
  }

  async deleteSubscription(userId: string) {
    const { data } = await $host.put("/subscriptions/", userId);
    console.log("delete subscriptions:", data);

    return data;
  }
}

export default new SubService();
