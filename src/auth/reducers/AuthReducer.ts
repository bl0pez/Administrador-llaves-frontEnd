import { AuthState } from "../interfaces";

type User = {
  uid: string;
  name: string;
  email: string;
  roles: string[];
};

type AuthAction =
  | { type: "checking" }
  | { type: "logout" }
  | { type: "login"; payload: User };

export const AuthReducer = (
  stateAuth: AuthState,
  action: AuthAction
): AuthState => {
  switch (action.type) {
    case "checking": {
      return {
        status: "checking",
        uid: "",
        roles: [],
        name: "",
        email: "",
      };
    }
    case "logout": {
      return {
        uid: "",
        roles: [],
        name: "",
        email: "",
        status: "not-authenticated",
      };
    }
    case "login": {
      return {
        ...stateAuth,
        status: "authenticated",
        uid: action.payload.uid,
        name: action.payload.name,
        email: action.payload.email,
        roles: action.payload.roles,
      };
    }
    default:
      return stateAuth;
  }
};
