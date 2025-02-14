import { createContext, ReactNode, useContext, useReducer } from "react";
import UserInterface from "../utils/userInterface";
import { useNavigate } from "react-router-dom";
interface AuthProviderProps {
  children: ReactNode;
}

interface AuthProviderValueInterface {
  checkUser: (credentials: UserInterface) => void;
  login: (credentials: UserInterface) => void;
  logout: () => void;
  user: UserInterface | null;
}
interface InitialStateInterface {
  user: UserInterface | null;
  error: Error | null;
}
const AuthContext = createContext<AuthProviderValueInterface | null>(null);
export function AuthProvider({ children }: AuthProviderProps) {
  const navigate = useNavigate();
  const initialState: InitialStateInterface = {
    user: null,
    error: null,
  };
  const reducer = (
    state: InitialStateInterface,
    action:
      | { type: "user/loggedIn"; value: UserInterface }
      | { type: "error"; value: Error }
      | { type: "user/loggedOut" }
  ) => {
    switch (action.type) {
      case "user/loggedIn":
        console.log("action.value", action.value);
        return { ...state, user: action.value };
      case "error":
        alert(action.value);
        return { ...state, error: action.value };
      case "user/loggedOut":
        return { ...state, user: null };
      default:
        throw new Error("Invalid Action");
    }
  };

  const [state, dispatch] = useReducer(reducer, initialState);
  async function checkUser(credentials: UserInterface) {
    try {
      const response = await fetch("http://localhost:9090/users");
      const users = await response.json();

      const user = users.find((user: UserInterface) => {
        return (
          user.email === credentials.email &&
          user.password === credentials.password
        );
      });
      return user as UserInterface;
    } catch (error) {
      dispatch({ type: "error", value: error as Error });
    }
  }
  async function login(credentials: UserInterface) {
    const user = await checkUser(credentials);
    console.log("user", user);
    if (!user) {
      dispatch({
        type: "error",
        value: new Error("Incorrect Email or Password"),
      });
      return navigate("/login");
    } else {
      dispatch({ type: "user/loggedIn", value: user });

      return navigate("/app");
    }
  }
  async function logout() {
    dispatch({ type: "user/loggedOut" });
  }
  return (
    <AuthContext.Provider
      value={{ checkUser, login, logout, user: state.user }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuthContext() {
  const context = useContext(AuthContext);

  if (!context) throw new Error("useAuthContext was used outside AuthProvider");

  return context;
}
