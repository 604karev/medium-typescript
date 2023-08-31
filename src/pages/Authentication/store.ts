import { getStoreContext } from "hooks/useStore";
import { MouseEvent } from "react";

export interface IContext {
  email: string;
  phone: string;
  username: string;
  password: string;
  handleSubmit: (event: any) => void;
}
export const { useStore, StoreProvider } = getStoreContext<IContext>();
