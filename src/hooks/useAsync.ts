import { useState } from 'react';

type Error = {
  message: string;
};

/* eslint-disable  @typescript-eslint/no-explicit-any */
export function useAsync<T extends (...args: any[]) => Promise<Awaited<ReturnType<T>>>>(
  callback: T,
  defaultLoadingState: boolean = false,
) {
  const [pending, setPending] = useState(defaultLoadingState);
  const [error, setError] = useState<Error | null>(null);

  const wrappedFunction = async (...args: Parameters<T>) => {
    try {
      setPending(true);
      setError(null);
      return await callback(...args);
    } catch (err) {
      setError(err as Error);
      return undefined;
    } finally {
      setPending(false);
    }
  };

  return [pending, error, wrappedFunction] as const;
}

export const error = 0;