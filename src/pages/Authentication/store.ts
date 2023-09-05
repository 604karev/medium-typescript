import { getStoreContext } from "hooks/useStore";
import { MouseEvent, ChangeEvent } from "react";

export interface IContext {
  email: string;
  phone: string;
  username: string;
  password: string;
  handleSubmit: (event: MouseEvent<HTMLElement>) => void;
  changeEmail: (event: ChangeEvent<HTMLInputElement>) => void;
  changePassword: (event: ChangeEvent<HTMLInputElement>) => void;
  changeUsername: (event: ChangeEvent<HTMLInputElement>) => void;
}
export const { useStore, StoreProvider } = getStoreContext<IContext>();
