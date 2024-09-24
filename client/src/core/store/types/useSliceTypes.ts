import { JwtPayload } from "jwt-decode";

export interface ReturnLoginData extends JwtPayload {
  login: string;
  id: string;
}

export interface LoginData {
  login: string;
  password: string;
}