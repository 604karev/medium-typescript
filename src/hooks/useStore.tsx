import { PropsWithChildren, createContext, useContext } from "react";

export function getStoreContext<T extends object>() {
  const StoreContext = createContext<T | null>(null);

  function StoreProvider({
    children,
    createStore,
  }: PropsWithChildren<{ createStore: () => T }>) {
    const store = createStore();
    return (
      <StoreContext.Provider value={store}>{children}</StoreContext.Provider>
    );
  }
  const useStore = () => {
    const store = useContext(StoreContext);
    if (!store) {
      throw new Error("useStore must be used within a StoreProvider.");
    }
    return store;
  };
  return {
    StoreContext,
    StoreProvider,
    useStore,
  };
}
