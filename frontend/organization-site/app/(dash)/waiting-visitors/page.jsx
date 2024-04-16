'use client'

import React, { useEffect, useState } from "react";
import { useUserData } from "@/modules/hooks/useUserData";
import LoadingComponent from "@/modules/core-ui/LoadingComponent";
import axiosInstance from "@/modules/axios";
import WaitingVisitorCard from "@/modules/organization/WaitingVisitorCard";

export default function Page() {
  const [historyData, setHistoryData] = useState([]);
  const [isVisitHistoryLoading, setIsVisitHistoryLoading] = useState(false);

  const {
    data: user,
    isLoading: isUserLoading,
    isError: isUserError,
  } = useUserData();

  useEffect(() => {
    if (user !== undefined) {
      setIsVisitHistoryLoading(true);
      axiosInstance
        .get(`/organization/${user.id}/visit-history`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("access")}`,
          },
        })
        .then((res) => {
          setHistoryData(res.data);
        })
        .catch((error) => {
          console.error("Error fetching visit history data:", error);
          toast.error(
            error.response?.data?.message ||
              "Failed to fetch visit history data"
          );
        })
        .finally(() => {
          setIsVisitHistoryLoading(false);
        });
    }
  }, [user]);

  if (isVisitHistoryLoading) {
    return <LoadingComponent />;
  }

  return (
    <section>
      <h1 className="py-2 text-xl font-semibold">Waiting Visitors</h1>
      <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
        {historyData?.map((data) =>
          data.is_approved === false ? (
            <WaitingVisitorCard
              key={data?.id}
              data={data}
              setHistoryData={setHistoryData}
            />
          ) : (
            ""
          )
        )}
      </div>
    </section>
  );
}
