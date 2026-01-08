import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

const storageKeys = {
  userProfile: "user-profile",
};

export const useStorage = <T>(key: keyof typeof storageKeys) => {
  const queryClient = useQueryClient();

  const getItem = useQuery({
    queryKey: [storageKeys[key]],
    queryFn: () => {
      const stored = localStorage.getItem(storageKeys[key]);
      if (!stored) {
        return undefined;
      }
      return JSON.parse(stored) as T;
    },
  });

  const setItem = useMutation({
    mutationFn: async (object: T) => {
      localStorage.setItem(storageKeys[key], JSON.stringify(object));
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: [storageKeys[key]] });
    },
  });

  return { getItem, setItem };
};
