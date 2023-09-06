import { MouseEvent, PropsWithChildren, useState } from "react";
import { IContext, StoreProvider } from "./store";

interface IProps {}

function Container({ children }: PropsWithChildren<IProps>) {
  const [user, setUser] = useState<any>();

  return (
    <StoreProvider
      createStore={() => ({
        user,
        setUser,
      })}
    >
      {children}
    </StoreProvider>
  );
}

export default Container;
