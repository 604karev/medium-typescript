import { MouseEvent, useState } from "react";
import Component from "./Component";
import { StoreProvider } from "./store";

function Container() {
  return (
    <StoreProvider createStore={() => ({})}>
      <Component />
    </StoreProvider>
  );
}

export default Container;
