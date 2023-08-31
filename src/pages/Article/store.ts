import { getStoreContext } from "hooks/useStore";
import { MouseEvent } from "react";

export interface IContext {

}
export const { useStore, StoreProvider } = getStoreContext<IContext>();
