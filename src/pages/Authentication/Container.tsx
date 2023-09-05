import { MouseEvent, useState, FormEventHandler } from "react";
import Component from "./Component";
import { StoreProvider } from "./store";
import { stateSetter } from "utils";
import useFetch from "hooks/useFetch";

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

  const options = {
    method: "POST",
    url: "/login/user",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      user: {
        email: email,
        password: password,
      },
    }),
  };

  const { data, fetchQuery, isLoading } = useFetch("/login/user", options);

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
      })}
    >
      <Component />
    </StoreProvider>
  );
}

export default Container;
