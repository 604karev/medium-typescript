import { MouseEvent, useState, FormEventHandler } from "react";
import Component from "./Component";
import { StoreProvider } from "./store";
import { stateSetter } from "utils";
import useFetch from "hooks/useFetch";
import { useLocation } from "react-router-dom";

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

  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  };

  const { data, fetchQuery, isLoading, error } = useFetch(
    isLogin ? "/users/login" : "/users",
    options
  );

  function handleSubmit(e: MouseEvent<HTMLElement>) {
    e.preventDefault();
    fetchQuery();
  }
  const changePassword = stateSetter(setPassword);
  const changeEmail = stateSetter(setEmail);
  const changeUsername = stateSetter(setUsername);

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
