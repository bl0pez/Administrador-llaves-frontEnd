import { Roles } from "@/common/interfaces";

export interface CreateUser {
  fullName: string;
  email: string;
  password: string;
  role: string;
}

export interface UpdateUser {
  fullName: string;
  email: string;
  role: string;
}

export interface User {
  fullName: string;
  email: string;
  updated_at: Date | null;
  id: string;
  role: Roles;
  created_at: Date;
}

export interface GetUsers {
  users: User[];
  count: number;
}

export interface stateUser extends GetUsers {
  isLoading: boolean;
}
