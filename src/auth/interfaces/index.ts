export interface AuthState {
  status: "checking" | "authenticated" | "not-authenticated";
  uid: string;
  role: string;
  name: string;
  email: string;
  errorMsj: string;
}

// Generated by https://quicktype.io

export interface FetchAuth {
  ok: boolean;
  msg: string;
  user: User;
  token: string;
}

export interface User {
  _id: string;
  name: string;
  email: string;
  role: string;
  status: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface UserAuth {
  uid: string;
  name: string;
  email: string;
  role: string;
}
