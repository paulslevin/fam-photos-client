import { useState, useEffect } from "react";

export function useStateWithSessionStorage(initialState, key) {
  const [value, setValue] = useState(
    JSON.parse(sessionStorage.getItem(key)) || initialState
  );

  useEffect(() => {
    sessionStorage.setItem(key, JSON.stringify(value));
  });

  return [value, setValue];
}

export function useFormFields(initialState) {
  const [fields, setValues] = useState(initialState);

  return [
    fields,
    function (event) {
      setValues({
        ...fields,
        [event.target.id]: event.target.value,
      });
    },
  ];
}
