import * as React from "react";
import { QueryClient, QueryClientProvider } from "react-query";

export function withQueryClient<T>(
  queryClient?: QueryClient
): (Component: React.ComponentType<T>) => React.FC<T> {
  const qc = queryClient ?? new QueryClient();
  return (Component: React.ComponentType<T>) => {
    const WithQueryClientComponent: React.FC<T> = (props) => {
      return (
        <QueryClientProvider client={qc}>
          <Component {...props}>{props.children}</Component>
        </QueryClientProvider>
      );
    };
    return WithQueryClientComponent;
  };
}
