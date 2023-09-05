import { Dispatch, ChangeEvent } from "react";

export const stateSetter =
  (setter: Dispatch<React.SetStateAction<string>>) =>
  (event: ChangeEvent<HTMLInputElement>) => {
    const {
      target: { value },
    } = event;
    return setter(value);
  };
