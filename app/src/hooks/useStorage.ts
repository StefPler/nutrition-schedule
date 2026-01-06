// "use client";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

const storageKeys = {
  userProfile: "user-profile",
};

// export const useStorage = () => {
//   const getUserProfile = (): UserProfile | null => {
//     const profile = localStorage.getItem(storageKeys.userProfile);
//     return profile ? JSON.parse(profile) : null;
//   };

//   const storeUserProfile = (profile: UserProfile) => {
//     localStorage.setItem(storageKeys.userProfile, JSON.stringify(profile));
//   };

//   return { getUserProfile, storeUserProfile };
// };

// @todo: Fam maybe try to use tanstack query here?
// Should help to share state across components because right now this hook does not share the value across components
// export function useStorage<T>(key: string) {
//   const [value, setValue] = useState<T>();

//   useEffect(() => {
//     const stored = localStorage.getItem(key);
//     console.log("stored value:", stored);
//     if (stored !== null) {
//       setValue(JSON.parse(stored));
//     }
//   }, [key]);

//   useEffect(() => {
//     if (value === undefined) return;
//     localStorage.setItem(key, JSON.stringify(value));
//   }, [value]);

//   return [value, setValue] as const;
// }

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
