import { User } from "@/admin/interfaces";

export interface AuthState {
  status: "checking" | "authenticated" | "not-authenticated";
  uid: string;
  roles: string[];
  name: string;
  email: string;
}

export interface FetchAuth {
  user: User;
  token: string;
}

export interface LoginUser {
  email: string;
  password: string;
}
