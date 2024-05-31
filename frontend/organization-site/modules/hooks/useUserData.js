import { useQuery } from "@tanstack/react-query";
import axiosInstance from "../axios";

export function useUserData() {
  return useQuery(
    ["user-data"],
    async () => {
      const token =
        typeof window !== "undefined" ? localStorage.getItem("access") : "";
      if (!token) {
        throw new Error("No access token found");
      }

      const res = await axiosInstance.get("/user/me", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (res.status === 200) {
        return res.data;
      } else {
        throw new Error("Failed to fetch user data");
      }
    },
    {
      retry: 3,
      staleTime: Infinity,
      cacheTime: Infinity,
    }
  );
}
