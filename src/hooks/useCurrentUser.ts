import { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";

import { fetchCurrentUser } from "../lib/api/auth";
import { useAuthStore } from "../store/auth";

export function useCurrentUser() {
  const accessToken = useAuthStore((s) => s.accessToken);
  const setUser = useAuthStore((s) => s.setUser);

  const query = useQuery({
    queryKey: ["me"],
    queryFn: fetchCurrentUser,
    enabled: !!accessToken,
    initialData: () => useAuthStore.getState().user ?? undefined,
    staleTime: 0,
  });

  useEffect(() => {
    if (query.data) setUser(query.data);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query.data]);

  return query;
}
