import { Skeleton } from "@mui/material";
import React from "react";

const SidebarLoader = () => {
  return (
    <>
      <Skeleton
        variant="rectangular"
        height={40}
        className="rounded-lg cursor-pointer m-[10px]"
      />
      <Skeleton
        variant="rectangular"
        height={40}
        className="rounded-lg cursor-pointer m-[10px]"
      />
      <Skeleton
        variant="rectangular"
        height={40}
        className="rounded-lg cursor-pointer m-[10px]"
      />
    </>
  );
};

export default SidebarLoader;
