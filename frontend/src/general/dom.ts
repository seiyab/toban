import * as React from "react";

type UseTextInputResult = {
  value: string;
  handleChange: JSX.IntrinsicElements["input"]["onChange"];
};

export function useTextInput(initialValue?: string): UseTextInputResult {
  const [value, setValue] = React.useState(initialValue ?? "");
  const handleChange = React.useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) =>
      setValue(event.target.value),
    []
  );
  return {
    value,
    handleChange,
  };
}
