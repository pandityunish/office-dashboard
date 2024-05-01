import { useQuery } from "@tanstack/react-query";
import axiosInstance from "../axios";

export function useUserData() {
  return useQuery(
    ["user-data"],
    async () => {
      const res = await axiosInstance.get("/user/me", {
        headers: {
          Authorization: `Bearer ${
            typeof window !== "undefined" ? localStorage?.getItem("access") : ""
          }`,
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
    }
  );
}
