export interface CreateUserState {
  fullName: string;
  email: string;
  password: string;
  roles: string[];
}

export interface UpdateUserState {
  fullName: string;
  email: string;
  roles: string[];
}

export interface User {
  fullName: string;
  email: string;
  updated_at: Date | null;
  id: string;
  roles: string[];
  created_at: Date;
}

export interface GetUsers {
  users: User[];
  count: number;
}

export interface stateUser extends GetUsers {
  isLoading: boolean;
}
