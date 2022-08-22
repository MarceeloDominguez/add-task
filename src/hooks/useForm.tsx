import { useState } from "react";

export const useForm = <T extends Object>(initialState: T) => {
  const [values, setValues] = useState(initialState);

  const reset = () => {
    setValues(initialState);
  };

  const onChange = (value: string, campo: keyof T) => {
    setValues({
      ...values,
      [campo]: value,
    });
  };

  return { ...values, onChange, values, reset, setValues };
};
