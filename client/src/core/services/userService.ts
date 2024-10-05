import { AxiosError } from "axios";
import { $authHost, $host } from "../config/httpConfig";
import { jwtDecode } from "jwt-decode";
import { ReturnLoginData } from "../store/types/useSliceTypes";

class UserService {
  async register(
    login: string,
    password: string,
    fName: string,
    sName: string,
    lName: string
  ) {
    const { data } = await $host.post("/users/register", {
      login,
      password,
      fName,
      sName,
      lName,
    });

    return data;
  }

  async login(login: string, password: string) {
    const { data } = await $host.post("/users/login", { login, password });
    localStorage.setItem("token", data);
    const decode = jwtDecode<ReturnLoginData>(data);

    return decode;
  }

  async auth() {
    const { data } = await $authHost.get("/users/auth");
    localStorage.setItem("token", data);
    const decode = jwtDecode<ReturnLoginData>(data);
    return decode;
  }

  async getUser(id: string) {
    const { data } = await $host.get(`/users/${id}`);

    return data;
  }

  async getUsers() {
    const { data } = await $host.get("/users");
    return data;
  }
}

export default new UserService();
