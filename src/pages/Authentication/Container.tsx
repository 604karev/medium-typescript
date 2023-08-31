import { MouseEvent, useState, FormEventHandler } from "react";
import Component from "./Component";
import { StoreProvider } from "./store";

function Container() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [phone, setPhone] = useState("");
  
  function handleSubmit(e: MouseEvent<HTMLElement>) {
    e.preventDefault()
    console.log(e);
  }

  return (
    <StoreProvider
      createStore={() => ({ email, password, username, phone, handleSubmit })}
    >
      <Component />
    </StoreProvider>
  );
}

export default Container;
