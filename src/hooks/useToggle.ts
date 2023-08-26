import { useState } from "react";

export const useToggle = (initialValue: boolean) => {
  const [value, setValue] = useState(initialValue);

  const toggle = () => {
    if (value) {
      setValue(false);
    } else {
      setValue(true);
    }
  };

  return [value, toggle] as const;
};
