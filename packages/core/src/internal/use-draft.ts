import { useState, useCallback } from "react";

export const useDraft = <T>(initialState: T) => {
  const [draft, setDraft] = useState<T>();
  const value = draft ?? initialState;
  const onChangeValue = useCallback(setDraft, []);

  return [value, onChangeValue] as const;
};
