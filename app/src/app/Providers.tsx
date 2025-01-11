"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ChildrenProps } from "./layout";

export const Providers = ({ children }: ChildrenProps) => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: { staleTime: 2 * 1000 * 60, gcTime: 5 * 1000 * 60 },
    },
  });

  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};
