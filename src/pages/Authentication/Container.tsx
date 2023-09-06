import { MouseEvent, useState, FormEventHandler, useEffect } from "react";
import Component from "./Component";
import { StoreProvider } from "./store";
import { stateSetter } from "utils";
import useFetch from "hooks/useFetch";
import { useLocation } from "react-router-dom";
import { useLocalStorage } from "hooks/useLocalSrorage";

export interface User {
  name: string;
  email: string;
  password: string;
}

function Container() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [phone, setPhone] = useState("");
  const { pathname } = useLocation();
  const isLogin = pathname === "/login";
  const user = isLogin ? { email, password } : { username, email, password };
  const { setToken } = useLocalStorage("token");

  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ user: user }),
  };

  const { refetch, isLoading, error, data } = useFetch(
    isLogin ? "/users/login" : "/users",
    options
  );

  function handleSubmit(e: MouseEvent<HTMLElement>) {
    e.preventDefault();
    refetch();
  }
  const changePassword = stateSetter(setPassword);
  const changeEmail = stateSetter(setEmail);
  const changeUsername = stateSetter(setUsername);

  useEffect(() => {
    if (!data) return;
    setToken(data.user.token);
  }, [data]);

  return (
    <StoreProvider
      createStore={() => ({
        email,
        password,
        username,
        phone,
        handleSubmit,
        changePassword,
        changeEmail,
        changeUsername,
        isLogin,
      })}
    >
      <Component />
    </StoreProvider>
  );
}

export default Container;
