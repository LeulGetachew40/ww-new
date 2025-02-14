import { MouseEvent, useReducer } from "react";
import loginStyles from "./Login.module.css";
import actionTypes from "../utils/actionTypes";
import PageNav from "../components/PageNav";
import Button from "../components/app-components/Button";
import "../index.css";
import { useAuthContext } from "../contexts/AuthContext";

interface InitialStateInterface {
  email: string | null;
  password: string | null;
}

export default function Login() {
  // PRE-FILL FOR DEV PURPOSES
  function reducer(
    state: InitialStateInterface,
    action: { type: string; value: string }
  ) {
    switch (action.type) {
      case actionTypes.SET_EMAIL:
        return { ...state, email: action.value };
      case actionTypes.SET_PASSWORD:
        return { ...state, password: action.value };
      default:
        throw new Error("Invalid action");
    }
  }
  const { login } = useAuthContext();

  const initialState: InitialStateInterface = {
    email: null,
    password: null,
  };
  const [state, dispatch] = useReducer(reducer, initialState);
  async function handleCheckUser(e: MouseEvent<HTMLButtonElement>) {
    e.preventDefault();
    if (state.email && state.password) {
      login({ email: state.email, password: state.password });
    } else {
      throw new Error("Please enter a valid email and password");
    }
  }
  return (
    <main className={loginStyles.login}>
      <PageNav isLoginPage={true} />
      <form className={loginStyles.form}>
        <div className={loginStyles.row}>
          <label htmlFor="email">Email address</label>
          <input
            type="email"
            id="email"
            placeholder="john@example.com"
            onChange={(e) =>
              dispatch({ type: actionTypes.SET_EMAIL, value: e.target.value })
            }
            value={state.email ? state.email : ""}
          />
        </div>

        <div className={loginStyles.row}>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            onChange={(e) =>
              dispatch({
                type: actionTypes.SET_PASSWORD,
                value: e.target.value,
              })
            }
            value={state.password ? state.password : ""}
          />
        </div>

        <div>
          <Button btnClass="primary" handleClick={handleCheckUser}>
            Login
          </Button>
        </div>
      </form>
    </main>
  );
}
