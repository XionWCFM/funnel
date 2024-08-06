import { useCallback, useState } from "react";

export const useDraft = <T>(initialState: T) => {
  const [draft, setDraft] = useState<T>();
  const value = draft ?? initialState;
  const onChangeValue = useCallback((value: T) => setDraft(value), []);

  return [value, onChangeValue] as const;
};
