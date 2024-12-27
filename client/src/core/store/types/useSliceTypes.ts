import { JwtPayload } from "jwt-decode";

export interface Subscriptions {
  userId: string;
  subUserId: string;
  id: string;
}

export interface ReturnLoginData extends JwtPayload {
  login: string;
  id: string;
  subUserId: string;
}

export interface LoginData {
  login: string;
  password: string;
}