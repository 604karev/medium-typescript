import { getStoreContext } from "hooks/useStore";

export interface IContext {
  user: any;
  setUser: any
}

export const { useStore, StoreProvider } = getStoreContext<IContext>();
