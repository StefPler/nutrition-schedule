import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { UserProfile, isValidUserProfile } from "../types/userProfile";

const storageKeys = {
  userProfile: "user-profile",
  dailyCheckins: "daily-checkins",
};

export const useStorage = <T>(key: keyof typeof storageKeys, validate?: (value: unknown) => value is T) => {
  const queryClient = useQueryClient();

  const getItem = useQuery({
    queryKey: [storageKeys[key]],
    queryFn: () => {
      const stored = localStorage.getItem(storageKeys[key]);
      if (!stored) {
        return undefined;
      }
      const parsed = JSON.parse(stored);
      if (validate && !validate(parsed)) {
        localStorage.removeItem(storageKeys[key]);
        return undefined;
      }
      return parsed as T;
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

export const useUserProfileStorage = () => useStorage<UserProfile>("userProfile", isValidUserProfile);
